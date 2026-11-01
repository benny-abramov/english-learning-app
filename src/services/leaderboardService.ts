export interface ClassmateProfile {
  id: string;
  nameHe: string;
  nameEn: string;
  avatarEmoji: string;
  avatarBg: string;
  textColor: string;
  grade: '4th' | '5th';
  className: string; // e.g. "ד׳2", "ד׳1", "ד׳3"
  baseXp: number;
  weeklyXp: number;
  streakDays: number;
  favoriteSkillHe: string;
  favoriteSkillEn: string;
  recentBadgeHe: string;
  isCurrentUser?: boolean;
}

export interface RankedLeaderboardEntry extends ClassmateProfile {
  rank: number;
  displayedXp: number;
  isCurrentUser: boolean;
}

export interface LeaderboardStats {
  currentUserRank: number;
  totalStudents: number;
  userRankPercentile: number; // e.g. top 15%
  nextRankProfile?: RankedLeaderboardEntry;
  pointsToNextRank: number;
  prevRankProfile?: RankedLeaderboardEntry;
  pointsAheadOfPrev: number;
  classAverageXp: number;
  podium: {
    first: RankedLeaderboardEntry;
    second?: RankedLeaderboardEntry;
    third?: RankedLeaderboardEntry;
  };
  entries: RankedLeaderboardEntry[];
  motivationQuoteHe: string;
}

// Authentic Israeli 4th and 5th grade classmates (generic mock data)
export const MOCK_CLASSMATES: ClassmateProfile[] = [
  {
    id: 'cm-maya',
    nameHe: 'מאיה כהן',
    nameEn: 'Maya Cohen',
    avatarEmoji: '🦊',
    avatarBg: 'bg-amber-100 border-amber-300 text-amber-800',
    textColor: 'text-amber-800',
    grade: '4th',
    className: 'ד׳2',
    baseXp: 620,
    weeklyXp: 180,
    streakDays: 8,
    favoriteSkillHe: 'פונטיקה (P vs F)',
    favoriteSkillEn: 'Phonics Master',
    recentBadgeHe: 'אוזן מוזיקלית 🎵'
  },
  {
    id: 'cm-daniel',
    nameHe: 'דניאל מזרחי',
    nameEn: 'Daniel Mizrahi',
    avatarEmoji: '🚀',
    avatarBg: 'bg-sky-100 border-sky-300 text-sky-800',
    textColor: 'text-sky-800',
    grade: '4th',
    className: 'ד׳2',
    baseXp: 540,
    weeklyXp: 150,
    streakDays: 6,
    favoriteSkillHe: 'פועל עזר (To Be)',
    favoriteSkillEn: 'Verb Mechanic',
    recentBadgeHe: 'מבריג הפעלים 🔧'
  },
  {
    id: 'cm-noa',
    nameHe: 'נועה פרץ',
    nameEn: 'Noa Peretz',
    avatarEmoji: '🦄',
    avatarBg: 'bg-purple-100 border-purple-300 text-purple-800',
    textColor: 'text-purple-800',
    grade: '4th',
    className: 'ד׳2',
    baseXp: 490,
    weeklyXp: 130,
    streakDays: 5,
    favoriteSkillHe: 'בנאי משפטים',
    favoriteSkillEn: 'Sentence Builder',
    recentBadgeHe: 'אדריכלית משפטים 🏛️'
  },
  {
    id: 'cm-itay',
    nameHe: 'איתי לוי',
    nameEn: 'Itay Levi',
    avatarEmoji: '🦁',
    avatarBg: 'bg-orange-100 border-orange-300 text-orange-800',
    textColor: 'text-orange-800',
    grade: '4th',
    className: 'ד׳2',
    baseXp: 440,
    weeklyXp: 110,
    streakDays: 4,
    favoriteSkillHe: 'סיומות (Suffixes)',
    favoriteSkillEn: 'Suffix Collector',
    recentBadgeHe: 'מגנט הסיומות 🧲'
  },
  {
    id: 'cm-omer',
    nameHe: 'עומר ביטון',
    nameEn: 'Omer Bitton',
    avatarEmoji: '🦉',
    avatarBg: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    textColor: 'text-emerald-800',
    grade: '4th',
    className: 'ד׳2',
    baseXp: 390,
    weeklyXp: 95,
    streakDays: 4,
    favoriteSkillHe: 'אוצר מילים Band I',
    favoriteSkillEn: 'Vocabulary Ace',
    recentBadgeHe: 'מילון מהלך 📖'
  },
  {
    id: 'cm-tamar',
    nameHe: 'תמר אברהם',
    nameEn: 'Tamar Avraham',
    avatarEmoji: '🐬',
    avatarBg: 'bg-cyan-100 border-cyan-300 text-cyan-800',
    textColor: 'text-cyan-800',
    grade: '4th',
    className: 'ד׳2',
    baseXp: 350,
    weeklyXp: 85,
    streakDays: 3,
    favoriteSkillHe: 'הבדלי B ו-P',
    favoriteSkillEn: 'Sound Explorer',
    recentBadgeHe: 'אוזן של שפן 🐰'
  },
  {
    id: 'cm-liam',
    nameHe: 'ליאם חדד',
    nameEn: 'Liam Hadad',
    avatarEmoji: '🐼',
    avatarBg: 'bg-rose-100 border-rose-300 text-rose-800',
    textColor: 'text-rose-800',
    grade: '4th',
    className: 'ד׳2',
    baseXp: 290,
    weeklyXp: 60,
    streakDays: 2,
    favoriteSkillHe: 'משפטי שאלה (Wh-)',
    favoriteSkillEn: 'Question Whiz',
    recentBadgeHe: 'הבלש הסקרן 🔍'
  },
  {
    id: 'cm-shira',
    nameHe: 'שירה דוד',
    nameEn: 'Shira David',
    avatarEmoji: '🌟',
    avatarBg: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    textColor: 'text-yellow-800',
    grade: '4th',
    className: 'ד׳2',
    baseXp: 250,
    weeklyXp: 50,
    streakDays: 2,
    favoriteSkillHe: 'כינויי גוף (Pronouns)',
    favoriteSkillEn: 'Grammar Scout',
    recentBadgeHe: 'כוכבת מתחילה ⭐'
  },

  // Parallel 4th Grade Classmates (ד׳1 & ד׳3 for Grade-Level leaderboard scope)
  {
    id: 'cm-yonatan',
    nameHe: 'יונתן שטרן',
    nameEn: 'Yonatan Stern',
    avatarEmoji: '🐯',
    avatarBg: 'bg-amber-100 border-amber-300 text-amber-800',
    textColor: 'text-amber-800',
    grade: '4th',
    className: 'ד׳1',
    baseXp: 680,
    weeklyXp: 210,
    streakDays: 9,
    favoriteSkillHe: 'טכנאי פועל עזר',
    favoriteSkillEn: 'Grammar Champ',
    recentBadgeHe: 'קפטן אנגלית 🎖️'
  },
  {
    id: 'cm-roni',
    nameHe: 'רוני ברקוביץ׳',
    nameEn: 'Roni Berkovich',
    avatarEmoji: '🐨',
    avatarBg: 'bg-teal-100 border-teal-300 text-teal-800',
    textColor: 'text-teal-800',
    grade: '4th',
    className: 'ד׳1',
    baseXp: 580,
    weeklyXp: 160,
    streakDays: 7,
    favoriteSkillHe: 'אוצר מילים Band I',
    favoriteSkillEn: 'Word Builder',
    recentBadgeHe: 'אוצר בלום 💎'
  },
  {
    id: 'cm-adam',
    nameHe: 'אדם אזולאי',
    nameEn: 'Adam Azoulay',
    avatarEmoji: '🦅',
    avatarBg: 'bg-blue-100 border-blue-300 text-blue-800',
    textColor: 'text-blue-800',
    grade: '4th',
    className: 'ד׳3',
    baseXp: 510,
    weeklyXp: 140,
    streakDays: 5,
    favoriteSkillHe: 'בנאי משפטים',
    favoriteSkillEn: 'Sentence Ace',
    recentBadgeHe: 'שף המשפטים 🍲'
  },
  {
    id: 'cm-yasmin',
    nameHe: 'יסמין קליין',
    nameEn: 'Yasmin Klein',
    avatarEmoji: '🦩',
    avatarBg: 'bg-pink-100 border-pink-300 text-pink-800',
    textColor: 'text-pink-800',
    grade: '4th',
    className: 'ד׳3',
    baseXp: 460,
    weeklyXp: 125,
    streakDays: 5,
    favoriteSkillHe: 'פונטיקה (P vs F)',
    favoriteSkillEn: 'Phonics Pro',
    recentBadgeHe: 'זמרת הצלילים 🎤'
  },
  {
    id: 'cm-lavi',
    nameHe: 'לביא גבאי',
    nameEn: 'Lavi Gabay',
    avatarEmoji: '🐺',
    avatarBg: 'bg-slate-100 border-slate-300 text-slate-800',
    textColor: 'text-slate-800',
    grade: '4th',
    className: 'ד׳1',
    baseXp: 330,
    weeklyXp: 75,
    streakDays: 3,
    favoriteSkillHe: 'סיומות (Suffixes)',
    favoriteSkillEn: 'Suffix Hunter',
    recentBadgeHe: 'מגלה ארצות 🧭'
  }
];

export interface LeaderboardQueryOptions {
  scope: 'class' | 'grade';
  timeframe: 'weekly' | 'allTime';
  studentNameHe?: string;
  studentClassName?: string;
  currentUserId?: string;
  avatarPhotoUrl?: string;
  liveScores?: Array<{
    studentId: string;
    displayName: string;
    photoURL?: string;
    classCode: string;
    xp: number;
    streak: number;
    dailyExercisesDone: number;
  }>;
}

/**
 * Computes ranked leaderboard integrating the active student's live XP and live classmates from Firestore
 */
export function getRankedLeaderboard(
  currentUserXp: number,
  currentUserStreak: number,
  options: LeaderboardQueryOptions = { scope: 'class', timeframe: 'weekly' }
): LeaderboardStats {
  const currentClassName = options.studentClassName || 'ד׳2';
  const currentStudentName = options.studentNameHe || 'אני (אתה)';
  const currentUserId = options.currentUserId || 'cm-current-user';

  // Approximate user's weekly XP proportion based on streak and total XP
  const userWeeklyXp = Math.round(currentUserXp * 0.35) + (currentUserStreak * 10);

  // Current user's live profile
  const userProfile: ClassmateProfile = {
    id: currentUserId,
    nameHe: currentStudentName,
    nameEn: 'You (Student)',
    avatarEmoji: options.avatarPhotoUrl ? '👤' : '⚡',
    avatarBg: 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400',
    textColor: 'text-indigo-900',
    grade: currentClassName.includes('ה') ? '5th' : '4th',
    className: currentClassName,
    baseXp: currentUserXp,
    weeklyXp: userWeeklyXp,
    streakDays: currentUserStreak,
    favoriteSkillHe: 'כל המודולים',
    favoriteSkillEn: 'All-Rounder',
    recentBadgeHe: 'אלופ/ת הכיתה 🏆',
    isCurrentUser: true
  };

  // Convert live Firestore classmate scores
  const liveClassmates: ClassmateProfile[] = (options.liveScores || [])
    .filter(ls => ls.studentId !== currentUserId)
    .map((ls, idx) => {
      const emojis = ['🌟', '🦁', '🦉', '🚀', '🦄', '🐬', '🐼', '🦊'];
      const bgColors = [
        'bg-amber-100 border-amber-300 text-amber-800',
        'bg-sky-100 border-sky-300 text-sky-800',
        'bg-purple-100 border-purple-300 text-purple-800',
        'bg-emerald-100 border-emerald-300 text-emerald-800'
      ];
      return {
        id: ls.studentId,
        nameHe: ls.displayName,
        nameEn: ls.displayName,
        avatarEmoji: emojis[idx % emojis.length],
        avatarBg: bgColors[idx % bgColors.length],
        textColor: 'text-slate-800',
        grade: (ls.classCode.includes('ה') ? '5th' : '4th') as '4th' | '5th',
        className: ls.classCode.replace(/_/g, ' '),
        baseXp: ls.xp,
        weeklyXp: Math.round(ls.xp * 0.35) + (ls.streak * 10),
        streakDays: ls.streak,
        favoriteSkillHe: 'אוצר מילים',
        favoriteSkillEn: 'Vocabulary Ace',
        recentBadgeHe: 'שותף כיתתי ⚡',
        isCurrentUser: false
      };
    });

  // 1. Filter default classmates according to selected scope
  let candidates = MOCK_CLASSMATES.filter(cm => {
    if (options.scope === 'class') {
      return cm.className === currentClassName;
    }
    return true; // entire grade
  });

  // Filter out any default mock entries whose names match live ones
  const liveNames = new Set(liveClassmates.map(l => l.nameHe.toLowerCase()));
  candidates = candidates.filter(c => !liveNames.has(c.nameHe.toLowerCase()));

  // Combine live classmates + user + fallback candidates
  const allProfiles = [...liveClassmates, ...candidates, userProfile];

  // 2. Map displayed XP according to timeframe and sort descending
  const sorted = allProfiles
    .map(p => {
      const displayedXp = options.timeframe === 'weekly' ? p.weeklyXp : p.baseXp;
      return {
        ...p,
        displayedXp,
        isCurrentUser: p.id === 'cm-current-user'
      };
    })
    .sort((a, b) => b.displayedXp - a.displayedXp);

  // 3. Assign 1-indexed ranks (handling ties appropriately)
  let currentRank = 1;
  const entries: RankedLeaderboardEntry[] = sorted.map((item, idx) => {
    if (idx > 0 && item.displayedXp < sorted[idx - 1].displayedXp) {
      currentRank = idx + 1;
    }
    return {
      ...item,
      rank: currentRank
    };
  });

  // Find user's entry and neighbours
  const userIndex = entries.findIndex(e => e.isCurrentUser);
  const currentUserEntry = entries[userIndex] || entries[0];
  const userRank = currentUserEntry.rank;

  // Next rank ahead (e.g. rank 2 if user is rank 3)
  const nextRankProfile = userIndex > 0 ? entries[userIndex - 1] : undefined;
  const pointsToNextRank = nextRankProfile
    ? Math.max(5, nextRankProfile.displayedXp - currentUserEntry.displayedXp + 5)
    : 0;

  // Rank behind (e.g. rank 4 if user is rank 3)
  const prevRankProfile = userIndex < entries.length - 1 ? entries[userIndex + 1] : undefined;
  const pointsAheadOfPrev = prevRankProfile
    ? currentUserEntry.displayedXp - prevRankProfile.displayedXp
    : 0;

  // Class stats
  const totalStudents = entries.length;
  const sumXp = entries.reduce((acc, curr) => acc + curr.displayedXp, 0);
  const classAverageXp = Math.round(sumXp / totalStudents);
  const userRankPercentile = Math.max(1, Math.round(((totalStudents - userRank + 1) / totalStudents) * 100));

  // Motivational quote tailored to user's rank
  let motivationQuoteHe = 'יופי של השקעה! המשך לתרגל כדי לטפס לראש הטבלה!';
  if (userRank === 1) {
    motivationQuoteHe = '🥇 מדהים! אתה במקום ה-1 בטבלה! שמור על המקום הראשון על ידי תרגול יומי!';
  } else if (userRank === 2) {
    motivationQuoteHe = `🥈 כמעט בפסגה! עוד ${pointsToNextRank} XP בלבד כדי לעקוף את ${nextRankProfile?.nameHe} ולכבוש את המקום הראשון!`;
  } else if (userRank === 3) {
    motivationQuoteHe = `🥉 כל הכבוד! אתה על הפודיום במקום ה-3! רק עוד ${pointsToNextRank} XP למקום השני!`;
  } else if (userRank <= 5) {
    motivationQuoteHe = `🌟 אתה בטופ 5 של הכיתה! עוד ${pointsToNextRank} XP ואתה עולה למקום ה-${userRank - 1}!`;
  } else {
    motivationQuoteHe = `💪 עוד ${pointsToNextRank} XP כדי לעקוף את ${nextRankProfile?.nameHe} ולהתקדם למקום ה-${userRank - 1}!`;
  }

  return {
    currentUserRank: userRank,
    totalStudents,
    userRankPercentile,
    nextRankProfile,
    pointsToNextRank,
    prevRankProfile,
    pointsAheadOfPrev,
    classAverageXp,
    podium: {
      first: entries[0],
      second: entries[1],
      third: entries[2]
    },
    entries,
    motivationQuoteHe
  };
}
