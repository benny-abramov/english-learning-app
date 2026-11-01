import { ReadingPassage } from '../types/readingAndOral';

export const unseenPassagesData: ReadingPassage[] = [
  // ==========================================
  // UNIT 1: Sound & Sentence Detective
  // Theme: Friends, Park, Family & "To Be" (am / is / are)
  // ==========================================
  {
    id: 'passage-unit-1',
    unitId: 'unit-1',
    unitNumber: 1,
    titleEn: 'A Sunny Morning in the Park',
    titleHe: 'בוקר שמשי בפארק (יחידה 1)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'חברים, משפחה, פארק ופועל העזר To Be',
    estimatedReadTimeMin: 3,
    wordCount: 135,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Today is a warm and sunny morning in the neighborhood.',
            audioText: 'Today is a warm and sunny morning in the neighborhood.'
          },
          {
            lineNumber: 2,
            text: 'Ron and his best friend Maya are in the big green park.',
            audioText: 'Ron and his best friend Maya are in the big green park.'
          },
          {
            lineNumber: 3,
            text: 'Ron is happy because his family is also here with a picnic basket.',
            audioText: 'Ron is happy because his family is also here with a picnic basket.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'His father has a shiny black pan and cooks sweet pancakes.',
            audioText: 'His father has a shiny black pan and cooks sweet pancakes.'
          },
          {
            lineNumber: 5,
            text: 'Maya brings a small battery fan because the air is warm.',
            audioText: 'Maya brings a small battery fan because the air is warm.'
          },
          {
            lineNumber: 6,
            text: 'The children draw pictures with a blue pen and a yellow pencil.',
            audioText: 'The children draw pictures with a blue pen and a yellow pencil.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'They look at their funny drawing of a pink pig under a fig tree.',
            audioText: 'They look at their funny drawing of a pink pig under a fig tree.'
          },
          {
            lineNumber: 8,
            text: 'Ron says: "We are good friends, and this park is wonderful."',
            audioText: 'Ron says: We are good friends, and this park is wonderful.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Friend', translationHe: 'חבר / חברה', partOfSpeech: 'noun', exampleHe: 'רון וחברתו מיה.' },
      { word: 'Park', translationHe: 'פארק / גן ציבורי', partOfSpeech: 'noun', exampleHe: 'הפארק הירוק והגדול.' },
      { word: 'Family', translationHe: 'משפחה', partOfSpeech: 'noun', exampleHe: 'המשפחה שלו נמצאת כאן.' },
      { word: 'Pan', translationHe: 'מחבת (מתחיל ב-P)', partOfSpeech: 'noun', exampleHe: 'מחבת שחורה להכנת פנקייק.' },
      { word: 'Fan', translationHe: 'מאוורר (מתחיל ב-F)', partOfSpeech: 'noun', exampleHe: 'מאוורר קטן באוויר החם.' },
      { word: 'Happy', translationHe: 'שמח ומאושר', partOfSpeech: 'adjective', exampleHe: 'רון שמח ומחייך.' }
    ],
    questions: [
      {
        id: 'u1-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'Where are Ron and Maya today? (Line 2)',
        questionHe: 'היכן רון ומיה נמצאים היום? (שורה 2)',
        options: [
          'In the big green park',
          'At the supermarket in town',
          'Inside the dark classroom',
          'On a train to Haifa'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [2],
        explanationHe: 'שורה 2 מציינת במפורש: "Ron and his best friend Maya are in the big green park".',
        points: 25
      },
      {
        id: 'u1-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'Why does Maya bring a small fan? (Line 5)',
        questionHe: 'מדוע מיה מביאה מאוורר קטן (Fan)? (שורה 5)',
        options: [
          'Because the air is warm in the park',
          'Because she wants to fly like a bird',
          'Because it is snowing outside',
          'Because she needs to boil water'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [5],
        explanationHe: 'בשורה 5 נכתב: "Maya brings a small battery fan because the air is warm".',
        points: 25
      },
      {
        id: 'u1-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'Which auxiliary verb (פועל עזר) is used with "We" in line 8?',
        questionHe: 'איזה פועל עזר (To Be) מופיע עם המילה "We" בשורה 8?',
        options: [
          'are ("We are good friends")',
          'is ("We is")',
          'am ("We am")',
          'be ("We be")'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [8],
        explanationHe: 'באנגלית, עבור גוף רבים (We) משתמשים בפועל העזר "are" (ולא משמיטים אותו כמו בעברית).',
        points: 25
      },
      {
        id: 'u1-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What funny animal is drawn under the fig tree? (Line 7)',
        questionHe: 'איזו חיה מצחיקה מצוירת מתחת לעץ התאנה? (שורה 7)',
        options: [
          'A pink pig',
          'A dancing tiger',
          'A wild crocodile',
          'A singing monkey'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [7],
        explanationHe: 'שורה 7 מציינת: "their funny drawing of a pink pig under a fig tree".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 2: Party Time & Action Verbs
  // Theme: Party, Dance, Swimming & Progressive (-ing)
  // ==========================================
  {
    id: 'passage-unit-2',
    unitId: 'unit-2',
    unitNumber: 2,
    titleEn: 'Dan’s Surprise Birthday Party',
    titleHe: 'מסיבת ההפתעה של דן (יחידה 2)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'מסיבות, ריקוד, שחייה ופעולות בהווה ממושך (-ing)',
    estimatedReadTimeMin: 3.5,
    wordCount: 140,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'It is Friday afternoon, and Dan is having a surprise birthday party in his garden.',
            audioText: 'It is Friday afternoon, and Dan is having a surprise birthday party in his garden.'
          },
          {
            lineNumber: 2,
            text: 'All of his good friends from school are visiting today.',
            audioText: 'All of his good friends from school are visiting today.'
          },
          {
            lineNumber: 3,
            text: 'Lively music is playing loudly from two big speakers.',
            audioText: 'Lively music is playing loudly from two big speakers.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'Look at the swimming pool! Three children are swimming and laughing happily.',
            audioText: 'Look at the swimming pool! Three children are swimming and laughing happily.'
          },
          {
            lineNumber: 5,
            text: 'Near the table, Maya and Ben are dancing to a sweet pop song.',
            audioText: 'Near the table, Maya and Ben are dancing to a sweet pop song.'
          },
          {
            lineNumber: 6,
            text: 'Dan’s mother is cutting a delicious chocolate cake with strawberries.',
            audioText: 'Dan’s mother is cutting a delicious chocolate cake with strawberries.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'Everyone is shouting: "Happy birthday, Dan!"',
            audioText: 'Everyone is shouting: Happy birthday, Dan!'
          },
          {
            lineNumber: 8,
            text: 'Dan is smiling brightly because this party is unforgettable.',
            audioText: 'Dan is smiling brightly because this party is unforgettable.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Party', translationHe: 'מסיבה', partOfSpeech: 'noun', exampleHe: 'מסיבת יום הולדת בגן.' },
      { word: 'Swimming', translationHe: 'שוחים (פעולה מתמשכת)', partOfSpeech: 'verb (-ing)', exampleHe: 'ילדים שוחים בבריכה.' },
      { word: 'Dancing', translationHe: 'רוקדים', partOfSpeech: 'verb (-ing)', exampleHe: 'מיה ובן רוקדים לצלילי מוזיקה.' },
      { word: 'Music', translationHe: 'מוזיקה', partOfSpeech: 'noun', exampleHe: 'מוזיקה קצבית מתנגנת.' },
      { word: 'Cake', translationHe: 'עוגה', partOfSpeech: 'noun', exampleHe: 'עוגת שוקולד טעימה עם תותים.' },
      { word: 'Smiling', translationHe: 'מחייך', partOfSpeech: 'verb (-ing)', exampleHe: 'דן מחייך בשמחה.' }
    ],
    questions: [
      {
        id: 'u2-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'What are three children doing in line 4?',
        questionHe: 'מה עושים שלושה ילדים לפי שורה 4?',
        options: [
          'They are swimming and laughing happily in the pool',
          'They are sleeping in the car',
          'They are writing a long test',
          'They are running outside to buy milk'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [4],
        explanationHe: 'שורה 4 מציינת: "Three children are swimming and laughing happily".',
        points: 25
      },
      {
        id: 'u2-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What kind of cake is Dan’s mother cutting? (Line 6)',
        questionHe: 'איזו עוגה אמא של דן חותכת? (שורה 6)',
        options: [
          'A delicious chocolate cake with strawberries',
          'A cold fish cake with onions',
          'A lemon cake without sugar',
          'A bread roll with butter'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [6],
        explanationHe: 'בשורה 6 נכתב במפורש: "a delicious chocolate cake with strawberries".',
        points: 25
      },
      {
        id: 'u2-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'The suffix "-ing" on verbs like "dancing" and "singing" shows that:',
        questionHe: 'הסיומת "-ing" בפעלים כמו dancing ו-singing מראה ש:',
        options: [
          'The actions are happening right now (הפעולות מתרחשות כעת בהווה)',
          'The party finished three years ago (האירוע קרה בעבר הרחוק)',
          'They will never dance (הם לא רוקדים לעולם)',
          'The words are numbers (אלו מספרים)'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [4, 5],
        explanationHe: 'סיומת -ing בצירוף am/is/are מייצגת את זמן הווה ממושך (Present Progressive) - פעולה המתרחשת ברגע זה.',
        points: 25
      },
      {
        id: 'u2-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'Why is Dan smiling brightly in line 8?',
        questionHe: 'מדוע דן מחייך בשמחה בשורה 8?',
        options: [
          'Because the party is unforgettable and wonderful',
          'Because he lost his keys',
          'Because the pool has no water',
          'Because his friends left early'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [8],
        explanationHe: 'שורה 8 מסבירה: "Dan is smiling brightly because this party is unforgettable".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 3: Pets, Numbers & Plural Quest
  // Theme: Pets, Numbers & Plural Nouns (-s / -es)
  // ==========================================
  {
    id: 'passage-unit-3',
    unitId: 'unit-3',
    unitNumber: 3,
    titleEn: 'Liam and the Funny Farm Pets',
    titleHe: 'ליאם וחיות החווה המצחיקות (יחידה 3)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'חיות מחמד, מספרים וסיומות ריבוי באנגלית',
    estimatedReadTimeMin: 3,
    wordCount: 130,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Liam loves animals very much and spends weekends at his grandfather’s farm.',
            audioText: 'Liam loves animals very much and spends weekends at his grandfather’s farm.'
          },
          {
            lineNumber: 2,
            text: 'On the farm, there are two friendly brown dogs that jump with joy.',
            audioText: 'On the farm, there are two friendly brown dogs that jump with joy.'
          },
          {
            lineNumber: 3,
            text: 'There are also three white cats sleeping on comfortable chairs.',
            audioText: 'There are also three white cats sleeping on comfortable chairs.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'Every morning, Liam feeds four fluffy rabbits with orange carrots.',
            audioText: 'Every morning, Liam feeds four fluffy rabbits with orange carrots.'
          },
          {
            lineNumber: 5,
            text: 'In the small pond, five shiny gold fish swim between green water plants.',
            audioText: 'In the small pond, five shiny gold fish swim between green water plants.'
          },
          {
            lineNumber: 6,
            text: 'Grandfather carries two wooden boxes full of fresh red apples.',
            audioText: 'Grandfather carries two wooden boxes full of fresh red apples.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'Liam counts all the happy animals and reads two interesting books under the tree.',
            audioText: 'Liam counts all the happy animals and reads two interesting books under the tree.'
          },
          {
            lineNumber: 8,
            text: 'He says: "Taking care of farm animals is the best hobby in the world!"',
            audioText: 'He says: Taking care of farm animals is the best hobby in the world!'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Dogs', translationHe: 'כלבים (ריבוי עם s)', partOfSpeech: 'noun (plural)', exampleHe: 'שני כלבים חומים.' },
      { word: 'Cats', translationHe: 'חתולים', partOfSpeech: 'noun (plural)', exampleHe: 'שלושה חתולים לבנים.' },
      { word: 'Boxes', translationHe: 'ארגזים (סיומת es אחרי x)', partOfSpeech: 'noun (plural)', exampleHe: 'שני ארגזי עץ.' },
      { word: 'Fish', translationHe: 'דגים (צורת ריבוי מיוחדת ללא s)', partOfSpeech: 'noun', exampleHe: 'חמישה דגי זהב בבריכה.' },
      { word: 'Rabbits', translationHe: 'ארנבים', partOfSpeech: 'noun (plural)', exampleHe: 'ארבעה ארנבים רכים.' },
      { word: 'Books', translationHe: 'ספרים', partOfSpeech: 'noun (plural)', exampleHe: 'שני ספרים מעניינים.' }
    ],
    questions: [
      {
        id: 'u3-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'How many white cats are sleeping on the chairs? (Line 3)',
        questionHe: 'כמה חתולים לבנים ישנים על הכיסאות? (שורה 3)',
        options: [
          'Three white cats',
          'Ten black cats',
          'Only one cat',
          'Seven cats'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [3],
        explanationHe: 'שורה 3 מציינת במפורש: "There are also three white cats sleeping on comfortable chairs".',
        points: 25
      },
      {
        id: 'u3-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What does Liam feed the four fluffy rabbits? (Line 4)',
        questionHe: 'במה ליאם מאכיל את ארבעת הארנבים? (שורה 4)',
        options: [
          'With orange carrots',
          'With chocolate candies',
          'With salty chips',
          'With cold water only'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [4],
        explanationHe: 'שורה 4 מציינת: "Liam feeds four fluffy rabbits with orange carrots".',
        points: 25
      },
      {
        id: 'u3-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'Why does the word "boxes" end with "-es" instead of just "-s"?',
        questionHe: 'מדוע המילה "boxes" (ארגזים) מסתיימת ב--es ולא רק ב--s?',
        options: [
          'Because words ending in X, S, SH, CH add "-es" in plural (כלל דקדוקי של משרד החינוך)',
          'Because grandfather is old',
          'Because it is an English irregular verb',
          'Because boxes have four corners'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [6],
        explanationHe: 'במילים המסתיימות באותיות שורקות כמו x, s, ch, sh מוסיפים es בריבוי (box -> boxes).',
        points: 25
      },
      {
        id: 'u3-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What does Liam do under the tree in line 7?',
        questionHe: 'מה ליאם עושה מתחת לעץ בשורה 7?',
        options: [
          'He reads two interesting books',
          'He builds a wooden bridge',
          'He searches for his shoes',
          'He plays computer games'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [7],
        explanationHe: 'שורה 7 מציינת: "reads two interesting books under the tree".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 4: The Question Journey & TH Sounds
  // Theme: Wh- Questions & Interdental "TH"
  // ==========================================
  {
    id: 'passage-unit-4',
    unitId: 'unit-4',
    unitNumber: 4,
    titleEn: 'The Mystery of the Three Forest Clues',
    titleHe: 'תעלומת שלושת הרמזים ביער (יחידה 4)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'שאלות Wh-, צלילי TH (לשון בין שיניים) ומשפחה',
    estimatedReadTimeMin: 3.5,
    wordCount: 145,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'On a sunny Saturday, three young brothers walk through the quiet Carmel forest.',
            audioText: 'On a sunny Saturday, three young brothers walk through the quiet Carmel forest.'
          },
          {
            lineNumber: 2,
            text: 'Their mother gives them a wooden compass and an ancient treasure map.',
            audioText: 'Their mother gives them a wooden compass and an ancient treasure map.'
          },
          {
            lineNumber: 3,
            text: 'The older brother, Tom, asks: "Where is the hidden path to the old stone bridge?"',
            audioText: 'The older brother, Tom, asks: Where is the hidden path to the old stone bridge?'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'They stop and think carefully about the first riddle on the map.',
            audioText: 'They stop and think carefully about the first riddle on the map.'
          },
          {
            lineNumber: 5,
            text: 'Their father points to a thick oak tree with three carved white arrows.',
            audioText: 'Their father points to a thick oak tree with three carved white arrows.'
          },
          {
            lineNumber: 6,
            text: 'Young brother Dan asks: "Why are these arrows pointing toward the north?"',
            audioText: 'Young brother Dan asks: Why are these arrows pointing toward the north?'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'Behind the thick tree, they discover a small box with three golden medals.',
            audioText: 'Behind the thick tree, they discover a small box with three golden medals.'
          },
          {
            lineNumber: 8,
            text: 'They thank their parents for the wonderful outdoor question adventure.',
            audioText: 'They thank their parents for the wonderful outdoor question adventure.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Three', translationHe: 'שלוש / שלושה (צליל TH עדין)', partOfSpeech: 'number', exampleHe: 'שלושה אחים ביער.' },
      { word: 'Brother', translationHe: 'אח (צליל TH קולי רוטט)', partOfSpeech: 'noun', exampleHe: 'האח הגדול טום.' },
      { word: 'Mother', translationHe: 'אמא (צליל TH קולי)', partOfSpeech: 'noun', exampleHe: 'אמא נתנה מצפן מעץ.' },
      { word: 'Father', translationHe: 'אבא (צליל TH קולי)', partOfSpeech: 'noun', exampleHe: 'אבא מצביע על העץ.' },
      { word: 'Think', translationHe: 'לחשוב', partOfSpeech: 'verb', exampleHe: 'הם עוצרים וחושבים היטב.' },
      { word: 'Path', translationHe: 'שביל הליכה (מסתיים ב-TH)', partOfSpeech: 'noun', exampleHe: 'השביל הנסתר אל הגשר.' }
    ],
    questions: [
      {
        id: 'u4-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'What question does Tom ask in line 3?',
        questionHe: 'איזו שאלה שואל טום בשורה 3?',
        options: [
          '"Where is the hidden path to the old stone bridge?"',
          '"What time is dinner tonight?"',
          '"Who has my blue sunglasses?"',
          '"Why is the school bus late?"'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [3],
        explanationHe: 'שורה 3 מציגה את שאלת המיקום: "Where is the hidden path to the old stone bridge?".',
        points: 25
      },
      {
        id: 'u4-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What does their father point to in line 5?',
        questionHe: 'על מה אבא שלהם מצביע בשורה 5?',
        options: [
          'A thick oak tree with three carved white arrows',
          'A flying helicopter in the clouds',
          'A red car on the highway',
          'A wild bear drinking from the river'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [5],
        explanationHe: 'שורה 5 מציינת: "points to a thick oak tree with three carved white arrows".',
        points: 25
      },
      {
        id: 'u4-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'How should the letters "TH" in words like "three" and "think" be pronounced?',
        questionHe: 'כיצד הוגים נכון את הצירוף TH במילים three ו-think?',
        options: [
          'With the tip of the tongue gently between the teeth (קצה הלשון בין השיניים)',
          'Like an Israeli hard T without air (כמו ט׳ רגילה)',
          'Like an S through closed teeth (כמו ס׳ שורקת)',
          'It is completely silent (לא מבטאים כלל)'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [1, 4],
        explanationHe: 'הצליל TH באנגלית דורש הוצאת קצה הלשון קלות בין השיניים העליונות לתחתונות.',
        points: 25
      },
      {
        id: 'u4-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What do the brothers discover behind the thick tree in line 7?',
        questionHe: 'מה האחים מגלים מאחורי העץ העבה בשורה 7?',
        options: [
          'A small box with three golden medals',
          'A lost bicycle with flat tires',
          'A basket full of mushrooms',
          'A telephone with no battery'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [7],
        explanationHe: 'שורה 7 מציינת: "they discover a small box with three golden medals".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 5: Magic E & The Classroom Kingdom
  // Theme: Magic E phonics & Classroom Objects (Have / Has got)
  // ==========================================
  {
    id: 'passage-unit-5',
    unitId: 'unit-5',
    unitNumber: 5,
    titleEn: 'The Magic Pencil in Room Five',
    titleHe: 'העיפרון הקסום בכיתה חמש (יחידה 5)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'ה-E הקסומה (Magic E), כלי כתיבה ושייכות Have/Has got',
    estimatedReadTimeMin: 3,
    wordCount: 135,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Room Five is the most creative classroom in the elementary school.',
            audioText: 'Room Five is the most creative classroom in the elementary school.'
          },
          {
            lineNumber: 2,
            text: 'Every student has got a clean wooden desk, a notebook, and a sharp pencil.',
            audioText: 'Every student has got a clean wooden desk, a notebook, and a sharp pencil.'
          },
          {
            lineNumber: 3,
            text: 'Today, the English teacher writes a secret riddle on the board.',
            audioText: 'Today, the English teacher writes a secret riddle on the board.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'Teacher Gal says: "Add Magic E to a cap, and it becomes a superhero cape!"',
            audioText: 'Teacher Gal says: Add Magic E to a cap, and it becomes a superhero cape!'
          },
          {
            lineNumber: 5,
            text: 'Ella smiles and writes the word "kite" in her notebook next to "kit".',
            audioText: 'Ella smiles and writes the word kite in her notebook next to kit.'
          },
          {
            lineNumber: 6,
            text: 'Ben has got a green ruler and draws a neat line under each magic word.',
            audioText: 'Ben has got a green ruler and draws a neat line under each magic word.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'All the students understand that silent E makes the vowel say its long name.',
            audioText: 'All the students understand that silent E makes the vowel say its long name.'
          },
          {
            lineNumber: 8,
            text: 'They feel proud of their sharp spelling skills and give high-fives.',
            audioText: 'They feel proud of their sharp spelling skills and give high-fives.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Desk', translationHe: 'שולחן כתיבה בכיתה', partOfSpeech: 'noun', exampleHe: 'שולחן עץ נקי.' },
      { word: 'Notebook', translationHe: 'מחברת', partOfSpeech: 'noun', exampleHe: 'כותבים במחברת.' },
      { word: 'Cape', translationHe: 'גלימה (מילה עם Magic E)', partOfSpeech: 'noun', exampleHe: 'גלימת גיבור-על.' },
      { word: 'Kite', translationHe: 'עפיפון (צליל I ארוך בזכות E)', partOfSpeech: 'noun', exampleHe: 'מטיסים עפיפון בשמיים.' },
      { word: 'Has got', translationHe: 'יש לו / יש לה', partOfSpeech: 'verb phrase', exampleHe: 'לבן יש סרגל ירוק.' },
      { word: 'Ruler', translationHe: 'סרגל', partOfSpeech: 'noun', exampleHe: 'סרגל ירוק לשרטוט קווים.' }
    ],
    questions: [
      {
        id: 'u5-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'What does a "cap" become when you add Magic E? (Line 4)',
        questionHe: 'למה הופכת המילה cap (כובע מצחייה) כאשר מוסיפים לה Magic E? (שורה 4)',
        options: [
          'A superhero cape (גלימת גיבור-על)',
          'A cup of hot tea',
          'A red apple',
          'A flying car'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [4],
        explanationHe: 'שורה 4 מסבירה: "Add Magic E to a cap, and it becomes a superhero cape!".',
        points: 25
      },
      {
        id: 'u5-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What school object has Ben got in line 6?',
        questionHe: 'איזה כלי כתיבה יש לבן בשורה 6?',
        options: [
          'A green ruler to draw neat lines',
          'A gold telephone',
          'A soccer ball',
          'A large dictionary'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [6],
        explanationHe: 'שורה 6 מציינת במפורש: "Ben has got a green ruler and draws a neat line".',
        points: 25
      },
      {
        id: 'u5-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'What rule does line 7 teach about silent "Magic E"?',
        questionHe: 'איזה כלל מלמדת שורה 7 אודות אות ה-E הקסומה (Magic E)?',
        options: [
          'Silent E makes the vowel say its long alphabet name (גורמת לתנועה להישמע ארוכה כמו שמה ב-ABC)',
          'Silent E must always be read with a loud scream',
          'Silent E changes the word into Hebrew',
          'Silent E makes all letters disappear'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [7],
        explanationHe: 'שורה 7 קובעת: "silent E makes the vowel say its long name" (כמו a ב-cape או i ב-kite).',
        points: 25
      },
      {
        id: 'u5-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'Why do the students give high-fives at the end of the lesson?',
        questionHe: 'מדוע התלמידים נותנים "כיף" בסוף השיעור?',
        options: [
          'Because they are proud of their sharp spelling skills',
          'Because the school bell is broken',
          'Because they don’t like reading',
          'Because the classroom is cold'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [8],
        explanationHe: 'שורה 8 מסכמת: "They feel proud of their sharp spelling skills and give high-fives".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 6: Safari Animals & The Human Body
  // Theme: Wild Animals, Body Parts & 3rd Person Singular (-s/es)
  // ==========================================
  {
    id: 'passage-unit-6',
    unitId: 'unit-6',
    unitNumber: 6,
    titleEn: 'A Safari Morning in Ramat Gan',
    titleHe: 'בוקר בספארי ברמת גן (יחידה 6)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'חיות ספארי, איברי גוף והווה פשוט גוף שלישי (-s)',
    estimatedReadTimeMin: 3.5,
    wordCount: 145,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Early in the morning, the Ramat Gan Safari wakes up with exciting animal sounds.',
            audioText: 'Early in the morning, the Ramat Gan Safari wakes up with exciting animal sounds.'
          },
          {
            lineNumber: 2,
            text: 'A giant African elephant steps near the water and washes its long gray trunk.',
            audioText: 'A giant African elephant steps near the water and washes its long gray trunk.'
          },
          {
            lineNumber: 3,
            text: 'The zookeeper watches the animals carefully and writes notes in a journal.',
            audioText: 'The zookeeper watches the animals carefully and writes notes in a journal.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'Nearby, a playful chimpanzee catches sweet bananas and climbs high branches.',
            audioText: 'Nearby, a playful chimpanzee catches sweet bananas and climbs high branches.'
          },
          {
            lineNumber: 5,
            text: 'A golden cheetah rests under an acacia tree with its sharp yellow eyes wide open.',
            audioText: 'A golden cheetah rests under an acacia tree with its sharp yellow eyes wide open.'
          },
          {
            lineNumber: 6,
            text: 'When the cheetah spots a shadow, it runs faster than any other creature on land.',
            audioText: 'When the cheetah spots a shadow, it runs faster than any other creature on land.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'Visiting children look at the zebras and touch their own ears and noses in amazement.',
            audioText: 'Visiting children look at the zebras and touch their own ears and noses in amazement.'
          },
          {
            lineNumber: 8,
            text: 'The safari teaches everyone how animals adapt their strong bodies to survive.',
            audioText: 'The safari teaches everyone how animals adapt their strong bodies to survive.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Elephant', translationHe: 'פיל אפריקאי', partOfSpeech: 'noun', exampleHe: 'הפיל רוחץ את החדק במים.' },
      { word: 'Trunk', translationHe: 'חדק של פיל', partOfSpeech: 'noun', exampleHe: 'חדק אפור וארוך.' },
      { word: 'Chimpanzee', translationHe: 'שימפנזה (צליל CH שורק)', partOfSpeech: 'noun', exampleHe: 'השימפנזה מטפס על ענפים.' },
      { word: 'Cheetah', translationHe: 'צ׳יטה (היונק המהיר בעולם)', partOfSpeech: 'noun', exampleHe: 'הצ׳יטה רצה מהר מאוד.' },
      { word: 'Washes', translationHe: 'רוחץ (פועל עם es בגוף שלישי)', partOfSpeech: 'verb', exampleHe: 'הפיל רוחץ את החדק.' },
      { word: 'Eyes', translationHe: 'עיניים', partOfSpeech: 'noun (plural)', exampleHe: 'עיניים צהובות וחדות.' }
    ],
    questions: [
      {
        id: 'u6-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'What does the African elephant wash in the water? (Line 2)',
        questionHe: 'מה הפיל האפריקאי רוחץ במים? (שורה 2)',
        options: [
          'Its long gray trunk',
          'A pair of dirty shoes',
          'A silver car wheel',
          'A plastic bucket'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [2],
        explanationHe: 'שורה 2 מציינת: "washes its long gray trunk".',
        points: 25
      },
      {
        id: 'u6-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What does the playful chimpanzee climb? (Line 4)',
        questionHe: 'על מה השימפנזה השובב מטפס? (שורה 4)',
        options: [
          'High branches in the trees',
          'A tall television antenna',
          'A stone brick wall',
          'A safari bus roof'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [4],
        explanationHe: 'שורה 4 מציינת: "catches sweet bananas and climbs high branches".',
        points: 25
      },
      {
        id: 'u6-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'Why do verbs like "washes" and "catches" end in "-es"?',
        questionHe: 'מדוע פעלים כמו washes ו-catches מסתיימים ב--es ולא רק ב--s?',
        options: [
          'Because with He/She/It verbs ending in SH or CH take "-es" in Present Simple',
          'Because the animals speak French',
          'Because verbs always end in -es in the past',
          'Because the sentences are written in plural'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [2, 4],
        explanationHe: 'בהווה פשוט, פעלים המסתיים ב-sh (wash) או ch (catch) מקבלים es בגוף שלישי יחיד (He/She/It).',
        points: 25
      },
      {
        id: 'u6-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What is special about the cheetah according to line 6?',
        questionHe: 'מה מיוחד בצ׳יטה לפי שורה 6?',
        options: [
          'It runs faster than any other creature on land',
          'It can fly high like an eagle',
          'It can swim underwater for three hours',
          'It sleeps only during the winter'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [6],
        explanationHe: 'שורה 6 קובעת: "it runs faster than any other creature on land".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 7: Chef in the Kitchen & Tasty Foods
  // Theme: Food, Kitchen & "There is / There are"
  // ==========================================
  {
    id: 'passage-unit-7',
    unitId: 'unit-7',
    unitNumber: 7,
    titleEn: 'Little Chefs in the School Kitchen',
    titleHe: 'שפים צעירים במטבח בית הספר (יחידה 7)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'מאכלים, בישול, הבחנה בין There is ל-There are',
    estimatedReadTimeMin: 3.5,
    wordCount: 140,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Every Thursday afternoon, the school kitchen turns into a buzzing cooking studio.',
            audioText: 'Every Thursday afternoon, the school kitchen turns into a buzzing cooking studio.'
          },
          {
            lineNumber: 2,
            text: 'Today, the young chefs are preparing healthy Mediterranean dishes.',
            audioText: 'Today, the young chefs are preparing healthy Mediterranean dishes.'
          },
          {
            lineNumber: 3,
            text: 'There is fresh white cheese and olive oil on the main wooden table.',
            audioText: 'There is fresh white cheese and olive oil on the main wooden table.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'There are four red tomatoes, two crunchy cucumbers, and yellow peppers in the salad bowl.',
            audioText: 'There are four red tomatoes, two crunchy cucumbers, and yellow peppers in the salad bowl.'
          },
          {
            lineNumber: 5,
            text: 'Chef Omer says: "There is some warm garlic bread baking inside the oven."',
            audioText: 'Chef Omer says: There is some warm garlic bread baking inside the oven.'
          },
          {
            lineNumber: 6,
            text: 'There are ten clean plates waiting on the counter for the students.',
            audioText: 'There are ten clean plates waiting on the counter for the students.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'When the food is ready, the children taste their delicious Israeli chopped salad.',
            audioText: 'When the food is ready, the children taste their delicious Israeli chopped salad.'
          },
          {
            lineNumber: 8,
            text: 'They learn that cooking healthy meals with friends is fun and rewarding.',
            audioText: 'They learn that cooking healthy meals with friends is fun and rewarding.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'There is', translationHe: 'יש (ליחיד או לשם עצם בלתי ספיר)', partOfSpeech: 'phrase', exampleHe: 'יש גבינה טרייה על השולחן.' },
      { word: 'There are', translationHe: 'ישנם / ישנן (לשם עצם ברבים)', partOfSpeech: 'phrase', exampleHe: 'ישנן ארבע עגבניות אדומות.' },
      { word: 'Cheese', translationHe: 'גבינה (שם עצם בלתי ספיר)', partOfSpeech: 'noun', exampleHe: 'גבינה לבנה טרייה.' },
      { word: 'Tomatoes', translationHe: 'עגבניות (רבים)', partOfSpeech: 'noun (plural)', exampleHe: 'ארבע עגבניות אדומות.' },
      { word: 'Garlic bread', translationHe: 'לחם שום', partOfSpeech: 'noun phrase', exampleHe: 'לחם שום חם בתנור.' },
      { word: 'Delicious', translationHe: 'טעים מאוד', partOfSpeech: 'adjective', exampleHe: 'סלט ישראלי קצוץ וטעים.' }
    ],
    questions: [
      {
        id: 'u7-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'Why does line 3 use "There is" for fresh white cheese?',
        questionHe: 'מדוע שורה 3 משתמשת בביטוי "There is" עבור גבינה (cheese)?',
        options: [
          'Because cheese is an uncountable singular noun (שם עצם בלתי ספיר מקבל There is)',
          'Because there are twenty cheeses',
          'Because cheese is an action verb',
          'Because cheese only exists on Thursdays'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [3],
        explanationHe: 'שמות עצם בלתי ספירים כמו cheese, milk, water מקבלים "There is" באנגלית.',
        points: 25
      },
      {
        id: 'u7-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What is baking inside the oven in line 5?',
        questionHe: 'מה נאפה בתוך התנור לפי שורה 5?',
        options: [
          'Warm garlic bread',
          'A chocolate birthday cake',
          'Fried potato chips',
          'Cold ice cream'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [5],
        explanationHe: 'שורה 5 מציינת: "There is some warm garlic bread baking inside the oven".',
        points: 25
      },
      {
        id: 'u7-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'How many clean plates are waiting on the counter in line 6?',
        questionHe: 'כמה צלחות נקיות ממתינות על השיש בשורה 6?',
        options: [
          'Ten clean plates (There are ten clean plates)',
          'Only one plate',
          'A hundred plates',
          'Five broken plates'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [6],
        explanationHe: 'שורה 6 קובעת: "There are ten clean plates waiting on the counter for the students".',
        points: 25
      },
      {
        id: 'u7-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What do the students learn from cooking together?',
        questionHe: 'מה התלמידים לומדים מבישול משותף?',
        options: [
          'That cooking healthy meals with friends is fun and rewarding',
          'That eating only candy is best for health',
          'That kitchens are too dangerous for children',
          'That ovens should not be used in school'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [8],
        explanationHe: 'שורה 8 מסכמת: "They learn that cooking healthy meals with friends is fun and rewarding".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 8: City Map & Community Helpers
  // Theme: Town Map, Places & Prepositions of Place
  // ==========================================
  {
    id: 'passage-unit-8',
    unitId: 'unit-8',
    unitNumber: 8,
    titleEn: 'A Walk Through Our Helpful Town',
    titleHe: 'סיור בעיירה המועילה שלנו (יחידה 8)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'מקומות בעיר, מילות יחס למיקום ובעלי מקצוע',
    estimatedReadTimeMin: 3.5,
    wordCount: 145,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Welcome to our quiet green town where many dedicated people work.',
            audioText: 'Welcome to our quiet green town where many dedicated people work.'
          },
          {
            lineNumber: 2,
            text: 'On Main Street, the new city bank is between the public park and the library.',
            audioText: 'On Main Street, the new city bank is between the public park and the library.'
          },
          {
            lineNumber: 3,
            text: 'Inside the bank, polite bank clerks help people save their money.',
            audioText: 'Inside the bank, polite bank clerks help people save their money.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'Across from the park, a modern hospital provides medicine and care.',
            audioText: 'Across from the park, a modern hospital provides medicine and care.'
          },
          {
            lineNumber: 5,
            text: 'Dedicated doctors and kind nurses work day and night to keep citizens healthy.',
            audioText: 'Dedicated doctors and kind nurses work day and night to keep citizens healthy.'
          },
          {
            lineNumber: 6,
            text: 'Near the traffic light, a police officer helps young school children cross safely.',
            audioText: 'Near the traffic light, a police officer helps young school children cross safely.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'Behind the peaceful library, there is a community garden with colorful roses.',
            audioText: 'Behind the peaceful library, there is a community garden with colorful roses.'
          },
          {
            lineNumber: 8,
            text: 'Living in a town where everyone helps each other makes our community strong.',
            audioText: 'Living in a town where everyone helps each other makes our community strong.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Bank', translationHe: 'בנק', partOfSpeech: 'noun', exampleHe: 'הבנק החדש בעיר.' },
      { word: 'Between', translationHe: 'בין (שני מקומות)', partOfSpeech: 'preposition', exampleHe: 'הבנק נמצא בין הפארק לספרייה.' },
      { word: 'Library', translationHe: 'ספרייה ציבורית', partOfSpeech: 'noun', exampleHe: 'שואלים ספרים בספרייה.' },
      { word: 'Hospital', translationHe: 'בית חולים', partOfSpeech: 'noun', exampleHe: 'בית חולים מודרני מול הפארק.' },
      { word: 'Behind', translationHe: 'מאחורי', partOfSpeech: 'preposition', exampleHe: 'מאחורי הספרייה יש גינה.' },
      { word: 'Police officer', translationHe: 'שוטר / שוטרת', partOfSpeech: 'noun phrase', exampleHe: 'השוטר עוזר לילדים לחצות.' }
    ],
    questions: [
      {
        id: 'u8-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'Where is the new city bank located? (Line 2)',
        questionHe: 'היכן ממוקם הבנק החדש בעיר לפי שורה 2?',
        options: [
          'Between the public park and the library',
          'On top of the highest mountain',
          'Inside the hospital elevator',
          'At the bottom of the sea'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [2],
        explanationHe: 'שורה 2 מציינת במפורש: "the new city bank is between the public park and the library".',
        points: 25
      },
      {
        id: 'u8-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What does the police officer do near the traffic light in line 6?',
        questionHe: 'מה עושה השוטר ליד הרמזור לפי שורה 6?',
        options: [
          'Helps young school children cross safely',
          'Eats a sandwich inside a police car',
          'Paints the road with white paint',
          'Sings songs with a guitar'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [6],
        explanationHe: 'שורה 6 מציינת: "a police officer helps young school children cross safely".',
        points: 25
      },
      {
        id: 'u8-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'What is located behind the peaceful library according to line 7?',
        questionHe: 'מה נמצא מאחורי (behind) הספרייה השקטה לפי שורה 7?',
        options: [
          'A community garden with colorful roses',
          'A noisy airport runway',
          'A train station with ten trains',
          'A dark parking garage'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [7],
        explanationHe: 'שורה 7 קובעת: "Behind the peaceful library, there is a community garden with colorful roses".',
        points: 25
      },
      {
        id: 'u8-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What makes the community strong according to line 8?',
        questionHe: 'מה מחזק את הקהילה לפי שורה 8?',
        options: [
          'Living in a town where everyone helps each other',
          'Having more skyscrapers than other cities',
          'Having no cars on the streets',
          'Never opening the library on weekends'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [8],
        explanationHe: 'שורה 8 מסכמת: "Living in a town where everyone helps each other makes our community strong".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 9: Past Adventures & The Time Machine
  // Theme: Past Simple (-ed endings: /t/, /d/, /ɪd/)
  // ==========================================
  {
    id: 'passage-unit-9',
    unitId: 'unit-9',
    unitNumber: 9,
    titleEn: 'Yesterday’s Visit to the Ancient Castle',
    titleHe: 'הביקור של אתמול בטירה העתיקה (יחידה 9)',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'זמן עבר פשוט (Past Simple) וצלילי סיומת -ed',
    estimatedReadTimeMin: 3.5,
    wordCount: 150,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Yesterday, our fifth-grade class visited the famous crusader fortress in Acre.',
            audioText: 'Yesterday, our fifth-grade class visited the famous crusader fortress in Acre.'
          },
          {
            lineNumber: 2,
            text: 'The weather was pleasant, and the sea breeze cooled the ancient stone courtyards.',
            audioText: 'The weather was pleasant, and the sea breeze cooled the ancient stone courtyards.'
          },
          {
            lineNumber: 3,
            text: 'A friendly guide welcomed the students and walked with us through narrow secret tunnels.',
            audioText: 'A friendly guide welcomed the students and walked with us through narrow secret tunnels.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'We looked at rusty knight armor and touched the heavy iron gates.',
            audioText: 'We looked at rusty knight armor and touched the heavy iron gates.'
          },
          {
            lineNumber: 5,
            text: 'Maya listened carefully when the guide explained how people cooked bread centuries ago.',
            audioText: 'Maya listened carefully when the guide explained how people cooked bread centuries ago.'
          },
          {
            lineNumber: 6,
            text: 'At noon, we rested in the shadow of a high wall and painted historic shields.',
            audioText: 'At noon, we rested in the shadow of a high wall and painted historic shields.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'Before returning to the bus, everyone thanked the castle staff for an unforgettable day.',
            audioText: 'Before returning to the bus, everyone thanked the castle staff for an unforgettable day.'
          },
          {
            lineNumber: 8,
            text: 'We learned that exploring history feels like traveling through time.',
            audioText: 'We learned that exploring history feels like traveling through time.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Yesterday', translationHe: 'אתמול (מילת זמן אופיינית לעבר)', partOfSpeech: 'adverb', exampleHe: 'אתמול הכיתה ביקרה בטירה.' },
      { word: 'Visited', translationHe: 'ביקרו (סיומת -ed עם צליל /ɪd/)', partOfSpeech: 'verb (past)', exampleHe: 'התלמידים ביקרו במבצר.' },
      { word: 'Walked', translationHe: 'הלכו (סיומת -ed עם צליל /t/)', partOfSpeech: 'verb (past)', exampleHe: 'המדריך הלך איתנו במנהרות.' },
      { word: 'Listened', translationHe: 'הקשיבה (סיומת -ed עם צליל /d/)', partOfSpeech: 'verb (past)', exampleHe: 'מיה הקשיבה להסבר בקשב.' },
      { word: 'Ancient', translationHe: 'עתיק / קדום', partOfSpeech: 'adjective', exampleHe: 'חצרות אבן עתיקות בעכו.' },
      { word: 'Tunnels', translationHe: 'מנהרות סודיות', partOfSpeech: 'noun (plural)', exampleHe: 'מנהרות תת-קרקעיות צרות.' }
    ],
    questions: [
      {
        id: 'u9-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'Where did the fifth-grade class visit yesterday? (Line 1)',
        questionHe: 'היכן ביקרה כיתה ה׳ אתמול לפי שורה 1?',
        options: [
          'The famous crusader fortress in Acre',
          'A shopping mall in Eilat',
          'A modern cinema in Netanya',
          'An amusement park in London'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [1],
        explanationHe: 'שורה 1 מציינת: "our fifth-grade class visited the famous crusader fortress in Acre".',
        points: 25
      },
      {
        id: 'u9-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What did the students touch in line 4?',
        questionHe: 'במה נגעו התלמידים לפי שורה 4?',
        options: [
          'The heavy iron gates',
          'A hot electric stove',
          'A sleeping lion',
          'A flying airplane wing'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [4],
        explanationHe: 'שורה 4 מציינת: "looked at rusty knight armor and touched the heavy iron gates".',
        points: 25
      },
      {
        id: 'u9-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'How does the suffix "-ed" sound in the past verb "visited" (Line 1)?',
        questionHe: 'כיצד נשמעת סיומת ה--ed בפועל העבר "visited" (שורה 1)?',
        options: [
          'It adds an extra syllable /ɪd/ after T or D (צליל "איד" כיוון שהשורש מסתיים ב-T)',
          'It sounds like /s/',
          'It is completely silent',
          'It changes into "ing"'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [1],
        explanationHe: 'פעלים המסתיים ב-t או ב-d (כמו visit, paint, rest) מקבלים הברה נוספת /ɪd/ בסיומת העבר.',
        points: 25
      },
      {
        id: 'u9-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What main feeling does line 8 describe about exploring history?',
        questionHe: 'איזו תחושה מרכזית מתארת שורה 8 לגבי חקר ההיסטוריה?',
        options: [
          'It feels like traveling through time',
          'It is boring and tiring',
          'It is only for old professors',
          'It should never be taught in school'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [8],
        explanationHe: 'שורה 8 מסכמת: "We learned that exploring history feels like traveling through time".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 10: The Future & Tech Wonderland
  // Theme: Future Tense (will / be going to) & Technology
  // ==========================================
  {
    id: 'passage-unit-10',
    unitId: 'unit-10',
    unitNumber: 10,
    titleEn: 'Robo-Buddy: The School Helper of the Future',
    titleHe: 'רובו-באדי: עוזר בית הספר של העתיד (יחידה 10)',
    band: 'Band II',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'טכנולוגיה, עתיד (will / going to) ורובוטים',
    estimatedReadTimeMin: 3.5,
    wordCount: 155,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'In the near future, Israeli schools will welcome an amazing new helper named Robo-Buddy.',
            audioText: 'In the near future, Israeli schools will welcome an amazing new helper named Robo-Buddy.'
          },
          {
            lineNumber: 2,
            text: 'This compact white robot has got friendly digital eyes and speaks three languages fluently.',
            audioText: 'This compact white robot has got friendly digital eyes and speaks three languages fluently.'
          },
          {
            lineNumber: 3,
            text: 'Engineers predict that Robo-Buddy will help students practice English vocabulary every day.',
            audioText: 'Engineers predict that Robo-Buddy will help students practice English vocabulary every day.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'Next year, our school is going to install two charging stations in the science laboratory.',
            audioText: 'Next year, our school is going to install two charging stations in the science laboratory.'
          },
          {
            lineNumber: 5,
            text: 'During recess, the robot will play interactive quiz games and pronounce words clearly.',
            audioText: 'During recess, the robot will play interactive quiz games and pronounce words clearly.'
          },
          {
            lineNumber: 6,
            text: 'If a student makes a mistake, Robo-Buddy will gently explain the rule without judgment.',
            audioText: 'If a student makes a mistake, Robo-Buddy will gently explain the rule without judgment.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'Students are going to program new games using simple computer coding blocks.',
            audioText: 'Students are going to program new games using simple computer coding blocks.'
          },
          {
            lineNumber: 8,
            text: 'Technology will not replace kind human teachers, but it will make learning much more exciting.',
            audioText: 'Technology will not replace kind human teachers, but it will make learning much more exciting.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Future', translationHe: 'עתיד', partOfSpeech: 'noun', exampleHe: 'בעתיד הקרוב בבתי הספר.' },
      { word: 'Will help', translationHe: 'יעזור (צורת עתיד עם will)', partOfSpeech: 'verb phrase', exampleHe: 'הרובוט יעזור לתלמידים.' },
      { word: 'Is going to', translationHe: 'עומד ל- / מתכנן (עתיד מתוכנן)', partOfSpeech: 'phrase', exampleHe: 'בית הספר עומד להתקין עמדות טעינה.' },
      { word: 'Robot', translationHe: 'רובוט', partOfSpeech: 'noun', exampleHe: 'רובוט לבן וחכם.' },
      { word: 'Technology', translationHe: 'טכנולוגיה', partOfSpeech: 'noun', exampleHe: 'טכנולוגיה חכמה בכיתה.' },
      { word: 'Languages', translationHe: 'שפות', partOfSpeech: 'noun (plural)', exampleHe: 'דובר שלוש שפות באופן שוטף.' }
    ],
    questions: [
      {
        id: 'u10-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'How many languages does Robo-Buddy speak fluently? (Line 2)',
        questionHe: 'כמה שפות דובר רובו-באדי באופן שוטף? (שורה 2)',
        options: [
          'Three languages fluently',
          'Only one secret code',
          'Ten alien languages',
          'Zero languages'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [2],
        explanationHe: 'שורה 2 קובעת במפורש: "speaks three languages fluently".',
        points: 25
      },
      {
        id: 'u10-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What is the school going to install next year? (Line 4)',
        questionHe: 'מה בית הספר עומד להתקין בשנה הבאה לפי שורה 4?',
        options: [
          'Two charging stations in the science laboratory',
          'A giant swimming pool on the roof',
          'A rollercoaster around the playground',
          'A television tower in the cafeteria'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [4],
        explanationHe: 'שורה 4 מציינת: "our school is going to install two charging stations in the science laboratory".',
        points: 25
      },
      {
        id: 'u10-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'What does the word "will" express in "the robot will play interactive quiz games"?',
        questionHe: 'מה מבטאת המילה "will" במשפט "the robot will play"?',
        options: [
          'A future event that is going to happen (פעולה שתתרחש בזמן עתיד)',
          'Something that happened yesterday (פעולה שקרתה אתמול בעבר)',
          'A command to stop right now (פקודת עצירה)',
          'A negative statement (שלילה מוחלטת)'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [1, 5],
        explanationHe: 'המילה "will" משמשת באנגלית לבניית זמן עתיד (Future Simple).',
        points: 25
      },
      {
        id: 'u10-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'According to line 8, will technology replace human teachers?',
        questionHe: 'לפי שורה 8, האם הטכנולוגיה תחליף את המורים האנושיים?',
        options: [
          'No, it will not replace teachers, but make learning more exciting',
          'Yes, teachers will all stay home',
          'Yes, computers will grade everything alone',
          'No, schools will close forever'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [8],
        explanationHe: 'שורה 8 מסבירה: "Technology will not replace kind human teachers, but it will make learning much more exciting".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 11: Nature & The Animal Olympics
  // Theme: Comparatives and Superlatives (-er / -est)
  // ==========================================
  {
    id: 'passage-unit-11',
    unitId: 'unit-11',
    unitNumber: 11,
    titleEn: 'The Animal Olympics: Nature’s Champions',
    titleHe: 'אולימפיאדת החיות: אלופי הטבע (יחידה 11)',
    band: 'Band II',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'השוואות בטבע, תארי השוואה והפלגה (-er / -est)',
    estimatedReadTimeMin: 3.5,
    wordCount: 155,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'The animal kingdom is full of incredible champions with unique abilities.',
            audioText: 'The animal kingdom is full of incredible champions with unique abilities.'
          },
          {
            lineNumber: 2,
            text: 'On land, the cheetah is faster than any other mammal, running over 100 kilometers per hour.',
            audioText: 'On land, the cheetah is faster than any other mammal, running over 100 kilometers per hour.'
          },
          {
            lineNumber: 3,
            text: 'In contrast, the desert turtle moves slower than a snail, but its shell is much harder.',
            audioText: 'In contrast, the desert turtle moves slower than a snail, but its shell is much harder.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'Deep in the blue ocean, the blue whale is the biggest animal in the entire world.',
            audioText: 'Deep in the blue ocean, the blue whale is the biggest animal in the entire world.'
          },
          {
            lineNumber: 5,
            text: 'It is even heavier than thirty giant elephants combined together.',
            audioText: 'It is even heavier than thirty giant elephants combined together.'
          },
          {
            lineNumber: 6,
            text: 'High in the sky, the peregrine falcon is the fastest flying hunter on the planet.',
            audioText: 'High in the sky, the peregrine falcon is the fastest flying hunter on the planet.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'Scientists compare these amazing creatures to design safer cars and planes.',
            audioText: 'Scientists compare these amazing creatures to design safer cars and planes.'
          },
          {
            lineNumber: 8,
            text: 'Every animal plays a vital role in keeping our planet balanced and healthy.',
            audioText: 'Every animal plays a vital role in keeping our planet balanced and healthy.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Faster', translationHe: 'מהיר יותר (סיומת er להשוואה)', partOfSpeech: 'adjective (comparative)', exampleHe: 'הצ׳יטה מהירה יותר מכל יונק.' },
      { word: 'Slower', translationHe: 'איטי יותר', partOfSpeech: 'adjective (comparative)', exampleHe: 'צב המדבר איטי יותר.' },
      { word: 'Biggest', translationHe: 'הכי גדול / הגדול ביותר (סיומת est)', partOfSpeech: 'adjective (superlative)', exampleHe: 'הלווייתן הכחול הוא החיה הכי גדולה.' },
      { word: 'Fastest', translationHe: 'הכי מהיר בעולם', partOfSpeech: 'adjective (superlative)', exampleHe: 'הבז הנודד הוא המעופף המהיר ביותר.' },
      { word: 'Heavier', translationHe: 'כבד יותר', partOfSpeech: 'adjective (comparative)', exampleHe: 'כבד יותר משלושים פילים.' },
      { word: 'Whale', translationHe: 'לווייתן', partOfSpeech: 'noun', exampleHe: 'לווייתן כחול באוקיינוס.' }
    ],
    questions: [
      {
        id: 'u11-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'Which animal is described as faster than any other mammal? (Line 2)',
        questionHe: 'איזו חיה מתוארת כמהירה יותר מכל יונק אחר? (שורה 2)',
        options: [
          'The cheetah running over 100 km/h',
          'The desert turtle',
          'The sea turtle',
          'The gray mouse'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [2],
        explanationHe: 'שורה 2 מציינת: "the cheetah is faster than any other mammal".',
        points: 25
      },
      {
        id: 'u11-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'How heavy is the blue whale according to line 5?',
        questionHe: 'עד כמה כבד הלווייתן הכחול לפי שורה 5?',
        options: [
          'Heavier than thirty giant elephants combined together',
          'As light as a feather',
          'Heavier than three small fish only',
          'About the weight of a bicycle'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [5],
        explanationHe: 'שורה 5 מציינת: "even heavier than thirty giant elephants combined together".',
        points: 25
      },
      {
        id: 'u11-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'What is the grammatical difference between "faster" and "the fastest"?',
        questionHe: 'מה ההבדל הדקדוקי בין "faster" (עם er) לבין "the fastest" (עם est)?',
        options: [
          'Faster compares two things, while the fastest is the absolute champion of all (השוואתי מול הפלגתי)',
          'Faster is past tense, the fastest is future',
          'There is no difference, both mean slow',
          'Faster is only for plants, the fastest is for humans'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [2, 6],
        explanationHe: 'סיומת -er משווה בין שניים (Comparative), וסיומת -est מציינת את השיאן המוחלט מכולם (Superlative).',
        points: 25
      },
      {
        id: 'u11-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'Why do scientists study these animal champions according to line 7?',
        questionHe: 'מדוע מדענים חוקרים את אלופי החיות לפי שורה 7?',
        options: [
          'To design safer cars and planes using nature’s models',
          'To make them compete in football matches',
          'To capture all of them in cages',
          'To paint them with bright colors'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [7],
        explanationHe: 'שורה 7 קובעת: "Scientists compare these amazing creatures to design safer cars and planes".',
        points: 25
      }
    ]
  },

  // ==========================================
  // UNIT 12: Stage Stars & Modal Masters
  // Theme: Modals (can, must, should) & School Stage Show
  // ==========================================
  {
    id: 'passage-unit-12',
    unitId: 'unit-12',
    unitNumber: 12,
    titleEn: 'Opening Night at the School Stage',
    titleHe: 'ערב הפתיחה על במת בית הספר (יחידה 12)',
    band: 'Band II',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'תיאטרון, פעלי מודאל (can, must, should) וכללי במה',
    estimatedReadTimeMin: 3.5,
    wordCount: 155,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Tonight is the grand opening night of the annual fifth-grade musical show.',
            audioText: 'Tonight is the grand opening night of the annual fifth-grade musical show.'
          },
          {
            lineNumber: 2,
            text: 'Backstage, the drama teacher reviews the important golden rules with all young actors.',
            audioText: 'Backstage, the drama teacher reviews the important golden rules with all young actors.'
          },
          {
            lineNumber: 3,
            text: 'Director Maya says: "All actors must arrive on time and check their costumes before the curtains rise."',
            audioText: 'Director Maya says: All actors must arrive on time and check their costumes before the curtains rise.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'Students should drink warm water with honey to keep their singing voices clear.',
            audioText: 'Students should drink warm water with honey to keep their singing voices clear.'
          },
          {
            lineNumber: 5,
            text: 'If you feel nervous, you can take three deep breaths and smile at your partner.',
            audioText: 'If you feel nervous, you can take three deep breaths and smile at your partner.'
          },
          {
            lineNumber: 6,
            text: 'In the auditorium, the audience must turn off mobile phones to show respect.',
            audioText: 'In the auditorium, the audience must turn off mobile phones to show respect.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'When the bright stage lights turn on, the children perform with passion and confidence.',
            audioText: 'When the bright stage lights turn on, the children perform with passion and confidence.'
          },
          {
            lineNumber: 8,
            text: 'At the end of the show, proud parents and teachers applaud with standing ovations.',
            audioText: 'At the end of the show, proud parents and teachers applaud with standing ovations.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Must', translationHe: 'חייב / חובה (חוק או הכרח)', partOfSpeech: 'modal verb', exampleHe: 'שחקנים חייבים להגיע בזמן.' },
      { word: 'Should', translationHe: 'כדאי / מומלץ (עצה טובה)', partOfSpeech: 'modal verb', exampleHe: 'כדאי לשתות מים פושרים עם דבש.' },
      { word: 'Can', translationHe: 'יכול / מסוגל (יכולת או אפשרות)', partOfSpeech: 'modal verb', exampleHe: 'אתה יכול לקחת נשימה עמוקה.' },
      { word: 'Actors', translationHe: 'שחקנים ושחקניות במה', partOfSpeech: 'noun (plural)', exampleHe: 'השחקנים הצעירים מאחורי הקלעים.' },
      { word: 'Costumes', translationHe: 'תלבושות במה', partOfSpeech: 'noun (plural)', exampleHe: 'בודקים את התלבושות.' },
      { word: 'Audience', translationHe: 'קהל הצופים', partOfSpeech: 'noun', exampleHe: 'הקהל באולם מוחא כפיים.' }
    ],
    questions: [
      {
        id: 'u12-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'What MUST all actors do according to Director Maya in line 3?',
        questionHe: 'מה כל השחקנים חייבים (MUST) לעשות לפי הבמאית מיה בשורה 3?',
        options: [
          'Arrive on time and check their costumes before curtains rise',
          'Order pizza for the audience',
          'Run outside into the street',
          'Sing without any music'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [3],
        explanationHe: 'שורה 3 מציינת במפורש: "All actors must arrive on time and check their costumes".',
        points: 25
      },
      {
        id: 'u12-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What should students drink to keep their singing voices clear? (Line 4)',
        questionHe: 'מה מומלץ (should) לתלמידים לשתות לקול צלול לפי שורה 4?',
        options: [
          'Warm water with honey',
          'Very cold icy soda',
          'Hot salty vegetable soup',
          'Sweet chocolate milkshake'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [4],
        explanationHe: 'שורה 4 ממליצה: "Students should drink warm water with honey to keep their singing voices clear".',
        points: 25
      },
      {
        id: 'u12-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'What is the modal difference between "must" (Line 3) and "should" (Line 4)?',
        questionHe: 'מה ההבדל בין פועל המודאל "must" (חובה) לבין "should" (המלצה)?',
        options: [
          'Must means mandatory obligation, while should gives helpful advice (חובה מחייבת לעומת עצה טובה)',
          'Must is only for food, should is only for clothes',
          'Must is an ancient past word, should is future',
          'Both words mean forbidden'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [3, 4],
        explanationHe: 'פועל המודאל must מציין חובה מוחלטת (obligation), ואילו should מציין עצה או המלצה טובה (recommendation).',
        points: 25
      },
      {
        id: 'u12-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What must the audience in the auditorium do in line 6?',
        questionHe: 'מה קהל הצופים באולם חייב לעשות לפי שורה 6?',
        options: [
          'Turn off mobile phones to show respect',
          'Sing along with every single word',
          'Eat popcorn during quiet scenes',
          'Leave before the second act'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [6],
        explanationHe: 'שורה 6 קובעת: "the audience must turn off mobile phones to show respect".',
        points: 25
      }
    ]
  },

  // ==========================================
  // BONUS READINGS: General Advanced Band I & II
  // ==========================================
  {
    id: 'passage-bonus-turtles',
    titleEn: 'Saving Sea Turtles in Mikhmoret',
    titleHe: 'בונוס: מצילים את צבי הים במכמורת',
    band: 'Band I',
    gradeLevel: 'כיתות ד׳-ה׳ (Grade 4-5)',
    topicHe: 'טבע, בעלי חיים ושמירה על הסביבה',
    estimatedReadTimeMin: 4,
    wordCount: 165,
    paragraphs: [
      {
        paragraphNumber: 1,
        lines: [
          {
            lineNumber: 1,
            text: 'Every year, many green sea turtles swim along the Mediterranean coast of Israel.',
            audioText: 'Every year, many green sea turtles swim along the Mediterranean coast of Israel.'
          },
          {
            lineNumber: 2,
            text: 'Sometimes, strong sea storms and plastic waste hurt these gentle marine animals.',
            audioText: 'Sometimes, strong sea storms and plastic waste hurt these gentle marine animals.'
          },
          {
            lineNumber: 3,
            text: 'When a turtle is injured, caring people call the National Sea Turtle Rescue Center in Mikhmoret.',
            audioText: 'When a turtle is injured, caring people call the National Sea Turtle Rescue Center in Mikhmoret.'
          }
        ]
      },
      {
        paragraphNumber: 2,
        lines: [
          {
            lineNumber: 4,
            text: 'At the rescue center, dedicated veterinarians clean the turtles and give them medicine.',
            audioText: 'At the rescue center, dedicated veterinarians clean the turtles and give them medicine.'
          },
          {
            lineNumber: 5,
            text: 'Volunteers, including Israeli school students, prepare fresh food like green lettuce and fish.',
            audioText: 'Volunteers, including Israeli school students, prepare fresh food like green lettuce and fish.'
          },
          {
            lineNumber: 6,
            text: 'The turtles swim in clean rehabilitation pools until their shells become strong and healthy again.',
            audioText: 'The turtles swim in clean rehabilitation pools until their shells become strong and healthy again.'
          }
        ]
      },
      {
        paragraphNumber: 3,
        lines: [
          {
            lineNumber: 7,
            text: 'The happiest day comes in the summer when fully healed turtles return home.',
            audioText: 'The happiest day comes in the summer when fully healed turtles return home.'
          },
          {
            lineNumber: 8,
            text: 'Children gather on the sandy beach to cheer as the turtles crawl into the blue waves.',
            audioText: 'Children gather on the sandy beach to cheer as the turtles crawl into the blue waves.'
          },
          {
            lineNumber: 9,
            text: 'The center teaches everyone that keeping beaches clean saves wild animal lives.',
            audioText: 'The center teaches everyone that keeping beaches clean saves wild animal lives.'
          }
        ]
      }
    ],
    vocabularyGlossary: [
      { word: 'Turtles', translationHe: 'צבי ים', partOfSpeech: 'noun (plural)', exampleHe: 'צבי ים שוחים בים התיכון.' },
      { word: 'Coast', translationHe: 'חוף / רצועת חוף', partOfSpeech: 'noun', exampleHe: 'רצועת החוף של ישראל.' },
      { word: 'Injured', translationHe: 'פצוע / נפגע', partOfSpeech: 'adjective', exampleHe: 'כאשר הצב פצוע, מטפלים בו.' },
      { word: 'Rescue Center', translationHe: 'מרכז הצלה', partOfSpeech: 'noun phrase', exampleHe: 'מרכז הצלה במכמורת.' },
      { word: 'Veterinarians', translationHe: 'וטרינרים / רופאי חיות', partOfSpeech: 'noun', exampleHe: 'הווטרינרים נותנים תרופות.' },
      { word: 'Healthy', translationHe: 'בריא', partOfSpeech: 'adjective', exampleHe: 'השריון נעשה בריא וחזק שוב.' },
      { word: 'Crawl', translationHe: 'לזחול', partOfSpeech: 'verb', exampleHe: 'הצבים זוחלים אל הגלים.' }
    ],
    questions: [
      {
        id: 'p1-q1',
        questionNumber: 1,
        type: 'multiple_choice',
        questionEn: 'Where do people take injured sea turtles in Israel?',
        questionHe: 'לאן לוקחים צבי ים פצועים בישראל?',
        options: [
          'To the National Sea Turtle Rescue Center in Mikhmoret',
          'To a regular pet store in Tel Aviv',
          'To a deep pool in Jerusalem',
          'To a school garden in Haifa'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [3],
        explanationHe: 'בשורה 3 מצוין במפורש: "people call the National Sea Turtle Rescue Center in Mikhmoret".',
        points: 25
      },
      {
        id: 'p1-q2',
        questionNumber: 2,
        type: 'true_false_evidence',
        questionEn: 'What do student volunteers do at the center? (According to lines 4-6)',
        questionHe: 'מה עושים תלמידים מתנדבים במרכז? (לפי שורות 4-6)',
        options: [
          'They prepare fresh food like lettuce and fish for the turtles',
          'They sell plastic bags on the beach',
          'They drive emergency trucks to the sea',
          'They build new houses for veterinarians'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [5],
        explanationHe: 'שורה 5 מציינת שתלמידים מתנדבים מכינים אוכל טרי כמו חסה ודגים עבור הצבים.',
        points: 25
      },
      {
        id: 'p1-q3',
        questionNumber: 3,
        type: 'vocabulary_context',
        questionEn: 'The word "healed" in line 7 is closest in meaning to:',
        questionHe: 'המילה "healed" בשורה 7 משמעה הקרוב ביותר הוא:',
        options: [
          'Healthy and well again (הבריאו)',
          'Very hungry (רעבים מאוד)',
          'Scared of waves (פוחדים מהגלים)',
          'Lost in the sand (אבודים בחול)'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [6, 7],
        explanationHe: 'ההקשר מראה שבקיץ הצבים שהבריאו ("fully healed") חוזרים לים הפתוח.',
        points: 25
      },
      {
        id: 'p1-q4',
        questionNumber: 4,
        type: 'multiple_choice',
        questionEn: 'What is the main message of the rescue center?',
        questionHe: 'מהו המסר המרכזי של מרכז ההצלה?',
        options: [
          'Keeping beaches clean from plastic saves wild animal lives',
          'Swimming in winter is dangerous for children',
          'Turtles should live in home aquariums',
          'School students should not visit beaches'
        ],
        correctOptionIndex: 0,
        evidenceLineNumbers: [2, 9],
        explanationHe: 'שורה 9 מסכמת: "The center teaches everyone that keeping beaches clean saves wild animal lives".',
        points: 25
      }
    ]
  }
];
