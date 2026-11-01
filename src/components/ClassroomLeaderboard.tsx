import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Sparkles, 
  ArrowUp, 
  ChevronLeft, 
  Users, 
  Medal, 
  TrendingUp, 
  Volume2, 
  Target,
  GraduationCap,
  Calendar,
  Compass,
  CloudCheck,
  UserCheck,
  Settings
} from 'lucide-react';
import { 
  getRankedLeaderboard, 
  LeaderboardQueryOptions, 
  RankedLeaderboardEntry 
} from '../services/leaderboardService';
import { speakEnglish, playGentleSuccessTone } from '../utils/audio';
import { ActiveTab } from './TabletHeader';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToClassroomScores, ClassroomScoreEntry } from '../services/firebase';

interface ClassroomLeaderboardProps {
  xpPoints: number;
  streakDays: number;
  onNavigateToExercise?: (tab: ActiveTab) => void;
  compact?: boolean;
  onToggleFold?: () => void;
  isFolded?: boolean;
}

export const ClassroomLeaderboard: React.FC<ClassroomLeaderboardProps> = ({
  xpPoints,
  streakDays,
  onNavigateToExercise,
  compact = false,
  onToggleFold,
  isFolded = false
}) => {
  const { user, profile, setIsAuthModalOpen } = useAuth();
  const [scope, setScope] = useState<'class' | 'grade'>('class');
  const [timeframe, setTimeframe] = useState<'weekly' | 'allTime'>('weekly');
  const [celebratedId, setCelebratedId] = useState<string | null>(null);
  const [liveScores, setLiveScores] = useState<ClassroomScoreEntry[]>([]);

  const activeClassCode = profile?.classCode || 'ד׳2';
  const effectiveXp = profile ? profile.xp : xpPoints;
  const effectiveStreak = profile ? profile.streak : streakDays;

  // Real-time Firestore classroom subscription
  useEffect(() => {
    const unsubscribe = subscribeToClassroomScores(
      activeClassCode,
      (scores) => {
        setLiveScores(scores);
      },
      (err) => {
        console.warn('Real-time score sync fallback to local cache:', err);
      }
    );

    return () => unsubscribe();
  }, [activeClassCode]);

  // Compute live ranking
  const stats = useMemo(() => {
    return getRankedLeaderboard(effectiveXp, effectiveStreak, {
      scope,
      timeframe,
      studentNameHe: profile?.displayName || 'אני (אתה)',
      studentClassName: activeClassCode,
      currentUserId: user?.uid,
      avatarPhotoUrl: profile?.photoURL,
      liveScores
    });
  }, [effectiveXp, effectiveStreak, scope, timeframe, profile, activeClassCode, user, liveScores]);

  const handleCheerStudent = (entry: RankedLeaderboardEntry) => {
    setCelebratedId(entry.id);
    playGentleSuccessTone();
    if (entry.isCurrentUser) {
      speakEnglish(`Awesome job! You have ${entry.displayedXp} experience points!`);
    } else {
      speakEnglish(`Great work ${entry.nameEn}!`);
    }
    setTimeout(() => {
      setCelebratedId(null);
    }, 1500);
  };

  // Compact Widget View (e.g. for dashboard summary or portal integration)
  if (compact) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">לוח מובילים כיתתי</h3>
                {onToggleFold && (
                  <button
                    type="button"
                    onClick={onToggleFold}
                    title={isFolded ? "הרחב ווידג'טים (+)" : "קפל ווידג'טים לחיסכון במקום (−)"}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 cursor-pointer transition-all shadow-2xs active:scale-95"
                  >
                    {isFolded ? (
                      <>
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black leading-none">
                          +
                        </span>
                        <span>פתח (+)</span>
                      </>
                    ) : (
                      <>
                        <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-xs font-black leading-none">
                          −
                        </span>
                        <span>קפל (−)</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500">כיתה ד׳2 · דירוג שבועי</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
            <span>מקום {stats.currentUserRank}</span>
            <span className="text-indigo-400">/</span>
            <span>{stats.totalStudents}</span>
          </div>
        </div>

        {/* Motivational Snippet */}
        <p className="text-xs text-slate-700 bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 mb-3 leading-relaxed">
          {stats.motivationQuoteHe}
        </p>

        {/* Top 3 Quick List */}
        <div className="space-y-1.5">
          {stats.entries.slice(0, 3).map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                entry.isCurrentUser
                  ? 'bg-indigo-50/90 border border-indigo-200 font-bold text-indigo-900'
                  : 'bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 text-center font-bold">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                </span>
                <span className="text-base">{entry.avatarEmoji}</span>
                <span className="truncate max-w-[120px]">{entry.nameHe}</span>
                {entry.isCurrentUser && (
                  <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-md font-bold">
                    אתה
                  </span>
                )}
              </div>
              <span className="font-mono font-bold text-slate-700">
                {entry.displayedXp} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Scope Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  לוח המובילים של הכיתה
                </h1>
                <span className="text-xs font-bold font-english text-amber-600 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-lg">
                  Classroom Leaderboard
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                צברו נקודות XP בתרגילי פונטיקה, דקדוק ובניית משפטים וטפסו בדירוג הכיתתי!
              </p>
            </div>
          </div>

          {/* Filtering Toggles & Live Cloud Status */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Live Cloud Status / Login Button */}
            {user ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                title="ניהול פרופיל והחלפת כיתה"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>חי בענן · {profile?.displayName || 'תלמיד'} ({activeClassCode})</span>
                <Settings className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                title="התחברו עם Google להשתתפות בדירוג הכיתתי החי"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>התחברו ללוח המובילים</span>
              </button>
            )}

            {/* Scope Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                onClick={() => setScope('class')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  scope === 'class'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>כיתה {activeClassCode}</span>
              </button>
              <button
                onClick={() => setScope('grade')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  scope === 'grade'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                <span>כל השכבה</span>
              </button>
            </div>

            {/* Timeframe Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                onClick={() => setTimeframe('weekly')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  timeframe === 'weekly'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>השבוע</span>
              </button>
              <button
                onClick={() => setTimeframe('allTime')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  timeframe === 'allTime'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>כל הזמנים</span>
              </button>
            </div>
          </div>
        </div>

        {/* Motivational Next-Rank Gap Banner */}
        <div className="mt-5 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-sky-500/10 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  יעד טיפוס אישי
                </span>
                <span className="text-xs font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                  מקום {stats.currentUserRank} בכיתה
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800 mt-0.5 leading-snug">
                {stats.motivationQuoteHe}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1.5 font-medium">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  <span>רצף: {streakDays} ימים ברציפות</span>
                </span>
                <span>·</span>
                <span>ממוצע כיתתי: {stats.classAverageXp} XP</span>
              </div>
            </div>
          </div>

          {/* Direct CTA to Practice and Earn XP */}
          {onNavigateToExercise && (
            <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
              <button
                onClick={() => onNavigateToExercise('phonics')}
                className="flex-1 sm:flex-initial px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>תרגלו עכשיו (+20 XP)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top 3 Podium Visualizer */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 text-amber-500 fill-amber-400" />
            <span>פודיום האלופים · שלישיית הפסגה</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            התלמידים עם מירב הנקודות ב{timeframe === 'weekly' ? 'שבוע הנוכחי' : 'כל הזמנים'}
          </p>
        </div>

        {/* Podium Pillars */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto items-end pt-8 pb-2">
          {/* 2nd Place (Silver - on the right in RTL or left in LTR) */}
          {stats.podium.second && (
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div
                  onClick={() => handleCheerStudent(stats.podium.second!)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl border-2 transition-transform hover:scale-105 cursor-pointer ${
                    stats.podium.second.isCurrentUser
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                      : stats.podium.second.avatarBg
                  }`}
                  title="לחצו להשמעת עידוד!"
                >
                  {stats.podium.second.avatarEmoji}
                </div>
                <div className="absolute -top-2.5 -right-2 bg-slate-300 text-slate-800 text-[10px] sm:text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  2
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-full px-1">
                {stats.podium.second.nameHe}
              </div>
              <div className="text-[11px] font-mono font-bold text-slate-500">
                {stats.podium.second.displayedXp} XP
              </div>
              {/* Podium Column */}
              <div className="w-full h-24 sm:h-32 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-2xl border-t-4 border-slate-300 flex items-center justify-center text-slate-500 font-black text-xl sm:text-2xl mt-2 shadow-inner">
                🥈
              </div>
            </div>
          )}

          {/* 1st Place (Gold - Center & Tallest) */}
          {stats.podium.first && (
            <div className="flex flex-col items-center text-center -mt-6">
              <div className="relative mb-2">
                <Crown className="w-6 h-6 text-amber-500 fill-amber-400 absolute -top-5 left-1/2 -translate-x-1/2 animate-bounce" />
                <div
                  onClick={() => handleCheerStudent(stats.podium.first)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl border-3 transition-transform hover:scale-105 cursor-pointer ${
                    stats.podium.first.isCurrentUser
                      ? 'bg-indigo-600 border-amber-400 text-white shadow-xl shadow-amber-500/30 ring-4 ring-amber-300'
                      : stats.podium.first.avatarBg
                  }`}
                  title="לחצו להשמעת עידוד!"
                >
                  {stats.podium.first.avatarEmoji}
                </div>
                <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-950 text-xs sm:text-sm font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  1
                </div>
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 truncate max-w-full px-1">
                {stats.podium.first.nameHe}
              </div>
              <div className="text-xs font-mono font-black text-amber-600">
                {stats.podium.first.displayedXp} XP
              </div>
              {/* Podium Column */}
              <div className="w-full h-32 sm:h-44 bg-gradient-to-t from-amber-200 via-amber-100 to-amber-50 rounded-t-2xl border-t-4 border-amber-400 flex items-center justify-center text-amber-600 font-black text-2xl sm:text-3xl mt-2 shadow-inner">
                🥇
              </div>
            </div>
          )}

          {/* 3rd Place (Bronze) */}
          {stats.podium.third && (
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div
                  onClick={() => handleCheerStudent(stats.podium.third!)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl border-2 transition-transform hover:scale-105 cursor-pointer ${
                    stats.podium.third.isCurrentUser
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                      : stats.podium.third.avatarBg
                  }`}
                  title="לחצו להשמעת עידוד!"
                >
                  {stats.podium.third.avatarEmoji}
                </div>
                <div className="absolute -top-2.5 -right-2 bg-amber-700 text-white text-[10px] sm:text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  3
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-full px-1">
                {stats.podium.third.nameHe}
              </div>
              <div className="text-[11px] font-mono font-bold text-slate-500">
                {stats.podium.third.displayedXp} XP
              </div>
              {/* Podium Column */}
              <div className="w-full h-20 sm:h-24 bg-gradient-to-t from-amber-100 to-amber-50/60 rounded-t-2xl border-t-4 border-amber-600/70 flex items-center justify-center text-amber-800 font-black text-lg sm:text-xl mt-2 shadow-inner">
                🥉
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-5 sm:px-7 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">טבלת הדירוג המלאה</h3>
            <p className="text-xs text-slate-500">
              {scope === 'class' ? 'תלמידי כיתה ד׳2' : 'כלל תלמידי שכבת ד׳ בבית הספר'}
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {stats.entries.length} תלמידים רשומים
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {stats.entries.map((entry) => {
            const isUser = entry.isCurrentUser;
            const isCelebrated = celebratedId === entry.id;

            return (
              <div
                key={entry.id}
                className={`p-3.5 sm:p-4.5 flex items-center justify-between gap-3 transition-colors ${
                  isUser
                    ? 'bg-indigo-50/70 border-r-4 border-indigo-600'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Right: Rank + Avatar + Name + Class info */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Rank Badge */}
                  <div className="w-7 sm:w-8 text-center shrink-0">
                    {entry.rank === 1 ? (
                      <span className="text-xl" title="מקום ראשון">🥇</span>
                    ) : entry.rank === 2 ? (
                      <span className="text-xl" title="מקום שני">🥈</span>
                    ) : entry.rank === 3 ? (
                      <span className="text-xl" title="מקום שלישי">🥉</span>
                    ) : (
                      <span className="text-xs sm:text-sm font-black font-mono text-slate-600">
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    onClick={() => handleCheerStudent(entry)}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 cursor-pointer border transition-transform hover:scale-105 active:scale-95 ${
                      isUser
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                        : entry.avatarBg
                    } ${isCelebrated ? 'ring-4 ring-amber-400' : ''}`}
                    title="לחצו להשמעת שם ועידוד"
                  >
                    {entry.avatarEmoji}
                  </div>

                  {/* Names and Badges */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm sm:text-base font-bold truncate ${
                        isUser ? 'text-indigo-950 font-black' : 'text-slate-900'
                      }`}>
                        {entry.nameHe}
                      </span>
                      {isUser && (
                        <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full shrink-0">
                          זה אתה!
                        </span>
                      )}
                      <span className="text-xs font-english text-slate-500 hidden sm:inline">
                        ({entry.nameEn})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
                      <span className="text-slate-600 font-medium">כיתה {entry.className}</span>
                      <span>·</span>
                      <span className="text-amber-700 font-medium">
                        {entry.recentBadgeHe}
                      </span>
                      <span className="hidden md:inline">·</span>
                      <span className="hidden md:inline text-slate-400 font-english">
                        {entry.favoriteSkillEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left: XP Points & Streak */}
                <div className="flex items-center gap-3 sm:gap-6 shrink-0 text-left">
                  {/* Streak */}
                  <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-orange-600">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" />
                    <span>{entry.streakDays}d</span>
                  </div>

                  {/* Audio Cheer Button */}
                  <button
                    onClick={() => handleCheerStudent(entry)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                    title={`השמעת עידוד ל-${entry.nameHe}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* XP Points Score */}
                  <div className="text-left min-w-[70px]">
                    <div className={`text-base sm:text-lg font-black font-mono ${
                      isUser ? 'text-indigo-700' : 'text-slate-900'
                    }`}>
                      {entry.displayedXp}
                    </div>
                    <span className="text-[10px] font-black tracking-wider text-slate-400 font-english block -mt-1">
                      XP
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Classroom Pedagogical Note for Teachers & Parents */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 text-xs text-slate-600 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">הערה פדגוגית לחיזוק חיובי: </span>
          לוח המובילים בנוי לעודד התמדה ומאמץ אישי (Growth Mindset) ולא להשוואה תחרותית מלחיצה. כל תרגול נוסף מקדם את התלמיד/ה ביחס לעצמם ולחבריהם, ומעניק חיזוק קולי חיובי על כל הישג.
        </div>
      </div>
    </div>
  );
};
