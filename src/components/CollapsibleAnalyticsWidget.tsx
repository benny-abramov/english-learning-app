import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  Trophy, 
  LayoutGrid, 
  Sparkles, 
  Flame, 
  CheckCircle2,
  Plus,
  Minus
} from 'lucide-react';
import { WeeklyConsistencyChart } from './WeeklyConsistencyChart';
import { ClassroomLeaderboard } from './ClassroomLeaderboard';
import { useAuth } from '../contexts/AuthContext';
import { ActiveTab } from './TabletHeader';

interface CollapsibleAnalyticsWidgetProps {
  xpPoints: number;
  streakDays: number;
  completedToday?: number;
  dailyGoal?: number;
  isFolded?: boolean;
  onToggleFold?: (folded: boolean) => void;
  onNavigateToExercise?: (tab: ActiveTab) => void;
}

type ViewMode = 'both' | 'chart' | 'leaderboard';

export const CollapsibleAnalyticsWidget: React.FC<CollapsibleAnalyticsWidgetProps> = ({
  xpPoints,
  streakDays,
  completedToday = 7,
  dailyGoal = 5,
  isFolded: controlledIsFolded,
  onToggleFold,
  onNavigateToExercise
}) => {
  const { profile } = useAuth();
  
  // Local state initialized from localStorage
  const [internalIsFolded, setInternalIsFolded] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sababa_analytics_folded') === 'true';
    } catch {
      return false;
    }
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem('sababa_analytics_view_mode');
      if (saved === 'both' || saved === 'chart' || saved === 'leaderboard') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'both';
  });

  // Support controlled or uncontrolled
  const isFolded = controlledIsFolded !== undefined ? controlledIsFolded : internalIsFolded;

  const handleToggle = () => {
    const nextState = !isFolded;
    if (controlledIsFolded === undefined) {
      setInternalIsFolded(nextState);
    }
    try {
      localStorage.setItem('sababa_analytics_folded', String(nextState));
    } catch {
      // ignore
    }
    if (onToggleFold) {
      onToggleFold(nextState);
    }
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('sababa_analytics_view_mode', mode);
    } catch {
      // ignore
    }
  };

  const activeClassCode = profile?.classCode || 'ד׳2';
  const effectiveXp = profile?.xp ?? xpPoints;
  const effectiveStreak = profile?.streak ?? streakDays;
  const effectiveDone = profile?.dailyExercisesDone ?? completedToday;
  const effectiveGoal = profile?.dailyGoal ?? dailyGoal;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200 font-hebrew">
      {/* Widget Action Bar Header */}
      <div 
        className={`p-3.5 sm:p-4.5 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
          isFolded ? 'bg-slate-50/90 hover:bg-slate-100' : 'bg-slate-50/50 border-b border-slate-100'
        }`}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className="flex items-center gap-3">
          {/* Prominent +/- Icon Circle */}
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-black text-lg transition-transform shrink-0 shadow-2xs ${
            isFolded 
              ? 'bg-indigo-600 text-white shadow-indigo-200 scale-105' 
              : 'bg-slate-200/90 text-slate-700 hover:bg-slate-300'
          }`}>
            {isFolded ? (
              <Plus className="w-5 h-5 stroke-[3]" />
            ) : (
              <Minus className="w-5 h-5 stroke-[3]" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                מעקב עקביות שבועי (7 הימים האחרונים) ולוח מובילים כיתתי
              </h3>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                isFolded 
                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {isFolded ? 'מקופל לחיסכון במקום' : 'מוצג כעת'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isFolded 
                ? 'לחצו כאן (או על כפתור ה-+) לפתיחת הגרף וטבלת המובילים' 
                : 'מעקב קצב למידה, יעד שבועי ודירוג כיתתי חי • לחצו בכל שלב לקפל לחיסכון במקום'}
            </p>
          </div>
        </div>

        {/* Action Controls & Fold/Unfold Button */}
        <div className="flex items-center gap-2 mr-auto sm:mr-0">
          {!isFolded && (
            <div 
              className="hidden md:flex items-center gap-1 bg-slate-200/70 p-1 rounded-2xl" 
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => handleViewModeChange('both')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'both' 
                    ? 'bg-white text-indigo-700 shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="תצוגה משולבת לצד זה"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>משולב</span>
              </button>

              <button
                type="button"
                onClick={() => handleViewModeChange('chart')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'chart' 
                    ? 'bg-white text-sky-700 shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="גרף עקביות שבועי בלבד"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>גרף בלבד</span>
              </button>

              <button
                type="button"
                onClick={() => handleViewModeChange('leaderboard')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'leaderboard' 
                    ? 'bg-white text-amber-700 shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="לוח מובילים כיתתי בלבד"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>לוח כיתתי</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all shadow-2xs cursor-pointer active:scale-95 ${
              isFolded 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200' 
                : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
            }`}
          >
            {isFolded ? (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>פתח ווידג'טים (+)</span>
              </>
            ) : (
              <>
                <Minus className="w-4 h-4 stroke-[3]" />
                <span>קפל תצוגה (−)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Compact Mini Summary Bar when Folded */}
      {isFolded && (
        <div 
          onClick={handleToggle}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-50/60 via-sky-50/40 to-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100 cursor-pointer hover:bg-indigo-50/80 transition-colors"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-slate-700 font-semibold">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-sky-600" />
              <span>יעד יומי: <strong>{effectiveDone}/{effectiveGoal}</strong> משימות</span>
              {effectiveDone >= effectiveGoal && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
              )}
            </span>

            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>רצף פעיל: <strong>{effectiveStreak} ימים</strong></span>
            </span>

            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>כיתה {activeClassCode} • <strong>{effectiveXp} XP</strong></span>
            </span>
          </div>

          <span className="text-[11px] font-bold text-indigo-700 hover:text-indigo-800 flex items-center gap-1 mr-auto">
            <span>לחצו להרחבה וצפייה מלאה (+)</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      {/* Expanded Animated Content */}
      <AnimatePresence initial={false}>
        {!isFolded && (
          <motion.div
            key="expanded-analytics"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Mobile View Mode Switcher */}
            <div className="md:hidden flex items-center justify-center gap-1 bg-slate-100 p-1.5 mx-4 mt-4 rounded-2xl">
              <button
                type="button"
                onClick={() => handleViewModeChange('both')}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                  viewMode === 'both' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>משולב</span>
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange('chart')}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                  viewMode === 'chart' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>גרף</span>
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange('leaderboard')}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                  viewMode === 'leaderboard' ? 'bg-white text-amber-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>לוח</span>
              </button>
            </div>

            {/* Widgets Container */}
            <div className="p-4 sm:p-5">
              {viewMode === 'both' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="min-w-0">
                    <WeeklyConsistencyChart 
                      completedToday={effectiveDone} 
                      dailyGoal={effectiveGoal} 
                      onToggleFold={handleToggle}
                      isFolded={isFolded}
                    />
                  </div>
                  <div className="min-w-0">
                    <ClassroomLeaderboard 
                      xpPoints={effectiveXp} 
                      streakDays={effectiveStreak} 
                      compact={true} 
                      onNavigateToExercise={onNavigateToExercise}
                      onToggleFold={handleToggle}
                      isFolded={isFolded}
                    />
                  </div>
                </div>
              )}

              {viewMode === 'chart' && (
                <div className="w-full">
                  <WeeklyConsistencyChart 
                    completedToday={effectiveDone} 
                    dailyGoal={effectiveGoal} 
                    onToggleFold={handleToggle}
                    isFolded={isFolded}
                  />
                </div>
              )}

              {viewMode === 'leaderboard' && (
                <div className="w-full">
                  <ClassroomLeaderboard 
                    xpPoints={effectiveXp} 
                    streakDays={effectiveStreak} 
                    compact={false} 
                    onNavigateToExercise={onNavigateToExercise}
                    onToggleFold={handleToggle}
                    isFolded={isFolded}
                  />
                </div>
              )}
            </div>

            {/* Quick Footer Collapse Button */}
            <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>נתוני התלמיד והכיתה מסונכרנים בזמן אמת בענן</span>
              </span>
              <button
                type="button"
                onClick={handleToggle}
                className="font-bold text-slate-700 hover:text-indigo-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>קפל חזרה לחיסכון במקום (−)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
