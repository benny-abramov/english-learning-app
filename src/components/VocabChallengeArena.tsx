import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Trophy,
  ArrowRight,
  Eye,
  EyeOff,
  Flame,
  Award,
  Layers,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UnitVocabChallenge, VocabChallengeCard } from '../types/vocabChallenge';
import { vocabChallengeUnits } from '../data/vocabChallengeData';
import {
  speakEnglish,
  playGentleSuccessTone,
  playIncorrectTone,
  playXpEarnedTone,
  triggerCelebration
} from '../utils/audio';

interface VocabChallengeArenaProps {
  initialUnitId?: string;
  onReward: (points: number) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

type ArenaMode = 'match' | 'quiz' | 'cards';

export const VocabChallengeArena: React.FC<VocabChallengeArenaProps> = ({
  initialUnitId = 'unit-1',
  onReward,
  onNavigateToUnit
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId);
  const [activeMode, setActiveMode] = useState<ArenaMode>('match');

  // Match Mode state
  const [selectedImageCardId, setSelectedImageCardId] = useState<string | null>(null);
  const [selectedWordCardId, setSelectedWordCardId] = useState<string | null>(null);
  const [matchedCardIds, setMatchedCardIds] = useState<string[]>([]);
  const [isMismatching, setIsMismatching] = useState<boolean>(false);
  const [matchCompleted, setMatchCompleted] = useState<boolean>(false);

  // Quiz Mode state
  const [quizWordIndex, setQuizWordIndex] = useState<number>(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showHebrewHint, setShowHebrewHint] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Active unit data
  const currentUnit: UnitVocabChallenge = useMemo(() => {
    return vocabChallengeUnits.find((u) => u.unitId === selectedUnitId) || vocabChallengeUnits[0];
  }, [selectedUnitId]);

  // Shuffled items for match mode
  const shuffledImages = useMemo(() => {
    return [...currentUnit.words].sort(() => 0.5 - Math.random());
  }, [currentUnit]);

  const shuffledWords = useMemo(() => {
    return [...currentUnit.words].sort(() => 0.5 - Math.random());
  }, [currentUnit]);

  // Reset states whenever unit changes
  useEffect(() => {
    resetMatchMode();
    resetQuizMode();
  }, [selectedUnitId]);

  const resetMatchMode = () => {
    setSelectedImageCardId(null);
    setSelectedWordCardId(null);
    setMatchedCardIds([]);
    setIsMismatching(false);
    setMatchCompleted(false);
  };

  const resetQuizMode = () => {
    setQuizWordIndex(0);
    setSelectedQuizAnswer(null);
    setQuizIsAnswered(false);
    setQuizScore(0);
    setShowHebrewHint(false);
    setQuizCompleted(false);
  };

  // Current quiz word and shuffled 4 choices
  const currentQuizWord = currentUnit.words[quizWordIndex] || currentUnit.words[0];
  const quizChoices = useMemo(() => {
    if (!currentQuizWord) return [];
    const all = [currentQuizWord.word, ...currentQuizWord.distractorsEn];
    return all.sort(() => 0.5 - Math.random());
  }, [currentQuizWord]);

  // Handle Match Selection
  const handleSelectImage = (card: VocabChallengeCard) => {
    if (matchedCardIds.includes(card.id) || isMismatching) return;
    speakEnglish(card.word);
    setSelectedImageCardId(card.id);

    // If word already selected, check match
    if (selectedWordCardId) {
      evaluateMatch(card.id, selectedWordCardId);
    }
  };

  const handleSelectWord = (card: VocabChallengeCard) => {
    if (matchedCardIds.includes(card.id) || isMismatching) return;
    speakEnglish(card.word);
    setSelectedWordCardId(card.id);

    // If image already selected, check match
    if (selectedImageCardId) {
      evaluateMatch(selectedImageCardId, card.id);
    }
  };

  const evaluateMatch = (imageId: string, wordId: string) => {
    if (imageId === wordId) {
      // MATCH SUCCESS
      playGentleSuccessTone();
      const nextMatched = [...matchedCardIds, imageId];
      setMatchedCardIds(nextMatched);
      setSelectedImageCardId(null);
      setSelectedWordCardId(null);

      // Check if all 5 words matched
      if (nextMatched.length === currentUnit.words.length) {
        setMatchCompleted(true);
        playXpEarnedTone();
        triggerCelebration();
        onReward(35);
      }
    } else {
      // MISMATCH
      playIncorrectTone();
      setIsMismatching(true);
      setTimeout(() => {
        setSelectedImageCardId(null);
        setSelectedWordCardId(null);
        setIsMismatching(false);
      }, 700);
    }
  };

  // Handle Quiz Selection
  const handleQuizAnswer = (chosenWord: string) => {
    if (quizIsAnswered) return;
    setSelectedQuizAnswer(chosenWord);
    setQuizIsAnswered(true);

    const isCorrect = chosenWord.toLowerCase() === currentQuizWord.word.toLowerCase();
    if (isCorrect) {
      playGentleSuccessTone();
      speakEnglish(currentQuizWord.word);
      setQuizScore((prev) => prev + 1);
      onReward(10);
    } else {
      playIncorrectTone();
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizWordIndex + 1 < currentUnit.words.length) {
      setQuizWordIndex((prev) => prev + 1);
      setSelectedQuizAnswer(null);
      setQuizIsAnswered(false);
      setShowHebrewHint(false);
    } else {
      setQuizCompleted(true);
      playXpEarnedTone();
      triggerCelebration();
      onReward(25);
    }
  };

  const handleNextUnit = () => {
    const nextIndex = (currentUnit.unitNumber % vocabChallengeUnits.length);
    const nextUnit = vocabChallengeUnits[nextIndex];
    setSelectedUnitId(nextUnit.unitId);
    if (onNavigateToUnit) {
      onNavigateToUnit(nextUnit.unitId);
    }
  };

  const handlePrevUnit = () => {
    const prevIndex = (currentUnit.unitNumber - 2 + vocabChallengeUnits.length) % vocabChallengeUnits.length;
    const prevUnit = vocabChallengeUnits[prevIndex];
    setSelectedUnitId(prevUnit.unitId);
    if (onNavigateToUnit) {
      onNavigateToUnit(prevUnit.unitId);
    }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top Banner & Unit Selector */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none transform translate-x-12 -translate-y-12"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentUnit.badgeEmoji}</span>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full font-english">
                Vocab Challenge Arena · 5 New Words
              </span>
              <span className="text-xs font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
                יחידה {currentUnit.unitNumber}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight font-hebrew">
              {currentUnit.unitTitleHe}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-hebrew">
              {currentUnit.themeHe} · 5 מילים ויזואליות עם תמונות, שמע ומשחקי התאמה
            </p>
          </div>

          {/* Quick Unit Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-black/20 p-1.5 rounded-2xl backdrop-blur-xs">
            <button
              onClick={handlePrevUnit}
              title="יחידה קודמת"
              className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <select
              value={selectedUnitId}
              onChange={(e) => {
                setSelectedUnitId(e.target.value);
                if (onNavigateToUnit) onNavigateToUnit(e.target.value);
              }}
              className="bg-white/90 text-slate-900 text-xs font-bold py-1.5 px-3 rounded-xl border-none outline-none cursor-pointer"
            >
              {vocabChallengeUnits.map((u) => (
                <option key={u.unitId} value={u.unitId}>
                  יחידה {u.unitNumber}: {u.unitTitleEn}
                </option>
              ))}
            </select>
            <button
              onClick={handleNextUnit}
              title="יחידה הבאה"
              className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveMode('match')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'match'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>התאמת תמונה למילה (5 מילים)</span>
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'quiz'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>חידון תמונה בזק (אמריקאי)</span>
          </button>
          <button
            onClick={() => setActiveMode('cards')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'cards'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>כרטיסיות לימוד ומידע קולי</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: MATCH IMAGE TO WORD ARENA                             */}
      {/* ============================================================== */}
      {activeMode === 'match' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-hebrew">
                התאימו כל תמונה למילה המתאימה באנגלית!
              </h3>
              <p className="text-xs text-slate-500 font-hebrew">
                לחצו על כרטיס תמונה ולאחר מכן על המילה הנכונה. הקשיבו לצליל בעת הלחיצה!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                הותאמו: {matchedCardIds.length} / {currentUnit.words.length}
              </span>
              <button
                onClick={resetMatchMode}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ערבוב מחדש</span>
              </button>
            </div>
          </div>

          {/* Victory Modal if all 5 completed */}
          {matchCompleted ? (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                🏆
              </div>
              <div className="space-y-1">
                <h4 className="text-xl sm:text-2xl font-black font-hebrew">
                  כל הכבוד! הצלחה מושלמת!
                </h4>
                <p className="text-sm text-emerald-100 font-hebrew">
                  התאמתם את כל 5 המילים החדשות ביחידה {currentUnit.unitNumber} וזכיתם ב-+35 נקודות XP!
                </p>
              </div>

              {/* Word Recap Badges */}
              <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto pt-2">
                {currentUnit.words.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => speakEnglish(w.word)}
                    className="flex items-center gap-1.5 bg-white text-emerald-900 font-bold px-3 py-1.5 rounded-xl text-xs hover:scale-105 transition-transform cursor-pointer shadow-xs"
                  >
                    <span>{w.emojiFallback}</span>
                    <span className="font-english">{w.word}</span>
                    <span className="text-emerald-700">({w.translationHe})</span>
                    <Volume2 className="w-3 h-3 text-emerald-600" />
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={resetMatchMode}
                  className="px-4 py-2 bg-white text-emerald-800 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer shadow-xs"
                >
                  תרגלו שוב את היחידה
                </button>
                <button
                  onClick={() => setActiveMode('quiz')}
                  className="px-4 py-2 bg-emerald-900 text-white font-bold text-xs rounded-xl hover:bg-emerald-950 transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                >
                  <span>עברו לחידון בזק</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Matching Arena */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Column 1: Illustrated Image Cards */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                  <span>תמונות להמחשה</span>
                  <span className="text-[11px] text-slate-400">לחצו על תמונה</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-2.5">
                  {shuffledImages.map((card) => {
                    const isMatched = matchedCardIds.includes(card.id);
                    const isSelected = selectedImageCardId === card.id;

                    return (
                      <button
                        key={`img-${card.id}`}
                        onClick={() => handleSelectImage(card)}
                        disabled={isMatched || isMismatching}
                        className={`w-full flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-right ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-300 opacity-80 cursor-default'
                            : isSelected
                            ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                            : isMismatching && isSelected
                            ? 'bg-rose-50 border-rose-500 animate-shake'
                            : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Image Thumbnail with fallback */}
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300/60 shadow-2xs">
                            <img
                              src={card.imageUrl}
                              alt={card.imageAlt}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to emoji banner if network blocked
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-2xl pointer-events-none -z-1">
                              {card.emojiFallback}
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                              {card.category}
                            </span>
                            <div className="text-xs font-bold text-slate-700 mt-1">
                              {card.translationHe}
                            </div>
                            <span className="text-[11px] text-slate-600 italic">
                              {card.imageAlt}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakEnglish(card.word);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="האזנה להגייה"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          {isMatched && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: English Word Cards */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                  <span>מילים באנגלית (English Words)</span>
                  <span className="text-[11px] text-slate-400">בחרו את המילה המתאימה</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {shuffledWords.map((card) => {
                    const isMatched = matchedCardIds.includes(card.id);
                    const isSelected = selectedWordCardId === card.id;

                    return (
                      <button
                        key={`word-${card.id}`}
                        onClick={() => handleSelectWord(card)}
                        disabled={isMatched || isMismatching}
                        className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-300 opacity-80 cursor-default'
                            : isSelected
                            ? 'bg-indigo-50 border-indigo-600 shadow-md ring-2 ring-indigo-300 scale-[1.02]'
                            : isMismatching && isSelected
                            ? 'bg-rose-50 border-rose-500 animate-shake'
                            : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                            {card.word[0]}
                          </div>
                          <div className="text-left font-english">
                            <span className="text-base font-extrabold text-slate-900 block tracking-wide">
                              {card.word}
                            </span>
                            {isMatched && (
                              <span className="text-xs text-emerald-700 font-hebrew font-medium">
                                ✓ {card.translationHe}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakEnglish(card.word);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="האזנה להגייה"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          {isMatched && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: SPEED PICTURE QUIZ                                    */}
      {/* ============================================================== */}
      {activeMode === 'quiz' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider font-english">
                Speed Picture Quiz
              </span>
              <h3 className="text-base font-bold text-slate-900 font-hebrew">
                מה רואים בתמונה? בחרו את המילה הנכונה באנגלית
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                שאלה {quizWordIndex + 1} מתוך {currentUnit.words.length}
              </span>
              <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>{quizScore} נקודות</span>
              </span>
            </div>
          </div>

          {quizCompleted ? (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                🌟
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-hebrew">
                סיימתם את חידון הבזק של יחידה {currentUnit.unitNumber}!
              </h4>
              <p className="text-sm text-indigo-100 font-hebrew">
                עניתם נכון על {quizScore} מתוך {currentUnit.words.length} שאלות!
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetQuizMode}
                  className="px-4 py-2 bg-white text-indigo-900 font-bold text-xs rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  שחקו שוב בחידון
                </button>
                <button
                  onClick={() => setActiveMode('match')}
                  className="px-4 py-2 bg-indigo-950 text-white font-bold text-xs rounded-xl hover:bg-black transition-colors cursor-pointer"
                >
                  חזרה להתאמת תמונות
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-5">
              {/* Question Image Card */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video max-h-72 shadow-inner border border-slate-200">
                <img
                  src={currentQuizWord.imageUrl}
                  alt={currentQuizWord.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5">
                  <span className="text-base">{currentQuizWord.emojiFallback}</span>
                  <span>{currentQuizWord.category}</span>
                </div>
                <button
                  onClick={() => speakEnglish(currentQuizWord.word)}
                  className="absolute bottom-3 right-3 bg-indigo-600/90 hover:bg-indigo-600 text-white p-2.5 rounded-xl backdrop-blur-xs shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>השמעת מילה</span>
                </button>
              </div>

              {/* Hebrew Hint Drawer Toggle */}
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={() => setShowHebrewHint(!showHebrewHint)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  {showHebrewHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showHebrewHint ? 'הסתר רמז בעברית' : 'צריכים רמז? לחצו כאן'}</span>
                </button>
                {currentQuizWord.phoneticTipHe && (
                  <span className="text-[11px] text-slate-500 font-hebrew">
                    💡 {currentQuizWord.phoneticTipHe}
                  </span>
                )}
              </div>

              {showHebrewHint && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 font-hebrew animate-in fade-in">
                  תרגום בעברית: <span className="font-bold">{currentQuizWord.translationHe}</span>
                </div>
              )}

              {/* 4 Choices Grid */}
              <div className="grid grid-cols-2 gap-3">
                {quizChoices.map((choice) => {
                  const isSelected = selectedQuizAnswer === choice;
                  const isCorrect = choice.toLowerCase() === currentQuizWord.word.toLowerCase();

                  let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                  if (quizIsAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-black ring-2 ring-emerald-300';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                    } else {
                      btnStyle = 'opacity-50 border-slate-200 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={choice}
                      disabled={quizIsAnswered}
                      onClick={() => handleQuizAnswer(choice)}
                      className={`p-3.5 rounded-2xl border-2 text-center font-english text-base font-bold transition-all cursor-pointer shadow-2xs ${btnStyle}`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Button */}
              {quizIsAnswered && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
                  <div className="text-right space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <span>משפט דוגמה:</span>
                      <span className="font-english text-indigo-700 font-semibold">{currentQuizWord.exampleSentenceEn}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-hebrew block">
                      {currentQuizWord.exampleSentenceHe}
                    </span>
                  </div>

                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>{quizWordIndex + 1 === currentUnit.words.length ? 'סיום חידון' : 'שאלה הבאה'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 3: FLASHCARDS & VOCAB EXPLORER                           */}
      {/* ============================================================== */}
      {activeMode === 'cards' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-hebrew">
                כרטיסיות אוצר מילים ויזואליות
              </h3>
              <p className="text-xs text-slate-500 font-hebrew">
                לחצו על הרמקול לשמיעת ההגייה המדויקת ומשפטי דוגמה.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              5 מילים ביחידה {currentUnit.unitNumber}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUnit.words.map((word) => (
              <div
                key={`card-${word.id}`}
                className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 hover:border-indigo-300 transition-all hover:shadow-md flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-200 mb-3 shadow-2xs">
                    <img
                      src={word.imageUrl}
                      alt={word.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-xs">
                      <span>{word.emojiFallback}</span>
                      <span>{word.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-lg font-black text-slate-900 font-english tracking-tight">
                      {word.word}
                    </h4>
                    <button
                      onClick={() => speakEnglish(word.word)}
                      className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="האזנה למילה"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs font-bold text-slate-700 font-hebrew mb-2">
                    {word.translationHe}
                  </div>

                  {word.phoneticTipHe && (
                    <div className="bg-amber-50 text-amber-900 border border-amber-200/60 rounded-xl p-2 text-[11px] font-hebrew mb-2">
                      💡 {word.phoneticTipHe}
                    </div>
                  )}

                  <div className="bg-white rounded-xl p-2 border border-slate-100 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-indigo-950 font-english font-medium">
                      <span>{word.exampleSentenceEn}</span>
                      <button
                        onClick={() => speakEnglish(word.exampleSentenceEn)}
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                        title="האזנה למשפט"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-slate-500 font-hebrew">
                      {word.exampleSentenceHe}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    speakEnglish(word.word);
                    onReward(5);
                  }}
                  className="w-full py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  <span>תרגול קולי (+5 XP)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
