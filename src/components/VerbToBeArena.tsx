import React, { useState } from 'react';
import { Volume2, Wrench, CheckCircle2, Sparkles, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { VerbConjugationExercise, ToBeConjugation } from '../types/curriculum';
import { speakEnglish, playSuccessSound, playSoftRetrySound, triggerCelebration } from '../utils/audio';

interface VerbToBeArenaProps {
  exercises: VerbConjugationExercise[];
  onReward: (points: number) => void;
}

export const VerbToBeArena: React.FC<VerbToBeArenaProps> = ({ exercises, onReward }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedConjugation, setSelectedConjugation] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const currentExercise = exercises[currentIndex];
  const isCorrect = selectedConjugation === currentExercise.correctAnswer;

  const handleSelect = (option: string) => {
    if (hasChecked && isCorrect) return;
    setSelectedConjugation(option);
    setHasChecked(false);
  };

  const handleCheck = () => {
    if (!selectedConjugation) return;
    setHasChecked(true);

    if (selectedConjugation === currentExercise.correctAnswer) {
      playSuccessSound();
      triggerCelebration();
      onReward(30);
      speakEnglish(currentExercise.audioText, 0.82);
    } else {
      playSoftRetrySound();
    }
  };

  const handleNext = () => {
    setSelectedConjugation(null);
    setHasChecked(false);
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setSelectedConjugation(null);
    setHasChecked(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleListenFull = () => {
    speakEnglish(currentExercise.fullSentenceEn, 0.82);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Exercise Instructions & Zero-Copula Concept Note */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              שלב {currentIndex + 1} מתוך {exercises.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              פועל העזר to be (Zero Copula Trap)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg">
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
            <span>טכנאי המשפטים</span>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          חברו את הבורג החסר של פועל העזר &quot;To Be&quot;
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          בעברית מדלגים על פועל הווה, אך באנגלית המשפט לא יוכל לנסוע בלי בורג החיבור המתאים!
        </p>
      </div>

      {/* Main Mechanic Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Workspace Canvas (LTR Sentence Reconstruction) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div>
            {/* Hebrew Stimulus Banner */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">
                  המשפט בעברית (שימו לב: אין כאן שום פועל!):
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-hebrew">
                  &quot;{currentExercise.hebrewPromptSentence}&quot;
                </span>
              </div>
              <button
                onClick={handleListenFull}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-50 rounded-xl border border-sky-200 transition-colors cursor-pointer shrink-0"
                title="האזנה למשפט המלא באנגלית"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline">השמעת משפט</span>
              </button>
            </div>

            {/* Interactive Sentence Template (LTR) */}
            <div className="p-6 bg-radial from-slate-50 to-slate-100/70 rounded-2xl border-2 border-dashed border-slate-300 flex flex-wrap items-center justify-center gap-3 text-center dir-ltr" dir="ltr">
              {/* Part 1: Subject / Before */}
              <span className="text-xl sm:text-2xl font-bold font-english text-slate-800 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                {currentExercise.baseTemplateBefore}
              </span>

              {/* The Missing Slot (Bolt Target) */}
              <div
                className={`min-w-[120px] px-5 py-2.5 rounded-xl border-2 flex items-center justify-center transition-all ${
                  selectedConjugation
                    ? hasChecked
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-extrabold text-xl'
                        : 'bg-rose-50 border-rose-400 text-rose-800 font-extrabold text-xl'
                      : 'bg-amber-50 border-amber-500 text-amber-900 font-extrabold text-xl ring-2 ring-amber-200'
                    : 'bg-white border-dashed border-amber-400 text-slate-400 font-medium text-sm'
                }`}
              >
                {selectedConjugation ? (
                  <span className="font-english tracking-wide">{selectedConjugation}</span>
                ) : (
                  <span className="flex items-center gap-1 font-hebrew text-amber-700 font-semibold text-xs">
                    <Wrench className="w-3.5 h-3.5 text-amber-600" />
                    <span>בורג חסר</span>
                  </span>
                )}
              </div>

              {/* Part 2: Complement / After */}
              <span className="text-xl sm:text-2xl font-bold font-english text-slate-800 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                {currentExercise.baseTemplateAfter}
              </span>
            </div>

            {/* Conjugation Bolt Bank (Options with 56px+ Touch Targets) */}
            <div className="mt-7">
              <span className="text-xs font-semibold text-slate-500 block mb-3 font-hebrew">
                בחרו את הבורג המתאים ביותר לגוף המשפט:
              </span>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 dir-ltr" dir="ltr">
                {currentExercise.options.map((option) => {
                  const isOptionSelected = selectedConjugation === option;
                  let btnStyle = 'bg-slate-50 hover:bg-white border-slate-200 hover:border-amber-400 text-slate-800';

                  if (isOptionSelected) {
                    btnStyle = 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20';
                  }
                  if (hasChecked && isOptionSelected) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-rose-600 text-white border-rose-700';
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`min-h-[56px] py-3.5 px-4 rounded-xl border-2 font-english text-xl sm:text-2xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${btnStyle}`}
                    >
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation Feedback */}
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
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  <p className="font-bold">
                    {isCorrect ? 'כל הכבוד! הבורג הותקן בהצלחה!' : 'נסו בורג אחר!'}
                  </p>
                  <p className="mt-1 text-xs opacity-90 leading-relaxed font-hebrew">
                    {currentExercise.hebrewContrastLesson}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Navigation */}
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
                disabled={!selectedConjugation}
                className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>הברג ובדוק</span>
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

        {/* Right Reference Matrix (Pedagogical Rule Card) */}
        <div className="lg:col-span-4 bg-slate-100/70 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              מפת הברגים של TO BE באנגלית
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              כלל זהב לילדים ישראלים: התאימו תמיד את פועל העזר לשם הגוף שפותח את המשפט!
            </p>

            <div className="space-y-2.5 text-xs font-english" dir="ltr">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">I</span>
                <span className="font-extrabold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">am</span>
                <span className="text-[11px] text-slate-500 font-hebrew" dir="rtl">(אני)</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">He / She / It / Cat</span>
                <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">is</span>
                <span className="text-[11px] text-slate-500 font-hebrew" dir="rtl">(יחיד)</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">We / You / They / Dogs</span>
                <span className="font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">are</span>
                <span className="text-[11px] text-slate-500 font-hebrew" dir="rtl">(רבים / אתם)</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-900 space-y-1">
              <span className="font-bold block">🚨 המלכודת הישראלית הנפוצה:</span>
              <p className="text-[11px] leading-relaxed">
                בעברית: &quot;דני שמח&quot; (ללא פועל).<br />
                באנגלית: <span className="font-english font-semibold">Danny IS happy</span> (לעולם לא &quot;Danny happy&quot;!).
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-hebrew">
            תואם דרישות תכנית הלימודים של משרד החינוך לכיתות ד׳-ה׳ (Band I).
          </div>
        </div>
      </div>
    </div>
  );
};
