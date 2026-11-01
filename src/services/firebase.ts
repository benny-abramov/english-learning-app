import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  onSnapshot, 
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth & Firestore with specific database ID
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test connection on boot per Firebase skill guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears to be offline. Local cache will be used.');
    }
  }
}
testConnection();

// Standardized error handler per Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// User Profile Data Models
export interface StudentProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  classCode: string; // e.g. "ד׳2", "GRADE4-2"
  grade: '4th' | '5th';
  xp: number;
  streak: number;
  dailyExercisesDone: number;
  dailyGoal: number;
  lastExerciseDate: string; // "YYYY-MM-DD"
  createdAt?: string;
  updatedAt?: string;
}

export interface ClassroomScoreEntry {
  studentId: string;
  displayName: string;
  photoURL: string;
  classCode: string;
  xp: number;
  streak: number;
  dailyExercisesDone: number;
  updatedAt: string;
}

// Helper to normalize today's date in local ISO format (YYYY-MM-DD)
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Authentication Helpers
export async function loginWithGoogle(): Promise<FirebaseUser> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google Sign-In failed:', error);
    throw error;
  }
}

// Quick Student login without Gmail (Anonymous Auth + Display Name)
export async function loginWithAnonymousStudent(displayName: string): Promise<FirebaseUser> {
  try {
    const result = await signInAnonymously(auth);
    if (displayName.trim()) {
      await updateProfile(result.user, { displayName: displayName.trim() });
    }
    return result.user;
  } catch (error) {
    console.error('Anonymous Student Sign-In failed:', error);
    throw error;
  }
}

// Email & Password login (Works with any email: school @education.gov.il, outlook, yahoo, etc.)
export async function loginWithEmail(email: string, pass: string): Promise<FirebaseUser> {
  try {
    const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
    return result.user;
  } catch (error) {
    console.error('Email Sign-In failed:', error);
    throw error;
  }
}

// Register with Email & Password
export async function registerWithEmail(email: string, pass: string, displayName: string): Promise<FirebaseUser> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (displayName.trim()) {
      await updateProfile(result.user, { displayName: displayName.trim() });
    }
    return result.user;
  } catch (error) {
    console.error('Email Registration failed:', error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// Get or initialize student profile in Firestore
export async function getOrCreateStudentProfile(
  user: FirebaseUser, 
  initialClassCode: string = 'ד׳2',
  initialXp: number = 480,
  initialStreak: number = 5,
  initialDailyDone: number = 7,
  customDisplayName?: string
): Promise<StudentProfile> {
  const userDocPath = `users/${user.uid}`;
  const userDocRef = doc(db, 'users', user.uid);
  const today = getTodayDateString();

  try {
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data() as StudentProfile;
      // If student updated their display name or classCode
      let needsUpdate = false;
      let resolvedName = data.displayName;
      if (customDisplayName && customDisplayName.trim() && customDisplayName !== data.displayName) {
        resolvedName = customDisplayName.trim();
        needsUpdate = true;
      }
      if (initialClassCode && initialClassCode !== data.classCode) {
        data.classCode = initialClassCode;
        needsUpdate = true;
      }

      // If date changed, reset today's daily exercise counter
      if (data.lastExerciseDate !== today) {
        const updatedProfile: StudentProfile = {
          ...data,
          displayName: resolvedName,
          dailyExercisesDone: 0,
          lastExerciseDate: today,
          updatedAt: new Date().toISOString()
        };
        await setDoc(userDocRef, updatedProfile, { merge: true });
        await syncStudentToLeaderboard(updatedProfile);
        return updatedProfile;
      }

      if (needsUpdate) {
        const updatedProfile: StudentProfile = {
          ...data,
          displayName: resolvedName,
          updatedAt: new Date().toISOString()
        };
        await setDoc(userDocRef, updatedProfile, { merge: true });
        await syncStudentToLeaderboard(updatedProfile);
        return updatedProfile;
      }

      return data;
    }

    // New student profile
    const finalName = customDisplayName?.trim() || user.displayName?.trim() || (user.isAnonymous ? 'תלמיד/ה' : user.email?.split('@')[0] || 'תלמיד/ה');
    const newProfile: StudentProfile = {
      uid: user.uid,
      displayName: finalName,
      email: user.email || (user.isAnonymous ? 'כניסת תלמיד (ללא מייל)' : ''),
      photoURL: user.photoURL || '',
      classCode: initialClassCode,
      grade: initialClassCode.includes('ה') ? '5th' : '4th',
      xp: initialXp,
      streak: initialStreak,
      dailyExercisesDone: initialDailyDone,
      dailyGoal: 10,
      lastExerciseDate: today,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await setDoc(userDocRef, newProfile);

    // Sync to classroom leaderboard immediately
    await syncStudentToLeaderboard(newProfile);

    return newProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userDocPath);
  }
}


// Save updated student profile and leaderboard entry
export async function saveStudentProfile(profile: StudentProfile): Promise<void> {
  const userDocPath = `users/${profile.uid}`;
  const userDocRef = doc(db, 'users', profile.uid);

  try {
    const updated = {
      ...profile,
      updatedAt: new Date().toISOString()
    };
    await setDoc(userDocRef, updated, { merge: true });
    await syncStudentToLeaderboard(updated);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, userDocPath);
  }
}

// Sync public student score to the classroom's leaderboard subcollection
export async function syncStudentToLeaderboard(profile: StudentProfile): Promise<void> {
  // Normalize classCode for Firestore document ID safety (alphanumeric, hyphens, underscores)
  const safeClassCode = encodeURIComponent(profile.classCode.replace(/\s+/g, '-')).replace(/%/g, '_');
  const path = `classrooms/${safeClassCode}/students/${profile.uid}`;
  const studentScoreRef = doc(db, 'classrooms', safeClassCode, 'students', profile.uid);

  const payload: ClassroomScoreEntry = {
    studentId: profile.uid,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '',
    classCode: safeClassCode,
    xp: profile.xp,
    streak: profile.streak,
    dailyExercisesDone: profile.dailyExercisesDone,
    updatedAt: new Date().toISOString()
  };

  try {
    await setDoc(studentScoreRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Real-time listener for classroom leaderboard scores
export function subscribeToClassroomScores(
  classCode: string,
  onUpdate: (scores: ClassroomScoreEntry[]) => void,
  onError?: (err: unknown) => void
) {
  const safeClassCode = encodeURIComponent(classCode.replace(/\s+/g, '-')).replace(/%/g, '_');
  const collectionPath = `classrooms/${safeClassCode}/students`;
  const studentsColRef = collection(db, 'classrooms', safeClassCode, 'students');

  return onSnapshot(
    query(studentsColRef),
    (snapshot) => {
      const scores: ClassroomScoreEntry[] = [];
      snapshot.forEach((d) => {
        scores.push(d.data() as ClassroomScoreEntry);
      });
      onUpdate(scores);
    },
    (error) => {
      console.error(`Leaderboard onSnapshot error on ${collectionPath}:`, error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, collectionPath);
    }
  );
}
