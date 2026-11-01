import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  auth, 
  loginWithGoogle, 
  loginWithAnonymousStudent,
  loginWithEmail,
  registerWithEmail,
  logoutUser, 
  getOrCreateStudentProfile, 
  saveStudentProfile, 
  StudentProfile,
  getTodayDateString
} from '../services/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  profile: StudentProfile | null;
  isLoading: boolean;
  isSyncing: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  signIn: () => Promise<void>;
  signInStudentByName: (name: string, classCode: string) => Promise<void>;
  signInWithEmailPassword: (email: string, pass: string) => Promise<void>;
  registerWithEmailPassword: (email: string, pass: string, name: string, classCode: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateClassCode: (newClassCode: string) => Promise<void>;
  updateDailyGoal: (newGoal: number) => Promise<void>;
  updateDisplayName: (newName: string) => Promise<void>;
  recordExerciseReward: (earnedXp: number) => Promise<{ newXp: number; newDone: number; newStreak: number }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Sync auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          // Read local storage initial values if available to bootstrap seamlessly
          const localXp = parseInt(localStorage.getItem('sababa_xp') || '480', 10);
          const localStreak = parseInt(localStorage.getItem('sababa_streak') || '5', 10);
          const localDone = parseInt(localStorage.getItem('sababa_exercises_today') || '7', 10);
          const localClass = localStorage.getItem('sababa_class_code') || 'ד׳2';
          const savedName = localStorage.getItem('sababa_student_name') || undefined;

          const studentProf = await getOrCreateStudentProfile(
            firebaseUser,
            localClass,
            localXp,
            localStreak,
            localDone,
            savedName
          );
          setProfile(studentProf);
        } catch (err) {
          console.error('Failed to load student profile from Firestore:', err);
        }
      } else {
        // Check if there is an active offline/guest student profile
        const guestName = localStorage.getItem('sababa_guest_student_name');
        if (guestName) {
          const localClass = localStorage.getItem('sababa_class_code') || 'ד׳2';
          const localXp = parseInt(localStorage.getItem('sababa_xp') || '480', 10);
          const localStreak = parseInt(localStorage.getItem('sababa_streak') || '5', 10);
          const localDone = parseInt(localStorage.getItem('sababa_exercises_today') || '7', 10);
          setProfile({
            uid: 'guest-' + guestName,
            displayName: guestName,
            email: 'כניסת תלמיד (מקומי)',
            classCode: localClass,
            grade: localClass.includes('ה') ? '5th' : '4th',
            xp: localXp,
            streak: localStreak,
            dailyExercisesDone: localDone,
            dailyGoal: 10,
            lastExerciseDate: getTodayDateString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        } else {
          setUser(null);
          setProfile(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    setIsSyncing(true);
    try {
      const fbUser = await loginWithGoogle();
      setUser(fbUser);
      const studentProf = await getOrCreateStudentProfile(fbUser);
      setProfile(studentProf);
      setIsAuthModalOpen(false);
    } catch (err) {
      console.error('Sign-in error:', err);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const signInStudentByName = async (name: string, classCode: string) => {
    setIsSyncing(true);
    const cleanName = name.trim();
    localStorage.setItem('sababa_student_name', cleanName);
    localStorage.setItem('sababa_class_code', classCode);
    const localXp = parseInt(localStorage.getItem('sababa_xp') || '480', 10);
    const localStreak = parseInt(localStorage.getItem('sababa_streak') || '5', 10);
    const localDone = parseInt(localStorage.getItem('sababa_exercises_today') || '7', 10);

    try {
      const fbUser = await loginWithAnonymousStudent(cleanName);
      setUser(fbUser);
      const studentProf = await getOrCreateStudentProfile(
        fbUser,
        classCode,
        localXp,
        localStreak,
        localDone,
        cleanName
      );
      setProfile(studentProf);
      setIsAuthModalOpen(false);
    } catch (err: unknown) {
      console.warn('Anonymous login error, falling back to local student profile:', err);
      // Fallback to local student profile so the student is never blocked
      localStorage.setItem('sababa_guest_student_name', cleanName);
      const guestProfile: StudentProfile = {
        uid: 'student-' + cleanName.replace(/\s+/g, '-'),
        displayName: cleanName,
        email: 'כניסת תלמיד',
        classCode,
        grade: classCode.includes('ה') ? '5th' : '4th',
        xp: localXp,
        streak: localStreak,
        dailyExercisesDone: localDone,
        dailyGoal: 10,
        lastExerciseDate: getTodayDateString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProfile(guestProfile);
      setIsAuthModalOpen(false);
    } finally {
      setIsSyncing(false);
    }
  };

  const signInWithEmailPassword = async (email: string, pass: string) => {
    setIsSyncing(true);
    try {
      const fbUser = await loginWithEmail(email, pass);
      setUser(fbUser);
      const studentProf = await getOrCreateStudentProfile(fbUser);
      setProfile(studentProf);
      setIsAuthModalOpen(false);
    } catch (err) {
      console.error('Email sign in error:', err);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const registerWithEmailPassword = async (email: string, pass: string, name: string, classCode: string) => {
    setIsSyncing(true);
    try {
      const fbUser = await registerWithEmail(email, pass, name);
      setUser(fbUser);
      const localXp = parseInt(localStorage.getItem('sababa_xp') || '480', 10);
      const localStreak = parseInt(localStorage.getItem('sababa_streak') || '5', 10);
      const localDone = parseInt(localStorage.getItem('sababa_exercises_today') || '7', 10);
      const studentProf = await getOrCreateStudentProfile(
        fbUser,
        classCode,
        localXp,
        localStreak,
        localDone,
        name
      );
      setProfile(studentProf);
      setIsAuthModalOpen(false);
    } catch (err) {
      console.error('Email registration error:', err);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const signOut = async () => {
    setIsSyncing(true);
    try {
      localStorage.removeItem('sababa_guest_student_name');
      await logoutUser();
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error('Sign-out error:', err);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const updateClassCode = async (newClassCode: string) => {
    if (!profile) {
      localStorage.setItem('sababa_class_code', newClassCode);
      return;
    }
    const updated: StudentProfile = {
      ...profile,
      classCode: newClassCode,
      grade: newClassCode.includes('ה') ? '5th' : '4th'
    };
    setProfile(updated);
    setIsSyncing(true);
    try {
      await saveStudentProfile(updated);
      localStorage.setItem('sababa_class_code', newClassCode);
    } finally {
      setIsSyncing(false);
    }
  };

  const updateDailyGoal = async (newGoal: number) => {
    if (!profile) return;
    const updated: StudentProfile = {
      ...profile,
      dailyGoal: newGoal
    };
    setProfile(updated);
    setIsSyncing(true);
    try {
      await saveStudentProfile(updated);
    } finally {
      setIsSyncing(false);
    }
  };

  const updateDisplayName = async (newName: string) => {
    if (!profile) return;
    const updated: StudentProfile = {
      ...profile,
      displayName: newName
    };
    setProfile(updated);
    setIsSyncing(true);
    try {
      await saveStudentProfile(updated);
    } finally {
      setIsSyncing(false);
    }
  };

  const recordExerciseReward = async (earnedXp: number): Promise<{ newXp: number; newDone: number; newStreak: number }> => {
    const today = getTodayDateString();

    if (!profile) {
      // Offline / guest local calculation
      const curXp = parseInt(localStorage.getItem('sababa_xp') || '480', 10) + earnedXp;
      const curDone = parseInt(localStorage.getItem('sababa_exercises_today') || '7', 10) + 1;
      const curStreak = parseInt(localStorage.getItem('sababa_streak') || '5', 10);
      localStorage.setItem('sababa_xp', String(curXp));
      localStorage.setItem('sababa_exercises_today', String(curDone));
      return { newXp: curXp, newDone: curDone, newStreak: curStreak };
    }

    const isNewDay = profile.lastExerciseDate !== today;
    const updatedDone = isNewDay ? 1 : profile.dailyExercisesDone + 1;
    const updatedXp = profile.xp + earnedXp;
    const updatedStreak = isNewDay ? profile.streak + 1 : profile.streak;

    const updatedProfile: StudentProfile = {
      ...profile,
      xp: updatedXp,
      streak: updatedStreak,
      dailyExercisesDone: updatedDone,
      lastExerciseDate: today
    };

    setProfile(updatedProfile);

    // Save to Firestore in background without blocking UI
    saveStudentProfile(updatedProfile).catch((err) => {
      console.warn('Background sync to Firestore failed:', err);
    });

    return { newXp: updatedXp, newDone: updatedDone, newStreak: updatedStreak };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isSyncing,
        isAuthModalOpen,
        setIsAuthModalOpen,
        signIn,
        signInStudentByName,
        signInWithEmailPassword,
        registerWithEmailPassword,
        signOut,
        updateClassCode,
        updateDailyGoal,
        updateDisplayName,
        recordExerciseReward
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
