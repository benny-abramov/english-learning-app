import { CurriculumModule } from '../types/curriculum';
import {
  unit1Vocab,
  unit2Vocab,
  unit3Vocab,
  unit4Vocab,
  unit5Vocab,
  unit6Vocab,
  unit7Vocab,
  unit8Vocab,
  unit9Vocab,
  unit10Vocab,
  unit11Vocab,
  unit12Vocab
} from './curriculumVocabData';

export const fullCurriculumData: CurriculumModule = {
  id: 'moe-band1-full-suite',
  version: '2.0.0',
  metadata: {
    titleEn: 'Sababa English: Comprehensive Israeli Elementary Curriculum (Band I)',
    titleHe: 'סבבה אנגלית: תכנית הלימודים המלאה לכיתות ד׳-ה׳ (Band I)',
    gradeLevel: '4th-5th',
    ministryBand: 'Band I',
    curriculumDomain: 'Core Israeli Elementary ESL / CEFR A1-A2',
    estimatedMinutes: 90,
    recommendedDevice: 'Tablet Landscape / Desktop',
    authors: 'Ministry of Education Band I Curriculum Consultant & Senior Tech Architect',
    learningObjectives: {
      en: [
        'Master the key Israeli phonetic hurdles: P vs F, B vs V, short /ɪ/ vs long /iː/, interdental "TH", CH vs SH, Soft vs Hard C/G, the 3 sounds of "-ed", silent letters, and comparative /ər/ sounds.',
        'Overcome Hebrew zero-copula syntax by systematically applying "to be", "There is / There are", past simple, future intentions, and modals of obligation.',
        'Apply plural suffixes (-s, -es), 3rd person singular (-s), -ing aspect, and comparative degrees (-er, -est) with accurate subject-verb agreement.',
        'Form affirmative, negative, question inversions, and complex sentences with correct left-to-right mechanics.',
        'Master 320+ high-frequency Ministry of Education Band I & Band II foundational words across 12 comprehensive units.'
      ],
      he: [
        'שליטה במלכודות ההגייה של ישראלים: P מול F, B מול V, תנועות קצרות וארוכות, צליל TH, עיצורים שורקים (CH/SH), אותיות שקטות, סיומות -ed ותארי השוואה.',
        'התגברות על השמטת פועל עזר (Zero Copula) ושימוש מדויק ב-To Be, There is/are, עבר פשוט, עתיד ופעלי מודל (must, should, have to).',
        'הוספת סיומות ריבוי (-s, -es), הטיות גוף שלישי (-s), סיומות -ing והשוואות (-er, -est) עם התאם תקין.',
        'בניית משפטי חיווי, שלילה, שאלות ועמדות משמאל לימין תוך הקפדה על אותיות רישיות ופיסוק תקין.',
        'שליטה ב-320+ מילות ליבה חיוניות מרשימות Band I ו-Band II של משרד החינוך ב-12 יחידות לימוד מקיפות.'
      ]
    },
    targetLinguisticGaps: [
      {
        gapNameHe: 'פער הצלילים P מול F (אות פ׳ דגושה/רפה)',
        descriptionHe: 'אות עברית אחת לשני צלילים שונים לחלוטין באנגלית.',
        pedagogicalStrategy: 'תרגול זוגות מינימליים (Pan/Fan) והדמיית מנח שפתיים.'
      },
      {
        gapNameHe: 'פער הצלילים B מול V (אות ב׳ דגושה/רפה)',
        descriptionHe: 'האות ב׳ מייצגת גם B וגם V. ישראלים מבלבלים בין Berry (גרגיר) ל-Very (מאוד).',
        pedagogicalStrategy: 'הבחנה בין רטט שפתיים של B לבין זרימת שיניים-שפה של V.'
      },
      {
        gapNameHe: 'השמטת פועל עזר (Zero Copula Trap)',
        descriptionHe: 'בעברית אין פועל הווה ("הוא מורה", "אנחנו שמחים"). באנגלית חובה am/is/are.',
        pedagogicalStrategy: 'סימולטור טכנאי הברגים המחייב חיבור בורג פועל לכל משפט.'
      },
      {
        gapNameHe: 'התנועות הקצרות לעומת ניקוד עברי (Ship vs Sheep)',
        descriptionHe: 'עברית מסתמכת על ניקוד חטוף וחיריק פשוט, ומתקשה בהבחנה בין /ɪ/ ל-/iː/.',
        pedagogicalStrategy: 'זיהוי חזותי ושמיעתי של אורך התנועה במשחקי חילוץ.'
      }
    ]
  },

  units: [
    // ==========================================
    // UNIT 1: P/F Phonetics & Verb "To Be"
    // ==========================================
    {
      id: 'unit-1',
      unitNumber: 1,
      titleEn: 'Sound & Sentence Detective',
      titleHe: 'בלש הצלילים והמשפטים',
      themeHe: 'אותיות P ו-F ופועל העזר To Be בהווה',
      descriptionHe: 'נלמד להבדיל בין פּ דגושה לפֿ רפה, ונחבר את פועל העזר החסר למשפטים!',
      badgeIcon: 'Search',
      xpReward: 150,
      phonicsGapName: 'P vs F Minimal Pairs',
      grammarFocusName: 'Present Simple "To Be" (am / is / are)',
      phonicsExercises: [
        {
          id: 'u1-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'מחבת (Pan) או מאוורר (Fan)?',
          instructionHe: 'האזינו למילה ובחרו את האות והמשמעות הנכונה:',
          targetLetter: 'P',
          distractorLetter: 'F',
          targetWord: {
            id: 'w-pan',
            letter: 'P',
            word: 'Pan',
            ipa: '/pæn/',
            hebrewTranslation: 'מחבת',
            audioText: 'pan',
            hebrewLetterEquivalent: 'פּ (דגושה)',
            exampleSentence: 'The pan is hot.'
          },
          distractorWord: {
            id: 'w-fan',
            letter: 'F',
            word: 'Fan',
            ipa: '/fæn/',
            hebrewTranslation: 'מאוורר',
            audioText: 'fan',
            hebrewLetterEquivalent: 'פֿ (רפה)',
            exampleSentence: 'Turn on the fan.'
          },
          hebrewHint: 'שפתיים נסגרות חזק ומתפרצות = P (Pan)!',
          articulationGuide: {
            mouthShape: 'lips_closed_pop',
            soundNameEn: '/p/ Bilabial Plosive',
            soundNameHe: 'צליל P: פיצוץ שפתיים',
            hebrewRule: 'השפתיים נצמדות חזק ומשחררות אוויר בבת אחת.',
            mnemonicHe: 'P כמו פופקורן שקופץ!',
            articulationCueEn: 'Close lips tightly, pop open.'
          },
          explanationHe: 'מעולה! Pan היא מחבת ב-P. המילה Fan היא מאוורר ב-F.'
        },
        {
          id: 'u1-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'תאנה מתוקה (Fig) או חזיר (Pig)?',
          instructionHe: 'הקשיבו: האם נשבה רוח עדינה או נקישת שפתיים?',
          targetLetter: 'F',
          distractorLetter: 'P',
          targetWord: {
            id: 'w-fig',
            letter: 'F',
            word: 'Fig',
            ipa: '/fɪɡ/',
            hebrewTranslation: 'תאנה',
            audioText: 'fig',
            hebrewLetterEquivalent: 'פֿ (רפה)',
            exampleSentence: 'I like to eat a sweet fig.'
          },
          distractorWord: {
            id: 'w-pig',
            letter: 'P',
            word: 'Pig',
            ipa: '/pɪɡ/',
            hebrewTranslation: 'חזיר',
            audioText: 'pig',
            hebrewLetterEquivalent: 'פּ (דגושה)',
            exampleSentence: 'The pig plays in the mud.'
          },
          hebrewHint: 'שיניים על שפה תחתונה עם רוח = האות F (Fig)!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/f/ Labiodental Fricative',
            soundNameHe: 'צליל F: רוח שיניים',
            hebrewRule: 'השיניים העליונות נוגעות בשפה התחתונה.',
            mnemonicHe: 'F כמו רוח קרירה: פֿפֿפֿ...',
            articulationCueEn: 'Top teeth touch lower lip with air flow.'
          },
          explanationHe: 'מצוין! Fig (תאנה) מתחילה ב-F עם שיניים על השפה.'
        },
        {
          id: 'u1-p3',
          type: 'phonics_minimal_pair',
          titleHe: 'פארק ירוק (Park) או מזלג (Fork)?',
          instructionHe: 'האזינו לצליל הפותח של המילה:',
          targetLetter: 'P',
          distractorLetter: 'F',
          targetWord: {
            id: 'w-park',
            letter: 'P',
            word: 'Park',
            ipa: '/pɑːrk/',
            hebrewTranslation: 'פארק / גן משחקים',
            audioText: 'park',
            hebrewLetterEquivalent: 'פּ (דגושה)',
            exampleSentence: 'We run in the park.'
          },
          distractorWord: {
            id: 'w-fork',
            letter: 'F',
            word: 'Fork',
            ipa: '/fɔːrk/',
            hebrewTranslation: 'מזלג',
            audioText: 'fork',
            hebrewLetterEquivalent: 'פֿ (רפה)',
            exampleSentence: 'I eat with a fork.'
          },
          hebrewHint: 'צליל פותח בשפתיים צמודות = P.',
          articulationGuide: {
            mouthShape: 'lips_closed_pop',
            soundNameEn: '/p/ Sound',
            soundNameHe: 'צליל P',
            hebrewRule: 'שפתיים נסגרות ומתפרצות.',
            mnemonicHe: 'P כמו Park ו-Pizza!',
            articulationCueEn: 'Lips snap open.'
          },
          explanationHe: 'מדויק! Park מתחיל ב-P. המילה Fork מתחילה ב-F.'
        },
        {
          id: 'u1-p4',
          type: 'phonics_minimal_pair',
          titleHe: 'למלא כוס (Fill) או גלולה (Pill)?',
          instructionHe: 'הקשיבו היטב לפעולה שנאמרת:',
          targetLetter: 'F',
          distractorLetter: 'P',
          targetWord: {
            id: 'w-fill',
            letter: 'F',
            word: 'Fill',
            ipa: '/fɪl/',
            hebrewTranslation: 'למלא',
            audioText: 'fill',
            hebrewLetterEquivalent: 'פֿ (רפה)',
            exampleSentence: 'Fill the cup with milk.'
          },
          distractorWord: {
            id: 'w-pill',
            letter: 'P',
            word: 'Pill',
            ipa: '/pɪl/',
            hebrewTranslation: 'גלולה / כדור תרופה',
            audioText: 'pill',
            hebrewLetterEquivalent: 'פּ (דגושה)',
            exampleSentence: 'Take the medicine pill.'
          },
          hebrewHint: 'רוח רציפה בין השיניים לשפה = F.',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/f/ Sound',
            soundNameHe: 'צליל F',
            hebrewRule: 'השיניים על השפה מייצרות F.',
            mnemonicHe: 'F כמו Fill ו-Fish!',
            articulationCueEn: 'Continuous air release.'
          },
          explanationHe: 'מעולה! Fill זה למלא (באות F).'
        }
      ],
      verbExercises: [
        {
          id: 'u1-v1',
          hebrewPromptSentence: 'אני תלמיד בכיתה ה׳.',
          subject: 'I',
          subjectType: 'first_singular',
          baseTemplateBefore: 'I',
          baseTemplateAfter: 'a student in fifth grade.',
          correctAnswer: 'am',
          options: ['am', 'is', 'are'],
          hebrewContrastLesson: 'בעברית אין פועל ("אני תלמיד"). באנגלית חובה I AM a student!',
          fullSentenceEn: 'I am a student in fifth grade.',
          audioText: 'I am a student in fifth grade.'
        },
        {
          id: 'u1-v2',
          hebrewPromptSentence: 'הכלב מהיר מאוד.',
          subject: 'The dog',
          subjectType: 'third_singular',
          baseTemplateBefore: 'The dog',
          baseTemplateAfter: 'very fast.',
          correctAnswer: 'is',
          options: ['is', 'are', 'am'],
          hebrewContrastLesson: 'הכלב (The dog) הוא יחיד (He/It). לכן מחברים לו את הבורג IS!',
          fullSentenceEn: 'The dog is very fast.',
          audioText: 'The dog is very fast.'
        },
        {
          id: 'u1-v3',
          hebrewPromptSentence: 'הילדים בפארק עכשיו.',
          subject: 'The children',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'The children',
          baseTemplateAfter: 'in the park right now.',
          correctAnswer: 'are',
          options: ['are', 'is', 'am'],
          hebrewContrastLesson: 'Children הם ילדים ברבים (They), לכן בוחרים ב-ARE!',
          fullSentenceEn: 'The children are in the park right now.',
          audioText: 'The children are in the park right now.'
        },
        {
          id: 'u1-v4',
          hebrewPromptSentence: 'החתול לא עייף היום.',
          subject: 'The cat',
          subjectType: 'third_singular',
          baseTemplateBefore: 'The cat',
          baseTemplateAfter: 'tired today.',
          correctAnswer: "isn't",
          options: ["isn't", "aren't", 'am not'],
          hebrewContrastLesson: 'בשלילה של יחיד (It/The cat) משתמשים ב-is not או isn\'t!',
          fullSentenceEn: "The cat isn't tired today.",
          audioText: "The cat isn't tired today.",
          isNegative: true
        }
      ],
      sentenceExercises: [
        {
          id: 'u1-s1',
          hebrewPromptSentence: 'החתול שלי חום ולבן.',
          targetSentenceTokens: ['My', 'cat', 'is', 'brown', 'and', 'white', '.'],
          scrambledTokens: [
            { id: 't1', text: 'cat' },
            { id: 't2', text: 'My' },
            { id: 't3', text: 'is' },
            { id: 't4', text: 'and' },
            { id: 't5', text: 'brown' },
            { id: 't6', text: 'white' },
            { id: 't7', text: '.', isPunctuation: true },
            { id: 't8', text: 'are', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'המילה הראשונה היא My עם אות M גדולה!',
          ruleExplanationHe: 'בעברית אומרים "החתול שלי חום", באנגלית חובה: My cat IS brown!',
          audioFullSentence: 'My cat is brown and white.'
        },
        {
          id: 'u1-s2',
          hebrewPromptSentence: 'אנחנו משחקים בפארק כל יום.',
          targetSentenceTokens: ['We', 'play', 'in', 'the', 'park', 'every', 'day', '.'],
          scrambledTokens: [
            { id: 't1', text: 'park' },
            { id: 't2', text: 'We' },
            { id: 't3', text: 'play' },
            { id: 't4', text: 'in' },
            { id: 't5', text: 'the' },
            { id: 't6', text: 'every' },
            { id: 't7', text: 'day' },
            { id: 't8', text: '.', isPunctuation: true },
            { id: 't9', text: 'plays', isDistractor: true }
          ],
          grammarFocus: 'p_f_phonics',
          capitalizationTipHe: 'אות W גדולה בראש המשפט: We.',
          ruleExplanationHe: 'המילה park נכתבת באות P (ולא F!). בנוסף, עם We הפועל נשאר play.',
          audioFullSentence: 'We play in the park every day.'
        }
      ],
      suffixItems: [
        { id: 'suf-1', baseWord: 'play', targetSuffix: '-s', fullWord: 'plays', hebrewMeaning: 'משחק (הוא/היא)', ruleHintHe: 'מוסיפים s עם he/she/it' },
        { id: 'suf-2', baseWord: 'eat', targetSuffix: '-s', fullWord: 'eats', hebrewMeaning: 'אוכל (יחיד)', ruleHintHe: 'תוספת s ליחיד בהווה' }
      ],
      vocabulary: unit1Vocab
    },

    // ==========================================
    // UNIT 2: B/V Phonetics & Present Progressive
    // ==========================================
    {
      id: 'unit-2',
      unitNumber: 2,
      titleEn: 'The Action Station & B/V Lab',
      titleHe: 'תחנת הפעולה והצלילים B ו-V',
      themeHe: 'הבחנה בין צליל B ל-V והווה ממושך (Present Progressive: -ing)',
      descriptionHe: 'איך מבדילים בין גרגר יער (Berry) למילה "מאוד" (Very)? ואיך מרכיבים פועל שקורה ממש עכשיו!',
      badgeIcon: 'Zap',
      xpReward: 200,
      phonicsGapName: 'B vs V Minimal Pairs',
      grammarFocusName: 'Present Progressive (am/is/are + verb-ing)',
      phonicsExercises: [
        {
          id: 'u2-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'גרגר יער (Berry) או המילה מאוד (Very)?',
          instructionHe: 'האזינו לקול: האם שמעתם שפתיים שרוטטות (B) או שיניים על שפה (V)?',
          targetLetter: 'B',
          distractorLetter: 'V',
          targetWord: {
            id: 'w-berry',
            letter: 'B',
            word: 'Berry',
            ipa: '/ˈberi/',
            hebrewTranslation: 'גרגר יער / תות',
            audioText: 'berry',
            hebrewLetterEquivalent: 'בּ (דגושה)',
            exampleSentence: 'I eat a sweet blue berry.'
          },
          distractorWord: {
            id: 'w-very',
            letter: 'V',
            word: 'Very',
            ipa: '/ˈveri/',
            hebrewTranslation: 'מאוד',
            audioText: 'very',
            hebrewLetterEquivalent: 'בֿ (רפה)',
            exampleSentence: 'Thank you very much.'
          },
          hebrewHint: 'האות B דורשת שתי שפתיים צמודות עם רטט קולי: בַּ!',
          articulationGuide: {
            mouthShape: 'lips_vibrate_b',
            soundNameEn: '/b/ Voiced Bilabial Stop',
            soundNameHe: 'צליל B: שפתיים ורטט קולי',
            hebrewRule: 'השפתיים נסגרות עם רטט במיתרי הקול: בּ!',
            mnemonicHe: 'B כמו Ball ו-Banana!',
            articulationCueEn: 'Lips vibrate together with voice.'
          },
          explanationHe: 'כל הכבוד! Berry הוא גרגיר יער עם B. המילה Very (מאוד) נכתבת ב-V.'
        },
        {
          id: 'u2-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'עטלף (Bat) או גיגית מים (Vat)?',
          instructionHe: 'הקשיבו לצליל: מה נאמר כאן?',
          targetLetter: 'B',
          distractorLetter: 'V',
          targetWord: {
            id: 'w-bat',
            letter: 'B',
            word: 'Bat',
            ipa: '/bæt/',
            hebrewTranslation: 'עטלף / מחבט',
            audioText: 'bat',
            hebrewLetterEquivalent: 'בּ (דגושה)',
            exampleSentence: 'The bat flies in the night.'
          },
          distractorWord: {
            id: 'w-vat',
            letter: 'V',
            word: 'Vat',
            ipa: '/væt/',
            hebrewTranslation: 'גיגית / חבית גדולה',
            audioText: 'vat',
            hebrewLetterEquivalent: 'בֿ (רפה)',
            exampleSentence: 'A vat of oil.'
          },
          hebrewHint: 'צליל B מתחיל בהצמדת שתי השפתיים יחד.',
          articulationGuide: {
            mouthShape: 'lips_vibrate_b',
            soundNameEn: '/b/ Sound',
            soundNameHe: 'צליל B',
            hebrewRule: 'שפתיים נצמדות חזק.',
            mnemonicHe: 'B כמו Bat ו-Book!',
            articulationCueEn: 'Firm lip closure.'
          },
          explanationHe: 'מדויק! Bat (עטלף ומחבט בייסבול) מתחיל ב-B!'
        },
        {
          id: 'u2-p3',
          type: 'phonics_minimal_pair',
          titleHe: 'הטוב ביותר (Best) או אפוד (Vest)?',
          instructionHe: 'האזינו היטב: Best או Vest?',
          targetLetter: 'V',
          distractorLetter: 'B',
          targetWord: {
            id: 'w-vest',
            letter: 'V',
            word: 'Vest',
            ipa: '/vest/',
            hebrewTranslation: 'אפוד / וסט',
            audioText: 'vest',
            hebrewLetterEquivalent: 'ו / בֿ רפה',
            exampleSentence: 'Wear a yellow safety vest.'
          },
          distractorWord: {
            id: 'w-best',
            letter: 'B',
            word: 'Best',
            ipa: '/best/',
            hebrewTranslation: 'הכי טוב',
            audioText: 'best',
            hebrewLetterEquivalent: 'בּ (דגושה)',
            exampleSentence: 'You are the best.'
          },
          hebrewHint: 'שיניים נוגעות בשפה התחתונה עם רטט = האות V!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/v/ Voiced Fricative',
            soundNameHe: 'צליל V: שיניים ורטט',
            hebrewRule: 'שיניים עליונות על שפה תחתונה עם רטט קולי: ו/בֿ.',
            mnemonicHe: 'V כמו Video ו-Van!',
            articulationCueEn: 'Teeth on lip with buzzing voice.'
          },
          explanationHe: 'מעולה! Vest (אפוד) מתחיל ב-V. המילה Best מתחילה ב-B.'
        }
      ],
      verbExercises: [
        {
          id: 'u2-v1',
          hebrewPromptSentence: 'הילד רץ עכשיו.',
          subject: 'The boy',
          subjectType: 'third_singular',
          baseTemplateBefore: 'The boy',
          baseTemplateAfter: 'right now.',
          correctAnswer: 'is running',
          options: ['is running', 'are running', 'running'],
          hebrewContrastLesson: 'בהווה ממושך חובה שני חלקים: פועל to be (is) ועוד פועל עם -ing!',
          fullSentenceEn: 'The boy is running right now.',
          audioText: 'The boy is running right now.'
        },
        {
          id: 'u2-v2',
          hebrewPromptSentence: 'אנחנו אוכלים פיצה כרגע.',
          subject: 'We',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'We',
          baseTemplateAfter: 'delicious pizza at the moment.',
          correctAnswer: 'are eating',
          options: ['are eating', 'is eating', 'eat'],
          hebrewContrastLesson: 'עם We חובה להשתמש ב-ARE eating (לא is eating!).',
          fullSentenceEn: 'We are eating delicious pizza at the moment.',
          audioText: 'We are eating delicious pizza at the moment.'
        },
        {
          id: 'u2-v3',
          hebrewPromptSentence: 'אני קורא ספר מרתק.',
          subject: 'I',
          subjectType: 'first_singular',
          baseTemplateBefore: 'I',
          baseTemplateAfter: 'a great book.',
          correctAnswer: 'am reading',
          options: ['am reading', 'is reading', 'reading'],
          hebrewContrastLesson: 'עם I מחברים תמיד am reading!',
          fullSentenceEn: 'I am reading a great book.',
          audioText: 'I am reading a great book.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u2-s1',
          hebrewPromptSentence: 'מאיה שוחה בבריכה עכשיו.',
          targetSentenceTokens: ['Maya', 'is', 'swimming', 'in', 'the', 'pool', 'now', '.'],
          scrambledTokens: [
            { id: 't1', text: 'Maya' },
            { id: 't2', text: 'swimming' },
            { id: 't3', text: 'is' },
            { id: 't4', text: 'in' },
            { id: 't5', text: 'the' },
            { id: 't6', text: 'pool' },
            { id: 't7', text: 'now' },
            { id: 't8', text: '.', isPunctuation: true },
            { id: 't9', text: 'are', isDistractor: true }
          ],
          grammarFocus: 'present_progressive',
          capitalizationTipHe: 'שם פרטי (Maya) נפתח תמיד באות גדולה!',
          ruleExplanationHe: 'Maya היא יחידה (She), לכן: Maya is swimming.',
          audioFullSentence: 'Maya is swimming in the pool now.'
        },
        {
          id: 'u2-s2',
          hebrewPromptSentence: 'הציפורים שרות בעץ.',
          targetSentenceTokens: ['The', 'birds', 'are', 'singing', 'in', 'the', 'tree', '.'],
          scrambledTokens: [
            { id: 't1', text: 'The' },
            { id: 't2', text: 'birds' },
            { id: 't3', text: 'are' },
            { id: 't4', text: 'singing' },
            { id: 't5', text: 'in' },
            { id: 't6', text: 'the' },
            { id: 't7', text: 'tree' },
            { id: 't8', text: '.', isPunctuation: true },
            { id: 't9', text: 'is', isDistractor: true }
          ],
          grammarFocus: 'present_progressive',
          capitalizationTipHe: 'אות T גדולה ב-The בראש המשפט.',
          ruleExplanationHe: 'הציפורים ברבים (birds) מקבלות ARE singing.',
          audioFullSentence: 'The birds are singing in the tree.'
        }
      ],
      suffixItems: [
        { id: 'suf-3', baseWord: 'run', targetSuffix: '-ing', fullWord: 'running', hebrewMeaning: 'רץ עכשיו', ruleHintHe: 'הכפלת אות אחרונה לפני -ing' },
        { id: 'suf-4', baseWord: 'jump', targetSuffix: '-ing', fullWord: 'jumping', hebrewMeaning: 'קופץ עכשיו', ruleHintHe: 'תוספת -ing פשוטה' },
        { id: 'suf-5', baseWord: 'swim', targetSuffix: '-ing', fullWord: 'swimming', hebrewMeaning: 'שוחה עכשיו', ruleHintHe: 'הכפלת m לפני -ing' }
      ],
      vocabulary: unit2Vocab
    },

    // ==========================================
    // UNIT 3: The Plural Safari & Vowel Rescue
    // ==========================================
    {
      id: 'unit-3',
      unitNumber: 3,
      titleEn: 'The Plural Safari & Vowel Rescue',
      titleHe: 'ספארי הריבוי והתנועות הקצרות',
      themeHe: 'סיומות ריבוי (-s, -es) ומילים יוצאות דופן, והבחנה בין ship ל-sheep',
      descriptionHe: 'איך הופכים מילה יחידה לרבים, ואיך מבדילים בין תנועה קצרה (ספינה) לתנועה ארוכה (כבשה)?',
      badgeIcon: 'Award',
      xpReward: 250,
      phonicsGapName: 'Short /ɪ/ vs Long /iː/',
      grammarFocusName: 'Plural Nouns (-s / -es / irregulars: children, feet)',
      phonicsExercises: [
        {
          id: 'u3-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'אונייה גדולה (Ship) או כבשה צמרירית (Sheep)?',
          instructionHe: 'האזינו לאורך התנועה: האם הצליל היה קצר וחטוף (Ship) או ארוך ומתוח (Sheep)?',
          targetLetter: 'short-I',
          distractorLetter: 'long-EE',
          targetWord: {
            id: 'w-ship',
            letter: 'short-I',
            word: 'Ship',
            ipa: '/ʃɪp/',
            hebrewTranslation: 'ספינה / אונייה',
            audioText: 'ship',
            hebrewLetterEquivalent: 'חיריק חטוף קצר',
            exampleSentence: 'The ship sails on the sea.'
          },
          distractorWord: {
            id: 'w-sheep',
            letter: 'long-EE',
            word: 'Sheep',
            ipa: '/ʃiːp/',
            hebrewTranslation: 'כבשה',
            audioText: 'sheep',
            hebrewLetterEquivalent: 'אי מוארכת ומתוחה',
            exampleSentence: 'The white sheep eats grass.'
          },
          hebrewHint: 'ספינה היא קצרה: /ʃɪp/. כבשה מחייכת באורך: /ʃiːp/!',
          articulationGuide: {
            mouthShape: 'short_relaxed_vowel',
            soundNameEn: 'Short /ɪ/ vs Long /iː/',
            soundNameHe: 'הבחנה בין תנועה קצרה לארוכה',
            hebrewRule: 'התנועה הקצרה נאמרת במהירות ללא חיוך מתוח.',
            mnemonicHe: 'Ship שטה מהר, Sheep מחייכת כמו כבשה!',
            articulationCueEn: 'Relax jaw for short /ɪ/, smile wide for long /iː/.'
          },
          explanationHe: 'מעולה! Ship היא אונייה בצליל חטוף. Sheep זו כבשה בצליל מתוח.'
        },
        {
          id: 'u3-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'לשבת (Sit) או כיסא ומושב (Seat)?',
          instructionHe: 'הקשיבו היטב: האם שמעתם Sit או Seat?',
          targetLetter: 'long-EE',
          distractorLetter: 'short-I',
          targetWord: {
            id: 'w-seat',
            letter: 'long-EE',
            word: 'Seat',
            ipa: '/siːt/',
            hebrewTranslation: 'מושב / מקום ישיבה',
            audioText: 'seat',
            hebrewLetterEquivalent: 'תנועת אי ארוכה',
            exampleSentence: 'Please take a seat.'
          },
          distractorWord: {
            id: 'w-sit',
            letter: 'short-I',
            word: 'Sit',
            ipa: '/sɪt/',
            hebrewTranslation: 'לשבת (פעולה)',
            audioText: 'sit',
            hebrewLetterEquivalent: 'חיריק קצר',
            exampleSentence: 'Sit down on the chair.'
          },
          hebrewHint: 'צליל אי מתוח וארוך = Seat (מושב).',
          articulationGuide: {
            mouthShape: 'short_relaxed_vowel',
            soundNameEn: 'Long /iː/',
            soundNameHe: 'צליל /iː/ ארוך',
            hebrewRule: 'פה מחייך בצורה מוארכת.',
            mnemonicHe: 'Seat הוא המושב שלך.',
            articulationCueEn: 'Elongate the vowel sound.'
          },
          explanationHe: 'כל הכבוד! Seat הוא מושב באורך מתוח.'
        }
      ],
      verbExercises: [
        {
          id: 'u3-v1',
          hebrewPromptSentence: 'הילדים נמצאים בכיתה.',
          subject: 'The children',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'The children',
          baseTemplateAfter: 'in the classroom.',
          correctAnswer: 'are',
          options: ['are', 'is', 'am'],
          hebrewContrastLesson: 'זהירות! child = ילד אחד, אבל children = ילדים ברבים! לכן חובה ARE!',
          fullSentenceEn: 'The children are in the classroom.',
          audioText: 'The children are in the classroom.'
        },
        {
          id: 'u3-v2',
          hebrewPromptSentence: 'שלושה חתולים ישנים על השולחן.',
          subject: 'Three cats',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'Three cats',
          baseTemplateAfter: 'sleeping on the table.',
          correctAnswer: 'are',
          options: ['are', 'is', 'am'],
          hebrewContrastLesson: 'Cats זה שם עצם בריבוי (יותר מאחד), לכן מחברים בורג ARE!',
          fullSentenceEn: 'Three cats are sleeping on the table.',
          audioText: 'Three cats are sleeping on the table.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u3-s1',
          hebrewPromptSentence: 'יש לי שני ספרים גדולים.',
          targetSentenceTokens: ['I', 'have', 'two', 'big', 'books', '.'],
          scrambledTokens: [
            { id: 't1', text: 'I' },
            { id: 't2', text: 'have' },
            { id: 't3', text: 'two' },
            { id: 't4', text: 'big' },
            { id: 't5', text: 'books' },
            { id: 't6', text: '.', isPunctuation: true },
            { id: 't7', text: 'book', isDistractor: true }
          ],
          grammarFocus: 'plural_nouns',
          capitalizationTipHe: 'שם הגוף I באות גדולה.',
          ruleExplanationHe: 'כיון שיש שניים (two), המילה book מקבלת סיומת רבים: books!',
          audioFullSentence: 'I have two big books.'
        }
      ],
      suffixItems: [
        { id: 'suf-6', baseWord: 'cat', targetSuffix: '-s', fullWord: 'cats', hebrewMeaning: 'חתולים', ruleHintHe: 'סיומת ריבוי רגילה' },
        { id: 'suf-7', baseWord: 'box', targetSuffix: '-es', fullWord: 'boxes', hebrewMeaning: 'קופסאות', ruleHintHe: 'אחרי x מוסיפים es' },
        { id: 'suf-8', baseWord: 'watch', targetSuffix: '-es', fullWord: 'watches', hebrewMeaning: 'שעונים', ruleHintHe: 'אחרי ch מוסיפים es' }
      ],
      vocabulary: unit3Vocab
    },

    // ==========================================
    // UNIT 4: The Question Quest & "TH" Sounds
    // ==========================================
    {
      id: 'unit-4',
      unitNumber: 4,
      titleEn: 'The Question Quest & "TH" Sounds',
      titleHe: 'מסע השאלות וצלילי TH',
      themeHe: 'הוצאת לשון בצליל TH ויצירת שאלות כן/לא ושאלות מידע',
      descriptionHe: 'איך מבטאים Three בלי להגיד "סרי"? ואיך הופכים משפט רגיל לשאלה באנגלית!',
      badgeIcon: 'HelpCircle',
      xpReward: 300,
      phonicsGapName: 'Interdental "TH" (/θ/ & /ð/)',
      grammarFocusName: 'Question Inversion (Is he...? / Are you...? / Where is...?)',
      phonicsExercises: [
        {
          id: 'u4-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'המספר שלוש (Three) או עץ ביער (Tree)?',
          instructionHe: 'האזינו לקול: האם הלשון בצבצה בין השיניים (Three) או נקשה בחך (Tree)?',
          targetLetter: 'TH',
          distractorLetter: 'T',
          targetWord: {
            id: 'w-three',
            letter: 'TH',
            word: 'Three',
            ipa: '/θriː/',
            hebrewTranslation: 'שלוש (מספר)',
            audioText: 'three',
            hebrewLetterEquivalent: 'ת׳ מוטעמת עם לשון בחוץ',
            exampleSentence: 'One, two, three apples.'
          },
          distractorWord: {
            id: 'w-tree',
            letter: 'T',
            word: 'Tree',
            ipa: '/triː/',
            hebrewTranslation: 'עץ',
            audioText: 'tree',
            hebrewLetterEquivalent: 'ט / ת רגילה',
            exampleSentence: 'The green tree is tall.'
          },
          hebrewHint: 'המספר 3 מתחיל ב-TH: הלשון מציצה בעדינות בין השיניים!',
          articulationGuide: {
            mouthShape: 'tongue_between_teeth',
            soundNameEn: '/θ/ Voiceless Dental Fricative',
            soundNameHe: 'צליל TH עם לשון בחוץ',
            hebrewRule: 'הלשון מבצבצת בעדינות בין השיניים העליונות לתחתונות.',
            mnemonicHe: 'TH כמו Thank you ו-Three!',
            articulationCueEn: 'Place tongue tip between teeth and breathe out.'
          },
          explanationHe: 'כל הכבוד! Three (המספר 3) נאמר עם לשון בין השיניים ב-TH.'
        },
        {
          id: 'u4-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'לחשוב (Think) או לשקוע במים (Sink)?',
          instructionHe: 'הקשיבו: Think עם לשון בין השיניים או Sink עם סמ״ך שורקת?',
          targetLetter: 'TH',
          distractorLetter: 'S',
          targetWord: {
            id: 'w-think',
            letter: 'TH',
            word: 'Think',
            ipa: '/θɪŋk/',
            hebrewTranslation: 'לחשוב',
            audioText: 'think',
            hebrewLetterEquivalent: 'ת׳ מוטעמת',
            exampleSentence: 'I think you are right.'
          },
          distractorWord: {
            id: 'w-sink',
            letter: 'S',
            word: 'Sink',
            ipa: '/sɪŋk/',
            hebrewTranslation: 'כיור / לשקוע',
            audioText: 'sink',
            hebrewLetterEquivalent: 'ס שורקת',
            exampleSentence: 'Wash hands in the sink.'
          },
          hebrewHint: 'לחשוב באנגלית זה Think עם TH (ולא Sink שפירושו כיור!).',
          articulationGuide: {
            mouthShape: 'tongue_between_teeth',
            soundNameEn: '/θ/ Sound',
            soundNameHe: 'צליל TH',
            hebrewRule: 'לשון בין השיניים מייצרת TH.',
            mnemonicHe: 'Think דורש מחשבה ולשון בין השיניים.',
            articulationCueEn: 'Tip of tongue between front teeth.'
          },
          explanationHe: 'מצוין! Think הוא פועל המחשבה ב-TH.'
        }
      ],
      verbExercises: [
        {
          id: 'u4-v1',
          hebrewPromptSentence: 'האם אתה מוכן לשיעור?',
          subject: 'You',
          subjectType: 'plural_or_you',
          baseTemplateBefore: '___',
          baseTemplateAfter: 'you ready for class?',
          correctAnswer: 'Are',
          options: ['Are', 'Is', 'Am'],
          hebrewContrastLesson: 'בשאלת כן/לא באנגלית, פועל העזר קופץ להתחלה לפני You!',
          fullSentenceEn: 'Are you ready for class?',
          audioText: 'Are you ready for class?'
        },
        {
          id: 'u4-v2',
          hebrewPromptSentence: 'איפה הספר שלי?',
          subject: 'My book',
          subjectType: 'third_singular',
          baseTemplateBefore: 'Where',
          baseTemplateAfter: 'my book?',
          correctAnswer: 'is',
          options: ['is', 'are', 'am'],
          hebrewContrastLesson: 'הספר (book) הוא יחיד (It), לכן: Where IS my book?',
          fullSentenceEn: 'Where is my book?',
          audioText: 'Where is my book?'
        }
      ],
      sentenceExercises: [
        {
          id: 'u4-s1',
          hebrewPromptSentence: 'האם הכלב רעב היום?',
          targetSentenceTokens: ['Is', 'the', 'dog', 'hungry', 'today', '?'],
          scrambledTokens: [
            { id: 't1', text: 'Is' },
            { id: 't2', text: 'the' },
            { id: 't3', text: 'dog' },
            { id: 't4', text: 'hungry' },
            { id: 't5', text: 'today' },
            { id: 't6', text: '?', isPunctuation: true },
            { id: 't7', text: 'Are', isDistractor: true }
          ],
          grammarFocus: 'question_inversion',
          capitalizationTipHe: 'Is מתחיל את השאלה באות I גדולה!',
          ruleExplanationHe: 'בשאלות, הפועל Is עובר לפני the dog, ובסוף שמים סימן שאלה.',
          audioFullSentence: 'Is the dog hungry today?'
        }
      ],
      suffixItems: [
        { id: 'suf-9', baseWord: 'ask', targetSuffix: '-s', fullWord: 'asks', hebrewMeaning: 'שואל (יחיד)', ruleHintHe: 'הוספת s לשאלות בהווה' }
      ],
      vocabulary: unit4Vocab
    },

    // ==========================================
    // UNIT 5: The Magic E & Classroom Kingdom
    // ==========================================
    {
      id: 'unit-5',
      unitNumber: 5,
      titleEn: 'The Magic E & Classroom Kingdom',
      titleHe: 'ה-E הקסומה וממלכת הכיתה',
      themeHe: 'איך האות E השקטה בסוף מילה הופכת תנועה קצרה לארוכה (Cap ל-Cape), ומילות בית ספר',
      descriptionHe: 'נגלה את כוחה של ה-E הקסומה שמשנה את צליל המילה, ונבנה משפטים על הכיתה!',
      badgeIcon: 'Sparkles',
      xpReward: 350,
      phonicsGapName: 'Silent "Magic E" (CVC -> CVCe)',
      grammarFocusName: 'Demonstrative Pronouns (This is / That is / These are)',
      phonicsExercises: [
        {
          id: 'u5-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'כובע מצחייה (Cap) או גלימת קוסם (Cape)?',
          instructionHe: 'האזינו לצליל התנועה: האם זו תנועת /æ/ קצרה או /eɪ/ ארוכה של E קסומה?',
          targetLetter: 'CVCe',
          distractorLetter: 'CVC',
          targetWord: {
            id: 'w-cape',
            letter: 'CVCe',
            word: 'Cape',
            ipa: '/keɪp/',
            hebrewTranslation: 'גלימה (עם E קסומה בסוף)',
            audioText: 'cape',
            hebrewLetterEquivalent: 'תנועת איי ארוכה',
            exampleSentence: 'The superhero wears a blue cape.'
          },
          distractorWord: {
            id: 'w-cap',
            letter: 'CVC',
            word: 'Cap',
            ipa: '/kæp/',
            hebrewTranslation: 'כובע מצחייה (תנועה קצרה)',
            audioText: 'cap',
            hebrewLetterEquivalent: 'תנועת אַ קצרה',
            exampleSentence: 'Wear your cap in the sunny yard.'
          },
          hebrewHint: 'ה-E בסוף המילה cape הופכת את התנועה לארוכה: קֵייפּ!',
          articulationGuide: {
            mouthShape: 'short_relaxed_vowel',
            soundNameEn: 'Long /eɪ/ Vowel',
            soundNameHe: 'תנועת A ארוכה (Magic E)',
            hebrewRule: 'ה-E השקטה בסוף גורמת לאות A להישמע בשמה: איי!',
            mnemonicHe: 'E הקסומה נוגעת באות A והופכת אותה לאיי!',
            articulationCueEn: 'Vowel glides from /e/ to /ɪ/.'
          },
          explanationHe: 'מדויק! Cape זו גלימה עם E קסומה. Cap זה כובע מצחייה רגיל.'
        },
        {
          id: 'u5-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'ערכת כלים (Kit) או עפיפון מרחף (Kite)?',
          instructionHe: 'הקשיבו לצליל: Kit קצר או Kite ארוך עם E קסומה?',
          targetLetter: 'CVCe',
          distractorLetter: 'CVC',
          targetWord: {
            id: 'w-kite',
            letter: 'CVCe',
            word: 'Kite',
            ipa: '/kaɪt/',
            hebrewTranslation: 'עפיפון (עם E קסומה)',
            audioText: 'kite',
            hebrewLetterEquivalent: 'תנועת אַיי ארוכה',
            exampleSentence: 'The kite flies high in the wind.'
          },
          distractorWord: {
            id: 'w-kit',
            letter: 'CVC',
            word: 'Kit',
            ipa: '/kɪt/',
            hebrewTranslation: 'ערכה / תיק עזרה',
            audioText: 'kit',
            hebrewLetterEquivalent: 'חיריק חטוף קצר',
            exampleSentence: 'The first aid kit is on the table.'
          },
          hebrewHint: 'אות I אומרת את שמה (אַיי) רק כשיש E קסומה בסוף!',
          articulationGuide: {
            mouthShape: 'short_relaxed_vowel',
            soundNameEn: 'Long /aɪ/ Vowel',
            soundNameHe: 'תנועת I ארוכה (Magic E)',
            hebrewRule: 'E בסוף הופכת חיריק קצר לצליל אַיי!',
            mnemonicHe: 'Kite עף לשמיים עם ה-E הקסומה!',
            articulationCueEn: 'Full diphthong /aɪ/ sound.'
          },
          explanationHe: 'מצוין! Kite זה עפיפון בזכות ה-E הקסומה!'
        }
      ],
      verbExercises: [
        {
          id: 'u5-v1',
          hebrewPromptSentence: 'זהו המורה החדש שלנו לאנגלית.',
          subject: 'This',
          subjectType: 'third_singular',
          baseTemplateBefore: 'This',
          baseTemplateAfter: 'our new English teacher.',
          correctAnswer: 'is',
          options: ['is', 'are', 'am'],
          hebrewContrastLesson: 'בעברית: "זה המורה". באנגלית חייבים פועל עזר יחיד: This IS our teacher!',
          fullSentenceEn: 'This is our new English teacher.',
          audioText: 'This is our new English teacher.'
        },
        {
          id: 'u5-v2',
          hebrewPromptSentence: 'אלו הם העפרונות הצבעוניים שלי.',
          subject: 'These',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'These',
          baseTemplateAfter: 'my colorful pencils.',
          correctAnswer: 'are',
          options: ['are', 'is', 'am'],
          hebrewContrastLesson: 'עפרונות הם רבים (pencils), ולכן: These ARE my pencils!',
          fullSentenceEn: 'These are my colorful pencils.',
          audioText: 'These are my colorful pencils.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u5-s1',
          hebrewPromptSentence: 'זהו בית הספר היפה שלנו.',
          targetSentenceTokens: ['This', 'is', 'our', 'beautiful', 'school', '.'],
          scrambledTokens: [
            { id: 't1', text: 'This' },
            { id: 't2', text: 'is' },
            { id: 't3', text: 'our' },
            { id: 't4', text: 'beautiful' },
            { id: 't5', text: 'school' },
            { id: 't6', text: '.', isPunctuation: true },
            { id: 't7', text: 'are', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'מתחילים ב-This באות T גדולה.',
          ruleExplanationHe: 'בית ספר הוא יחיד, לכן משתמשים ב-This is ולא ב-These are.',
          audioFullSentence: 'This is our beautiful school.'
        }
      ],
      suffixItems: [
        { id: 'suf-10', baseWord: 'write', targetSuffix: '-s', fullWord: 'writes', hebrewMeaning: 'כותב (יחיד)', ruleHintHe: 'הוספת s לפועל שמסתיים ב-e' },
        { id: 'suf-11', baseWord: 'teach', targetSuffix: '-es', fullWord: 'teaches', hebrewMeaning: 'מלמד (יחיד)', ruleHintHe: 'אחרי ch מוסיפים es' }
      ],
      vocabulary: unit5Vocab
    },

    // ==========================================
    // UNIT 6: Daily Habits & Animal Safari
    // ==========================================
    {
      id: 'unit-6',
      unitNumber: 6,
      titleEn: 'Daily Habits & Animal Safari',
      titleHe: 'ספארי ההרגלים וחיות הבר',
      themeHe: 'פועל בהווה פשוט עם גוף שלישי (He/She/It eats), וחיות הבר',
      descriptionHe: 'איך מתארים שגרה יומיומית של אדם או חיה, ואיך מוסיפים s לפועל בהווה פשוט!',
      badgeIcon: 'Award',
      xpReward: 400,
      phonicsGapName: 'Voiced vs Voiceless Suffix S (/s/ vs /z/)',
      grammarFocusName: 'Present Simple Habits (He eats / She plays / It runs)',
      phonicsExercises: [
        {
          id: 'u6-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'סיומת חתולים (Cats - /s/) או כלבים (Dogs - /z/)?',
          instructionHe: 'האזינו לצליל ה-S בסוף המילה: האם זה ס׳ שקטה או ז׳ רוטטת?',
          targetLetter: 'Z-sound',
          distractorLetter: 'S-sound',
          targetWord: {
            id: 'w-dogs',
            letter: 'Z-sound',
            word: 'Dogs',
            ipa: '/dɒɡz/',
            hebrewTranslation: 'כלבים (האות s נשמעת כמו z רוטטת)',
            audioText: 'dogs',
            hebrewLetterEquivalent: 'סיומת ז רוטטת',
            exampleSentence: 'The two dogs play together.'
          },
          distractorWord: {
            id: 'w-cats',
            letter: 'S-sound',
            word: 'Cats',
            ipa: '/kæts/',
            hebrewTranslation: 'חתולים (האות s נשמעת כמו ס שקטה)',
            audioText: 'cats',
            hebrewLetterEquivalent: 'סיומת ס לוחשת',
            exampleSentence: 'The white cats sleep on the sofa.'
          },
          hebrewHint: 'אחרי אות קולית כמו G, האות S רוטטת כמו Z!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/z/ Voiced Sibilant',
            soundNameHe: 'צליל Z בסיומות',
            hebrewRule: 'אחרי צליל קולי, ה-S נשמעת כמו ז!',
            mnemonicHe: 'Dogs עושים זזז בסוף!',
            articulationCueEn: 'Vocal cords vibrate at the end.'
          },
          explanationHe: 'מצוין! במילה Dogs ה-S נשמעת כמו Z בגלל ה-G הרוטטת.'
        }
      ],
      verbExercises: [
        {
          id: 'u6-v1',
          hebrewPromptSentence: 'האריה הגדול ישן מתחת לעץ.',
          subject: 'The big lion',
          subjectType: 'third_singular',
          baseTemplateBefore: 'The big lion',
          baseTemplateAfter: 'under the shade tree.',
          correctAnswer: 'sleeps',
          options: ['sleeps', 'sleep', 'sleeping'],
          hebrewContrastLesson: 'האריה הוא גוף שלישי יחיד (He/It). לכן הפועל מקבל s: sleeps!',
          fullSentenceEn: 'The big lion sleeps under the shade tree.',
          audioText: 'The big lion sleeps under the shade tree.'
        },
        {
          id: 'u6-v2',
          hebrewPromptSentence: 'הקוף אוכל בננות מתוקות בכל יום.',
          subject: 'The monkey',
          subjectType: 'third_singular',
          baseTemplateBefore: 'The monkey',
          baseTemplateAfter: 'sweet bananas every day.',
          correctAnswer: 'eats',
          options: ['eats', 'eat', 'is eat'],
          hebrewContrastLesson: 'הרגל של יחיד מקבל s בסוף: The monkey eats bananas!',
          fullSentenceEn: 'The monkey eats sweet bananas every day.',
          audioText: 'The monkey eats sweet bananas every day.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u6-s1',
          hebrewPromptSentence: 'הפיל הגדול שותה מים קרים.',
          targetSentenceTokens: ['The', 'big', 'elephant', 'drinks', 'cold', 'water', '.'],
          scrambledTokens: [
            { id: 't1', text: 'The' },
            { id: 't2', text: 'big' },
            { id: 't3', text: 'elephant' },
            { id: 't4', text: 'drinks' },
            { id: 't5', text: 'cold' },
            { id: 't6', text: 'water' },
            { id: 't7', text: '.', isPunctuation: true },
            { id: 't8', text: 'drink', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'The מתחיל באות T גדולה.',
          ruleExplanationHe: 'הפיל הוא יחיד, לכן הפועל חייב להסתיים ב-s: drinks!',
          audioFullSentence: 'The big elephant drinks cold water.'
        }
      ],
      suffixItems: [
        { id: 'suf-12', baseWord: 'drink', targetSuffix: '-s', fullWord: 'drinks', hebrewMeaning: 'שותה (יחיד)', ruleHintHe: 'הוספת s להרגל של יחיד' },
        { id: 'suf-13', baseWord: 'sleep', targetSuffix: '-s', fullWord: 'sleeps', hebrewMeaning: 'ישן (יחיד)', ruleHintHe: 'הוספת s ליחיד בהווה' }
      ],
      vocabulary: unit6Vocab
    },

    // ==========================================
    // UNIT 7: Food, Weather & The Market
    // ==========================================
    {
      id: 'unit-7',
      unitNumber: 7,
      titleEn: 'Food, Weather & The Market',
      titleHe: 'שוק האוכל, מזג האוויר והבריאות',
      themeHe: 'סיווג מאכלים, מזג אוויר ועיצורי CH מול SH',
      descriptionHe: 'נבדיל בין צליל CH (צ׳) לצליל SH (שׁ), נשאל מה יש במקרר עם There is / There are, ונלמד על עונות השנה!',
      badgeIcon: 'Award',
      xpReward: 200,
      phonicsGapName: 'CH vs SH Consonant Digraphs',
      grammarFocusName: 'There is / There are & Countables',
      phonicsExercises: [
        {
          id: 'u7-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'כיסא נוח (Chair) או לחלוק (Share)?',
          instructionHe: 'האזינו לצליל הפותח של המילה: עצירה חדה או זרימת רוח?',
          targetLetter: 'CH',
          distractorLetter: 'SH',
          targetWord: {
            id: 'w-chair',
            letter: 'CH',
            word: 'Chair',
            ipa: '/tʃɛər/',
            hebrewTranslation: 'כיסא',
            audioText: 'chair',
            hebrewLetterEquivalent: 'צ׳ (כמו צ׳יפס)',
            exampleSentence: 'Sit down on the wooden chair.'
          },
          distractorWord: {
            id: 'w-share',
            letter: 'SH',
            word: 'Share',
            ipa: '/ʃɛər/',
            hebrewTranslation: 'לחלוק / לשתף',
            audioText: 'share',
            hebrewLetterEquivalent: 'שׁ (רוח שוקטת)',
            exampleSentence: 'Good friends share their toys.'
          },
          hebrewHint: 'צליל CH מתחיל בעצירה חדה ופיצוץ קטן (צ׳) כמו צ׳יפס!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/tʃ/ Affricate Digraph',
            soundNameHe: 'צליל CH (צ׳)',
            hebrewRule: 'הלשון עוצרת את האוויר לרגע ואז משחררת בפיצוץ צ׳.',
            mnemonicHe: 'CH כמו צ׳יפס קראנצ׳י וטעים!',
            articulationCueEn: 'Stop air behind teeth, then release sharply.'
          },
          explanationHe: 'מצוין! Chair מתחיל ב-CH חדה, בעוד ש-Share מתחיל ב-SH רכה וזורמת.'
        },
        {
          id: 'u7-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'חנות גדולה (Shop) או לקצוץ סלט (Chop)?',
          instructionHe: 'הקשיבו היטב: האם שומעים ששש... או צ׳ופ חד?',
          targetLetter: 'SH',
          distractorLetter: 'CH',
          targetWord: {
            id: 'w-shop',
            letter: 'SH',
            word: 'Shop',
            ipa: '/ʃɒp/',
            hebrewTranslation: 'חנות',
            audioText: 'shop',
            hebrewLetterEquivalent: 'שׁ',
            exampleSentence: 'We buy apples at the food shop.'
          },
          distractorWord: {
            id: 'w-chop',
            letter: 'CH',
            word: 'Chop',
            ipa: '/tʃɒp/',
            hebrewTranslation: 'לקצוץ',
            audioText: 'chop',
            hebrewLetterEquivalent: 'צ׳',
            exampleSentence: 'Chop the fresh vegetables.'
          },
          hebrewHint: 'צליל SH הוא זרימת אוויר רציפה כמו שקט בכיתה: שששש...',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/ʃ/ Sibilant Fricative',
            soundNameHe: 'צליל SH (שׁ)',
            hebrewRule: 'השפתיים מעוגלות קלות והאוויר זורם ברציפות.',
            mnemonicHe: 'SH כמו שקט: שששש...',
            articulationCueEn: 'Lips rounded, continuous airflow.'
          },
          explanationHe: 'כל הכבוד! Shop (חנות) מתחילה ב-SH עם זרימת רוח רכה.'
        }
      ],
      verbExercises: [
        {
          id: 'u7-v1',
          hebrewPromptSentence: 'יש תפוח אדום ועסיסי אחד בסל.',
          subject: 'There',
          subjectType: 'third_singular',
          baseTemplateBefore: 'There',
          baseTemplateAfter: 'a juicy red apple in the basket.',
          correctAnswer: 'is',
          options: ['is', 'are', 'has'],
          hebrewContrastLesson: 'כאשר מדברים על פריט יחיד (a red apple), משתמשים ב-There is!',
          fullSentenceEn: 'There is a juicy red apple in the basket.',
          audioText: 'There is a juicy red apple in the basket.'
        },
        {
          id: 'u7-v2',
          hebrewPromptSentence: 'יש שלושה בקבוקי חלב קרים על השולחן.',
          subject: 'There',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'There',
          baseTemplateAfter: 'three cold bottles of milk on the table.',
          correctAnswer: 'are',
          options: ['are', 'is', 'be'],
          hebrewContrastLesson: 'כאשר מדובר ברבים (three bottles), חובה להשתמש ב-There are!',
          fullSentenceEn: 'There are three cold bottles of milk on the table.',
          audioText: 'There are three cold bottles of milk on the table.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u7-s1',
          hebrewPromptSentence: 'יש גבינה טרייה במטבח שלנו.',
          targetSentenceTokens: ['There', 'is', 'fresh', 'cheese', 'in', 'our', 'kitchen', '.'],
          scrambledTokens: [
            { id: 't1', text: 'There' },
            { id: 't2', text: 'is' },
            { id: 't3', text: 'fresh' },
            { id: 't4', text: 'cheese' },
            { id: 't5', text: 'in' },
            { id: 't6', text: 'our' },
            { id: 't7', text: 'kitchen' },
            { id: 't8', text: '.', isPunctuation: true },
            { id: 't9', text: 'are', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'There מתחיל באות T גדולה.',
          ruleExplanationHe: 'גבינה (cheese) היא שם עצם בלתי ספיר, ולכן משתמשים ב-There is.',
          audioFullSentence: 'There is fresh cheese in our kitchen.'
        }
      ],
      suffixItems: [
        { id: 'suf-14', baseWord: 'dish', targetSuffix: '-es', fullWord: 'dishes', hebrewMeaning: 'צלחות (ריבוי)', ruleHintHe: 'אחרי צליל sh מוסיפים es' },
        { id: 'suf-15', baseWord: 'peach', targetSuffix: '-es', fullWord: 'peaches', hebrewMeaning: 'אפרסקים (ריבוי)', ruleHintHe: 'אחרי צליל ch מוסיפים es' },
        { id: 'suf-16', baseWord: 'cook', targetSuffix: '-ing', fullWord: 'cooking', hebrewMeaning: 'מבשל עכשיו', ruleHintHe: 'תוספת ing לפעולה המתרחשת כרגע' }
      ],
      vocabulary: unit7Vocab
    },

    // ==========================================
    // UNIT 8: City Explorer & Community Helpers
    // ==========================================
    {
      id: 'unit-8',
      unitNumber: 8,
      titleEn: 'City Explorer & Community Helpers',
      titleHe: 'מפת העיר ובעלי המקצוע',
      themeHe: 'מקומות בעיר, מילות יחס למיקום והבדלי C ו-G רכות מול קשות',
      descriptionHe: 'נלמד מתי האות C נשמעת כמו S ומתי כמו K, נתרגל מילות יחס (between, next to) ונכיר את בעלי המקצוע בקהילה!',
      badgeIcon: 'Search',
      xpReward: 220,
      phonicsGapName: 'Hard vs Soft C and G',
      grammarFocusName: 'Prepositions of Place & Community Helpers',
      phonicsExercises: [
        {
          id: 'u8-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'עיר גדולה (City) או חתול בית (Cat)?',
          instructionHe: 'האם האות C נשמעת כסמ״ך רכה או כק״ף קשה?',
          targetLetter: 'Soft C',
          distractorLetter: 'Hard C',
          targetWord: {
            id: 'w-city',
            letter: 'Soft C',
            word: 'City',
            ipa: '/ˈsɪti/',
            hebrewTranslation: 'עיר',
            audioText: 'city',
            hebrewLetterEquivalent: 'ס (סמ״ך רכה)',
            exampleSentence: 'Tel Aviv is a big coastal city.'
          },
          distractorWord: {
            id: 'w-cat',
            letter: 'Hard C',
            word: 'Cat',
            ipa: '/kæt/',
            hebrewTranslation: 'חתול',
            audioText: 'cat',
            hebrewLetterEquivalent: 'ק / כּ (קשה)',
            exampleSentence: 'The little cat drinks milk.'
          },
          hebrewHint: 'לפני האותיות E, I ו-Y, האות C הופכת לרכה ונשמעת כמו סמ״ך (City, Center)!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/s/ Soft C Rule',
            soundNameHe: 'צליל C רכה (סמ״ך)',
            hebrewRule: 'C שלפני E, I או Y מבוטאת כמו ס (סמ״ך).',
            mnemonicHe: 'City ב-C נשמעת כמו סביון!',
            articulationCueEn: 'Tongue close to roof of mouth, air hisses.'
          },
          explanationHe: 'נכון מאוד! במילה City האות C נמצאת לפני i ולכן היא נשמעת כמו ס (Soft C).'
        },
        {
          id: 'u8-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'ג׳ירפה גבוהה (Giraffe) או משחק כיפי (Game)?',
          instructionHe: 'הקשיבו לאות G: האם היא ג׳ רכה או גימ״ל קשה?',
          targetLetter: 'Soft G',
          distractorLetter: 'Hard G',
          targetWord: {
            id: 'w-giraffe',
            letter: 'Soft G',
            word: 'Giraffe',
            ipa: '/dʒɪˈrɑːf/',
            hebrewTranslation: 'ג׳ירפה',
            audioText: 'giraffe',
            hebrewLetterEquivalent: 'ג׳ (ג׳וק, ג׳ירפה)',
            exampleSentence: 'The giraffe has a very long neck.'
          },
          distractorWord: {
            id: 'w-game',
            letter: 'Hard G',
            word: 'Game',
            ipa: '/ɡeɪm/',
            hebrewTranslation: 'משחק',
            audioText: 'game',
            hebrewLetterEquivalent: 'ג (גימ״ל רגילה)',
            exampleSentence: 'Let us play a board game.'
          },
          hebrewHint: 'לפני האותיות E, I או Y, האות G נשמעת לרוב כמו ג׳ רכה (Giraffe, Orange)!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/dʒ/ Soft G Rule',
            soundNameHe: 'צליל G רכה (ג׳)',
            hebrewRule: 'G שלפני E, I או Y נהגית כמו ג׳.',
            mnemonicHe: 'Giraffe עם ג׳ כמו ג׳מבו!',
            articulationCueEn: 'Voiced affricate like J.'
          },
          explanationHe: 'מדויק! Giraffe נפתחת ב-G רכה שנשמעת כמו ג׳, בעוד ש-Game היא G קשה.'
        }
      ],
      verbExercises: [
        {
          id: 'u8-v1',
          hebrewPromptSentence: 'בית החולים נמצא ליד תחנת המשטרה.',
          subject: 'The hospital',
          subjectType: 'third_singular',
          baseTemplateBefore: 'The hospital',
          baseTemplateAfter: 'next to the police station.',
          correctAnswer: 'is',
          options: ['is', 'are', 'has'],
          hebrewContrastLesson: 'בית החולים הוא יחיד (It). לכן מחברים פועל עזר is: The hospital is next to...',
          fullSentenceEn: 'The hospital is next to the police station.',
          audioText: 'The hospital is next to the police station.'
        },
        {
          id: 'u8-v2',
          hebrewPromptSentence: 'השוטר והרופאה עוזרים לאנשים בעיר.',
          subject: 'The officer and doctor',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'The police officer and the doctor',
          baseTemplateAfter: 'people in the city every day.',
          correctAnswer: 'help',
          options: ['help', 'helps', 'is help'],
          hebrewContrastLesson: 'הנושא הוא רבים (שני אנשים), לכן הפועל בהווה נשאר בצורת המקור: help!',
          fullSentenceEn: 'The police officer and the doctor help people in the city every day.',
          audioText: 'The police officer and the doctor help people in the city every day.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u8-s1',
          hebrewPromptSentence: 'הבנק החדש נמצא בין הפארק לספרייה.',
          targetSentenceTokens: ['The', 'new', 'bank', 'is', 'between', 'the', 'park', 'and', 'the', 'library', '.'],
          scrambledTokens: [
            { id: 't5', text: 'between' },
            { id: 't1', text: 'The' },
            { id: 't10', text: 'library' },
            { id: 't3', text: 'bank' },
            { id: 't12', text: 'are', isDistractor: true },
            { id: 't7', text: 'park' },
            { id: 't2', text: 'new' },
            { id: 't6', text: 'the' },
            { id: 't4', text: 'is' },
            { id: 't8', text: 'and' },
            { id: 't9', text: 'the' },
            { id: 't11', text: '.', isPunctuation: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'The מתחיל באות T גדולה.',
          ruleExplanationHe: 'בנק הוא יחיד, ולכן מחברים is ולא משמיטים אותו: The bank is between...',
          audioFullSentence: 'The new bank is between the park and the library.'
        }
      ],
      suffixItems: [
        { id: 'suf-17', baseWord: 'help', targetSuffix: '-s', fullWord: 'helps', hebrewMeaning: 'עוזר (גוף שלישי)', ruleHintHe: 'הוספת s לפועל ביחיד' },
        { id: 'suf-18', baseWord: 'bus', targetSuffix: '-es', fullWord: 'buses', hebrewMeaning: 'אוטובוסים (ריבוי)', ruleHintHe: 'אחרי אות s מוסיפים es' },
        { id: 'suf-19', baseWord: 'drive', targetSuffix: '-ing', fullWord: 'driving', hebrewMeaning: 'נוהג עכשיו', ruleHintHe: 'משמיטים את ה-e הסופית ומוסיפים ing' }
      ],
      vocabulary: unit8Vocab
    },

    // ==========================================
    // UNIT 9: Past Adventures & Story Time
    // ==========================================
    {
      id: 'unit-9',
      unitNumber: 9,
      titleEn: 'Past Adventures & Story Time',
      titleHe: 'הרפתקאות בעבר ומכונת הזמן',
      themeHe: 'עבר פשוט (Past Simple) ושלושת הצלילים של סיומת -ed',
      descriptionHe: 'נפצח את המלכודת הגדולה של דוברי עברית: איך מבטאים -ed בלי להוסיף הברה מיותרת, ונספר מה קרה אתמול!',
      badgeIcon: 'Zap',
      xpReward: 240,
      phonicsGapName: 'The 3 Sounds of -ed (/t/, /d/, /ɪd/)',
      grammarFocusName: 'Past Simple Basics (Regular -ed & Key Irregulars)',
      phonicsExercises: [
        {
          id: 'u9-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'הלך ברגל (Walked) או רצה (Wanted)?',
          instructionHe: 'האזינו לסיומת: האם שומעים נקישת /t/ אחת או הברה נוספת /ɪd/?',
          targetLetter: '/t/ sound',
          distractorLetter: '/ɪd/ sound',
          targetWord: {
            id: 'w-walked',
            letter: '/t/ sound',
            word: 'Walked',
            ipa: '/wɔːkt/',
            hebrewTranslation: 'הלך ברגל (הברה אחת!)',
            audioText: 'walked',
            hebrewLetterEquivalent: 'תּ (נקישה חדה ללא אד)',
            exampleSentence: 'We walked to school yesterday.'
          },
          distractorWord: {
            id: 'w-wanted',
            letter: '/ɪd/ sound',
            word: 'Wanted',
            ipa: '/ˈwɒntɪd/',
            hebrewTranslation: 'רצה (שתי הברות: וונ-טיד)',
            audioText: 'wanted',
            hebrewLetterEquivalent: 'איד (רק אחרי T או D)',
            exampleSentence: 'She wanted a glass of cold water.'
          },
          hebrewHint: 'דוברי עברית טועים ואומרים "ווק-אד"! באנגלית המילה Walked היא הברה אחת שמסתיימת ב-T: /wɔːkt/!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/t/ Voiceless -ed Ending',
            soundNameHe: 'צליל /t/ בסיומת -ed',
            hebrewRule: 'אחרי עיצור אטום (כמו k, p, s, sh, ch) ה-ed נהגית כ-תּ חדה בלבד ללא שום תנועה!',
            mnemonicHe: 'Walked נשמע כמו ווקט!',
            articulationCueEn: 'Sharp voiceless tap /t/ at end.'
          },
          explanationHe: 'מדהים! ב-Walked סיומת ה-ed מבוטאת כנקישת /t/ חדה ולא כהברה נוספת.'
        },
        {
          id: 'u9-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'שיחק בכדור (Played) או עזר לחבר (Helped)?',
          instructionHe: 'האזינו לצליל הסיום: האם שומעים /d/ רוטטת או /t/ חדה?',
          targetLetter: '/d/ sound',
          distractorLetter: '/t/ sound',
          targetWord: {
            id: 'w-played',
            letter: '/d/ sound',
            word: 'Played',
            ipa: '/pleɪd/',
            hebrewTranslation: 'שיחק (צליל ד׳ רוטט)',
            audioText: 'played',
            hebrewLetterEquivalent: 'ד (דלת ללא אד)',
            exampleSentence: 'The boys played football in the yard.'
          },
          distractorWord: {
            id: 'w-helped',
            letter: '/t/ sound',
            word: 'Helped',
            ipa: '/helpt/',
            hebrewTranslation: 'עזר (צליל ת׳ חד)',
            audioText: 'helped',
            hebrewLetterEquivalent: 'תּ',
            exampleSentence: 'I helped my grandmother carry bags.'
          },
          hebrewHint: 'במילה Played מיתרי הקול רוטטים והסיומת נשמעת /d/ ללא שום "אד": /pleɪd/!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: '/d/ Voiced -ed Ending',
            soundNameHe: 'צליל /d/ בסיומת -ed',
            hebrewRule: 'אחרי תנועה או עיצור קולי, סיומת ה-ed נשמעת כ-דּ עדינה.',
            mnemonicHe: 'Played נשמע כמו פלייד!',
            articulationCueEn: 'Voiced tap /d/ without extra vowel.'
          },
          explanationHe: 'מעולה! Played נשמעת /pleɪd/ עם סיומת /d/ רוטטת.'
        }
      ],
      verbExercises: [
        {
          id: 'u9-v1',
          hebrewPromptSentence: 'דני שיחק כדורגל בפארק אתמול אחר הצהריים.',
          subject: 'Danny',
          subjectType: 'third_singular',
          baseTemplateBefore: 'Danny',
          baseTemplateAfter: 'football in the park yesterday.',
          correctAnswer: 'played',
          options: ['played', 'plays', 'is playing'],
          hebrewContrastLesson: 'מילת הזמן yesterday מחייבת עבר פשוט: מוסיפים ed לפועל הרגיל (played)!',
          fullSentenceEn: 'Danny played football in the park yesterday.',
          audioText: 'Danny played football in the park yesterday.'
        },
        {
          id: 'u9-v2',
          hebrewPromptSentence: 'הילדים הלכו למוזיאון המדע ביום שני.',
          subject: 'The children',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'The children',
          baseTemplateAfter: 'to the science museum on Monday.',
          correctAnswer: 'went',
          options: ['went', 'go', 'goed'],
          hebrewContrastLesson: 'הפועל go הוא יוצא דופן בעבר – צורת העבר שלו היא went (ולא goed)!',
          fullSentenceEn: 'The children went to the science museum on Monday.',
          audioText: 'The children went to the science museum on Monday.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u9-s1',
          hebrewPromptSentence: 'ראינו סרט מעניין אתמול בערב.',
          targetSentenceTokens: ['We', 'saw', 'an', 'interesting', 'movie', 'yesterday', 'evening', '.'],
          scrambledTokens: [
            { id: 't1', text: 'We' },
            { id: 't2', text: 'saw' },
            { id: 't3', text: 'an' },
            { id: 't4', text: 'interesting' },
            { id: 't5', text: 'movie' },
            { id: 't6', text: 'yesterday' },
            { id: 't7', text: 'evening' },
            { id: 't8', text: '.', isPunctuation: true },
            { id: 't9', text: 'see', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'We מתחיל באות W גדולה.',
          ruleExplanationHe: 'עבר של see הוא saw (יוצא דופן).',
          audioFullSentence: 'We saw an interesting movie yesterday evening.'
        }
      ],
      suffixItems: [
        { id: 'suf-20', baseWord: 'start', targetSuffix: '-s', fullWord: 'starts', hebrewMeaning: 'מתחיל (יחיד)', ruleHintHe: 'הוספת s לפועל בהווה' },
        { id: 'suf-21', baseWord: 'watch', targetSuffix: '-es', fullWord: 'watches', hebrewMeaning: 'צופה (יחיד)', ruleHintHe: 'אחרי צליל ch מוסיפים es' },
        { id: 'suf-22', baseWord: 'play', targetSuffix: '-ing', fullWord: 'playing', hebrewMeaning: 'משחק כעת', ruleHintHe: 'תוספת ing לפעולה ממושכת' }
      ],
      vocabulary: unit9Vocab
    },

    // ==========================================
    // UNIT 10: Future Dreams & Grand Capstone
    // ==========================================
    {
      id: 'unit-10',
      unitNumber: 10,
      titleEn: 'Future Dreams & Master Capstone',
      titleHe: 'חלומות לעתיד ומבחן הסיום החגיגי',
      themeHe: 'תוכניות לעתיד (going to / will), אותיות שקטות ומבחן מסכם',
      descriptionHe: 'נלמד לתאר שאיפות ומקצועות לעתיד, נזהה אותיות שקטות (K ב-knife, W ב-write), ונשלים את תעודת הגמר של Band I!',
      badgeIcon: 'Award',
      xpReward: 300,
      phonicsGapName: 'Silent Letters (K, W, B, L)',
      grammarFocusName: 'Future Intentions (going to) & Modals (can/must)',
      phonicsExercises: [
        {
          id: 'u10-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'סכין חדה (Knife) או מלך בממלכה (King)?',
          instructionHe: 'האזינו לאות הפותחת: האם ה-K נהגית או שהיא שקטה לחלוטין?',
          targetLetter: 'Silent K',
          distractorLetter: 'Sounded K',
          targetWord: {
            id: 'w-knife',
            letter: 'Silent K',
            word: 'Knife',
            ipa: '/naɪf/',
            hebrewTranslation: 'סכין (ה-K שקטה לחלוטין!)',
            audioText: 'knife',
            hebrewLetterEquivalent: 'N (מתחיל ב-N)',
            exampleSentence: 'Use the butter knife to spread jam.'
          },
          distractorWord: {
            id: 'w-king',
            letter: 'Sounded K',
            word: 'King',
            ipa: '/kɪŋ/',
            hebrewTranslation: 'מלך (ה-K נשמעת בבירור)',
            audioText: 'king',
            hebrewLetterEquivalent: 'ק (קשה)',
            exampleSentence: 'The king wears a shiny gold crown.'
          },
          hebrewHint: 'כש-K מופיעה לפני N (knife, know, knee) – ה-K שקטה לגמרי ומתחילים ישר מה-N!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: 'Silent K Rule',
            soundNameHe: 'אות K שקטה',
            hebrewRule: 'הצירוף KN בתחילת מילה נהגה כ-N בלבד.',
            mnemonicHe: 'Knife מתחיל ב-נַייף, ה-K נחה!',
            articulationCueEn: 'Start directly with tongue tip on upper ridge for /n/.'
          },
          explanationHe: 'כל הכבוד! ב-Knife האות K שקטה לחלוטין והמילה נשמעת "נַייף".'
        },
        {
          id: 'u10-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'לכתוב מכתב (Write) או מים צלולים (Water)?',
          instructionHe: 'האזינו: האם ה-W נשמעת (ווא) או שהיא שקטה לחלוטין לפני R?',
          targetLetter: 'Silent W',
          distractorLetter: 'Sounded W',
          targetWord: {
            id: 'w-write',
            letter: 'Silent W',
            word: 'Write',
            ipa: '/raɪt/',
            hebrewTranslation: 'לכתוב (ה-W שקטה לגמרי!)',
            audioText: 'write',
            hebrewLetterEquivalent: 'R (מתחיל ב-ר)',
            exampleSentence: 'I write my name with a pencil.'
          },
          distractorWord: {
            id: 'w-water',
            letter: 'Sounded W',
            word: 'Water',
            ipa: '/ˈwɔːtər/',
            hebrewTranslation: 'מים (W נשמעת כמו ווא)',
            audioText: 'water',
            hebrewLetterEquivalent: 'וּ (שפתיים עגולות)',
            exampleSentence: 'Drink cold water after sports.'
          },
          hebrewHint: 'כאשר W מופיעה לפני R בתחילת מילה (write, wrong) – ה-W שקטה ומתחילים ישר מה-R!',
          articulationGuide: {
            mouthShape: 'teeth_on_lip_air',
            soundNameEn: 'Silent W Rule',
            soundNameHe: 'אות W שקטה',
            hebrewRule: 'הצירוף WR נהגה כ-R בלבד.',
            mnemonicHe: 'Write מתחיל ב-רַייט, ה-W שותקת!',
            articulationCueEn: 'Start tongue curling back for /r/.'
          },
          explanationHe: 'מדויק! במילה Write האות W שקטה ומתחילים ישירות בצליל R.'
        }
      ],
      verbExercises: [
        {
          id: 'u10-v1',
          hebrewPromptSentence: 'אני עומד ללמוד רפואה באוניברסיטה בעתיד.',
          subject: 'I',
          subjectType: 'first_singular',
          baseTemplateBefore: 'I',
          baseTemplateAfter: 'going to study medicine in the future.',
          correctAnswer: 'am',
          options: ['am', 'is', 'are'],
          hebrewContrastLesson: 'עם הגוף I בביטוי עתיד (going to) חובה להשתמש ב-am: I am going to study!',
          fullSentenceEn: 'I am going to study medicine in the future.',
          audioText: 'I am going to study medicine in the future.'
        },
        {
          id: 'u10-v2',
          hebrewPromptSentence: 'תלמידים חכמים יכולים להשיג כל מטרה וחלום.',
          subject: 'Smart students',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'Smart students',
          baseTemplateAfter: 'achieve any dream with hard work.',
          correctAnswer: 'can',
          options: ['can', 'are can', 'canning'],
          hebrewContrastLesson: 'פועל העזר can מבטא יכולת ולא מוסיפים לו s, ed או ing לעולם!',
          fullSentenceEn: 'Smart students can achieve any dream with hard work.',
          audioText: 'Smart students can achieve any dream with hard work.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u10-s1',
          hebrewPromptSentence: 'אנחנו עומדים לבנות רובוט חכם מחר.',
          targetSentenceTokens: ['We', 'are', 'going', 'to', 'build', 'a', 'smart', 'robot', 'tomorrow', '.'],
          scrambledTokens: [
            { id: 't1', text: 'We' },
            { id: 't2', text: 'are' },
            { id: 't3', text: 'going' },
            { id: 't4', text: 'to' },
            { id: 't5', text: 'build' },
            { id: 't6', text: 'a' },
            { id: 't7', text: 'smart' },
            { id: 't8', text: 'robot' },
            { id: 't9', text: 'tomorrow' },
            { id: 't10', text: '.', isPunctuation: true },
            { id: 't11', text: 'is', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'We מתחיל באות W גדולה.',
          ruleExplanationHe: 'מבנה עתיד עם We דורש are going to: We are going to build...',
          audioFullSentence: 'We are going to build a smart robot tomorrow.'
        }
      ],
      suffixItems: [
        { id: 'suf-23', baseWord: 'learn', targetSuffix: '-ing', fullWord: 'learning', hebrewMeaning: 'לומד כעת', ruleHintHe: 'תוספת ing ללמידה ממושכת' },
        { id: 'suf-24', baseWord: 'dream', targetSuffix: '-s', fullWord: 'dreams', hebrewMeaning: 'חלומות (ריבוי)', ruleHintHe: 'הוספת s רגילה לריבוי' },
        { id: 'suf-25', baseWord: 'teach', targetSuffix: '-es', fullWord: 'teaches', hebrewMeaning: 'מלמד (יחיד)', ruleHintHe: 'אחרי צליל ch מוסיפים es' }
      ],
      vocabulary: unit10Vocab
    },

    // ==========================================
    // UNIT 11: Animal Kingdom & Comparatives
    // ==========================================
    {
      id: 'unit-11',
      unitNumber: 11,
      titleEn: 'Animal Kingdom & Comparatives',
      titleHe: 'עולם החי והשוואות (Comparative & Superlative)',
      themeHe: 'בעלי חיים, טבע פראי, השוואת גדלים ומהירויות (Faster than / The tallest)',
      descriptionHe: 'הבנת ההבדל בין עברית ("יותר מהיר") לאנגלית (faster than) ושליטה בסיומות er ו-est ללא תוספת שגויה של more.',
      badgeIcon: 'Compass',
      xpReward: 160,
      phonicsGapName: 'צליל /ər/ וסיומות er לעומת est בהטעמה תקנית',
      grammarFocusName: 'תארי השוואה (Comparative -er than) והפלגה (Superlative the -est)',
      phonicsExercises: [
        {
          id: 'u11-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'אתגר השוואה: Faster מול Fastest',
          instructionHe: 'האזינו לצליל ובחרו בין השוואה בין שניים (-er) להפלגה מוחלטת (-est):',
          targetLetter: 'ER',
          distractorLetter: 'EST',
          targetWord: {
            id: 'u11-w1',
            letter: 'ER',
            word: 'Faster',
            ipa: '/ˈfæstər/',
            hebrewTranslation: 'מהיר יותר',
            audioText: 'Faster. A cheetah is faster than a lion.',
            hebrewLetterEquivalent: 'סיומת אר קצרה',
            exampleSentence: 'A cheetah is faster than a lion.'
          },
          distractorWord: {
            id: 'u11-w2',
            letter: 'EST',
            word: 'Fastest',
            ipa: '/ˈfæstɪst/',
            hebrewTranslation: 'הכי מהיר (הפלגה)',
            audioText: 'Fastest. The cheetah is the fastest runner.',
            hebrewLetterEquivalent: 'סיומת אסט',
            exampleSentence: 'The cheetah is the fastest runner.'
          },
          hebrewHint: 'סיומת er משווה בין שניים (faster than). סיומת est מציינת את הטוב ביותר מכולם (the fastest).',
          articulationGuide: {
            mouthShape: 'short_relaxed_vowel',
            soundNameEn: 'Comparative -er /ər/',
            soundNameHe: 'סיומת er רפויה',
            hebrewRule: 'אין להגות R מתגלגלת ישראלית חזקה, אלא שווא רפוי /ər/.',
            mnemonicHe: 'אר קצרה בסוף מילה',
            articulationCueEn: 'Relax your tongue at the end of faster.'
          },
          explanationHe: 'באנגלית אומרים faster than (ולא more fast than כמו בעברית "יותר מהיר").'
        },
        {
          id: 'u11-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'אתגר השוואה: Taller מול Tallest',
          instructionHe: 'האזינו ובחרו את המילה הנכונה לגובה העץ או הג׳ירפה:',
          targetLetter: 'ER',
          distractorLetter: 'EST',
          targetWord: {
            id: 'u11-w3',
            letter: 'ER',
            word: 'Taller',
            ipa: '/ˈtɔːlər/',
            hebrewTranslation: 'גבוה יותר',
            audioText: 'Taller. The giraffe is taller than the zebra.',
            hebrewLetterEquivalent: 'טולר',
            exampleSentence: 'The giraffe is taller than the zebra.'
          },
          distractorWord: {
            id: 'u11-w4',
            letter: 'EST',
            word: 'Tallest',
            ipa: '/ˈtɔːlɪst/',
            hebrewTranslation: 'הכי גבוה',
            audioText: 'Tallest. The giraffe is the tallest animal.',
            hebrewLetterEquivalent: 'טולסט',
            exampleSentence: 'The giraffe is the tallest animal.'
          },
          hebrewHint: 'שימו לב: להשוואה בין שניים מוסיפים er, ולהכי גבוה מוסיפים the ... est.',
          articulationGuide: {
            mouthShape: 'short_relaxed_vowel',
            soundNameEn: 'Taller vs Tallest',
            soundNameHe: 'השוואת גובה',
            hebrewRule: 'הקפידו על the לפני tallest: the tallest animal.',
            mnemonicHe: 'ג׳ירפה גבוהה יותר מזברה',
            articulationCueEn: 'Pronounce taller clearly before than.'
          },
          explanationHe: 'הג׳ירפה גבוהה מהזברה: The giraffe is taller than the zebra.'
        }
      ],
      verbExercises: [
        {
          id: 'u11-v1',
          hebrewPromptSentence: 'ברדלס (צ׳יטה) מהיר יותר מאריה.',
          subject: 'A cheetah',
          subjectType: 'third_singular',
          baseTemplateBefore: 'A cheetah',
          baseTemplateAfter: 'a lion in the savanna.',
          correctAnswer: 'is faster than',
          options: ['is faster than', 'is more fast than', 'faster than'],
          hebrewContrastLesson: 'בעברית אומרים "יותר מהיר", אך באנגלית למילה קצרה כמו fast מוסיפים er + than בלבד!',
          fullSentenceEn: 'A cheetah is faster than a lion in the savanna.',
          audioText: 'A cheetah is faster than a lion in the savanna.'
        },
        {
          id: 'u11-v2',
          hebrewPromptSentence: 'הלווייתן הכחול הוא בעל החיים הגדול ביותר בים.',
          subject: 'The blue whale',
          subjectType: 'third_singular',
          baseTemplateBefore: 'The blue whale',
          baseTemplateAfter: 'animal in the ocean.',
          correctAnswer: 'is the biggest',
          options: ['is the biggest', 'is most big', 'the bigger'],
          hebrewContrastLesson: 'דרגת הפלגה (הכי גדול) דורשת תמיד the לפני התואר וסיומת est (ומכפילים את ה-g ב-biggest).',
          fullSentenceEn: 'The blue whale is the biggest animal in the ocean.',
          audioText: 'The blue whale is the biggest animal in the ocean.'
        },
        {
          id: 'u11-v3',
          hebrewPromptSentence: 'פילים כבדים יותר מסוסים.',
          subject: 'Elephants',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'Elephants',
          baseTemplateAfter: 'horses.',
          correctAnswer: 'are heavier than',
          options: ['are heavier than', 'is heavier than', 'are more heavy'],
          hebrewContrastLesson: 'בנושא רבים (Elephants) משתמשים ב-are, והאות y במילה heavy מתחלפת ב-ier.',
          fullSentenceEn: 'Elephants are heavier than horses.',
          audioText: 'Elephants are heavier than horses.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u11-s1',
          hebrewPromptSentence: 'ברדלס מהיר יותר מצב.',
          targetSentenceTokens: ['A', 'cheetah', 'is', 'faster', 'than', 'a', 'turtle', '.'],
          scrambledTokens: [
            { id: 't1', text: 'A' },
            { id: 't2', text: 'cheetah' },
            { id: 't3', text: 'is' },
            { id: 't4', text: 'faster' },
            { id: 't5', text: 'than' },
            { id: 't6', text: 'a' },
            { id: 't7', text: 'turtle' },
            { id: 't8', text: '.', isPunctuation: true },
            { id: 't9', text: 'more', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'A מתחילה באות גדולה, וסיומת faster than דורשת than ולא then.',
          ruleExplanationHe: 'מבנה השוואה: Subject + is + adjective-er + than + object.',
          audioFullSentence: 'A cheetah is faster than a turtle.'
        },
        {
          id: 'u11-s2',
          hebrewPromptSentence: 'הר החרמון הוא ההר הגבוה ביותר בישראל.',
          targetSentenceTokens: ['Mount', 'Hermon', 'is', 'the', 'tallest', 'mountain', 'in', 'Israel', '.'],
          scrambledTokens: [
            { id: 't1', text: 'Mount' },
            { id: 't2', text: 'Hermon' },
            { id: 't3', text: 'is' },
            { id: 't4', text: 'the' },
            { id: 't5', text: 'tallest' },
            { id: 't6', text: 'mountain' },
            { id: 't7', text: 'in' },
            { id: 't8', text: 'Israel' },
            { id: 't9', text: '.', isPunctuation: true },
            { id: 't10', text: 'most', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'שמות מקומות (Mount Hermon, Israel) נפתחים תמיד באות רישית גדולה.',
          ruleExplanationHe: 'דרגת הפלגה מחייבת the tallest ולא the most tall.',
          audioFullSentence: 'Mount Hermon is the tallest mountain in Israel.'
        }
      ],
      suffixItems: [
        { id: 'suf-26', baseWord: 'roar', targetSuffix: '-s', fullWord: 'roars', hebrewMeaning: 'שואג (אריה)', ruleHintHe: 'הוספת s לגוף שלישי הווה' },
        { id: 'suf-27', baseWord: 'catch', targetSuffix: '-es', fullWord: 'catches', hebrewMeaning: 'תופס', ruleHintHe: 'אחרי צליל ch מוסיפים es' },
        { id: 'suf-28', baseWord: 'hunt', targetSuffix: '-ing', fullWord: 'hunting', hebrewMeaning: 'צד כעת', ruleHintHe: 'סיומת ing לפעולה מתמשכת' }
      ],
      vocabulary: unit11Vocab
    },

    // ==========================================
    // UNIT 12: School Rules & Modals of Obligation
    // ==========================================
    {
      id: 'unit-12',
      unitNumber: 12,
      titleEn: 'School Rules & Modals of Obligation',
      titleHe: 'חוקי בית הספר ופעלי מודל (Modals of Obligation)',
      themeHe: 'כללים, אחריות הדדית, פעלי עזר לחובה ועצה (Must, Should, Have to, Can)',
      descriptionHe: 'שליטה בפעלי מודל באנגלית שאינם מקבלים לעולם סיומת s או ing, בניגוד מוחלט להטיות המקבילות בעברית ("הוא חייב / היא חייבת").',
      badgeIcon: 'Award',
      xpReward: 170,
      phonicsGapName: 'אות L שקטה ב-Should/Could ועיצור T בסוף Must',
      grammarFocusName: 'פעלי מודל (Modals: must, should, have to, cannot)',
      phonicsExercises: [
        {
          id: 'u12-p1',
          type: 'phonics_minimal_pair',
          titleHe: 'מלכודת האות השקטה: Should מול Could',
          instructionHe: 'האזינו היטב ובחרו במילה עם האות L השקטה (אין להגות שולד!):',
          targetLetter: 'SH',
          distractorLetter: 'C',
          targetWord: {
            id: 'u12-w1',
            letter: 'SH',
            word: 'Should',
            ipa: '/ʃʊd/',
            hebrewTranslation: 'כדאי / צריך (המלצה)',
            audioText: 'Should. You should eat healthy apples.',
            hebrewLetterEquivalent: 'שוד (ה-L שקטה)',
            exampleSentence: 'You should eat healthy apples.'
          },
          distractorWord: {
            id: 'u12-w2',
            letter: 'C',
            word: 'Could',
            ipa: '/kʊd/',
            hebrewTranslation: 'יכול היה / אפשר',
            audioText: 'Could. Could you please help me?',
            hebrewLetterEquivalent: 'קוד (ה-L שקטה)',
            exampleSentence: 'Could you please help me?'
          },
          hebrewHint: 'האות L במילים should, could, would שקטה לחלוטין! הוגים: שוּד, קוּד.',
          articulationGuide: {
            mouthShape: 'short_relaxed_vowel',
            soundNameEn: 'Silent L in Should /ʃʊd/',
            soundNameHe: 'האות L השקטה',
            hebrewRule: 'אל תגידו "שולד". האות L נאלמת: /ʃʊd/.',
            mnemonicHe: 'כדאי לך להשקיט את הלמ״ד',
            articulationCueEn: 'Do not touch your tongue to the roof of your mouth for L.'
          },
          explanationHe: 'הוגים /ʃʊd/ ללא L: You should listen to the teacher.'
        },
        {
          id: 'u12-p2',
          type: 'phonics_minimal_pair',
          titleHe: 'חובת צליל: Must מול Mustn’t',
          instructionHe: 'האזינו לבחירה בין חובה מוחלטת (Must) לבין איסור מוחלט (Mustn’t):',
          targetLetter: 'MUST',
          distractorLetter: 'MUSTNOT',
          targetWord: {
            id: 'u12-w3',
            letter: 'MUST',
            word: 'Must',
            ipa: '/mʌst/',
            hebrewTranslation: 'חייב / מוכרח',
            audioText: 'Must. You must be quiet in the library.',
            hebrewLetterEquivalent: 'מאסט',
            exampleSentence: 'You must be quiet in the library.'
          },
          distractorWord: {
            id: 'u12-w4',
            letter: 'MUSTNOT',
            word: "Mustn't",
            ipa: '/ˈmʌsənt/',
            hebrewTranslation: 'אסור בהחלט',
            audioText: "Mustn't. You mustn't run in the corridor.",
            hebrewLetterEquivalent: 'מאסנט (ה-t הראשונה שקטה)',
            exampleSentence: "You mustn't run in the corridor."
          },
          hebrewHint: 'במילה mustn’t האות t הראשונה כמעט נעלמת: הוגים "מאסנט".',
          articulationGuide: {
            mouthShape: 'lips_closed_pop',
            soundNameEn: 'Must vs Must not',
            soundNameHe: 'חובה מול איסור',
            hebrewRule: 'Must מבטא חובה ברורה; אין להוסיף לפועל הבא s לעולם.',
            mnemonicHe: 'מאסט = חובה מוחלטת',
            articulationCueEn: 'End must with a crisp /st/ sound.'
          },
          explanationHe: 'אחרי must הפועל תמיד בצורת המקור: You must arrive on time.'
        }
      ],
      verbExercises: [
        {
          id: 'u12-v1',
          hebrewPromptSentence: 'תלמידים חייבים להקשיב למורה בכיתה.',
          subject: 'Students',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'Students',
          baseTemplateAfter: 'to the teacher in the classroom.',
          correctAnswer: 'must listen',
          options: ['must listen', 'must listens', 'must listening'],
          hebrewContrastLesson: 'אחרי פועל המודל must הפועל הבא מגיע בצורת המקור הנקייה (Base Form) ללא s, ed או ing!',
          fullSentenceEn: 'Students must listen to the teacher in the classroom.',
          audioText: 'Students must listen to the teacher in the classroom.'
        },
        {
          id: 'u12-v2',
          hebrewPromptSentence: 'כדאי לך לאכול אוכל בריא כל יום.',
          subject: 'You',
          subjectType: 'plural_or_you',
          baseTemplateBefore: 'You',
          baseTemplateAfter: 'healthy food every day for good energy.',
          correctAnswer: 'should eat',
          options: ['should eat', 'should to eat', 'should eats'],
          hebrewContrastLesson: 'אחרי should אין צורך במילת to ואין להוסיף s (לא should to eat, אלא should eat בלבד).',
          fullSentenceEn: 'You should eat healthy food every day for good energy.',
          audioText: 'You should eat healthy food every day for good energy.'
        },
        {
          id: 'u12-v3',
          hebrewPromptSentence: 'הוא חייב להגיע בזמן לבית הספר.',
          subject: 'He',
          subjectType: 'third_singular',
          baseTemplateBefore: 'He',
          baseTemplateAfter: 'arrive at school on time.',
          correctAnswer: 'has to',
          options: ['has to', 'have to', 'must to'],
          hebrewContrastLesson: 'עם גוף שלישי (He/She) בביטוי have to, הצורה מתחלפת ל-has to. בנוסף, אסור להגיד must to.',
          fullSentenceEn: 'He has to arrive at school on time.',
          audioText: 'He has to arrive at school on time.'
        }
      ],
      sentenceExercises: [
        {
          id: 'u12-s1',
          hebrewPromptSentence: 'אתה חייב להרים את היד כדי לשאול שאלה.',
          targetSentenceTokens: ['You', 'must', 'raise', 'your', 'hand', 'to', 'ask', 'a', 'question', '.'],
          scrambledTokens: [
            { id: 't1', text: 'You' },
            { id: 't2', text: 'must' },
            { id: 't3', text: 'raise' },
            { id: 't4', text: 'your' },
            { id: 't5', text: 'hand' },
            { id: 't6', text: 'to' },
            { id: 't7', text: 'ask' },
            { id: 't8', text: 'a' },
            { id: 't9', text: 'question' },
            { id: 't10', text: '.', isPunctuation: true },
            { id: 't11', text: 'to', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'You נפתחת באות גדולה, ולאחר must מגיע ישירות הפועל raise ללא to.',
          ruleExplanationHe: 'מבנה מודל: Subject + must + Verb 1 + Object.',
          audioFullSentence: 'You must raise your hand to ask a question.'
        },
        {
          id: 'u12-s2',
          hebrewPromptSentence: 'תלמידים טובים צריכים לקרוא ספרים באנגלית בכל שבוע.',
          targetSentenceTokens: ['Good', 'students', 'should', 'read', 'English', 'books', 'every', 'week', '.'],
          scrambledTokens: [
            { id: 't1', text: 'Good' },
            { id: 't2', text: 'students' },
            { id: 't3', text: 'should' },
            { id: 't4', text: 'read' },
            { id: 't5', text: 'English' },
            { id: 't6', text: 'books' },
            { id: 't7', text: 'every' },
            { id: 't8', text: 'week' },
            { id: 't9', text: '.', isPunctuation: true },
            { id: 't10', text: 'reads', isDistractor: true }
          ],
          grammarFocus: 'to_be_copula',
          capitalizationTipHe: 'English תמיד נכתבת באות E גדולה, גם באמצע משפט!',
          ruleExplanationHe: 'אחרי should הפועל read אינו מקבל s: should read.',
          audioFullSentence: 'Good students should read English books every week.'
        }
      ],
      suffixItems: [
        { id: 'suf-29', baseWord: 'listen', targetSuffix: '-s', fullWord: 'listens', hebrewMeaning: 'מקשיב (יחיד)', ruleHintHe: 'תוספת s לגוף שלישי הווה' },
        { id: 'suf-30', baseWord: 'teach', targetSuffix: '-es', fullWord: 'teaches', hebrewMeaning: 'מלמד (מורה)', ruleHintHe: 'אחרי צליל ch מוסיפים es' },
        { id: 'suf-31', baseWord: 'help', targetSuffix: '-ing', fullWord: 'helping', hebrewMeaning: 'עוזר כעת', ruleHintHe: 'תוספת ing לפעולה המתרחשת כעת' }
      ],
      vocabulary: unit12Vocab
    }
  ]
};
