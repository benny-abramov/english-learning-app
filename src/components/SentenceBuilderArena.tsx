import React, { useState, useMemo } from 'react';
import { Volume2, RotateCcw, CheckCircle2, Sparkles, ChevronRight, ChevronLeft, ArrowLeftRight, HelpCircle, Shuffle } from 'lucide-react';
import { SentenceBuildingExercise } from '../types/curriculum';
import { speakEnglish, playSuccessSound, playSoftRetrySound, playPopSound, triggerCelebration } from '../utils/audio';

interface SentenceBuilderArenaProps {
  exercises: SentenceBuildingExercise[];
  onReward: (points: number) => void;
}

export const SentenceBuilderArena: React.FC<SentenceBuilderArenaProps> = ({ exercises, onReward }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedTokenIds, setPlacedTokenIds] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentExercise = exercises[currentIndex];
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Guarantee that tokens are always scrambled and never appear in the exact target sentence order
  const scrambledWordBank = useMemo(() => {
    if (!currentExercise || !currentExercise.scrambledTokens) return [];
    const tokens = [...currentExercise.scrambledTokens];

    // Fisher-Yates shuffle
    for (let i = tokens.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
    }

    // Double check that it does not match the target sentence order
    const target = currentExercise.targetSentenceTokens || [];
    const isIdentical =
      tokens.length > 2 &&
      target.length > 2 &&
      tokens.slice(0, target.length).every((t, idx) => t.text === target[idx]);

    if (isIdentical && tokens.length > 1) {
      [tokens[0], tokens[1]] = [tokens[1], tokens[0]];
    }

    return tokens;
  }, [currentExercise?.id, shuffleSeed]);

  const handleAddToken = (tokenId: string) => {
    if (placedTokenIds.includes(tokenId)) return;
    playPopSound();
    setPlacedTokenIds(prev => [...prev, tokenId]);
    setHasChecked(false);
  };

  const handleRemoveToken = (tokenId: string) => {
    playPopSound();
    setPlacedTokenIds(prev => prev.filter(id => id !== tokenId));
    setHasChecked(false);
  };

  const handleReset = () => {
    setPlacedTokenIds([]);
    setHasChecked(false);
  };

  const currentAssembledTokens = placedTokenIds.map(id => {
    const token = currentExercise.scrambledTokens.find(t => t.id === id);
    return token ? token.text : '';
  });

  const isComplete = currentAssembledTokens.length === currentExercise.targetSentenceTokens.length;
  const isCorrect =
    isComplete &&
    currentAssembledTokens.every((token, idx) => token === currentExercise.targetSentenceTokens[idx]);

  const handleCheck = () => {
    setHasChecked(true);
    if (isCorrect) {
      playSuccessSound();
      triggerCelebration();
      onReward(40);
      speakEnglish(currentExercise.audioFullSentence, 0.82);
    } else {
      playSoftRetrySound();
    }
  };

  const handleNext = () => {
    setPlacedTokenIds([]);
    setHasChecked(false);
    setShowHint(false);
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setPlacedTokenIds([]);
    setHasChecked(false);
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleListen = () => {
    speakEnglish(currentExercise.audioFullSentence, 0.82);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header and Guidelines */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-md">
              משימה {currentIndex + 1} מתוך {exercises.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              בניית משפט משמאל לימין (LTR)
            </span>
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-violet-700 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showHint ? 'הסתר רמז' : 'רמז לאות גדולה'}</span>
          </button>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          בנאי המשפטים: הרכיבו את המשפט באנגלית
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          הקישו על לבני המילים לפי הסדר המדויק משמאל לימין. שימו לב לאות הראשונה ולפועל העזר!
        </p>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Sentence Assembly Stage */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div>
            {/* Hebrew Stimulus Sentence */}
            <div className="flex items-center justify-between p-4 bg-violet-50/60 rounded-xl border border-violet-100 mb-5">
              <div>
                <span className="text-xs font-semibold text-violet-900/70 block">
                  המשפט המבוקש בעברית:
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hebrew">
                  &quot;{currentExercise.hebrewPromptSentence}&quot;
                </span>
              </div>

              <button
                onClick={handleListen}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-violet-700 bg-white hover:bg-violet-100/70 rounded-xl border border-violet-200 transition-colors cursor-pointer shrink-0"
                title="האזנה למשפט באנגלית"
              >
                <Volume2 className="w-4 h-4 text-violet-600" />
                <span className="hidden sm:inline">האזנה</span>
              </button>
            </div>

            {/* Hint Callout (when toggled) */}
            {showHint && (
              <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <span className="font-bold shrink-0">💡 רמז דקדוקי:</span>
                <span>{currentExercise.capitalizationTipHe} {currentExercise.ruleExplanationHe}</span>
              </div>
            )}

            {/* Target Assembly Slot Area (Always LTR) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 font-english uppercase tracking-wider flex items-center gap-1.5" dir="ltr">
                  <span>English Sentence Canvas</span>
                  <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                </span>

                {placedTokenIds.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer font-hebrew"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>איפוס לבנים</span>
                  </button>
                )}
              </div>

              {/* Dropped / Tap-Built Tokens Area */}
              <div
                className={`min-h-[96px] p-4 bg-slate-50/80 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2.5 dir-ltr ${
                  hasChecked
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-50/40'
                      : 'border-rose-400 bg-rose-50/40'
                    : 'border-dashed border-slate-300'
                }`}
                dir="ltr"
              >
                {placedTokenIds.length === 0 ? (
                  <span className="text-slate-400 font-english text-sm italic select-none">
                    Tap the word blocks below to build the sentence from left to right...
                  </span>
                ) : (
                  placedTokenIds.map((id, index) => {
                    const token = currentExercise.scrambledTokens.find(t => t.id === id);
                    if (!token) return null;

                    return (
                      <button
                        key={id}
                        onClick={() => handleRemoveToken(id)}
                        className="group flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-rose-50 border-2 border-slate-300 hover:border-rose-300 rounded-xl shadow-xs text-slate-900 font-english text-base sm:text-lg font-bold transition-all cursor-pointer animate-soft-bounce"
                        title="הקש להסרת המילה"
                      >
                        <span>{token.text}</span>
                        <span className="text-[10px] text-slate-300 group-hover:text-rose-500 font-mono">
                          ×
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Word Bank Area */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 font-hebrew">
                  בנק הלבנים (הקישו להוספה למשפט):
                </span>
                <button
                  type="button"
                  onClick={() => setShuffleSeed(prev => prev + 1)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-800 bg-violet-50 hover:bg-violet-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  title="ערבב את הלבנים בסדר שונה"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>ערבב לבנים 🔀</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5 dir-ltr" dir="ltr">
                {scrambledWordBank.map((token) => {
                  const isPlaced = placedTokenIds.includes(token.id);

                  return (
                    <button
                      key={token.id}
                      onClick={() => handleAddToken(token.id)}
                      disabled={isPlaced}
                      className={`min-h-[48px] px-4 py-2.5 rounded-xl border-2 font-english text-base sm:text-lg font-bold transition-all cursor-pointer active:scale-95 ${
                        isPlaced
                          ? 'opacity-25 bg-slate-100 border-slate-200 text-slate-400 pointer-events-none'
                          : 'bg-white hover:bg-violet-50 border-slate-200 hover:border-violet-400 text-slate-800 shadow-xs'
                      }`}
                    >
                      {token.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback Box */}
            {hasChecked && (
              <div
                className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${
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
                    {isCorrect ? 'משפט מושלם! בדיוק ככה מדברים באנגלית!' : 'יש כאן טעות בסדר המילים או בבחירה, נסו שוב!'}
                  </p>
                  <p className="mt-1 text-xs opacity-90 leading-relaxed font-hebrew">
                    {currentExercise.ruleExplanationHe}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-3 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-4 py-2.5 text-xs font-semibold text-slate-600 disabled:opacity-30 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
              <span>משפט קודם</span>
            </button>

            {!hasChecked ? (
              <button
                onClick={handleCheck}
                disabled={placedTokenIds.length === 0}
                className="flex items-center gap-2 px-8 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-violet-600/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>בדיקת המשפט</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-sky-600/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <span>המשפט הבא</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Scaffolding / Rules Card */}
        <div className="lg:col-span-4 bg-slate-100/70 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              כללי ברזל לבניית משפט באנגלית
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              עוברים מעברית (RTL) לאנגלית (LTR) בקלות:
            </p>

            <div className="space-y-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  1. אות גדולה (Capital Letter)
                </span>
                <p className="text-slate-600">
                  כל משפט באנגלית מתחיל תמיד באות גדולה! כמו כן, שמות פרטיים והמילה I (אני) נכתבים באות גדולה.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  2. אל תשכחו את הפועל!
                </span>
                <p className="text-slate-600">
                  אם אין פועל רגיל (כמו play או eat), חייבים להכניס את פועל העזר: <span className="font-english font-semibold">is / am / are</span>.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  3. נקודה בסוף משפט (.)
                </span>
                <p className="text-slate-600">
                  המשפט מסתיים בנקודה בצד ימין שלו (בסוף כיוון הכתיבה LTR).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-hebrew">
            תואם בנצ׳מרק דקדוקי משרד החינוך לכיתות ד׳-ה׳ (Band I).
          </div>
        </div>
      </div>
    </div>
  );
};
