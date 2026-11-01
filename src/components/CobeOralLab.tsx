import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, Square, Sparkles, CheckCircle2, Clock, Award, ChevronDown, ChevronUp, BookOpen, Volume1, ArrowRight, Layers } from 'lucide-react';
import { cobeTasksData } from '../data/cobeTasksData';
import { CobeOralTask } from '../types/readingAndOral';
import { CurriculumUnit } from '../types/curriculum';
import { speakEnglish, playSuccessSound, playSoftRetrySound, triggerCelebration } from '../utils/audio';

interface CobeOralLabProps {
  currentUnit?: CurriculumUnit;
  onReward: (points: number) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const CobeOralLab: React.FC<CobeOralLabProps> = ({
  currentUnit,
  onReward,
  onNavigateToUnit
}) => {
  const getInitialTaskId = () => {
    if (currentUnit) {
      const match = cobeTasksData.find(
        (t) => t.unitId === currentUnit.id || t.unitNumber === currentUnit.unitNumber
      );
      if (match) return match.id;
    }
    return cobeTasksData[0].id;
  };

  const [selectedTaskId, setSelectedTaskId] = useState<string>(getInitialTaskId);
  const [isPrepRunning, setIsPrepRunning] = useState(false);
  const [prepTimeRemaining, setPrepTimeRemaining] = useState(20);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimeSeconds, setRecordTimeSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [speechTranscript, setSpeechTranscript] = useState<string>('');
  const [isModelAnswerOpen, setIsModelAnswerOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [rubricChecks, setRubricChecks] = useState<Record<string, boolean>>({
    listenedPrompt: false,
    usedStarters: false,
    spokeClearly: false
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const prepTimerRef = useRef<any>(null);
  const recordTimerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  const currentTask: CobeOralTask =
    cobeTasksData.find((t) => t.id === selectedTaskId) || cobeTasksData[0];

  // When currentUnit changes from props, update task
  useEffect(() => {
    if (currentUnit) {
      const match = cobeTasksData.find(
        (t) => t.unitId === currentUnit.id || t.unitNumber === currentUnit.unitNumber
      );
      if (match) {
        setSelectedTaskId(match.id);
      }
    }
  }, [currentUnit?.id]);

  // Reset timers on task change
  useEffect(() => {
    clearInterval(prepTimerRef.current);
    clearInterval(recordTimerRef.current);
    setIsPrepRunning(false);
    setPrepTimeRemaining(currentTask.prepTimeSeconds || 20);
    setIsRecording(false);
    setRecordTimeSeconds(0);
    setRecordedAudioUrl(null);
    setSpeechTranscript('');
    setIsModelAnswerOpen(false);
    setRubricChecks({
      listenedPrompt: false,
      usedStarters: false,
      spokeClearly: false
    });
  }, [selectedTaskId]);

  // Clean up timers and audio on unmount
  useEffect(() => {
    return () => {
      clearInterval(prepTimerRef.current);
      clearInterval(recordTimerRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handlePlayExaminerPrompt = () => {
    speakEnglish(currentTask.audioPromptEn, 0.9);
  };

  const handleStartPrep = () => {
    setIsPrepRunning(true);
    setPrepTimeRemaining(currentTask.prepTimeSeconds || 20);
    clearInterval(prepTimerRef.current);

    prepTimerRef.current = setInterval(() => {
      setPrepTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(prepTimerRef.current);
          setIsPrepRunning(false);
          playSuccessSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStartRecording = async () => {
    clearInterval(prepTimerRef.current);
    setIsPrepRunning(false);
    setRecordedAudioUrl(null);
    setSpeechTranscript('');
    audioChunksRef.current = [];

    // Try SpeechRecognition if supported
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          setSpeechTranscript(currentTranscript.trim());
        };

        recognition.onerror = () => {
          // Graceful fallback to just audio recording
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        // Recognition not permitted or unsupported
      }
    }

    // Microphone audio stream via getUserMedia
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setRecordedAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
      }
    } catch (err) {
      // Microphone fallback
    }

    setIsRecording(true);
    setRecordTimeSeconds(0);
    clearInterval(recordTimerRef.current);

    recordTimerRef.current = setInterval(() => {
      setRecordTimeSeconds((prev) => {
        // Auto stop after maximum speak time
        if (prev >= (currentTask.speakTimeSeconds || 30)) {
          handleStopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    clearInterval(recordTimerRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    playSuccessSound();
  };

  const handleRubricToggle = (key: string) => {
    setRubricChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmitEvaluation = () => {
    playSuccessSound();
    triggerCelebration();
    setCompletedTasks((prev) => ({ ...prev, [currentTask.id]: true }));
    onReward(currentTask.points);
  };

  const isCompleted = completedTasks[currentTask.id];
  const allRubricChecked =
    rubricChecks.listenedPrompt && rubricChecks.usedStarters && rubricChecks.spokeClearly;

  const isCurrentUnitTask =
    currentUnit &&
    (currentTask.unitId === currentUnit.id || currentTask.unitNumber === currentUnit.unitNumber);

  return (
    <div className="flex flex-col space-y-4">
      {/* Header Banner & Unit Selector */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5" />
                  סטודיו הדיבור לילדים (Kids' Speaking Studio)
                </span>
                {currentUnit && (
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                    יחידה {currentUnit.unitNumber}: {currentUnit.titleHe}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">
                  מותאם לכיתות ד׳-ה׳ (Band I · כ-20-30 שניות בלבד)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {currentTask.titleHe}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                הקשיבו לשאלת הבוחן/ת, היעזרו במשפטי הפתיחה, והקליטו 2-3 משפטים פשוטים באנגלית בביטחון!
              </p>
            </div>

            {/* Quick Return to Current Unit Task */}
            {currentUnit && !isCurrentUnitTask && (
              <button
                onClick={() => {
                  const match = cobeTasksData.find(
                    (t) => t.unitId === currentUnit.id || t.unitNumber === currentUnit.unitNumber
                  );
                  if (match) setSelectedTaskId(match.id);
                }}
                className="self-start md:self-auto px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>חזרה למשימת הדיבור של יחידה {currentUnit.unitNumber}</span>
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
            )}
          </div>

          {/* Unit Selector Strip (All 12 Units) */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-bold text-slate-700">בחירת משימת דיבור לפי יחידות:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
              {cobeTasksData.map((task) => {
                const isSelected = task.id === currentTask.id;
                const isThisCurrentUnit =
                  currentUnit &&
                  (task.unitId === currentUnit.id || task.unitNumber === currentUnit.unitNumber);
                const isTaskDone = completedTasks[task.id];

                return (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-300'
                        : isThisCurrentUnit
                        ? 'bg-sky-50 border border-sky-200 text-sky-800 hover:bg-sky-100'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full text-center flex items-center justify-center text-[10px] font-mono ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : isThisCurrentUnit
                          ? 'bg-sky-600 text-white font-bold'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {task.unitNumber || task.taskNumber}
                    </span>
                    <span>
                      {task.unitNumber ? `יחידה ${task.unitNumber}` : `משימה ${task.taskNumber}`}
                    </span>
                    {isTaskDone && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                    {isThisCurrentUnit && !isTaskDone && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Prompt & Recorder on Left, Support & Rubric on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Examiner Question & Recording Studio */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Examiner Prompt Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md font-english">
                Unit {currentTask.unitNumber || currentTask.taskNumber} · Speaking Card
              </span>
              <button
                onClick={handlePlayExaminerPrompt}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                title="השמעת שאלת הבוחן/ת בקול רם באנגלית"
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span>השמעת השאלה 🎧</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              {currentTask.titleEn}
            </h3>

            {/* Prompt Quote Box */}
            <div
              dir="ltr"
              className="bg-slate-50 border-r-4 border-indigo-600 rounded-2xl p-4 my-3 text-left font-english text-base text-slate-800 leading-relaxed font-semibold shadow-2xs"
            >
              "{currentTask.examinerPromptEn}"
            </div>

            <p className="text-xs text-slate-600 font-medium font-hebrew">
              {currentTask.examinerPromptHe}
            </p>

            {/* Guiding Questions Chips */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 block mb-2">
                רעיונות קלים למה לומר (3 שאלות מנחות):
              </span>
              <ul className="space-y-1 text-xs text-slate-700 font-medium">
                {currentTask.guideQuestionsHe.map((q, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Recording Studio */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-indigo-600" />
                מקליטים בקול רם (הקלטה קצרה של 20-30 שניות):
              </span>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                {isPrepRunning && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    זמן הכנה: {prepTimeRemaining} שניות
                  </span>
                )}
                {isRecording && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    מקליט: {recordTimeSeconds} / {currentTask.speakTimeSeconds || 30} שניות
                  </span>
                )}
                {!isPrepRunning && !isRecording && (
                  <span className="text-xs text-slate-400 font-medium">מוכנים להתחיל</span>
                )}
              </div>
            </div>

            {/* Timer & Mic Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-4">
              {!isRecording ? (
                <>
                  <button
                    onClick={handleStartPrep}
                    disabled={isPrepRunning}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-2xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>זמן התארגנות ({currentTask.prepTimeSeconds || 20} שנ׳)</span>
                  </button>

                  <button
                    onClick={handleStartRecording}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
                  >
                    <Mic className="w-5 h-5 text-white" />
                    <span>התחלת הקלטה באנגלית 🎙️</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm shadow-md shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 animate-pulse"
                >
                  <Square className="w-5 h-5 fill-current" />
                  <span>סיום ושמירת הקלטה ({recordTimeSeconds} שניות)</span>
                </button>
              )}
            </div>

            {/* Live Audio Playback & Live Transcription Preview */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
              {recordedAudioUrl && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-700">האזנה להקלטה שלכם:</span>
                  <audio controls src={recordedAudioUrl} className="h-8 max-w-full" />
                </div>
              )}

              {speechTranscript && (
                <div className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-left" dir="ltr">
                  <span className="text-[11px] font-bold text-indigo-700 font-sans block mb-1">
                    זיהוי דיבור אוטומטי (Speech-to-Text):
                  </span>
                  <p className="text-xs font-english text-slate-800 leading-relaxed font-medium">
                    "{speechTranscript}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Scaffolding, Sentence Starters & Model Answer */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Sentence Starters & Vocabulary Helpers */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                משפטי פתיחה קלים (Sentence Starters)
              </span>
              <span className="text-[11px] text-slate-400">לחצו להשמעה</span>
            </div>

            <div className="space-y-2 mb-4">
              {currentTask.suggestedStartersEn.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => speakEnglish(starter, 0.85)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-english font-semibold text-slate-800 transition-colors cursor-pointer flex items-center justify-between gap-2"
                  dir="ltr"
                >
                  <span className="text-indigo-700">"{starter}"</span>
                  <Volume1 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>

            {/* Useful Vocabulary */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 block mb-2">
                מילות מפתח מומלצות מהיחידה:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentTask.keyVocabulary.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => speakEnglish(v.wordEn, 0.85)}
                    className="px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span className="font-english font-bold">{v.wordEn}</span>
                    <span className="text-[10px] opacity-75">({v.meaningHe})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model Answer Drawer */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
            <button
              onClick={() => setIsModelAnswerOpen(!isModelAnswerOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-900 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>תשובה לדוגמה (3-4 משפטים פשוטים)</span>
              </span>
              {isModelAnswerOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {isModelAnswerOpen && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    דוגמה פשוטה לכיתות ד׳-ה׳
                  </span>
                  <button
                    onClick={() => speakEnglish(currentTask.modelAnswerEn, 0.88)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>האזנה לדוגמה</span>
                  </button>
                </div>

                <p
                  dir="ltr"
                  className="text-xs font-english text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left font-medium"
                >
                  "{currentTask.modelAnswerEn}"
                </p>

                <p className="text-xs text-slate-600 leading-relaxed font-hebrew">
                  תרגום: {currentTask.modelAnswerHe}
                </p>
              </div>
            )}
          </div>

          {/* Self-Assessment Rubric & Reward Submission */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold text-slate-900 block mb-2">
              בדיקה עצמית מעודדת (Self-Check):
            </span>

            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rubricChecks.listenedPrompt}
                  onChange={() => handleRubricToggle('listenedPrompt')}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>הקשבתי לשאלת הבוחן/ת 🎧</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rubricChecks.usedStarters}
                  onChange={() => handleRubricToggle('usedStarters')}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>השתמשתי לפחות באחד ממשפטי הפתיחה 🗣️</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rubricChecks.spokeClearly}
                  onChange={() => handleRubricToggle('spokeClearly')}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>אמרתי 2-3 משפטים באנגלית בקול ברור ⭐</span>
              </label>
            </div>

            {!isCompleted ? (
              <button
                disabled={!allRubricChecked && !recordedAudioUrl && !speechTranscript}
                onClick={handleSubmitEvaluation}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  allRubricChecked || recordedAudioUrl || speechTranscript
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>אישור משימה וקבלת {currentTask.points} נקודות XP 🌟</span>
              </button>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs font-bold text-emerald-800">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  כל הכבוד! משימת הדיבור הושלמה בהצלחה! (+{currentTask.points} XP)
                </span>
                <span className="font-mono text-xs">Great Speaker! 🎉</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
