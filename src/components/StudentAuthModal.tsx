import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CloudCheck, 
  ShieldCheck, 
  LogOut, 
  GraduationCap, 
  Users, 
  Trophy, 
  Flame, 
  Check, 
  User,
  Mail,
  Lock,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_CLASSES = [
  { id: 'ד׳1', label: 'כיתה ד׳1', grade: '4th' },
  { id: 'ד׳2', label: 'כיתה ד׳2', grade: '4th' },
  { id: 'ד׳3', label: 'כיתה ד׳3', grade: '4th' },
  { id: 'ה׳1', label: 'כיתה ה׳1', grade: '5th' },
  { id: 'ה׳2', label: 'כיתה ה׳2', grade: '5th' },
  { id: 'ה׳3', label: 'כיתה ה׳3', grade: '5th' },
];

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({ isOpen, onClose }) => {
  const { 
    user, 
    profile, 
    signIn, 
    signInStudentByName,
    signInWithEmailPassword,
    registerWithEmailPassword,
    signOut, 
    updateClassCode, 
    updateDisplayName, 
    isSyncing 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'student' | 'google' | 'email'>('student');
  const [selectedClass, setSelectedClass] = useState<string>(profile?.classCode || 'ד׳2');
  
  // Student quick login state
  const [studentNameInput, setStudentNameInput] = useState<string>('');
  
  // Email & Password login state
  const [emailMode, setEmailMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [emailStudentName, setEmailStudentName] = useState<string>('');

  // Editing profile name
  const [customName, setCustomName] = useState<string>(profile?.displayName || '');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Quick Student Name Login (No Email)
  const handleStudentNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!studentNameInput.trim()) {
      setAuthError('אנא הקלידו את שמכם כדי להיכנס.');
      return;
    }
    try {
      await signInStudentByName(studentNameInput.trim(), selectedClass);
    } catch (err: unknown) {
      const errObj = err as { code?: string; message?: string };
      setAuthError(errObj?.message || 'אירעה שגיאה בכניסת תלמיד. אנא נסו שוב.');
    }
  };

  // 2. Google Sign-In
  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await signIn();
    } catch (err: unknown) {
      const errObj = err as { code?: string; message?: string };
      const code = errObj?.code || '';
      const msg = errObj?.message || '';

      if (code === 'auth/unauthorized-domain' || msg.includes('unauthorized-domain')) {
        setAuthError('דומיין זה טרם הוגדר ב-Firebase Console: יש להוסיף את הכתובת של Vercel תחת Firebase Console > Authentication > Settings > Authorized domains.');
      } else if (code === 'auth/popup-closed-by-user' || msg.includes('popup-closed-by-user')) {
        setAuthError('חלון ההתחברות נסגר על ידי המשתמש. אנא נסו שוב.');
      } else {
        setAuthError(`אירעה שגיאה בהתחברות Google: ${msg || 'אנא נסו שוב.'}`);
      }
    }
  };

  // 3. Email & Password Sign-In / Register
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!emailInput.trim() || !passwordInput) {
      setAuthError('אנא מלאו אימייל וסיסמה.');
      return;
    }
    try {
      if (emailMode === 'register') {
        if (!emailStudentName.trim()) {
          setAuthError('אנא מלאו שם תלמיד/ה להרשמה.');
          return;
        }
        await registerWithEmailPassword(emailInput.trim(), passwordInput, emailStudentName.trim(), selectedClass);
      } else {
        await signInWithEmailPassword(emailInput.trim(), passwordInput);
      }
    } catch (err: unknown) {
      const errObj = err as { code?: string; message?: string };
      const code = errObj?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setAuthError('פרטי ההתחברות שגויים. בדקו את האימייל והסיסמה.');
      } else if (code === 'auth/email-already-in-use') {
        setAuthError('אימייל זה כבר רשום במערכת. אנא התחברו או השתמשו באימייל אחר.');
      } else if (code === 'auth/weak-password') {
        setAuthError('הסיסמה קצרה מדי (מינימום 6 תווים).');
      } else {
        setAuthError(`שגיאה בהתחברות: ${errObj?.message || 'אנא נסו שוב.'}`);
      }
    }
  };

  const handleSelectClass = async (classId: string) => {
    setSelectedClass(classId);
    if (profile) {
      await updateClassCode(classId);
    }
  };

  const handleSaveName = async () => {
    if (customName.trim()) {
      await updateDisplayName(customName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right"
        dir="rtl"
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 text-white p-6 pb-6">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="סגור"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">
                  {profile ? 'פרופיל תלמיד/ה פעיל' : 'התחברות תלמידי כיתה'}
                </h2>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md uppercase font-mono">
                  Firebase Cloud
                </span>
              </div>
              <p className="text-xs text-sky-100 mt-1">
                סנכרון יעד תרגילים יומי ולוח מובילים כיתתי בזמן אמת
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {authError && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold leading-relaxed">
              {authError}
            </div>
          )}

          {profile ? (
            /* Signed In State */
            <div className="space-y-5">
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-sky-50/70 border border-indigo-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {profile.photoURL ? (
                    <img 
                      src={profile.photoURL} 
                      alt={profile.displayName} 
                      className="w-13 h-13 rounded-2xl border-2 border-indigo-300 shadow-xs object-cover"
                    />
                  ) : (
                    <div className="w-13 h-13 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-xs">
                      {profile.displayName.charAt(0) || '🎓'}
                    </div>
                  )}

                  <div>
                    {isEditingName ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          className="text-xs font-bold bg-white border border-indigo-300 rounded-lg px-2 py-1 outline-none"
                          maxLength={30}
                        />
                        <button
                          onClick={handleSaveName}
                          className="px-2 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                        >
                          שמור
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-black text-slate-900">
                          {profile.displayName}
                        </span>
                        <button 
                          onClick={() => {
                            setCustomName(profile.displayName);
                            setIsEditingName(true);
                          }}
                          className="text-[11px] text-indigo-600 hover:underline font-medium cursor-pointer"
                        >
                          (ערוך)
                        </button>
                      </div>
                    )}
                    <span className="text-xs text-slate-500 block truncate max-w-[200px]">
                      {profile.email}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        <CloudCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>מסונכרן ב-Firebase</span>
                      </span>
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md font-hebrew">
                        {profile.classCode}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={signOut}
                  disabled={isSyncing}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-rose-700 bg-white hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  title="התנתקות"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">התנתק</span>
                </button>
              </div>

              {/* Real-time stats summary */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-600 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold font-hebrew">סך ניקוד</span>
                  </div>
                  <span className="text-lg font-black font-mono text-amber-900">
                    {profile.xp} XP
                  </span>
                </div>

                <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-600 mb-0.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold font-hebrew">רצף פעיל</span>
                  </div>
                  <span className="text-lg font-black font-mono text-orange-900">
                    {profile.streak} ימים
                  </span>
                </div>

                <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 text-center">
                  <div className="flex items-center justify-center gap-1 text-sky-600 mb-0.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold font-hebrew">היום הושלמו</span>
                  </div>
                  <span className="text-lg font-black font-mono text-sky-900">
                    {profile.dailyExercisesDone}/{profile.dailyGoal}
                  </span>
                </div>
              </div>

              {/* Classroom Assignment Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>שיוך כיתתי ללוח המובילים (Classroom Leaderboard):</span>
                  </label>
                  <span className="text-[11px] text-slate-400">בחר את כיתתך</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_CLASSES.map((cls) => {
                    const isSelected = (profile.classCode === cls.id) || (selectedClass === cls.id);
                    return (
                      <button
                        key={cls.id}
                        onClick={() => handleSelectClass(cls.id)}
                        disabled={isSyncing}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30'
                            : 'bg-slate-50 hover:bg-indigo-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {cls.label}
                        {isSelected && <Check className="w-3 h-3 mx-auto mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Logged Out / Sign-In Tabs */
            <div className="space-y-4">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setActiveTab('student'); setAuthError(null); }}
                  className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'student'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  <span>שם וכיתה (ללא מייל)</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('google'); setAuthError(null); }}
                  className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'google'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('email'); setAuthError(null); }}
                  className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'email'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>אימייל וסיסמה</span>
                </button>
              </div>

              {/* TAB 1: Quick Student Name Login (No Email required) */}
              {activeTab === 'student' && (
                <form onSubmit={handleStudentNameSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                    <span className="text-base">🎒</span>
                    <p className="leading-relaxed">
                      <strong>כניסה ישירה לילדים:</strong> אין צורך בחשבון גוגל או אימייל! פשוט הקלידו את השם, בחרו כיתה, והתחילו לתרגל ולצבור ניקוד בלוח המובילים.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      שם התלמיד / תלמידה:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={studentNameInput}
                        onChange={(e) => setStudentNameInput(e.target.value)}
                        placeholder="למשל: יונתן א., נועה כהן, איתי..."
                        maxLength={30}
                        required
                        className="w-full py-2.5 px-3.5 pr-10 text-sm bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-800"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Class Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      בחירת כיתה:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {PRESET_CLASSES.map((cls) => {
                        const isSelected = selectedClass === cls.id;
                        return (
                          <button
                            key={cls.id}
                            type="button"
                            onClick={() => setSelectedClass(cls.id)}
                            className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {cls.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>היכנס והתחל לתרגל!</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </form>
              )}

              {/* TAB 2: Google Sign-In */}
              {activeTab === 'google' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-start gap-2.5">
                    <span className="text-base">⚡</span>
                    <p className="leading-relaxed">
                      התחברות מהירה בלחיצה אחת עם חשבון Google של התלמיד, ההורים או המורה.
                    </p>
                  </div>

                  {/* Class selector prior to Google login */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      בחר כיתה לשיוך:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {PRESET_CLASSES.map((cls) => (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => setSelectedClass(cls.id)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedClass === cls.id
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {cls.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isSyncing}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-300 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>התחברות מהירה עם חשבון Google</span>
                  </button>
                </div>
              )}

              {/* TAB 3: Any Email & Password */}
              {activeTab === 'email' && (
                <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">
                      {emailMode === 'login' ? 'התחברות באמצעות אימייל:' : 'פתיחת חשבון אימייל חדש:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEmailMode(emailMode === 'login' ? 'register' : 'login')}
                      className="text-indigo-600 font-bold hover:underline cursor-pointer"
                    >
                      {emailMode === 'login' ? 'אין חשבון? הירשם כאן' : 'כבר רשום? התחבר כאן'}
                    </button>
                  </div>

                  {emailMode === 'register' && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">שם התלמיד/ה:</label>
                      <input
                        type="text"
                        value={emailStudentName}
                        onChange={(e) => setEmailStudentName(e.target.value)}
                        placeholder="שם מלא"
                        required
                        className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-600"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">כתובת אימייל:</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="student@school.edu / student@gmail.com"
                        required
                        className="w-full py-2 px-3 pr-8 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-600"
                        dir="ltr"
                      />
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">סיסמה:</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="לפחות 6 תווים"
                        required
                        minLength={6}
                        className="w-full py-2 px-3 pr-8 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-600"
                        dir="ltr"
                      />
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                    </div>
                  </div>

                  {emailMode === 'register' && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">בחר כיתה:</label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                        {PRESET_CLASSES.map((cls) => (
                          <button
                            key={cls.id}
                            type="button"
                            onClick={() => setSelectedClass(cls.id)}
                            className={`py-1.5 px-1 text-center rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              selectedClass === cls.id
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {cls.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {emailMode === 'login' ? 'התחבר עם אימייל' : 'הרשם וצור חשבון'}
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>הגנה על פרטיות תלמידים לפי הנחיות משרד החינוך</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Firestore Database מחובר</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-200/70 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};
