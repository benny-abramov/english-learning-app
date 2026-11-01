import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Trophy, Sparkles, Clock, Edit3, X, CloudCheck, Flame, UserCheck } from 'lucide-react';
import { playSuccessSound, triggerCelebration, speakEnglish } from '../utils/audio';
import { useAuth } from '../contexts/AuthContext';

export type GoalMetric = 'exercises' | 'minutes' | 'xp';

interface DailyGoalWidgetProps {
  completedExercises: number;
  sessionMinutes?: number;
  currentXpEarnedToday: number;
  streakDays: number;
  onGoalCompleted?: () => void;
}

export const DailyGoalWidget: React.FC<DailyGoalWidgetProps> = ({
  completedExercises,
  sessionMinutes = 12,
  currentXpEarnedToday,
  streakDays,
  onGoalCompleted
}) => {
  const { user, profile, updateDailyGoal, setIsAuthModalOpen } = useAuth();
  const [metric, setMetric] = useState<GoalMetric>('exercises');
  const [targetExercises, setTargetExercises] = useState<number>(profile?.dailyGoal || 10);
  const [targetMinutes, setTargetMinutes] = useState<number>(15);
  const [targetXp, setTargetXp] = useState<number>(150);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasCelebratedCompletion, setHasCelebratedCompletion] = useState<boolean>(false);

  // Sync state when profile changes
  useEffect(() => {
    if (profile) {
      setTargetExercises(profile.dailyGoal);
    } else {
      try {
        const savedGoal = localStorage.getItem('sababa_daily_goal');
        if (savedGoal) {
          const parsed = JSON.parse(savedGoal);
          if (parsed.metric) setMetric(parsed.metric);
          if (parsed.targetExercises) setTargetExercises(parsed.targetExercises);
          if (parsed.targetMinutes) setTargetMinutes(parsed.targetMinutes);
          if (parsed.targetXp) setTargetXp(parsed.targetXp);
        }
      } catch {
        // Ignore storage errors
      }
    }
  }, [profile]);

  const saveGoal = (newMetric: GoalMetric, value: number) => {
    setMetric(newMetric);
    if (newMetric === 'exercises') {
      setTargetExercises(value);
      if (profile) {
        updateDailyGoal(value);
      }
    }
    if (newMetric === 'minutes') setTargetMinutes(value);
    if (newMetric === 'xp') setTargetXp(value);

    try {
      localStorage.setItem(
        'sababa_daily_goal',
        JSON.stringify({
          metric: newMetric,
          targetExercises: newMetric === 'exercises' ? value : targetExercises,
          targetMinutes: newMetric === 'minutes' ? value : targetMinutes,
          targetXp: newMetric === 'xp' ? value : targetXp
        })
      );
    } catch {
      // Ignore storage error
    }
    setIsEditing(false);
  };

  // Current progress calculation - use cloud profile if user signed in
  const activeCompletedExercises = profile ? profile.dailyExercisesDone : completedExercises;
  const activeStreakDays = profile ? profile.streak : streakDays;

  const currentVal =
    metric === 'exercises'
      ? activeCompletedExercises
      : metric === 'minutes'
      ? sessionMinutes
      : currentXpEarnedToday;

  const targetVal =
    metric === 'exercises'
      ? targetExercises
      : metric === 'minutes'
      ? targetMinutes
      : targetXp;

  const progressPercent = Math.min(100, Math.round((currentVal / targetVal) * 100));
  const isCompleted = currentVal >= targetVal;

  // Trigger celebration when completed
  useEffect(() => {
    if (isCompleted && !hasCelebratedCompletion && currentVal > 0) {
      setHasCelebratedCompletion(true);
      playSuccessSound();
      triggerCelebration();
      speakEnglish('Congratulations! You completed your daily English goal!', 0.88);
      if (onGoalCompleted) onGoalCompleted();
    }
  }, [isCompleted, hasCelebratedCompletion, currentVal, onGoalCompleted]);

  const metricLabels = {
    exercises: {
      singular: 'תרגיל',
      plural: 'תרגילים',
      label: 'יעד תרגילים יומי'
    },
    minutes: {
      singular: 'דקה',
      plural: 'דקות',
      label: 'יעד דקות תרגול'
    },
    xp: {
      singular: 'נקודה',
      plural: 'נקודות XP',
      label: 'יעד נקודות יומי'
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left / Start Info */}
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Target Ring Visual */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              {/* Background Ring */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3.5"
              />
              {/* Progress Ring */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={isCompleted ? '#10b981' : '#0284c7'}
                strokeWidth="3.8"
                strokeDasharray={`${progressPercent}, 100`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {isCompleted ? (
                <Trophy className="w-6 h-6 text-emerald-600 animate-bounce" />
              ) : (
                <span className="text-xs font-black font-mono text-slate-800">
                  {progressPercent}%
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md font-hebrew">
                {metricLabels[metric].label}
              </span>

              {/* Cloud Sync Status Badge */}
              {user ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CloudCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>מסונכרן ב-Firebase ☁️</span>
                </span>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                  title="התחברו כדי לשמור בין המחשב בבית הספר לסמארטפון בבית"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>התחברו לסנכרון ענן</span>
                </button>
              )}

              <span className="text-xs text-slate-500 font-mono">
                {activeStreakDays} ימי רצף 🔥
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                {currentVal}
              </span>
              <span className="text-sm font-bold text-slate-500 font-mono">
                / {targetVal} {metricLabels[metric].plural}
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-0.5 font-hebrew">
              {isCompleted ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>כל הכבוד! היעד היומי הושלם בהצלחה!</span>
                </span>
              ) : (
                <span>
                  עוד <strong>{Math.max(0, targetVal - currentVal)}</strong> {metricLabels[metric].plural} להשלמת היעד היומי
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right / Actions & Goal Presets */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="שינוי יעד יומי"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>שינוי יעד</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Goal Setting Drawer / Inline Panel */}
      {isEditing && (
        <div className="mt-4 pt-3 border-t border-slate-100 animate-fadeIn">
          <span className="text-xs font-bold text-slate-700 block mb-2 font-hebrew">
            בחרו את סוג היעד והכמות המתאימה לכם היום:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Exercises Presets */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-sky-800 flex items-center gap-1 mb-2 font-hebrew">
                <Target className="w-3.5 h-3.5" />
                <span>לפי מספר תרגילים</span>
              </span>
              <div className="flex gap-1.5">
                {[5, 10, 15].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => saveGoal('exercises', amt)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer font-mono ${
                      metric === 'exercises' && targetExercises === amt
                        ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                        : 'bg-white hover:bg-sky-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes Presets */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1 mb-2 font-hebrew">
                <Clock className="w-3.5 h-3.5" />
                <span>לפי זמן (דקות)</span>
              </span>
              <div className="flex gap-1.5">
                {[10, 15, 20].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => saveGoal('minutes', amt)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer font-mono ${
                      metric === 'minutes' && targetMinutes === amt
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                        : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {amt} דק׳
                  </button>
                ))}
              </div>
            </div>

            {/* XP Presets */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-2 font-hebrew">
                <Sparkles className="w-3.5 h-3.5" />
                <span>לפי נקודות (XP)</span>
              </span>
              <div className="flex gap-1.5">
                {[100, 150, 200].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => saveGoal('xp', amt)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer font-mono ${
                      metric === 'xp' && targetXp === amt
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                        : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
