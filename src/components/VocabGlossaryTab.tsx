import React, { useState, useEffect, useMemo } from 'react';
import {
  Volume2,
  BookOpen,
  AlertCircle,
  Plus,
  Search,
  Sparkles,
  CheckCircle2,
  RotateCw,
  Trash2,
  Star,
  Layers,
  ArrowRight,
  ArrowLeft,
  X,
  Shuffle,
  Trophy,
  Filter,
  Check,
  PackagePlus
} from 'lucide-react';
import { Band1VocabWord, CurriculumUnit } from '../types/curriculum';
import {
  speakEnglish,
  playGentleSuccessTone,
  playIncorrectTone,
  playXpEarnedTone,
  triggerCelebration
} from '../utils/audio';

interface VocabGlossaryTabProps {
  vocabList?: Band1VocabWord[];
  currentUnit?: CurriculumUnit;
  allUnits?: CurriculumUnit[];
  onReward?: (points: number) => void;
}

type TabMode = 'grid' | 'flashcards' | 'quiz';

// Pre-packaged Ministry of Education Band I word sets for 1-click import
const MINISTRY_WORD_PACKS: Record<string, Band1VocabWord[]> = {
  animals: [
    { id: 'pack-dog', word: 'Dog', partOfSpeech: 'noun', hebrewTranslation: 'כלב', ipa: '/dɒɡ/', exampleSentenceEn: 'The friendly dog wags its tail.', exampleSentenceHe: 'הכלב הידידותי מכשכש בזנבו.', band: 'Band I', category: 'חיות' },
    { id: 'pack-cat', word: 'Cat', partOfSpeech: 'noun', hebrewTranslation: 'חתול', ipa: '/kæt/', exampleSentenceEn: 'The black cat is sleeping.', exampleSentenceHe: 'החתול השחור ישן.', band: 'Band I', category: 'חיות' },
    { id: 'pack-horse', word: 'Horse', partOfSpeech: 'noun', hebrewTranslation: 'סוס', ipa: '/hɔːrs/', exampleSentenceEn: 'A brown horse runs fast.', exampleSentenceHe: 'סוס חום רץ מהר.', band: 'Band I', category: 'חיות' },
    { id: 'pack-duck', word: 'Duck', partOfSpeech: 'noun', hebrewTranslation: 'ברווז', ipa: '/dʌk/', exampleSentenceEn: 'The yellow duck swims in the pond.', exampleSentenceHe: 'הברווז הצהוב שוחה באגם.', band: 'Band I', category: 'חיות' },
    { id: 'pack-bear', word: 'Bear', partOfSpeech: 'noun', hebrewTranslation: 'דוב', ipa: '/beər/', phoneticTrap: 'B', hebrewPhoneticTip: 'אות B פותחת חזקה עם שפתיים.', exampleSentenceEn: 'The big bear eats honey.', exampleSentenceHe: 'הדוב הגדול אוכל דבש.', band: 'Band I', category: 'חיות' }
  ],
  food: [
    { id: 'pack-apple', word: 'Apple', partOfSpeech: 'noun', hebrewTranslation: 'תפוח', ipa: '/ˈæpəl/', phoneticTrap: 'P', hebrewPhoneticTip: 'אות P כפולה באמצע (פיצוץ שפתיים).', exampleSentenceEn: 'I eat a crunchy red apple.', exampleSentenceHe: 'אני אוכל תפוח אדום ופריך.', band: 'Band I', category: 'אוכל' },
    { id: 'pack-bread', word: 'Bread', partOfSpeech: 'noun', hebrewTranslation: 'לחם', ipa: '/bred/', phoneticTrap: 'B', exampleSentenceEn: 'Fresh bread smells delicious.', exampleSentenceHe: 'לחם טרי מריח נהדר.', band: 'Band I', category: 'אוכל' },
    { id: 'pack-milk', word: 'Milk', partOfSpeech: 'noun', hebrewTranslation: 'חלב', ipa: '/mɪlk/', exampleSentenceEn: 'Drink a glass of cold milk.', exampleSentenceHe: 'שתו כוס חלב קר.', band: 'Band I', category: 'אוכל' },
    { id: 'pack-orange', word: 'Orange', partOfSpeech: 'noun', hebrewTranslation: 'תפוז / כתום', ipa: '/ˈɒrɪndʒ/', exampleSentenceEn: 'Sweet orange is my favorite fruit.', exampleSentenceHe: 'תפוז מתוק הוא הפרי האהוב עלי.', band: 'Band I', category: 'אוכל' },
    { id: 'pack-pizza', word: 'Pizza', partOfSpeech: 'noun', hebrewTranslation: 'פיצה', ipa: '/ˈpiːtsə/', phoneticTrap: 'P', hebrewPhoneticTip: 'P פותחת חזקה!', exampleSentenceEn: 'We eat hot cheese pizza on Friday.', exampleSentenceHe: 'אנחנו אוכלים פיצה גבינה חמה בשישי.', band: 'Band I', category: 'אוכל' }
  ],
  school: [
    { id: 'pack-chair', word: 'Chair', partOfSpeech: 'noun', hebrewTranslation: 'כיסא', ipa: '/tʃeər/', exampleSentenceEn: 'Please sit on the chair.', exampleSentenceHe: 'אנא שבו על הכיסא.', band: 'Band I', category: 'בית ספר' },
    { id: 'pack-computer', word: 'Computer', partOfSpeech: 'noun', hebrewTranslation: 'מחשב', ipa: '/kəmˈpjuːtər/', phoneticTrap: 'P', exampleSentenceEn: 'We learn English on the computer.', exampleSentenceHe: 'אנחנו לומדים אנגלית במחשב.', band: 'Band I', category: 'בית ספר' },
    { id: 'pack-student', word: 'Student', partOfSpeech: 'noun', hebrewTranslation: 'תלמיד / סטודנט', ipa: '/ˈstjuːdənt/', exampleSentenceEn: 'Every student has a notebook.', exampleSentenceHe: 'לכל תלמיד יש מחברת.', band: 'Band I', category: 'בית ספר' },
    { id: 'pack-pen', word: 'Pen', partOfSpeech: 'noun', hebrewTranslation: 'עט', ipa: '/pen/', phoneticTrap: 'P', hebrewPhoneticTip: 'שפתיים נסגרות בפיצוץ ב-P.', exampleSentenceEn: 'Write your story with a blue pen.', exampleSentenceHe: 'כתבו את הסיפור שלכם בעט כחול.', band: 'Band I', category: 'בית ספר' }
  ],
  actions: [
    { id: 'pack-jump', word: 'Jump', partOfSpeech: 'verb', hebrewTranslation: 'לקפוץ', ipa: '/dʒʌmp/', phoneticTrap: 'P', hebrewPhoneticTip: 'מסתיים ב-P עדינה.', exampleSentenceEn: 'The children jump high together.', exampleSentenceHe: 'הילדים קופצים גבוה יחד.', band: 'Band I', category: 'פעולות' },
    { id: 'pack-sing', word: 'Sing', partOfSpeech: 'verb', hebrewTranslation: 'לשיר', ipa: '/sɪŋ/', exampleSentenceEn: 'We sing English songs in music class.', exampleSentenceHe: 'אנחנו שרים שירים באנגלית בשיעור מוזיקה.', band: 'Band I', category: 'פעולות' },
    { id: 'pack-smile', word: 'Smile', partOfSpeech: 'verb', hebrewTranslation: 'לחייך', ipa: '/smaɪl/', exampleSentenceEn: 'Smile to your friends every day.', exampleSentenceHe: 'חייכו לחברים שלכם בכל יום.', band: 'Band I', category: 'פעולות' },
    { id: 'pack-help', word: 'Help', partOfSpeech: 'verb', hebrewTranslation: 'לעזור', ipa: '/help/', phoneticTrap: 'P', exampleSentenceEn: 'I help my friends with homework.', exampleSentenceHe: 'אני עוזר לחברים שלי בשיעורי הבית.', band: 'Band I', category: 'פעולות' }
  ]
};

export const VocabGlossaryTab: React.FC<VocabGlossaryTabProps> = ({
  vocabList = [],
  currentUnit,
  allUnits = [],
  onReward
}) => {
  const [activeTabMode, setActiveTabMode] = useState<TabMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(currentUnit ? 'current_unit' : 'all');
  const [customWords, setCustomWords] = useState<Band1VocabWord[]>([]);
  const [favoriteWordIds, setFavoriteWordIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPacksModalOpen, setIsPacksModalOpen] = useState(false);

  // Sync selected category to current unit when currentUnit changes
  useEffect(() => {
    if (currentUnit) {
      setSelectedCategory('current_unit');
    }
  }, [currentUnit?.id]);

  // New Word Form State
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newCategory, setNewCategory] = useState('בית ספר');
  const [newPartOfSpeech, setNewPartOfSpeech] = useState<'noun' | 'verb' | 'adjective' | 'pronoun'>('noun');
  const [newPhoneticTrap, setNewPhoneticTrap] = useState<'P' | 'F' | 'B' | 'V' | 'TH' | 'short_vowel' | 'magic_e' | ''>('');
  const [newPhoneticTip, setNewPhoneticTip] = useState('');
  const [newExampleEn, setNewExampleEn] = useState('');
  const [newExampleHe, setNewExampleHe] = useState('');
  const [formError, setFormError] = useState('');
  const [previewPlaying, setPreviewPlaying] = useState(false);

  // Flashcards State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCardIds, setKnownCardIds] = useState<Set<string>>(new Set());

  // Reset card index when category or unit changes
  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
  }, [selectedCategory, currentUnit?.id]);

  // Quiz State
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Load custom words and favorites from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCustom = localStorage.getItem('sababa_custom_vocabulary');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        if (Array.isArray(parsed)) {
          setCustomWords(parsed);
        }
      }

      const savedFavorites = localStorage.getItem('sababa_favorite_words');
      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          setFavoriteWordIds(new Set(parsed));
        }
      }
    } catch {
      // Ignore storage errors in sandbox
    }
  }, []);

  // Save custom words to LocalStorage
  const saveCustomWordsToStorage = (updated: Band1VocabWord[]) => {
    setCustomWords(updated);
    try {
      localStorage.setItem('sababa_custom_vocabulary', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (wordId: string) => {
    const next = new Set(favoriteWordIds);
    if (next.has(wordId)) {
      next.delete(wordId);
    } else {
      next.add(wordId);
      playGentleSuccessTone();
    }
    setFavoriteWordIds(next);
    try {
      localStorage.setItem('sababa_favorite_words', JSON.stringify(Array.from(next)));
    } catch {
      // Ignore
    }
  };

  // Aggregate all built-in words from all units
  const allCurriculumWords = useMemo(() => {
    if (allUnits.length > 0) {
      const map = new Map<string, Band1VocabWord>();
      allUnits.forEach((unit) => {
        unit.vocabulary.forEach((w) => {
          if (!map.has(w.id)) {
            map.set(w.id, w);
          }
        });
      });
      return Array.from(map.values());
    }
    return vocabList;
  }, [allUnits, vocabList]);

  // Combined words pool: built-in words + user custom words
  const combinedWordList = useMemo(() => {
    const customWithFlag = customWords.map((cw) => ({ ...cw, isCustom: true }));
    return [...allCurriculumWords, ...customWithFlag];
  }, [allCurriculumWords, customWords]);

  // Extract all unique categories
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    combinedWordList.forEach((w) => {
      if (w.category) set.add(w.category);
    });
    return Array.from(set);
  }, [combinedWordList]);

  // Filtered words based on category and search query
  const filteredWords = useMemo(() => {
    let baseList: Band1VocabWord[] = combinedWordList;

    if (selectedCategory === 'current_unit' && currentUnit) {
      baseList = currentUnit.vocabulary && currentUnit.vocabulary.length > 0 ? currentUnit.vocabulary : vocabList;
    } else if (selectedCategory === 'custom') {
      baseList = combinedWordList.filter((item) => (item as any).isCustom);
    } else if (selectedCategory === 'favorites') {
      baseList = combinedWordList.filter((item) => favoriteWordIds.has(item.id));
    } else if (selectedCategory !== 'all') {
      baseList = combinedWordList.filter((item) => item.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return baseList.filter((item) => {
        const matchesEn = item.word.toLowerCase().includes(query);
        const matchesHe = item.hebrewTranslation.includes(query);
        const matchesCategory = item.category?.toLowerCase().includes(query);
        return matchesEn || matchesHe || matchesCategory;
      });
    }

    return baseList;
  }, [combinedWordList, selectedCategory, searchQuery, currentUnit, vocabList, favoriteWordIds]);

  // Handle Audio Playback
  const handleListenWord = (word: string) => {
    speakEnglish(word, 0.85);
  };

  const handleListenSentence = (sentence: string) => {
    speakEnglish(sentence, 0.85);
  };

  // Preview pronunciation inside Add Modal
  const handlePreviewNewWord = () => {
    if (!newWord.trim()) return;
    setPreviewPlaying(true);
    speakEnglish(newWord.trim(), 0.85);
    setTimeout(() => setPreviewPlaying(false), 1200);
  };

  // Save New Word
  const handleSaveWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) {
      setFormError('אנא כתבו את המילה באנגלית.');
      return;
    }
    if (!newTranslation.trim()) {
      setFormError('אנא כתבו את התרגום לעברית.');
      return;
    }

    const trimmedWord = newWord.trim();
    const capitalizedWord = trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1);

    const createdWord: Band1VocabWord = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      word: capitalizedWord,
      partOfSpeech: newPartOfSpeech,
      hebrewTranslation: newTranslation.trim(),
      ipa: `/${newWord.toLowerCase()}/`,
      phoneticTrap: newPhoneticTrap ? (newPhoneticTrap as any) : undefined,
      hebrewPhoneticTip: newPhoneticTip.trim() || undefined,
      exampleSentenceEn: newExampleEn.trim() || `This is a ${newWord.toLowerCase()}.`,
      exampleSentenceHe: newExampleHe.trim() || `זהו ${newTranslation.trim()}.`,
      band: 'Band I',
      category: newCategory.trim() || 'שונות',
      isCustom: true
    };

    const updated = [createdWord, ...customWords];
    saveCustomWordsToStorage(updated);

    // Reward user with 25 XP for expanding their vocabulary
    if (onReward) {
      onReward(25);
    } else {
      playXpEarnedTone(25);
    }
    triggerCelebration();

    // Reset Form
    setNewWord('');
    setNewTranslation('');
    setNewPhoneticTip('');
    setNewExampleEn('');
    setNewExampleHe('');
    setFormError('');
    setIsAddModalOpen(false);
  };

  // Delete Custom Word
  const handleDeleteCustomWord = (id: string, wordName: string) => {
    if (window.confirm(`האם ברצונך למחוק את המילה "${wordName}" מאוצר המילים האישי?`)) {
      const updated = customWords.filter((w) => w.id !== id);
      saveCustomWordsToStorage(updated);
    }
  };

  // Import Ministry Pack
  const handleImportPack = (packKey: keyof typeof MINISTRY_WORD_PACKS) => {
    const pack = MINISTRY_WORD_PACKS[packKey];
    if (!pack) return;

    // Filter out existing words to prevent duplicates
    const existingWords = new Set(combinedWordList.map((w) => w.word.toLowerCase()));
    const newWordsToAdd = pack.filter((w) => !existingWords.has(w.word.toLowerCase()));

    if (newWordsToAdd.length === 0) {
      alert('כל המילים מחבילה זו כבר קיימות באוצר המילים שלך!');
      return;
    }

    const updated = [...newWordsToAdd, ...customWords];
    saveCustomWordsToStorage(updated);

    if (onReward) {
      onReward(newWordsToAdd.length * 10);
    }
    triggerCelebration();
    setIsPacksModalOpen(false);
  };

  // ----------------------------------------------------
  // FLASHCARD CONTROLS
  // ----------------------------------------------------
  const activeFlashcards = useMemo(() => {
    return filteredWords.length > 0 ? filteredWords : combinedWordList;
  }, [filteredWords, combinedWordList]);

  const currentFlashcard = activeFlashcards[cardIndex] || activeFlashcards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % activeFlashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + activeFlashcards.length) % activeFlashcards.length);
  };

  const handleMarkKnown = () => {
    if (!currentFlashcard) return;
    const next = new Set(knownCardIds);
    next.add(currentFlashcard.id);
    setKnownCardIds(next);
    playGentleSuccessTone();
    handleNextCard();
  };

  const handleShuffleCards = () => {
    setIsFlipped(false);
    setCardIndex(Math.floor(Math.random() * activeFlashcards.length));
  };

  // ----------------------------------------------------
  // QUIZ GENERATION & CONTROLS
  // ----------------------------------------------------
  const quizQuestions = useMemo(() => {
    const questionTargets = filteredWords.length >= 4 ? filteredWords : (combinedWordList.length >= 4 ? combinedWordList : fullCurriculumWordPoolFallback);
    const distractorPool = combinedWordList.length >= 4 ? combinedWordList : fullCurriculumWordPoolFallback;
    // Generate up to 8 quick questions
    const shuffled = [...questionTargets].sort(() => 0.5 - Math.random()).slice(0, 8);

    return shuffled.map((target) => {
      // 3 wrong distractors
      const distractors = distractorPool
        .filter((w) => w.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.hebrewTranslation);

      const options = [target.hebrewTranslation, ...distractors].sort(() => 0.5 - Math.random());

      return {
        target,
        options,
        correctAnswer: target.hebrewTranslation
      };
    });
  }, [filteredWords, combinedWordList]);

  const currentQuizItem = quizQuestions[quizQuestionIndex] || quizQuestions[0];

  const handleSelectAnswer = (option: string) => {
    if (selectedQuizAnswer !== null) return; // Prevent double click
    setSelectedQuizAnswer(option);

    if (option === currentQuizItem.correctAnswer) {
      setQuizFeedback('correct');
      playGentleSuccessTone();
      setQuizScore((prev) => prev + 1);
      if (onReward) onReward(15);
    } else {
      setQuizFeedback('incorrect');
      playIncorrectTone();
    }

    setTimeout(() => {
      if (quizQuestionIndex + 1 < quizQuestions.length) {
        setQuizQuestionIndex((prev) => prev + 1);
        setSelectedQuizAnswer(null);
        setQuizFeedback(null);
      } else {
        setIsQuizFinished(true);
        triggerCelebration();
      }
    }, 1400);
  };

  const handleRestartQuiz = () => {
    setQuizQuestionIndex(0);
    setSelectedQuizAnswer(null);
    setQuizFeedback(null);
    setQuizScore(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* ==================================================== */}
      {/* TOP HERO & TOOLBAR */}
      {/* ==================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200/60">
                סטודיו אוצר מילים · Vocabulary Studio
              </span>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200/60">
                {combinedWordList.length} מילים פעילות במאגר
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                🇮🇱 תוכנית הלימודים משרד החינוך Band I & II
              </span>
              {customWords.length > 0 && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  {customWords.length} מילים אישיות שהוספת
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              מרכז אוצר המילים והמילים החדשות
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              למדו מילים חדשות עם הגייה נכונה של המורה, הוסיפו מילים אישיות עם תרגום ומשפטים, ותרגלו בכרטיסיות חכמות ובחידון מהיר!
            </p>
          </div>

          {/* Action Buttons: Add Word + Import Pack */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-xs shadow-sm shadow-rose-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>+ הוסף מילה חדשה</span>
            </button>

            <button
              onClick={() => setIsPacksModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-2xl font-bold text-xs transition-colors cursor-pointer border border-slate-200/80"
              title="טען חבילת מילים מומלצת של משרד החינוך"
            >
              <PackagePlus className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">חבילות נושא</span>
            </button>
          </div>
        </div>

        {/* Learning Mode Switcher Bar */}
        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100 flex-wrap">
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl gap-1">
            <button
              onClick={() => setActiveTabMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-600" />
              <span>מילון כרטיסים ({filteredWords.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTabMode('flashcards');
                setIsFlipped(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabMode === 'flashcards'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>כרטיסיות תרגול (Flashcards)</span>
            </button>

            <button
              onClick={() => {
                setActiveTabMode('quiz');
                handleRestartQuiz();
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabMode === 'quiz'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>חידון מילים מהיר</span>
            </button>
          </div>

          {/* Quick Audio Teacher Status */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>הגייה קולית פעילה עם קול מורה טבעי</span>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MODE 1: GRID & EXPLORER MODE */}
      {/* ==================================================== */}
      {activeTabMode === 'grid' && (
        <div className="space-y-4">
          {/* Search & Category Filter Pills */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חיפוש מילה באנגלית או בעברית... (למשל: dog, מורה, play)"
                  className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
              {currentUnit && (
                <button
                  onClick={() => setSelectedCategory('current_unit')}
                  className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'current_unit'
                      ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400/50'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  <span>🎯</span>
                  <span>יחידה {currentUnit.unitNumber}: {currentUnit.titleHe} ({currentUnit.vocabulary?.length || 27} מילים)</span>
                </button>
              )}

              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                כל המילון ({combinedWordList.length})
              </button>

              {customWords.length > 0 && (
                <button
                  onClick={() => setSelectedCategory('custom')}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === 'custom'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  ⭐ מילים שהוספתי ({customWords.length})
                </button>
              )}

              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Active Filter Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-2 text-xs text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-slate-800">
                  {selectedCategory === 'current_unit' && currentUnit
                    ? `🎯 מציג ${filteredWords.length} מילות יחידה ${currentUnit.unitNumber}: ${currentUnit.titleHe}`
                    : selectedCategory === 'all'
                    ? `📚 מציג את כל ${filteredWords.length} המילים במאגר`
                    : selectedCategory === 'custom'
                    ? `⭐ מציג ${filteredWords.length} מילים אישיות שהוספת`
                    : selectedCategory === 'favorites'
                    ? `❤️ מציג ${filteredWords.length} מילים מועדפות`
                    : `🏷️ מציג ${filteredWords.length} מילים בנושא ${selectedCategory}`}
                </span>
                {searchQuery && (
                  <span className="text-sky-600 font-semibold">
                    (סינון לפי חיפוש: &quot;{searchQuery}&quot;)
                  </span>
                )}
              </div>

              {selectedCategory !== 'all' ? (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs text-sky-600 hover:text-sky-800 font-bold underline cursor-pointer"
                >
                  הצג את כל המילון ({combinedWordList.length} מילים) ➔
                </button>
              ) : currentUnit ? (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('current_unit')}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer"
                >
                  חזרה ל-27 מילות יחידה {currentUnit.unitNumber} ➔
                </button>
              ) : null}
            </div>
          </div>

          {/* Words Grid */}
          {filteredWords.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">לא נמצאו מילים תואמות</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                נסו לשנות את מילת החיפוש או הוסיפו מילה חדשה כעת!
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-500 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>הוסף מילה כעת</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredWords.map((item) => {
                const isFavorite = favoriteWordIds.has(item.id);
                const hasTrap = !!item.phoneticTrap;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Bar: Word, IPA, Part of Speech, Actions */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-baseline gap-2 dir-ltr" dir="ltr">
                          <span className="text-2xl font-black font-english text-slate-900 tracking-tight">
                            {item.word}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {item.ipa}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold px-2 py-0.5 rounded bg-slate-100 font-english uppercase">
                            {item.partOfSpeech}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleToggleFavorite(item.id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isFavorite
                                ? 'text-amber-500 hover:text-amber-600 bg-amber-50'
                                : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'
                            }`}
                            title={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
                          >
                            <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            onClick={() => handleListenWord(item.word)}
                            className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            title="השמע מילה בקול מורה"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>

                          {item.isCustom && (
                            <button
                              onClick={() => handleDeleteCustomWord(item.id, item.word)}
                              className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                              title="מחק מילה אישית זו"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Hebrew Translation & Category Badge */}
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span className="text-base font-bold text-slate-800 font-hebrew">
                          {item.hebrewTranslation}
                        </span>
                        {item.category && (
                          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                            {item.category}
                          </span>
                        )}
                      </div>

                      {/* Phonetic Trap / Tip */}
                      {hasTrap && item.hebrewPhoneticTip && (
                        <div className="mt-2.5 flex items-start gap-1.5 p-2 bg-amber-50/80 rounded-xl border border-amber-200/60 text-[11px] text-amber-900">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>
                            <strong className="font-semibold">מלכודת הגייה ({item.phoneticTrap}):</strong> {item.hebrewPhoneticTip}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Example Sentence with Audio */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="text-xs">
                        <p className="font-english text-slate-700 font-semibold dir-ltr text-[13px]" dir="ltr">
                          &quot;{item.exampleSentenceEn}&quot;
                        </p>
                        <p className="text-[11px] text-slate-500 font-hebrew mt-0.5">
                          {item.exampleSentenceHe}
                        </p>
                      </div>

                      <button
                        onClick={() => handleListenSentence(item.exampleSentenceEn)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
                        title="השמע משפט דוגמה"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* MODE 2: INTERACTIVE FLASHCARDS MODE */}
      {/* ==================================================== */}
      {activeTabMode === 'flashcards' && (
        <div className="max-w-2xl mx-auto w-full space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600">
              כרטיסייה <span className="font-mono text-slate-900">{cardIndex + 1}</span> מתוך <span className="font-mono">{activeFlashcards.length}</span>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>ידעתי ({knownCardIds.size})</span>
              </span>

              <button
                onClick={handleShuffleCards}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="ערבב כרטיסיות אקראית"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => {
              setIsFlipped(!isFlipped);
              if (!isFlipped && currentFlashcard) {
                handleListenWord(currentFlashcard.word);
              }
            }}
            className="w-full min-h-[300px] sm:min-h-[340px] bg-white rounded-3xl border-2 border-slate-200 hover:border-sky-400 p-8 flex flex-col justify-between items-center text-center cursor-pointer transition-all shadow-md hover:shadow-lg relative select-none"
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider font-english">
                {currentFlashcard?.category || 'English Vocabulary'}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentFlashcard) handleListenWord(currentFlashcard.word);
                }}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="השמע מילה"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Center Content */}
            <div className="my-auto py-6">
              {!isFlipped ? (
                <div>
                  <h3 className="text-4xl sm:text-5xl font-black font-english text-slate-900 tracking-tight mb-2">
                    {currentFlashcard?.word}
                  </h3>
                  <span className="text-sm font-mono text-slate-400 block mb-4">
                    {currentFlashcard?.ipa}
                  </span>
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                    לחצו להפיכת הכרטיסייה וחשיפת התרגום 🔄
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-3xl sm:text-4xl font-black font-hebrew text-slate-900 tracking-tight">
                    {currentFlashcard?.hebrewTranslation}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold uppercase font-english">
                    {currentFlashcard?.partOfSpeech}
                  </p>
                  <div className="mt-4 p-3 bg-sky-50 rounded-2xl border border-sky-100 max-w-md mx-auto">
                    <p className="font-english font-bold text-sky-900 text-sm dir-ltr" dir="ltr">
                      &quot;{currentFlashcard?.exampleSentenceEn}&quot;
                    </p>
                    <p className="text-xs text-sky-700 mt-1 font-hebrew">
                      {currentFlashcard?.exampleSentenceHe}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-400 font-medium">
              {!isFlipped ? 'לחצו על הכרטיס כדי לראות תרגום ומשפט' : 'לחצו כדי להחזיר לאנגלית'}
            </div>
          </div>

          {/* Flashcard Bottom Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>הקודם</span>
            </button>

            <button
              onClick={handleMarkKnown}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ידעתי את זה! (+הבא)</span>
            </button>

            <button
              onClick={handleNextCard}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              <span>הבא</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODE 3: QUICK WORD QUIZ MODE */}
      {/* ==================================================== */}
      {activeTabMode === 'quiz' && (
        <div className="max-w-xl mx-auto w-full space-y-4">
          {!isQuizFinished ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              {/* Question Progress Header */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-3 border-b border-slate-100">
                <span>
                  שאלה <span className="font-mono text-slate-900">{quizQuestionIndex + 1}</span> מתוך <span className="font-mono">{quizQuestions.length}</span>
                </span>
                <span className="text-amber-700 font-mono bg-amber-50 px-2 py-0.5 rounded-md">
                  ניקוד: {quizScore * 15} XP
                </span>
              </div>

              {/* Question Target Prompt */}
              <div className="text-center py-4">
                <span className="text-xs font-bold text-slate-400 block mb-1">
                  מה התרגום הנכון של המילה?
                </span>
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-4xl font-black font-english text-slate-900 tracking-tight">
                    {currentQuizItem.target.word}
                  </h3>
                  <button
                    onClick={() => handleListenWord(currentQuizItem.target.word)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="השמע מילה"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                <span className="text-xs font-mono text-slate-400 block mt-1">
                  {currentQuizItem.target.ipa}
                </span>
              </div>

              {/* 4 Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {currentQuizItem.options.map((option, idx) => {
                  let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (selectedQuizAnswer !== null) {
                    if (option === currentQuizItem.correctAnswer) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                    } else if (option === selectedQuizAnswer) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                    } else {
                      btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={selectedQuizAnswer !== null}
                      className={`p-4 rounded-2xl border-2 text-base font-bold transition-all cursor-pointer text-center ${btnStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Prompt */}
              {quizFeedback && (
                <div
                  className={`mt-4 p-3 rounded-xl text-center text-xs font-bold ${
                    quizFeedback === 'correct'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {quizFeedback === 'correct'
                    ? '🎉 תשובה נכונה! כל הכבוד (+15 XP)'
                    : `❌ כמעט! התשובה הנכונה היא: ${currentQuizItem.correctAnswer}`}
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                סיימת את חידון המילים בהצלחה!
              </h3>
              <p className="text-sm text-slate-600">
                ענית נכון על <span className="font-bold text-slate-900">{quizScore}</span> מתוך <span className="font-bold text-slate-900">{quizQuestions.length}</span> שאלות.
              </p>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 max-w-xs mx-auto">
                <span className="text-xs font-bold text-amber-800 block">סה״כ בונוס צבור:</span>
                <span className="text-2xl font-black text-amber-900 font-mono">+{quizScore * 15} XP</span>
              </div>
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl transition-colors cursor-pointer"
              >
                שחק שוב פעם 🔁
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD NEW WORD DIALOG */}
      {/* ==================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">הוספת מילה חדשה לאוצר המילים</h3>
                  <span className="text-xs text-slate-500">המילה תישמר במאגר ותתווסף לכרטיסיות ולחידונים</span>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 text-rose-800 text-xs font-bold rounded-xl border border-rose-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveWord} className="space-y-4">
              {/* Row 1: English Word + Hebrew Translation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    המילה באנגלית <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      placeholder="למשל: Guitar"
                      dir="ltr"
                      className="w-full px-3 py-2 text-sm font-english font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    />
                    {newWord.trim() && (
                      <button
                        type="button"
                        onClick={handlePreviewNewWord}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors ${previewPlaying ? 'animate-pulse' : ''}`}
                        title="השמע בדיקת הגייה"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    תרגום לעברית <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    placeholder="למשל: גיטרה"
                    className="w-full px-3 py-2 text-sm font-hebrew font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Row 2: Category & Part of Speech */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    נושא / קטגוריה
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="בית ספר">בית ספר (School)</option>
                    <option value="חיות">חיות וטבע (Animals)</option>
                    <option value="אוכל">אוכל ומטבח (Food)</option>
                    <option value="משפחה">משפחה ואנשים (Family)</option>
                    <option value="פעולות">פעולות וספורט (Actions)</option>
                    <option value="צבעים">צבעים (Colors)</option>
                    <option value="בגדים">בגדים (Clothes)</option>
                    <option value="אישי">אישי / מילים שלי (Custom)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    חלק דיבר
                  </label>
                  <select
                    value={newPartOfSpeech}
                    onChange={(e) => setNewPartOfSpeech(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="noun">שם עצם (Noun)</option>
                    <option value="verb">פועל (Verb)</option>
                    <option value="adjective">שם תואר (Adjective)</option>
                    <option value="pronoun">כינוי גוף (Pronoun)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Phonetic Trap & Tip (Optional) */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">מלכודת הגייה של ישראלים (אופציונלי)</span>
                  <span className="text-[10px] text-slate-400">P / F / B / V / TH</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={newPhoneticTrap}
                    onChange={(e) => setNewPhoneticTrap(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="">ללא מלכודת מיוחדת</option>
                    <option value="P">צליל P (שפתיים נסגרות ומתפרצות)</option>
                    <option value="F">צליל F (שיניים על שפה תחתונה)</option>
                    <option value="B">צליל B (שפתיים ורטט קולי)</option>
                    <option value="V">צליל V (שיניים ושפה עם רטט)</option>
                    <option value="TH">צליל TH (לשון בין השיניים)</option>
                    <option value="magic_e">Magic E (תנועה ארוכה)</option>
                  </select>

                  <input
                    type="text"
                    value={newPhoneticTip}
                    onChange={(e) => setNewPhoneticTip(e.target.value)}
                    placeholder="טיפ בעברית (למשל: להוציא לשון ב-TH)"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Example Sentences */}
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    משפט דוגמה באנגלית (אופציונלי)
                  </label>
                  <input
                    type="text"
                    value={newExampleEn}
                    onChange={(e) => setNewExampleEn(e.target.value)}
                    placeholder='למשל: "I play the guitar every day."'
                    dir="ltr"
                    className="w-full px-3 py-2 text-xs font-english bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    תרגום משפט הדוגמה לעברית
                  </label>
                  <input
                    type="text"
                    value={newExampleHe}
                    onChange={(e) => setNewExampleHe(e.target.value)}
                    placeholder='למשל: "אני מנגן בגיטרה בכל יום."'
                    className="w-full px-3 py-2 text-xs font-hebrew bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  ביטול
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>שמור מילה (+25 XP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: MINISTRY THEMED PACKS IMPORT */}
      {/* ==================================================== */}
      {isPacksModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <PackagePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">טעינת חבילות מילים של משרד החינוך</h3>
                  <span className="text-xs text-slate-500">הוסיפו בלחיצה אחת מילות יסוד נוספות לפי נושאים</span>
                </div>
              </div>
              <button
                onClick={() => setIsPacksModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl border border-slate-200 hover:border-sky-300 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-1 block">🐾</span>
                  <h4 className="text-sm font-bold text-slate-900">חיות וטבע (Animals)</h4>
                  <p className="text-xs text-slate-500 mt-1">Dog, Cat, Horse, Duck, Bear ועוד</p>
                </div>
                <button
                  onClick={() => handleImportPack('animals')}
                  className="mt-3 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  + טען חבילה (5 מילים)
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 hover:border-amber-300 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-1 block">🍎</span>
                  <h4 className="text-sm font-bold text-slate-900">אוכל ומטבח (Food)</h4>
                  <p className="text-xs text-slate-500 mt-1">Apple, Bread, Milk, Orange, Pizza</p>
                </div>
                <button
                  onClick={() => handleImportPack('food')}
                  className="mt-3 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  + טען חבילה (5 מילים)
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-1 block">🎒</span>
                  <h4 className="text-sm font-bold text-slate-900">כיתה ולימודים (School)</h4>
                  <p className="text-xs text-slate-500 mt-1">Chair, Computer, Student, Pen</p>
                </div>
                <button
                  onClick={() => handleImportPack('school')}
                  className="mt-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  + טען חבילה (4 מילים)
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-1 block">🏃‍♂️</span>
                  <h4 className="text-sm font-bold text-slate-900">פעולות יומיום (Actions)</h4>
                  <p className="text-xs text-slate-500 mt-1">Jump, Sing, Smile, Help</p>
                </div>
                <button
                  onClick={() => handleImportPack('actions')}
                  className="mt-3 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  + טען חבילה (4 מילים)
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsPacksModalOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                סגור חלון
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Fallback pool if only 1 word exists
const fullCurriculumWordPoolFallback: Band1VocabWord[] = [
  { id: 'fb-1', word: 'Apple', partOfSpeech: 'noun', hebrewTranslation: 'תפוח', ipa: '/ˈæpəl/', exampleSentenceEn: 'I eat an apple.', exampleSentenceHe: 'אני אוכל תפוח.', band: 'Band I' },
  { id: 'fb-2', word: 'Book', partOfSpeech: 'noun', hebrewTranslation: 'ספר', ipa: '/bʊk/', exampleSentenceEn: 'Read a book.', exampleSentenceHe: 'קרא ספר.', band: 'Band I' },
  { id: 'fb-3', word: 'Dog', partOfSpeech: 'noun', hebrewTranslation: 'כלב', ipa: '/dɒɡ/', exampleSentenceEn: 'The dog is barking.', exampleSentenceHe: 'הכלב נובח.', band: 'Band I' },
  { id: 'fb-4', word: 'Friend', partOfSpeech: 'noun', hebrewTranslation: 'חבר', ipa: '/frend/', exampleSentenceEn: 'He is my friend.', exampleSentenceHe: 'הוא החבר שלי.', band: 'Band I' }
];
