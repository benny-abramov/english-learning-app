import React from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, Compass, ArrowRight, ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import { ActiveTab } from './TabletHeader';
import { CurriculumUnit } from '../types/curriculum';
import { UNIT_STAGES, UnitStage } from '../data/unitStages';

interface UnitStagesStepperProps {
  currentUnit: CurriculumUnit;
  units: CurriculumUnit[];
  activeTab: ActiveTab;
  onNavigateToTab: (tab: ActiveTab) => void;
  onSelectUnit: (unitId: string) => void;
}

export const UnitStagesStepper: React.FC<UnitStagesStepperProps> = ({
  currentUnit,
  units,
  activeTab,
  onNavigateToTab,
  onSelectUnit
}) => {
  const currentStageIndex = UNIT_STAGES.findIndex((s) => s.id === activeTab);
  const currentStage = UNIT_STAGES[currentStageIndex] || UNIT_STAGES[0];
  const totalStages = UNIT_STAGES.length;

  // Calculate percentage of stages reached
  const progressPercent = Math.round(((currentStageIndex + 1) / totalStages) * 100);

  // Unit navigation helpers
  const currentUnitIndex = units.findIndex((u) => u.id === currentUnit.id);
  const hasPrevUnit = currentUnitIndex > 0;
  const hasNextUnit = currentUnitIndex < units.length - 1;

  const handlePrevUnit = () => {
    if (hasPrevUnit) {
      onSelectUnit(units[currentUnitIndex - 1].id);
      onNavigateToTab('phonics');
    }
  };

  const handleNextUnit = () => {
    if (hasNextUnit) {
      onSelectUnit(units[currentUnitIndex + 1].id);
      onNavigateToTab('phonics');
    }
  };

  // Stage navigation helpers
  const hasPrevStage = currentStageIndex > 0;
  const hasNextStage = currentStageIndex < totalStages - 1;

  const prevStage = hasPrevStage ? UNIT_STAGES[currentStageIndex - 1] : null;
  const nextStage = hasNextStage ? UNIT_STAGES[currentStageIndex + 1] : null;

  return (
    <div className="flex flex-col gap-3">
      {/* ========================================================= */}
      {/* MOBILE / TABLET PORTRAIT ROLLING WHEEL STEPPER (< lg)     */}
      {/* ========================================================= */}
      <div className="lg:hidden bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs">
        {/* Top Unit Info & Prev/Next Unit Switchers */}
        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold font-mono text-xs flex items-center justify-center shrink-0">
              {currentUnit.unitNumber}
            </span>
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 truncate block">
                {currentUnit.titleHe}
              </span>
              <span className="text-[10px] text-slate-500 font-medium truncate block">
                שלב {currentStageIndex + 1} מתוך {totalStages}: {currentStage.titleHe}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrevUnit}
              disabled={!hasPrevUnit}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="יחידה קודמת"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextUnit}
              disabled={!hasNextUnit}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="יחידה הבאה"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToTab('roadmap')}
              className="px-2 py-1 text-[11px] font-bold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
              title="מפת כל היחידות"
            >
              מפה 🗺️
            </button>
          </div>
        </div>

        {/* Scrollable Rolling Stage Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          {UNIT_STAGES.map((stage, idx) => {
            const isActive = stage.id === activeTab;
            const isPassed = idx < currentStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => onNavigateToTab(stage.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs scale-102 ring-2 ring-sky-400'
                    : isPassed
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{stage.icon}</span>
                <span>{stage.shortTitleHe}</span>
                {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Quick Next/Prev CTA for Mobile */}
        <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-100 text-xs">
          {hasPrevStage ? (
            <button
              onClick={() => prevStage && onNavigateToTab(prevStage.id)}
              className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-100"
            >
              <span>⬅️</span>
              <span>{prevStage?.shortTitleHe}</span>
            </button>
          ) : (
            <span />
          )}

          {hasNextStage ? (
            <button
              onClick={() => nextStage && onNavigateToTab(nextStage.id)}
              className="px-3 py-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 hover:from-sky-500 hover:to-indigo-500 transition-all active:scale-95"
            >
              <span>הבא: {nextStage?.shortTitleHe}</span>
              <span>➔</span>
            </button>
          ) : (
            <button
              onClick={handleNextUnit}
              disabled={!hasNextUnit}
              className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 hover:bg-emerald-500 transition-all active:scale-95"
            >
              <span>סיום היחידה! ליחידה הבאה</span>
              <span>🏆</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP / TABLET LANDSCAPE RIGHT SIDEBAR RAIL (>= lg)     */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex flex-col bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs w-full max-w-[280px] shrink-0 sticky top-20 self-start">
        {/* Header: Unit Info & Switcher */}
        <div className="mb-4 pb-3.5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200/70 font-english">
              Unit {currentUnit.unitNumber} of 12
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevUnit}
                disabled={!hasPrevUnit}
                className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
                title="יחידה קודמת"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextUnit}
                disabled={!hasNextUnit}
                className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
                title="יחידה הבאה"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <h3 className="text-base font-black text-slate-900 leading-tight">
            {currentUnit.titleHe}
          </h3>
          <p className="text-[11px] font-semibold text-slate-500 font-english mt-0.5 truncate">
            {currentUnit.titleEn}
          </p>

          {/* Unit Progress Wheel / Metric */}
          <div className="mt-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700">התקדמות ביחידה</span>
              <span className="font-mono text-sky-700">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
              <span>שלב {currentStageIndex + 1} מתוך {totalStages}</span>
              <span>{currentStage.shortTitleHe}</span>
            </div>
          </div>
        </div>

        {/* The 8 Stages Rolling Stepper Rail */}
        <div className="space-y-1.5 flex-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1">
            שלבי הלימוד ביחידה (לפי הסדר):
          </span>

          {UNIT_STAGES.map((stage, index) => {
            const isActive = stage.id === activeTab;
            const isPassed = index < currentStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => onNavigateToTab(stage.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-right transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 ring-2 ring-sky-400'
                    : isPassed
                    ? 'bg-emerald-50/70 hover:bg-emerald-100/80 text-slate-800 border border-emerald-100'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {/* Step Number Circle */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-xs'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                    }`}
                  >
                    {isPassed ? '✓' : stage.stepNumber}
                  </div>

                  {/* Stage Title and Icon */}
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{stage.icon}</span>
                      <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                        {stage.titleHe}
                      </span>
                    </div>
                    <span className={`text-[10px] block truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {stage.subtitleHe}
                    </span>
                  </div>
                </div>

                {/* Active Indicator or Next Arrow */}
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Primary Next Action CTA */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-2">
          {hasNextStage ? (
            <button
              onClick={() => nextStage && onNavigateToTab(nextStage.id)}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-xs rounded-2xl shadow-sm shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>המשך לשלב הבא: {nextStage?.shortTitleHe}</span>
              <span>➔</span>
            </button>
          ) : (
            <button
              onClick={handleNextUnit}
              disabled={!hasNextUnit}
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>השלמת את היחידה! ליחידה הבאה</span>
              <span>🏆</span>
            </button>
          )}

          {hasPrevStage && (
            <button
              onClick={() => prevStage && onNavigateToTab(prevStage.id)}
              className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>⬅️</span>
              <span>חזרה לשלב הקודם ({prevStage?.shortTitleHe})</span>
            </button>
          )}

          <button
            onClick={() => onNavigateToTab('roadmap')}
            className="w-full py-1 text-center text-[11px] font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer underline underline-offset-2 mt-1"
          >
            חזרה למפת כל 12 היחידות 🗺️
          </button>
        </div>
      </aside>
    </div>
  );
};

{/* Exportable Bottom Step Bar for arenas */}
interface UnitBottomStageNavigatorProps {
  currentUnit: CurriculumUnit;
  activeTab: ActiveTab;
  onNavigateToTab: (tab: ActiveTab) => void;
  units: CurriculumUnit[];
  onSelectUnit: (unitId: string) => void;
}

export const UnitBottomStageNavigator: React.FC<UnitBottomStageNavigatorProps> = ({
  currentUnit,
  activeTab,
  onNavigateToTab,
  units,
  onSelectUnit
}) => {
  const currentStageIndex = UNIT_STAGES.findIndex((s) => s.id === activeTab);
  if (currentStageIndex === -1) return null;

  const currentStage = UNIT_STAGES[currentStageIndex];
  const totalStages = UNIT_STAGES.length;

  const hasPrev = currentStageIndex > 0;
  const hasNext = currentStageIndex < totalStages - 1;

  const prevStage = hasPrev ? UNIT_STAGES[currentStageIndex - 1] : null;
  const nextStage = hasNext ? UNIT_STAGES[currentStageIndex + 1] : null;

  const currentUnitIndex = units.findIndex((u) => u.id === currentUnit.id);
  const hasNextUnit = currentUnitIndex < units.length - 1;

  const handleNextUnit = () => {
    if (hasNextUnit) {
      onSelectUnit(units[currentUnitIndex + 1].id);
      onNavigateToTab('phonics');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Previous Step Button */}
      <div className="w-full sm:w-auto">
        {hasPrev ? (
          <button
            type="button"
            onClick={() => prevStage && onNavigateToTab(prevStage.id)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>⬅️</span>
            <span>חזרה לשלב {prevStage?.stepNumber}: {prevStage?.titleHe}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onNavigateToTab('roadmap')}
            className="w-full sm:w-auto px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>🗺️</span>
            <span>מפת היחידות</span>
          </button>
        )}
      </div>

      {/* Center Stage Info */}
      <div className="text-center font-hebrew">
        <span className="text-xs font-bold text-slate-800 block">
          שלב {currentStageIndex + 1} מתוך {totalStages}: {currentStage.titleHe} {currentStage.icon}
        </span>
        <span className="text-[11px] text-slate-500 font-medium">
          יחידה {currentUnit.unitNumber}: {currentUnit.titleHe}
        </span>
      </div>

      {/* Next Step Button */}
      <div className="w-full sm:w-auto">
        {hasNext ? (
          <button
            type="button"
            onClick={() => nextStage && onNavigateToTab(nextStage.id)}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>המשך לשלב הבא: {nextStage?.titleHe}</span>
            <span>➔</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextUnit}
            disabled={!hasNextUnit}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>השלמת את היחידה! ליחידה הבאה</span>
            <span>🏆 ➔</span>
          </button>
        )}
      </div>
    </div>
  );
};
