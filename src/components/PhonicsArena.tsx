import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles, ChevronRight, ChevronLeft, HelpCircle, AudioLines, Flame } from 'lucide-react';
import { PhonicsExercise } from '../types/curriculum';
import { PhonicsMouthDiagram } from './PhonicsMouthDiagram';
import {
  speakEnglish,
  speakPhonicsTargetSound,
  speakPhonemeOnly,
  playSuccessSound,
  playSoftRetrySound,
  triggerCelebration
} from '../utils/audio';

import { BookOpen, Gamepad2 } from 'lucide-react';
import { ActiveTab } from './TabletHeader';

interface PhonicsArenaProps {
  exercises: PhonicsExercise[];
  onReward: (points: number) => void;
  onNavigateToTab?: (tab: ActiveTab) => void;
}

export const PhonicsArena: React.FC<PhonicsArenaProps> = ({ exercises, onReward, onNavigateToTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [showMouthHelp, setShowMouthHelp] = useState(true);
  const [activeSpeechWord, setActiveSpeechWord] = useState<string | null>(null);

  const currentExercise = exercises[currentIndex];
  const isTargetSelected = selectedWordId === currentExercise.targetWord.id;

  // Web Speech API triggers
  const handlePlayWord = (word: string, rate: number = 0.82) => {
    setActiveSpeechWord(word);
    speakEnglish(word, rate, () => setActiveSpeechWord(null));
  };

  const handlePlayTargetWord = () => {
    handlePlayWord(currentExercise.targetWord.audioText, 0.82);
  };

  const handlePlayTargetSound = () => {
    setActiveSpeechWord(currentExercise.targetLetter);
    speakPhonicsTargetSound(currentExercise.targetLetter, currentExercise.targetWord.word, () => {
      setActiveSpeechWord(null);
    });
  };

  const handlePlayPhonemeOnly = (letter: string) => {
    setActiveSpeechWord(letter);
    speakPhonemeOnly(letter, () => setActiveSpeechWord(null));
  };

  const handlePlaySlowAudio = () => {
    handlePlayWord(currentExercise.targetWord.audioText, 0.65);
  };

  const handleSelectOption = (wordId: string) => {
    if (hasChecked && isTargetSelected) return;
    setSelectedWordId(wordId);
    setHasChecked(false);
  };

  const handleCheck = () => {
    if (!selectedWordId) return;
    setHasChecked(true);

    if (selectedWordId === currentExercise.targetWord.id) {
      playSuccessSound();
      triggerCelebration();
      onReward(25);
    } else {
      playSoftRetrySound();
    }
  };

  const handleNext = () => {
    setSelectedWordId(null);
    setHasChecked(false);
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setSelectedWordId(null);
    setHasChecked(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Randomized or fixed order pairing
  const options = [currentExercise.targetWord, currentExercise.distractorWord].sort(
    (a, b) => a.letter.localeCompare(b.letter)
  );

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Unit Scope & Vocab Navigation Explainer Banner */}
      <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-200/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-800">
          <span className="text-xl">🔎</span>
          <div>
            <strong className="block text-slate-900 font-bold">
              אתגר הבחנת צלילים (4 זוגות מילים פונטיים):
            </strong>
            <span className="text-slate-600">
              כאן מתאמנים על הבחנת שמיעה בין צלילי היעד (P מול F). לכל 27 המילים של היחידה עברו ללשונית "אוצר מילים".
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto">
          {onNavigateToTab && (
            <>
              <button
                type="button"
                onClick={() => onNavigateToTab('vocab_glossary')}
                className="flex-1 sm:flex-none px-3 py-1.5 bg-white hover:bg-purple-50 text-purple-700 font-bold border border-purple-200 rounded-xl transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
                title="מעבר לרשימת כל 27 המילים של היחידה"
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>כל 27 מילות היחידה ➔</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('vocab_challenge')}
                className="flex-1 sm:flex-none px-3 py-1.5 bg-white hover:bg-amber-50 text-amber-800 font-bold border border-amber-200 rounded-xl transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
                title="מעבר לאתגר 5 מילות תמונה-מילה"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-amber-600" />
                <span>אתגר תמונה-מילה (5)</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Top Exercise Header & Instructions with direct 'Listen' button next to exercise */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
        {/* Quick Exercise Jump Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-xs font-bold text-slate-500 ml-1">בחר זוג:</span>
            {exercises.map((ex, idx) => {
              const pairLabel = `${ex.targetWord.word} / ${ex.distractorWord.word}`;
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={ex.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setSelectedWordId(null);
                    setHasChecked(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-english transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {pairLabel}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md shrink-0">
            תרגיל {currentIndex + 1} מתוך {exercises.length}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
              תרגיל {currentIndex + 1} מתוך {exercises.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              זיהוי זוגות מינימליים (Minimal Pairs)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Primary 'Listen to Target Sound' Button integrated directly next to exercise header */}
            <button
              onClick={handlePlayTargetSound}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs active:scale-95 min-h-[38px] ${
                activeSpeechWord === currentExercise.targetLetter
                  ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                  : 'bg-sky-600 hover:bg-sky-500 text-white'
              }`}
              title="האזנה לצליל היעד באמצעות Web Speech API"
            >
              <Volume2 className={`w-4 h-4 ${activeSpeechWord === currentExercise.targetLetter ? 'animate-bounce' : 'animate-pulse'}`} />
              <span>האזנה לצליל היעד ({currentExercise.targetLetter})</span>
            </button>

            <button
              onClick={() => setShowMouthHelp(!showMouthHelp)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-sky-700 px-2.5 py-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer min-h-[38px]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showMouthHelp ? 'הסתר מנח שפתיים' : 'איך מבדילים?'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {currentExercise.titleHe}
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              {currentExercise.instructionHe}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-[11px] font-semibold text-sky-800 bg-sky-100/70 px-2.5 py-1 rounded-md">
              אות היעד: <strong className="font-english text-sm">{currentExercise.targetLetter}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: Audio Listening & Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left / Main Workspace (LTR English Canvas) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          {/* Audio Trigger Zone: Integrated Web Speech API controls */}
          <div className="flex flex-col items-center justify-center py-5 sm:py-6 bg-radial from-sky-50/70 to-slate-50 rounded-2xl border border-sky-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                מרכז השמע (Web Speech API)
              </span>
              {activeSpeechWord && (
                <span className="flex items-center gap-1 text-[11px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full animate-pulse">
                  <AudioLines className="w-3.5 h-3.5" />
                  <span>משמיע: {activeSpeechWord}</span>
                </span>
              )}
            </div>

            {/* Primary Large Listen Button */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md px-4">
              <button
                onClick={handlePlayTargetWord}
                className="flex-1 group flex items-center justify-center gap-3 px-6 py-4 bg-sky-600 hover:bg-sky-500 active:scale-95 text-white rounded-2xl shadow-md shadow-sky-600/20 transition-all cursor-pointer min-h-[56px]"
                aria-label="השמע מילה באנגלית"
              >
                <Volume2 className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col text-right">
                  <span className="text-base sm:text-lg font-bold font-english leading-tight">
                    Listen to Word
                  </span>
                  <span className="text-[11px] opacity-80 font-hebrew">
                    האזנה למילה המלאה
                  </span>
                </div>
              </button>

              {/* Target Sound Isolation Button */}
              <button
                onClick={handlePlayTargetSound}
                className="flex items-center justify-center gap-2 px-4 py-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 active:scale-95 rounded-2xl shadow-xs transition-all cursor-pointer min-h-[56px]"
                title={`השמעת צליל היעד ${currentExercise.targetLetter} מבודד`}
              >
                <Flame className="w-5 h-5 text-amber-600" />
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold font-english">
                    Sound /{currentExercise.targetLetter}/
                  </span>
                  <span className="text-[10px] text-amber-800 font-hebrew">
                    צליל היעד
                  </span>
                </div>
              </button>
            </div>

            {/* Secondary Listening Options: Slow Speed & Phoneme Plosive/Fricative */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 dir-rtl">
              <button
                onClick={handlePlaySlowAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                title="האזנה במהירות איטית להבחנה בין הצלילים"
              >
                <span>🐢</span>
                <span>האזנה איטית (0.65x)</span>
              </button>

              <button
                onClick={() => handlePlayPhonemeOnly(currentExercise.targetLetter)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                title={`השמעת הברה ממוקדת עבור ${currentExercise.targetLetter}`}
              >
                <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                <span>הברת צליל: /{currentExercise.targetLetter.toLowerCase()}/</span>
              </button>
            </div>

            <span className="text-xs text-slate-500 mt-3 font-hebrew">
              (רמז: האם הצליל הפותח הוא פּ דגושה עם פיצוץ שפתיים או פֿ רפה עם נשיפת אוויר?)
            </span>
          </div>

          {/* Cards Selection with Individual 'Listen' Buttons (Massive Touch Hitboxes for Tablet) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 dir-ltr" dir="ltr">
            {options.map((item) => {
              const isSelected = selectedWordId === item.id;
              const isTarget = item.id === currentExercise.targetWord.id;
              const showResult = hasChecked;

              let cardBorder = 'border-slate-200 hover:border-sky-300 bg-slate-50/60 hover:bg-white';
              if (isSelected) {
                cardBorder = 'border-sky-500 bg-sky-50/80 shadow-sm ring-2 ring-sky-200';
              }
              if (showResult && isSelected) {
                cardBorder = isTarget
                  ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-200'
                  : 'border-rose-400 bg-rose-50/80 ring-2 ring-rose-200';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectOption(item.id)}
                  className={`flex flex-col items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer min-h-[160px] text-center ${cardBorder}`}
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold font-english text-sm flex items-center justify-center">
                      {item.letter}
                    </span>

                    {/* Dedicated Card 'Listen' Button with e.stopPropagation() */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayWord(item.word);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-sky-50 text-sky-700 border border-slate-200 hover:border-sky-300 rounded-lg text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer min-h-[36px]"
                      title={`האזנה למילה ${item.word}`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                      <span className="font-english">Listen</span>
                    </button>
                  </div>

                  <div className="my-2">
                    <span className="text-2xl sm:text-3xl font-extrabold font-english text-slate-900 tracking-tight block">
                      {item.word}
                    </span>
                    <span className="text-xs text-slate-500 font-mono block mt-0.5">
                      {item.ipa}
                    </span>
                  </div>

                  <div className="w-full border-t border-slate-200/60 pt-2 flex flex-col items-center">
                    <span className="text-sm font-semibold text-slate-700 font-hebrew">
                      {item.hebrewTranslation}
                    </span>
                    <span className="text-[11px] text-slate-500 font-hebrew mt-0.5">
                      מקבילה עברית: {item.hebrewLetterEquivalent}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback & Result Message */}
          {hasChecked && (
            <div
              className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${
                isTargetSelected
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/90 border-rose-200 text-rose-900'
              }`}
            >
              {isTargetSelected ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-sm">
                <p className="font-bold">
                  {isTargetSelected ? 'תשובה נכונה! כל הכבוד!' : 'לא מדויק הפעם, נסו שוב!'}
                </p>
                <p className="mt-1 text-xs opacity-90 leading-relaxed font-hebrew">
                  {currentExercise.explanationHe}
                </p>
              </div>
            </div>
          )}

          {/* Primary Action Bar (Thumb-Zone Optimized for Tablet Landscape & Portrait) */}
          <div className="flex items-center justify-between gap-3 mt-5 pt-3 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-4 py-2.5 text-xs font-semibold text-slate-600 disabled:opacity-30 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer min-h-[44px]"
            >
              <ChevronRight className="w-4 h-4" />
              <span>תרגיל קודם</span>
            </button>

            {!hasChecked ? (
              <button
                onClick={handleCheck}
                disabled={!selectedWordId}
                className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>בדיקת תשובה</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-sky-600/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <span>התרגיל הבא</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Articulatory Scaffolding Drawer (Pedagogical Insight) */}
        {showMouthHelp && (
          <div className="lg:col-span-4 flex flex-col justify-between bg-slate-100/70 rounded-2xl p-4 sm:p-5 border border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  מפת השפתיים והשיניים לילדים
                </span>
                <span className="text-[11px] text-sky-700 bg-sky-100/60 font-medium px-2 py-0.5 rounded">
                  {currentExercise.articulationGuide.soundNameEn}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <PhonicsMouthDiagram letter="P" />
                <PhonicsMouthDiagram letter="F" />
              </div>

              <div className="space-y-2 text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">
                  💡 טיפ בלשי להבחנה:
                </p>
                <p>{currentExercise.hebrewHint}</p>
                <div className="pt-2 border-t border-slate-100 text-slate-600 font-medium">
                  {currentExercise.articulationGuide.mnemonicHe}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              מיועד לתלמידי כיתות ד׳-ה׳ כחלק מתכנית הלימודים של משרד החינוך (Band I).
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
