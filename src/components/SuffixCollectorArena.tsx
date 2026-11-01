import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Volume2, Stamp } from 'lucide-react';
import { SuffixCollectorItem } from '../types/curriculum';
import { speakEnglish, playSuccessSound, playSoftRetrySound, playPopSound, triggerCelebration } from '../utils/audio';

interface SuffixCollectorArenaProps {
  items: SuffixCollectorItem[];
  onReward: (points: number) => void;
}

export const SuffixCollectorArena: React.FC<SuffixCollectorArenaProps> = ({ items, onReward }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSuffix, setSelectedSuffix] = useState<string | null>(null);
  const [hasStamped, setHasStamped] = useState(false);

  const currentItem = items[currentIndex];
  const isCorrect = selectedSuffix === currentItem.targetSuffix;

  const suffixes: ('-s' | '-es' | '-ing')[] = ['-s', '-es', '-ing'];

  const handleStamp = (suffix: '-s' | '-es' | '-ing') => {
    if (hasStamped && isCorrect) return;
    playPopSound();
    setSelectedSuffix(suffix);
    setHasStamped(true);

    if (suffix === currentItem.targetSuffix) {
      playSuccessSound();
      triggerCelebration();
      onReward(25);
      speakEnglish(currentItem.fullWord, 0.82);
    } else {
      playSoftRetrySound();
    }
  };

  const handleNext = () => {
    setSelectedSuffix(null);
    setHasStamped(false);
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleListen = () => {
    speakEnglish(hasStamped && isCorrect ? currentItem.fullWord : currentItem.baseWord, 0.82);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
              מילה {currentIndex + 1} מתוך {items.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              משחק אוסף הסיומות (The Suffix Collector)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
            <Stamp className="w-3.5 h-3.5" />
            <span>החתמת סיומות</span>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
          החתימו את המילה בסיומת המתאימה!
        </h2>
        <p className="text-sm text-slate-600 mt-0.5">
          בחרו את החותמת הנכונה: האם להוסיף -ing לפעולה רציפה, או -s/-es לריבוי ויחיד?
        </p>
      </div>

      {/* Main Conveyor / Stamping Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            {/* Word Stamping Zone */}
            <div className="p-8 sm:p-12 bg-radial from-amber-50/60 to-slate-50 rounded-2xl border-2 border-dashed border-amber-200 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold text-slate-500 font-hebrew mb-2">
                משמעות המילה: &quot;{currentItem.hebrewMeaning}&quot;
              </span>

              {/* The Visual Root Word Card */}
              <div className="flex items-center justify-center gap-2 dir-ltr my-3" dir="ltr">
                <span className="text-3xl sm:text-5xl font-black font-english text-slate-900 bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">
                  {currentItem.baseWord}
                </span>

                {/* Stamped Suffix Slot */}
                <span
                  className={`text-3xl sm:text-5xl font-black font-english px-4 py-3 rounded-2xl border-2 transition-all ${
                    selectedSuffix
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-800 animate-soft-bounce'
                        : 'bg-rose-100 border-rose-400 text-rose-800'
                      : 'bg-white border-dashed border-slate-300 text-slate-300'
                  }`}
                >
                  {selectedSuffix || '?'}
                </span>
              </div>

              {/* Spoken Word Trigger */}
              <button
                onClick={handleListen}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>השמעת מילה</span>
              </button>
            </div>

            {/* Stamp Buttons */}
            <div className="mt-6">
              <span className="text-xs font-bold text-slate-500 block mb-3 font-hebrew">
                בחרו חותמת להטבעה על המילה:
              </span>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 dir-ltr" dir="ltr">
                {suffixes.map((suf) => {
                  const isSelected = selectedSuffix === suf;

                  return (
                    <button
                      key={suf}
                      onClick={() => handleStamp(suf)}
                      className={`min-h-[58px] py-3 px-4 rounded-2xl border-2 font-english text-2xl font-black transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                            : 'bg-rose-600 text-white border-rose-700'
                          : 'bg-slate-50 hover:bg-amber-50 border-slate-200 hover:border-amber-400 text-slate-800'
                      }`}
                    >
                      <Stamp className="w-4 h-4 opacity-50" />
                      <span>{suf}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback */}
            {hasStamped && (
              <div
                className={`mt-5 p-4 rounded-xl border flex items-start gap-3 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  <p className="font-bold">
                    {isCorrect ? 'החתמה מדויקת!' : 'סיומת לא מתאימה, נסו חותמת אחרת!'}
                  </p>
                  <p className="mt-1 text-xs opacity-90 leading-relaxed font-hebrew">
                    {currentItem.ruleHintHe}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Navigation */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setSelectedSuffix(null);
                setHasStamped(false);
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ניקוי חותמת</span>
            </button>

            {hasStamped && isCorrect && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-sky-600/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <span>למילה הבאה</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Rules Drawer */}
        <div className="lg:col-span-4 bg-slate-100/70 rounded-3xl p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              מדריך חותמות הסיומות באנגלית
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              איך יודעים איזו סיומת לבחור?
            </p>

            <div className="space-y-3 text-xs">
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="font-bold font-english text-amber-600 text-sm block mb-1">
                  -ing
                </span>
                <p className="text-slate-600 font-hebrew">
                  חותמים כאשר הפעולה מתרחשת <strong>ממש עכשיו בהווה</strong> (running, eating, jumping).
                </p>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="font-bold font-english text-sky-600 text-sm block mb-1">
                  -s
                </span>
                <p className="text-slate-600 font-hebrew">
                  סיומת הריבוי הרגילה לשמות עצם (cats, books, friends) או פועל עם He/She/It בהווה פשוט.
                </p>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="font-bold font-english text-emerald-600 text-sm block mb-1">
                  -es
                </span>
                <p className="text-slate-600 font-hebrew">
                  מוסיפים אחרי מילים שמסתיימות ב-x, s, ch, sh (כמו boxes או watches).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-hebrew">
            תואם את בנצ׳מרק דקדוק משרד החינוך לכיתות ד׳-ה׳ (Band I).
          </div>
        </div>
      </div>
    </div>
  );
};
