import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, Search, HelpCircle, BookOpen, Star, RefreshCw, ZoomIn, ZoomOut, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { unseenPassagesData } from '../data/unseenPassagesData';
import { ReadingPassage, ReadingQuestion } from '../types/readingAndOral';
import { CurriculumUnit } from '../types/curriculum';
import { speakEnglish, playSuccessSound, playSoftRetrySound, triggerCelebration } from '../utils/audio';

interface UnseenReadingLabProps {
  currentUnit?: CurriculumUnit;
  onReward: (points: number) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const UnseenReadingLab: React.FC<UnseenReadingLabProps> = ({
  currentUnit,
  onReward,
  onNavigateToUnit
}) => {
  // Determine default passage based on currentUnit
  const getInitialPassageId = () => {
    if (currentUnit) {
      const unitPassage = unseenPassagesData.find(
        (p) => p.unitId === currentUnit.id || p.unitNumber === currentUnit.unitNumber
      );
      if (unitPassage) return unitPassage.id;
    }
    return unseenPassagesData[0].id;
  };

  const [selectedPassageId, setSelectedPassageId] = useState<string>(getInitialPassageId);
  const [activeLineHighlight, setActiveLineHighlight] = useState<number | null>(null);
  const [highlightedEvidenceLines, setHighlightedEvidenceLines] = useState<number[]>([]);
  const [answersState, setAnswersState] = useState<Record<string, number | null>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [activeGlossaryWord, setActiveGlossaryWord] = useState<string | null>(null);

  // When currentUnit prop changes, update selected passage if it exists
  useEffect(() => {
    if (currentUnit) {
      const match = unseenPassagesData.find(
        (p) => p.unitId === currentUnit.id || p.unitNumber === currentUnit.unitNumber
      );
      if (match) {
        setSelectedPassageId(match.id);
        setActiveLineHighlight(null);
        setHighlightedEvidenceLines([]);
        setAnswersState({});
        setSubmittedQuestions({});
        setActiveGlossaryWord(null);
      }
    }
  }, [currentUnit?.id]);

  const currentPassage: ReadingPassage =
    unseenPassagesData.find((p) => p.id === selectedPassageId) || unseenPassagesData[0];

  const handleSelectPassage = (passageId: string) => {
    setSelectedPassageId(passageId);
    setActiveLineHighlight(null);
    setHighlightedEvidenceLines([]);
    setAnswersState({});
    setSubmittedQuestions({});
    setActiveGlossaryWord(null);
  };

  const handleReadLine = (audioText: string, lineNumber: number) => {
    setActiveLineHighlight(lineNumber);
    speakEnglish(audioText, 0.88);
  };

  const handleReadFullPassage = () => {
    const fullText = currentPassage.paragraphs
      .flatMap((p) => p.lines.map((l) => l.audioText))
      .join(' ');
    speakEnglish(fullText, 0.9);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedQuestions[questionId]) return;
    setAnswersState((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuestion = (question: ReadingQuestion) => {
    const selectedOption = answersState[question.id];
    if (selectedOption === undefined || selectedOption === null) return;

    setSubmittedQuestions((prev) => ({ ...prev, [question.id]: true }));

    if (selectedOption === question.correctOptionIndex) {
      playSuccessSound();
      triggerCelebration();
      onReward(question.points);
      setHighlightedEvidenceLines(question.evidenceLineNumbers);
    } else {
      playSoftRetrySound();
      // Show evidence line to help them learn
      setHighlightedEvidenceLines(question.evidenceLineNumbers);
    }
  };

  const handleShowEvidence = (lineNumbers: number[]) => {
    setHighlightedEvidenceLines(lineNumbers);
    const firstLineNumber = lineNumbers[0];
    const targetLine = currentPassage.paragraphs
      .flatMap((p) => p.lines)
      .find((l) => l.lineNumber === firstLineNumber);
    if (targetLine) {
      speakEnglish(targetLine.audioText, 0.85);
    }
  };

  const handleResetQuestions = () => {
    setAnswersState({});
    setSubmittedQuestions({});
    setHighlightedEvidenceLines([]);
  };

  const totalQuestions = currentPassage.questions.length;
  const answeredCorrectlyCount = currentPassage.questions.filter(
    (q) => submittedQuestions[q.id] && answersState[q.id] === q.correctOptionIndex
  ).length;

  const isCurrentUnitPassage =
    currentUnit &&
    (currentPassage.unitId === currentUnit.id || currentPassage.unitNumber === currentUnit.unitNumber);

  return (
    <div className="flex flex-col space-y-4">
      {/* Top Banner & Passage Selector */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  מעבדת הבנת הנקרא (Unseen Lab)
                </span>
                {currentUnit && (
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    יחידה {currentUnit.unitNumber}: {currentUnit.titleHe}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">
                  מותאם לכל 12 יחידות הלימוד (Band I & II)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {currentPassage.titleHe}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                קראו את הקטע הייעודי של היחידה, האזינו למספרי השורות, ומצאו רמזים ישירות מהטקסט לתשובות מדויקות!
              </p>
            </div>

            {/* Quick Return to Current Unit passage if browsing another */}
            {currentUnit && !isCurrentUnitPassage && (
              <button
                onClick={() => {
                  const match = unseenPassagesData.find(
                    (p) => p.unitId === currentUnit.id || p.unitNumber === currentUnit.unitNumber
                  );
                  if (match) handleSelectPassage(match.id);
                }}
                className="self-start md:self-auto px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>חזרה לקטע של יחידה {currentUnit.unitNumber}</span>
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
            )}
          </div>

          {/* Unit Passages Selector Strip (All 12 Units + Bonus) */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-bold text-slate-700">בחירת קטע קריאה לפי יחידות הלימוד:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
              {unseenPassagesData.map((passage) => {
                const isSelected = passage.id === currentPassage.id;
                const isThisCurrentUnit =
                  currentUnit &&
                  (passage.unitId === currentUnit.id || passage.unitNumber === currentUnit.unitNumber);

                return (
                  <button
                    key={passage.id}
                    onClick={() => handleSelectPassage(passage.id)}
                    className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                      isSelected
                        ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-300'
                        : isThisCurrentUnit
                        ? 'bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full text-center flex items-center justify-center text-[10px] font-mono ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : isThisCurrentUnit
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {passage.unitNumber ? passage.unitNumber : '★'}
                    </span>
                    <span>
                      {passage.unitNumber ? `יחידה ${passage.unitNumber}` : 'בונוס'}
                    </span>
                    {isThisCurrentUnit && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Reading & Questions Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (in RTL: Right visual column): The Reading Text */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            {/* Passage Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-english">
                    {currentPassage.band} · {currentPassage.gradeLevel}
                  </span>
                  {currentPassage.unitNumber && (
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      יחידה {currentPassage.unitNumber}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-english text-slate-900 mt-1">
                  {currentPassage.titleEn}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  נושא: {currentPassage.topicHe} · כ-{currentPassage.wordCount} מילים
                </span>
              </div>

              {/* Read Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFontSize((f) => (f === 'normal' ? 'large' : 'normal'))}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="שינוי גודל גופן"
                >
                  {fontSize === 'normal' ? (
                    <ZoomIn className="w-4 h-4" />
                  ) : (
                    <ZoomOut className="w-4 h-4 text-sky-600" />
                  )}
                </button>

                <button
                  onClick={handleReadFullPassage}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  title="הקראת כל הקטע ברצף באנגלית"
                >
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  <span>הקראת הקטע</span>
                </button>
              </div>
            </div>

            {/* Passage Content with Line Numbers */}
            <div
              dir="ltr"
              className={`space-y-4 font-english leading-relaxed select-text ${
                fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
              }`}
            >
              {currentPassage.paragraphs.map((paragraph) => (
                <p key={paragraph.paragraphNumber} className="text-slate-800">
                  {paragraph.lines.map((line) => {
                    const isEvidence = highlightedEvidenceLines.includes(line.lineNumber);
                    const isActive = activeLineHighlight === line.lineNumber;

                    return (
                      <span
                        key={line.lineNumber}
                        className={`inline transition-all rounded px-1 py-0.5 mr-1 ${
                          isEvidence
                            ? 'bg-amber-200/90 text-amber-950 font-medium ring-2 ring-amber-400'
                            : isActive
                            ? 'bg-sky-100 text-sky-950 ring-1 ring-sky-300'
                            : 'hover:bg-slate-100'
                        }`}
                      >
                        {/* Line Number Marker */}
                        <button
                          onClick={() => handleReadLine(line.audioText, line.lineNumber)}
                          className="inline-flex items-center justify-center font-mono text-[10px] font-bold text-slate-400 hover:text-sky-600 bg-slate-100 hover:bg-sky-50 w-5 h-5 rounded mr-1.5 cursor-pointer align-baseline select-none"
                          title={`שורה ${line.lineNumber} - לחצו להאזנה`}
                        >
                          {line.lineNumber}
                        </button>
                        <span>{line.text} </span>
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>
          </div>

          {/* Interactive Vocabulary Glossary Shelf */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-sky-600" />
                מילון מושגים מהיר לקטע זה (Glossary):
              </span>
              <span className="text-[11px] text-slate-400">לחצו על מילה להשמעה ותרגום</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {currentPassage.vocabularyGlossary.map((item) => {
                const isSelected = activeGlossaryWord === item.word;
                return (
                  <button
                    key={item.word}
                    onClick={() => {
                      setActiveGlossaryWord(item.word);
                      speakEnglish(item.word, 0.85);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-sky-600 text-white shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-english">{item.word}</span>
                    <span className="text-[11px] opacity-80">({item.translationHe})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (Questions & Evidence Locating) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Progress & Score Widget */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                התקדמות בשאלות הקטע
              </span>
              <span className="text-sm font-extrabold text-slate-800">
                נענו נכון: {answeredCorrectlyCount} / {totalQuestions}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetQuestions}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="איפוס שאלות לתרגול חוזר"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <div className="px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{answeredCorrectlyCount * 25} XP</span>
              </div>
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-4 max-h-[720px] overflow-y-auto pr-1">
            {currentPassage.questions.map((question) => {
              const selectedOption = answersState[question.id];
              const isSubmitted = submittedQuestions[question.id];
              const isCorrect = isSubmitted && selectedOption === question.correctOptionIndex;
              const isWrong = isSubmitted && selectedOption !== question.correctOptionIndex;

              return (
                <div
                  key={question.id}
                  className={`bg-white rounded-3xl p-5 border-2 transition-all ${
                    isCorrect
                      ? 'border-emerald-400 bg-emerald-50/20 shadow-xs'
                      : isWrong
                      ? 'border-rose-400 bg-rose-50/20 shadow-xs'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {question.questionNumber}
                      </span>
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md uppercase">
                        {question.type === 'multiple_choice'
                          ? 'שאלת הבנה'
                          : question.type === 'true_false_evidence'
                          ? 'איתור מידע'
                          : 'אוצר מילים בהקשר'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleShowEvidence(question.evidenceLineNumbers)}
                      className="text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200/70 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                      title="הצגת שורות הרמז בטקסט"
                    >
                      <Search className="w-3 h-3 text-amber-600" />
                      <span>רמז: שורה {question.evidenceLineNumbers.join(', ')}</span>
                    </button>
                  </div>

                  {/* Question English & Hebrew */}
                  <div className="mb-3">
                    <h4
                      dir="ltr"
                      className="text-sm font-bold font-english text-slate-900 leading-snug text-left"
                    >
                      {question.questionEn}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {question.questionHe}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mb-4" dir="ltr">
                    {question.options.map((option, optIdx) => {
                      const isOptionSelected = selectedOption === optIdx;
                      let optionClasses =
                        'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800';

                      if (isSubmitted) {
                        if (optIdx === question.correctOptionIndex) {
                          optionClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        } else if (isOptionSelected) {
                          optionClasses = 'border-rose-400 bg-rose-50 text-rose-950';
                        } else {
                          optionClasses = 'border-slate-200 opacity-60 bg-slate-50';
                        }
                      } else if (isOptionSelected) {
                        optionClasses = 'border-sky-600 bg-sky-50 text-sky-950 font-semibold ring-2 ring-sky-200';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(question.id, optIdx)}
                          className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 text-xs font-english leading-snug ${optionClasses}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {isSubmitted && optIdx === question.correctOptionIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {isSubmitted && isOptionSelected && optIdx !== question.correctOptionIndex && (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Status Button */}
                  {!isSubmitted ? (
                    <button
                      disabled={selectedOption === undefined || selectedOption === null}
                      onClick={() => handleSubmitQuestion(question)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                        selectedOption !== undefined && selectedOption !== null
                          ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      בדיקת תשובה (+{question.points} XP)
                    </button>
                  ) : (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            מצוין! תשובה נכונה (+{question.points} XP)
                          </span>
                        ) : (
                          <span className="text-rose-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            לא מדויק. שימו לב להסבר:
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed font-hebrew">
                        {question.explanationHe}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
