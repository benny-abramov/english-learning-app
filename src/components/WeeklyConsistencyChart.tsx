import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine
} from 'recharts';
import { Calendar, TrendingUp, CheckCircle, Flame, Award, Plus, Minus } from 'lucide-react';

export interface DailyActivityData {
  dayId: string;
  dayNameHe: string;
  dayNameEn: string;
  dateStr: string;
  completedExercises: number;
  goalExercises: number;
  xpEarned: number;
  minutesSpent: number;
  isToday: boolean;
}

interface WeeklyConsistencyChartProps {
  completedToday?: number;
  dailyGoal?: number;
  onToggleFold?: () => void;
  isFolded?: boolean;
}

const defaultWeeklyData: DailyActivityData[] = [
  {
    dayId: 'sun',
    dayNameHe: 'יום א׳',
    dayNameEn: 'Sun',
    dateStr: '25/10',
    completedExercises: 6,
    goalExercises: 5,
    xpEarned: 150,
    minutesSpent: 18,
    isToday: false
  },
  {
    dayId: 'mon',
    dayNameHe: 'יום ב׳',
    dayNameEn: 'Mon',
    dateStr: '26/10',
    completedExercises: 8,
    goalExercises: 5,
    xpEarned: 200,
    minutesSpent: 24,
    isToday: false
  },
  {
    dayId: 'tue',
    dayNameHe: 'יום ג׳',
    dayNameEn: 'Tue',
    dateStr: '27/10',
    completedExercises: 10,
    goalExercises: 5,
    xpEarned: 250,
    minutesSpent: 28,
    isToday: false
  },
  {
    dayId: 'wed',
    dayNameHe: 'יום ד׳',
    dayNameEn: 'Wed',
    dateStr: '28/10',
    completedExercises: 5,
    goalExercises: 5,
    xpEarned: 125,
    minutesSpent: 16,
    isToday: false
  },
  {
    dayId: 'thu',
    dayNameHe: 'יום ה׳',
    dayNameEn: 'Thu',
    dateStr: '29/10',
    completedExercises: 9,
    goalExercises: 5,
    xpEarned: 225,
    minutesSpent: 26,
    isToday: false
  },
  {
    dayId: 'fri',
    dayNameHe: 'יום ו׳',
    dayNameEn: 'Fri',
    dateStr: '30/10',
    completedExercises: 4,
    goalExercises: 5,
    xpEarned: 100,
    minutesSpent: 12,
    isToday: false
  },
  {
    dayId: 'sat',
    dayNameHe: 'שבת (היום)',
    dayNameEn: 'Today',
    dateStr: '31/10',
    completedExercises: 7,
    goalExercises: 5,
    xpEarned: 175,
    minutesSpent: 20,
    isToday: true
  }
];

export const WeeklyConsistencyChart: React.FC<WeeklyConsistencyChartProps> = ({
  completedToday = 7,
  dailyGoal = 5,
  onToggleFold,
  isFolded = false
}) => {
  const [metric, setMetric] = useState<'exercises' | 'xp'>('exercises');

  // Update today's data with dynamic props
  const weeklyData = defaultWeeklyData.map(d =>
    d.isToday
      ? {
          ...d,
          completedExercises: completedToday,
          goalExercises: dailyGoal,
          xpEarned: completedToday * 25
        }
      : d
  );

  const totalExercises = weeklyData.reduce((acc, curr) => acc + curr.completedExercises, 0);
  const totalXp = weeklyData.reduce((acc, curr) => acc + curr.xpEarned, 0);
  const daysGoalMet = weeklyData.filter(d => d.completedExercises >= d.goalExercises).length;
  const consistencyPercent = Math.round((daysGoalMet / 7) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs font-hebrew">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                מעקב עקביות שבועי (7 הימים האחרונים)
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {consistencyPercent}% עמידה ביעד
              </span>
              {onToggleFold && (
                <button
                  type="button"
                  onClick={onToggleFold}
                  title={isFolded ? "הרחב ווידג'טים (+)" : "קפל ווידג'טים לחיסכון במקום (−)"}
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200 cursor-pointer transition-all shadow-2xs active:scale-95"
                >
                  {isFolded ? (
                    <>
                      <span className="w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-black leading-none">
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
            <p className="text-xs text-slate-500 mt-0.5">
              התקדמות יומית של התלמיד בלימוד צלילים, פעלים והרכבת משפטים באנגלית
            </p>
          </div>
        </div>

        {/* Metric Selector Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200/60">
          <button
            onClick={() => setMetric('exercises')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              metric === 'exercises'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            תרגילים שהושלמו
          </button>
          <button
            onClick={() => setMetric('xp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              metric === 'xp'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            נקודות XP
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70">
          <span className="text-[11px] text-slate-500 font-medium block">סה"כ תרגילים</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-extrabold text-slate-900 font-mono">{totalExercises}</span>
            <span className="text-xs text-slate-500">השבוע</span>
          </div>
        </div>

        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70">
          <span className="text-[11px] text-slate-500 font-medium block">סה"כ נקודות XP</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-extrabold text-amber-600 font-mono">{totalXp}</span>
            <span className="text-xs text-slate-500">XP</span>
          </div>
        </div>

        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70">
          <span className="text-[11px] text-slate-500 font-medium block">ימי עמידה ביעד</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-extrabold text-emerald-600 font-mono">{daysGoalMet}</span>
            <span className="text-xs text-slate-500">מתוך 7 ימים</span>
          </div>
        </div>

        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70">
          <span className="text-[11px] text-slate-500 font-medium block">ממוצע תרגילים יומי</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-extrabold text-sky-600 font-mono">
              {(totalExercises / 7).toFixed(1)}
            </span>
            <span className="text-xs text-slate-500">ליום</span>
          </div>
        </div>
      </div>

      {/* Recharts Bar Visualization */}
      <div className="h-64 w-full dir-ltr" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="dayNameEn"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              domain={[0, 'auto']}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as DailyActivityData;
                  return (
                    <div className="bg-slate-900 text-white rounded-xl p-3 shadow-xl text-xs font-hebrew text-right border border-slate-700 min-w-[140px]">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
                        <span className="font-bold text-sky-300">{data.dayNameHe}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{data.dateStr}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="flex justify-between gap-3">
                          <span className="text-slate-300">תרגילים שהושלמו:</span>
                          <strong className="text-white font-mono">{data.completedExercises}</strong>
                        </p>
                        <p className="flex justify-between gap-3">
                          <span className="text-slate-300">יעד יומי:</span>
                          <span className="text-slate-400 font-mono">{data.goalExercises}</span>
                        </p>
                        <p className="flex justify-between gap-3">
                          <span className="text-slate-300">נקודות שהורווחו:</span>
                          <strong className="text-amber-300 font-mono">+{data.xpEarned} XP</strong>
                        </p>
                        <p className="flex justify-between gap-3">
                          <span className="text-slate-300">זמן למידה:</span>
                          <span className="text-emerald-300 font-mono">{data.minutesSpent} דק׳</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {metric === 'exercises' && (
              <ReferenceLine
                y={dailyGoal}
                stroke="#10b981"
                strokeDasharray="4 4"
                label={{
                  value: `יעד: ${dailyGoal}`,
                  fill: '#059669',
                  fontSize: 11,
                  position: 'right'
                }}
              />
            )}
            <Bar
              dataKey={metric === 'exercises' ? 'completedExercises' : 'xpEarned'}
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            >
              {weeklyData.map((entry, index) => {
                // Color palette based on today vs past days, and goal achievement
                let barColor = '#38bdf8'; // Sky 400 default
                if (metric === 'exercises') {
                  if (entry.isToday) {
                    barColor = '#0284c7'; // Active primary blue for today
                  } else if (entry.completedExercises >= entry.goalExercises) {
                    barColor = '#10b981'; // Emerald for completed goal
                  } else {
                    barColor = '#94a3b8'; // Slate for below goal
                  }
                } else {
                  barColor = entry.isToday ? '#f59e0b' : '#fbbf24';
                }

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColor}
                    className="transition-all hover:opacity-85"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Pedagogical Feedback */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
            <span>עמד ביעד ({dailyGoal}+ תרגילים)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-600"></span>
            <span>היום הנוכחי</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-400"></span>
            <span>מתחת ליעד</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sky-700 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>עקביות יומית קבועה משפרת משמעותית זכירת אוצר מילים ב-Band I</span>
        </div>
      </div>
    </div>
  );
};
