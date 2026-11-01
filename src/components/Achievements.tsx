import React, { useState } from 'react';
import { Award, Star, Sparkles, CheckCircle2, Lock, Volume2, Flame, Wrench, ShieldCheck, Compass, Zap } from 'lucide-react';
import { speakEnglish, playSuccessSound } from '../utils/audio';

export interface Badge {
  id: string;
  titleEn: string;
  titleHe: string;
  descriptionHe: string;
  curriculumSkillHe: string;
  category: 'phonics' | 'grammar' | 'sentence' | 'streak' | 'vocab';
  icon: 'award' | 'star' | 'wrench' | 'flame' | 'sparkles' | 'shield' | 'zap' | 'compass';
  color: 'amber' | 'sky' | 'emerald' | 'violet' | 'rose' | 'orange';
  xpRequired: number;
  progressPercent: number; // 0 to 100
  isUnlocked: boolean;
  unlockedDateHe?: string;
  audioPraiseEn: string;
}

interface AchievementsProps {
  xpPoints: number;
  streakDays: number;
  compact?: boolean;
}

export const Achievements: React.FC<AchievementsProps> = ({
  xpPoints,
  streakDays,
  compact = false
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  // Dynamic milestone calculation based on student XP & streak
  const badges: Badge[] = [
    {
      id: 'b-pf-master',
      titleEn: 'P & F Sound Master',
      titleHe: 'אלוף צלילי P ו-F',
      descriptionHe: 'הבחנה מדויקת בין שפתיים נסגרות (P) לרוח שיניים (F) בזוגות מינימליים.',
      curriculumSkillHe: 'פונטיקה · אות פ׳ דגושה מול רפה',
      category: 'phonics',
      icon: 'sparkles',
      color: 'sky',
      xpRequired: 100,
      progressPercent: Math.min(100, Math.round((xpPoints / 100) * 100)),
      isUnlocked: xpPoints >= 100,
      unlockedDateHe: 'הושג השבוע',
      audioPraiseEn: 'Awesome! You are a P and F Sound Master!'
    },
    {
      id: 'b-tobe-mechanic',
      titleEn: 'Sentence Mechanic',
      titleHe: 'טכנאי המשפטים (To Be)',
      descriptionHe: 'הברגת פועל העזר am, is, are והתגברות על השמטת פועל עזר בעברית.',
      curriculumSkillHe: 'דקדוק · פועל עזר בהווה (Zero Copula)',
      category: 'grammar',
      icon: 'wrench',
      color: 'emerald',
      xpRequired: 200,
      progressPercent: Math.min(100, Math.round((xpPoints / 200) * 100)),
      isUnlocked: xpPoints >= 200,
      unlockedDateHe: 'הושג השבוע',
      audioPraiseEn: 'Great job! You fixed the missing verb to be!'
    },
    {
      id: 'b-ltr-builder',
      titleEn: 'LTR Sentence Trailblazer',
      titleHe: 'חלוץ כיוון הכתיבה (LTR)',
      descriptionHe: 'בניית משפטים משמאל לימין תוך הקפדה על אות ראשונה גדולה וסימני פיסוק.',
      curriculumSkillHe: 'מבנה משפט · Capital Letters',
      category: 'sentence',
      icon: 'compass',
      color: 'violet',
      xpRequired: 300,
      progressPercent: Math.min(100, Math.round((xpPoints / 300) * 100)),
      isUnlocked: xpPoints >= 300,
      unlockedDateHe: 'הושג השבוע',
      audioPraiseEn: 'Fantastic! You build sentences with great capital letters!'
    },
    {
      id: 'b-suffix-stamper',
      titleEn: 'Suffix Collector',
      titleHe: 'צייד הסיומות',
      descriptionHe: 'הטבעת סיומות -ing להווה ממושך ו-s / -es לריבוי שמות עצם.',
      curriculumSkillHe: 'סיומות מילים · -ing, -s, -es',
      category: 'grammar',
      icon: 'zap',
      color: 'amber',
      xpRequired: 400,
      progressPercent: Math.min(100, Math.round((xpPoints / 400) * 100)),
      isUnlocked: xpPoints >= 400,
      unlockedDateHe: 'הושג לאחרונה',
      audioPraiseEn: 'Super! You mastered all the English word suffixes!'
    },
    {
      id: 'b-streak-champion',
      titleEn: '5-Day Practice Streak',
      titleHe: 'כוכב ההתמדה השבועי',
      descriptionHe: 'שמירה על רצף תרגול יומי פעיל של 5 ימים ברציפות.',
      curriculumSkillHe: 'הרגלי למידה · התמדה יומית',
      category: 'streak',
      icon: 'flame',
      color: 'orange',
      xpRequired: 250,
      progressPercent: Math.min(100, Math.round((streakDays / 5) * 100)),
      isUnlocked: streakDays >= 5,
      unlockedDateHe: 'רצף פעיל עכשיו',
      audioPraiseEn: 'You are on fire! Five days of great English practice!'
    },
    {
      id: 'b-bv-sorter',
      titleEn: 'B & V Sound Detective',
      titleHe: 'בלש צלילי B ו-V',
      descriptionHe: 'הבחנה בין רטט שפתיים של B (Berry) לבין שיניים על שפה של V (Very).',
      curriculumSkillHe: 'פונטיקה · אות ב׳ דגושה מול רפה',
      category: 'phonics',
      icon: 'shield',
      color: 'sky',
      xpRequired: 500,
      progressPercent: Math.min(100, Math.round((xpPoints / 500) * 100)),
      isUnlocked: xpPoints >= 500,
      audioPraiseEn: 'Brilliant! You can tell Berry and Very apart!'
    },
    {
      id: 'b-vowel-voyager',
      titleEn: 'Vowel Voyager (Ship vs Sheep)',
      titleHe: 'מחלץ התנועות (קצרה מול ארוכה)',
      descriptionHe: 'שליטה בהבדל השמיעתי בין ספינה (Ship חטוף) לכבשה (Sheep מחייך).',
      curriculumSkillHe: 'פונטיקה · תנועות קצרות וארוכות',
      category: 'phonics',
      icon: 'star',
      color: 'rose',
      xpRequired: 600,
      progressPercent: Math.min(100, Math.round((xpPoints / 600) * 100)),
      isUnlocked: xpPoints >= 600,
      audioPraiseEn: 'Wonderful! You hear the difference between ship and sheep!'
    },
    {
      id: 'b-band1-scholar',
      titleEn: 'Band I Honor Graduate',
      titleHe: 'בוגר מצטיין של כיתות ד׳-ה׳',
      descriptionHe: 'עמידה בכל 4 יחידות הלימוד של משרד החינוך ושליטה ב-40 מילות ליבה.',
      curriculumSkillHe: 'משרד החינוך · שליטה מלאה ב-Band I',
      category: 'vocab',
      icon: 'award',
      color: 'amber',
      xpRequired: 750,
      progressPercent: Math.min(100, Math.round((xpPoints / 750) * 100)),
      isUnlocked: xpPoints >= 750,
      audioPraiseEn: 'Congratulations! You reached the Ministry of Education Band I milestone!'
    }
  ];

  const unlockedCount = badges.filter(b => b.isUnlocked).length;

  const filteredBadges = badges.filter(b => {
    if (filter === 'unlocked') return b.isUnlocked;
    if (filter === 'locked') return !b.isUnlocked;
    return true;
  });

  const handleCelebrateBadge = (badge: Badge) => {
    if (badge.isUnlocked) {
      playSuccessSound();
      speakEnglish(badge.audioPraiseEn, 0.88);
    }
  };

  const renderBadgeIcon = (icon: Badge['icon'], isUnlocked: boolean) => {
    const props = { className: `w-6 h-6 ${isUnlocked ? 'text-white' : 'text-slate-400'}` };
    switch (icon) {
      case 'wrench': return <Wrench {...props} />;
      case 'sparkles': return <Sparkles {...props} />;
      case 'flame': return <Flame {...props} />;
      case 'shield': return <ShieldCheck {...props} />;
      case 'compass': return <Compass {...props} />;
      case 'zap': return <Zap {...props} />;
      case 'star': return <Star {...props} />;
      default: return <Award {...props} />;
    }
  };

  const getColorClasses = (color: Badge['color'], isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        bg: 'bg-slate-100',
        border: 'border-slate-200',
        iconBg: 'bg-slate-300',
        badgeTag: 'text-slate-400 bg-slate-100'
      };
    }
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-50/70 hover:bg-emerald-50',
          border: 'border-emerald-300/80',
          iconBg: 'bg-emerald-600',
          badgeTag: 'text-emerald-800 bg-emerald-100/80'
        };
      case 'sky':
        return {
          bg: 'bg-sky-50/70 hover:bg-sky-50',
          border: 'border-sky-300/80',
          iconBg: 'bg-sky-600',
          badgeTag: 'text-sky-800 bg-sky-100/80'
        };
      case 'violet':
        return {
          bg: 'bg-violet-50/70 hover:bg-violet-50',
          border: 'border-violet-300/80',
          iconBg: 'bg-violet-600',
          badgeTag: 'text-violet-800 bg-violet-100/80'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50/70 hover:bg-orange-50',
          border: 'border-orange-300/80',
          iconBg: 'bg-orange-600',
          badgeTag: 'text-orange-800 bg-orange-100/80'
        };
      case 'rose':
        return {
          bg: 'bg-rose-50/70 hover:bg-rose-50',
          border: 'border-rose-300/80',
          iconBg: 'bg-rose-600',
          badgeTag: 'text-rose-800 bg-rose-100/80'
        };
      default:
        return {
          bg: 'bg-amber-50/70 hover:bg-amber-50',
          border: 'border-amber-300/80',
          iconBg: 'bg-amber-600',
          badgeTag: 'text-amber-800 bg-amber-100/80'
        };
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Top Achievements Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                הישגי תכנית הלימודים
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {unlockedCount} מתוך {badges.length} תגים הושגו
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              לוח התגים וההישגים (Achievements & Badges)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              כל תג מסמל שליטה במיומנות שפה מרכזית (פונטיקה, דקדוק וכתיבה) לפי יעדי משרד החינוך.
            </p>
          </div>

          {/* Filter Tabs */}
          {!compact && (
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl self-start sm:self-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                הכל ({badges.length})
              </button>
              <button
                onClick={() => setFilter('unlocked')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  filter === 'unlocked' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                הושגו ({unlockedCount})
              </button>
              <button
                onClick={() => setFilter('locked')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  filter === 'locked' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                בתהליך ({badges.length - unlockedCount})
              </button>
            </div>
          )}
        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
            <span className="text-slate-600 font-hebrew font-bold">התקדמות במסלול ההצטיינות:</span>
            <span className="font-extrabold text-slate-900">
              {Math.round((unlockedCount / badges.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500 transition-all duration-700 rounded-full"
              style={{ width: `${(unlockedCount / badges.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className={`grid gap-3.5 ${compact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredBadges.map((badge) => {
          const colorStyles = getColorClasses(badge.color, badge.isUnlocked);

          return (
            <div
              key={badge.id}
              onClick={() => handleCelebrateBadge(badge)}
              className={`p-4 rounded-3xl border transition-all flex flex-col justify-between ${colorStyles.bg} ${colorStyles.border} ${
                badge.isUnlocked ? 'cursor-pointer shadow-2xs hover:shadow-sm' : 'opacity-70'
              }`}
            >
              <div>
                {/* Badge Top Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`w-12 h-12 rounded-2xl ${colorStyles.iconBg} flex items-center justify-center shadow-xs shrink-0`}>
                    {renderBadgeIcon(badge.icon, badge.isUnlocked)}
                  </div>

                  <div className="flex flex-col items-end">
                    {badge.isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-hebrew">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{badge.unlockedDateHe || 'הושג'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full font-hebrew">
                        <Lock className="w-3 h-3" />
                        <span>{badge.xpRequired} XP נדרש</span>
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-mono mt-1">
                      {badge.curriculumSkillHe}
                    </span>
                  </div>
                </div>

                {/* Badge Title & Description */}
                <h4 className="text-base font-extrabold text-slate-900 tracking-tight">
                  {badge.titleHe}
                </h4>
                <h5 className="text-xs font-bold font-english text-slate-600 mb-1.5">
                  {badge.titleEn}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed font-hebrew">
                  {badge.descriptionHe}
                </p>
              </div>

              {/* Progress and Interaction Trigger */}
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                {badge.isUnlocked ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCelebrateBadge(badge);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-white/90 hover:bg-white text-slate-800 rounded-xl border border-slate-200/80 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>השמעת ברכת הצטיינות באנגלית</span>
                  </button>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
                      <span>התקדמות יעד:</span>
                      <span>{badge.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-500 rounded-full"
                        style={{ width: `${badge.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
