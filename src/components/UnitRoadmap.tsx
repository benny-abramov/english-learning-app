import React from 'react';
import { CurriculumUnit } from '../types/curriculum';
import { CheckCircle2, Star, Sparkles, ArrowRight, Play, Lock, BookOpen, Gamepad2, Volume2, Settings } from 'lucide-react';
import { ActiveTab } from './TabletHeader';

interface UnitRoadmapProps {
  units: CurriculumUnit[];
  currentUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToTab?: (tab: ActiveTab, unitId: string) => void;
  xpPoints: number;
}

export const UnitRoadmap: React.FC<UnitRoadmapProps> = ({
  units,
  currentUnitId,
  onSelectUnit,
  onNavigateToTab,
  xpPoints
}) => {
  const handleBadgeClick = (e: React.MouseEvent, tab: ActiveTab, unitId: string) => {
    e.stopPropagation();
    if (onNavigateToTab) {
      onNavigateToTab(tab, unitId);
    } else {
      onSelectUnit(unitId);
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Roadmap Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                מסלול הלימודים של משרד החינוך
              </span>
              <span className="text-xs text-slate-500 font-medium">
                כיתות ד׳-ז׳ · Band I & Band II (12 יחידות לימוד)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              מפת המסע באנגלית (Learning Journey)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              בחרו יחידת לימוד (1-12) להתאמן על מלכודות הצליל, דקדוק משרד החינוך, ואוצר מילים מורחב!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-50/80 p-3 rounded-2xl border border-amber-200/80 self-start sm:self-auto">
            <Star className="w-6 h-6 text-amber-500 fill-amber-400 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase block">
                סה״כ ניקוד צבור
              </span>
              <span className="text-lg font-extrabold text-amber-900 font-mono">
                {xpPoints} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Roadmap Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map((unit, index) => {
          const isCurrent = unit.id === currentUnitId;
          const isCompleted = index === 0 && xpPoints >= 200; // Visual progress representation

          return (
            <div
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className={`relative rounded-3xl p-5 sm:p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? 'bg-gradient-to-br from-white to-sky-50/60 border-sky-500 shadow-md ring-4 ring-sky-100'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Card Header & Badge */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold font-mono text-sm flex items-center justify-center">
                      {unit.unitNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-english">
                      Unit {unit.unitNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isCurrent && (
                      <span className="text-xs font-bold text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-full animate-pulse">
                        פעיל עכשיו
                      </span>
                    )}
                    {isCompleted && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {unit.titleHe}
                </h3>
                <h4 className="text-xs font-bold font-english text-sky-600 mb-2">
                  {unit.titleEn}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {unit.descriptionHe}
                </p>

                {/* Focus badges - Interactive shortcuts */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <button
                    type="button"
                    onClick={(e) => handleBadgeClick(e, 'phonics', unit.id)}
                    className="text-[11px] font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-lg border border-sky-200/80 font-hebrew transition-colors cursor-pointer flex items-center gap-1"
                    title="כניסה לאתגר צלילים"
                  >
                    <span>🗣️</span>
                    <span>צליל: {unit.phonicsGapName}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleBadgeClick(e, 'verb_to_be', unit.id)}
                    className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200/80 font-hebrew transition-colors cursor-pointer flex items-center gap-1"
                    title="כניסה לדקדוק"
                  >
                    <span>⚙️</span>
                    <span>דקדוק: {unit.grammarFocusName}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleBadgeClick(e, 'vocab_glossary', unit.id)}
                    className="text-[11px] font-bold text-purple-800 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-300 font-hebrew transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    title="צפייה בכל 27 מילות המאגר עם תרגום ושמע"
                  >
                    <span>📖</span>
                    <span>{unit.vocabulary.length} מילים במאגר (לחצו לצפייה)</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleBadgeClick(e, 'vocab_challenge', unit.id)}
                    className="text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 font-hebrew transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    title="כניסה לאתגר תמונה-מילה"
                  >
                    <span>🖼️</span>
                    <span>5 מילות תמונה-מילה</span>
                  </button>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500">
                  +{unit.xpReward} XP
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleBadgeClick(e, 'vocab_glossary', unit.id)}
                    className="px-2.5 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors cursor-pointer flex items-center gap-1"
                    title="למאגר המילים של היחידה"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>אוצר מילים ({unit.vocabulary.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectUnit(unit.id);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isCurrent ? 'המשך תרגול' : 'כניסה ליחידה'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
