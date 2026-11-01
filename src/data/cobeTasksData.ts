import { CobeOralTask } from '../types/readingAndOral';

export const cobeTasksData: CobeOralTask[] = [
  // ==========================================
  // UNIT 1: Sound & Sentence Detective
  // Focus: Friends, Park, Family & "To Be"
  // ==========================================
  {
    id: 'oral-unit-1',
    unitId: 'unit-1',
    unitNumber: 1,
    taskNumber: 1,
    category: 'unit_speaking',
    titleEn: 'My Best Friend & Fun in the Park',
    titleHe: 'החבר/ה הכי טוב/ה שלי ובילוי בפארק (יחידה 1)',
    instructionHe: 'הקשיבו לשאלה הקצרה, בחרו משפט פתיחה, והקליטו 2-3 משפטים פשוטים על חבר/ה אהוב/ה!',
    examinerPromptEn: 'Hello! Tell me about your best friend. What is their name, and what do you like to do in the park together?',
    examinerPromptHe: 'שלום! ספר/י לי על החבר/ה הכי טוב/ה שלך. מה שמו/ה, ומה אתם אוהבים לעשות יחד בפארק?',
    audioPromptEn: 'Hello! Tell me about your best friend. What is their name, and what do you like to do in the park together?',
    guideQuestionsHe: [
      'מי החבר/ה שלך ומה שמו/ה? (My best friend is...)',
      'בני כמה אתם או איפה אתם נפגשים? (We are ten years old / We are in the park)',
      'מה אתם אוהבים לעשות יחד? (We like to play / run)'
    ],
    suggestedStartersEn: [
      'My best friend is...',
      'He / She is very friendly and happy.',
      'In the park, we like to play...',
      'We are good friends because...'
    ],
    modelAnswerEn: 'My best friend is Tom. He is ten years old. We are in the big green park together. We like to play soccer and run in the sun.',
    modelAnswerHe: 'החבר הכי טוב שלי הוא תום. הוא בן עשר. אנחנו בפארק הירוק הגדול יחד. אנחנו אוהבים לשחק כדורגל ולרוץ בשמש.',
    keyVocabulary: [
      { wordEn: 'Friend', meaningHe: 'חבר / חברה' },
      { wordEn: 'Park', meaningHe: 'פארק / גן ציבורי' },
      { wordEn: 'Happy', meaningHe: 'שמח / מאושר' },
      { wordEn: 'Play', meaningHe: 'לשחק' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 2: Party Time & Action Verbs
  // Focus: Present Progressive (-ing), music, party
  // ==========================================
  {
    id: 'oral-unit-2',
    unitId: 'unit-2',
    unitNumber: 2,
    taskNumber: 2,
    category: 'unit_speaking',
    titleEn: 'A Fun Birthday Party',
    titleHe: 'מסיבת יום הולדת שמחה (יחידה 2)',
    instructionHe: 'תארו מסיבה שמחה: מה הילדים עושים עכשיו (רוקדים, שרים, שוחים, אוכלים עוגה)?',
    examinerPromptEn: 'Hello! Imagine you are at a birthday party. What is happening? What are the children doing?',
    examinerPromptHe: 'שלום! דמיינו שאתם במסיבת יום הולדת. מה קורה במסיבה? מה הילדים עושים כרגע?',
    audioPromptEn: 'Hello! Imagine you are at a birthday party. What is happening? What are the children doing?',
    guideQuestionsHe: [
      'איזו מסיבה זו ואיפה היא נערכת? (We are at a party...)',
      'מה הילדים עושים כרגע? (The children are dancing / singing / playing)',
      'איזה כיבוד טעים יש במסיבה? (We are eating cake)'
    ],
    suggestedStartersEn: [
      'We are at a fun birthday party.',
      'The children are dancing to the music.',
      'My friend is singing a song.',
      'We are eating delicious chocolate cake.'
    ],
    modelAnswerEn: 'We are at a fun birthday party. Lively music is playing. Dan and Maya are dancing, and other kids are swimming in the pool. We are eating chocolate cake.',
    modelAnswerHe: 'אנחנו במסיבת יום הולדת מהנה. מוזיקה קצבית מתנגנת. דן ומיה רוקדים, וילדים אחרים שוחים בבריכה. אנחנו אוכלים עוגת שוקולד.',
    keyVocabulary: [
      { wordEn: 'Dancing', meaningHe: 'רוקדים (-ing)' },
      { wordEn: 'Singing', meaningHe: 'שרים' },
      { wordEn: 'Swimming', meaningHe: 'שוחים' },
      { wordEn: 'Party', meaningHe: 'מסיבה' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 3: Pets, Numbers & Plural Quest
  // Focus: Plural nouns (-s), numbers, pets
  // ==========================================
  {
    id: 'oral-unit-3',
    unitId: 'unit-3',
    unitNumber: 3,
    taskNumber: 3,
    category: 'unit_speaking',
    titleEn: 'My Favorite Pets & Animals',
    titleHe: 'חיות המחמד האהובות עליי ומספרים (יחידה 3)',
    instructionHe: 'ספרו על חיית המחמד שלכם או על חיות שאתם אוהבים. כמה חיות יש לכם או הייתם רוצים?',
    examinerPromptEn: 'Hello! Tell me about your favorite pet or animal. How many do you have, and what do they look like?',
    examinerPromptHe: 'שלום! ספרו לי על חיית המחמד האהובה עליכם. כמה חיות יש לכם ואיך הן נראות?',
    audioPromptEn: 'Hello! Tell me about your favorite pet or animal. How many do you have, and what do they look like?',
    guideQuestionsHe: [
      'מהי חיית המחמד האהובה עליכם? (My favorite pet is a dog / cat)',
      'כמה חיות יש לכם או הייתם רוצים? (I have got two dogs / three cats)',
      'איך הן נראות ומה הן אוהבות לעשות? (They have brown ears / They like to jump)'
    ],
    suggestedStartersEn: [
      'My favorite animals are...',
      'I have got two cute...',
      'They have got brown eyes and...',
      'I like them because they are very friendly.'
    ],
    modelAnswerEn: 'My favorite pets are dogs. I have got two friendly dogs. They have got soft brown ears and big eyes. We like to run and play in the garden.',
    modelAnswerHe: 'חיות המחמד האהובות עליי הן כלבים. יש לי שני כלבים ידידותיים. יש להם אוזניים חומות ורכות ועיניים גדולות. אנחנו אוהבים לרוץ ולשחק בגינה.',
    keyVocabulary: [
      { wordEn: 'Dogs', meaningHe: 'כלבים (ריבוי עם s)' },
      { wordEn: 'Cats', meaningHe: 'חתולים' },
      { wordEn: 'Two / Three', meaningHe: 'שתיים / שלוש' },
      { wordEn: 'Friendly', meaningHe: 'ידידותי' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 4: The Question Journey & TH Sounds
  // Focus: Family members, TH words & Questions
  // ==========================================
  {
    id: 'oral-unit-4',
    unitId: 'unit-4',
    unitNumber: 4,
    taskNumber: 4,
    category: 'unit_speaking',
    titleEn: 'My Family & A Special Trip',
    titleHe: 'המשפחה שלי וטיול משותף (יחידה 4)',
    instructionHe: 'ספרו בקצרה על המשפחה שלכם או על טיול משותף שעשיתם יחד בטבע.',
    examinerPromptEn: 'Hello! Tell me about your family or a trip you took together. Who was with you, and what did you see?',
    examinerPromptHe: 'שלום! ספרו לי על המשפחה שלכם או על טיול שעשיתם יחד. מי היה אתכם ומה ראיתם?',
    audioPromptEn: 'Hello! Tell me about your family or a trip you took together. Who was with you, and what did you see?',
    guideQuestionsHe: [
      'אילו בני משפחה יש לכם? (My mother, father, brother, sister)',
      'איזה טיול עשיתם יחד? (We walked in the forest / on the path)',
      'מה ראיתם? (We saw three big trees)'
    ],
    suggestedStartersEn: [
      'I love my family very much.',
      'I have got one brother and...',
      'My mother and father are...',
      'We like to walk together on the path.'
    ],
    modelAnswerEn: 'I love my family very much. I have got one brother and one sister. On Saturday, my mother and father took us to the forest. We walked on a green path and saw three beautiful birds.',
    modelAnswerHe: 'אני אוהב/ת מאוד את המשפחה שלי. יש לי אח אחד ואחות אחת. בשבת אמא ואבא לקחו אותנו ליער. צעדנו בשביל ירוק וראינו שלוש ציפורים יפות.',
    keyVocabulary: [
      { wordEn: 'Brother', meaningHe: 'אח (צליל TH)' },
      { wordEn: 'Mother & Father', meaningHe: 'אמא ואבא' },
      { wordEn: 'Three', meaningHe: 'שלוש (צליל TH)' },
      { wordEn: 'Path', meaningHe: 'שביל' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 5: Magic E & The Classroom Kingdom
  // Focus: Classroom objects & Have/Has got
  // ==========================================
  {
    id: 'oral-unit-5',
    unitId: 'unit-5',
    unitNumber: 5,
    taskNumber: 5,
    category: 'unit_speaking',
    titleEn: 'My School Bag & Classroom',
    titleHe: 'הילקוט שלי וחדר הכיתה (יחידה 5)',
    instructionHe: 'ספרו מה יש לכם בילקוט או על שולחן הכיתה באמצעות הביטוי I have got.',
    examinerPromptEn: 'Hello! Tell me about your classroom or what you have got in your school bag today.',
    examinerPromptHe: 'שלום! ספרו לי על הכיתה שלכם או מה יש לכם בילקוט בית הספר היום.',
    audioPromptEn: 'Hello! Tell me about your classroom or what you have got in your school bag today.',
    guideQuestionsHe: [
      'מה יש לכם בילקוט? (I have got a notebook, pencil, ruler)',
      'איך נראה שולחן הכיתה שלכם? (On my desk, there is...)',
      'איזה מקצוע אתם אוהבים? (I like English)'
    ],
    suggestedStartersEn: [
      'In my school bag, I have got...',
      'On my desk, I have got a sharp pencil and...',
      'My classroom is clean and bright.',
      'My favorite lesson is...'
    ],
    modelAnswerEn: 'In my school bag, I have got a blue notebook and three pencils. On my wooden desk, I have got a green ruler. My classroom is very bright and I like learning English.',
    modelAnswerHe: 'בילקוט שלי יש לי מחברת כחולה ושלושה עפרונות. על שולחן העץ שלי יש לי סרגל ירוק. הכיתה שלי מוארת מאוד ואני אוהב/ת ללמוד אנגלית.',
    keyVocabulary: [
      { wordEn: 'I have got', meaningHe: 'יש לי' },
      { wordEn: 'Pencil', meaningHe: 'עיפרון' },
      { wordEn: 'Notebook', meaningHe: 'מחברת' },
      { wordEn: 'Desk', meaningHe: 'שולחן כתיבה' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 6: Safari Animals & The Human Body
  // Focus: 3rd person singular -s/es & wild animals
  // ==========================================
  {
    id: 'oral-unit-6',
    unitId: 'unit-6',
    unitNumber: 6,
    taskNumber: 6,
    category: 'unit_speaking',
    titleEn: 'Wild Safari Animals',
    titleHe: 'חיות הבר בספארי (יחידה 6)',
    instructionHe: 'ספרו על חיית בר מעניינת (פיל, צ׳יטה, שימפנזה): מה מיוחד בגוף שלה ומה היא עושה?',
    examinerPromptEn: 'Hello! Tell me about a wild animal you like. What does it look like, and what does it do?',
    examinerPromptHe: 'שלום! ספרו לי על חיית בר שאתם אוהבים. איך היא נראית ומה היא עושה?',
    audioPromptEn: 'Hello! Tell me about a wild animal you like. What does it look like, and what does it do?',
    guideQuestionsHe: [
      'איזו חיית בר בחרתם? (My favorite wild animal is the elephant / cheetah)',
      'אילו איברי גוף מיוחדים יש לה? (It has got a long trunk / sharp teeth / big ears)',
      'מה היא עושה בטבע? (It drinks water / runs very fast)'
    ],
    suggestedStartersEn: [
      'My favorite wild animal is the...',
      'It has got big ears and a long...',
      'The elephant drinks water every day.',
      'The cheetah runs faster than any animal.'
    ],
    modelAnswerEn: 'My favorite wild animal is the elephant. It has got large ears and a long gray trunk. It drinks fresh water and washes its body. It is strong and very gentle.',
    modelAnswerHe: 'חיית הבר האהובה עליי היא הפיל. יש לו אוזניים גדולות וחדק אפור ארוך. הוא שותה מים טריים ורוחץ את גופו. הוא חזק ועדין מאוד.',
    keyVocabulary: [
      { wordEn: 'Elephant', meaningHe: 'פיל' },
      { wordEn: 'Trunk', meaningHe: 'חדק' },
      { wordEn: 'Drinks water', meaningHe: 'שותה מים (עם s)' },
      { wordEn: 'Runs fast', meaningHe: 'רץ מהר' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 7: Chef in the Kitchen & Tasty Foods
  // Focus: There is / There are & Food
  // ==========================================
  {
    id: 'oral-unit-7',
    unitId: 'unit-7',
    unitNumber: 7,
    taskNumber: 7,
    category: 'unit_speaking',
    titleEn: 'My Favorite Meal & Foods',
    titleHe: 'הארוחה והמאכלים האהובים עליי (יחידה 7)',
    instructionHe: 'תארו ארוחה טעימה שאתם אוהבים בעזרת There is ו-There are.',
    examinerPromptEn: 'Hello! Tell me about your favorite food or dinner. What is on the table?',
    examinerPromptHe: 'שלום! ספרו לי על האוכל או ארוחת הערב האהובה עליכם. מה יש על השולחן?',
    audioPromptEn: 'Hello! Tell me about your favorite food or dinner. What is on the table?',
    guideQuestionsHe: [
      'מה המאכל האהוב עליכם? (My favorite food is pizza / salad / soup)',
      'מה יש על השולחן ביחיד/בלתי-ספיר? (There is cheese / bread / milk)',
      'מה יש ברבים? (There are four tomatoes / cucumbers)'
    ],
    suggestedStartersEn: [
      'My favorite meal is dinner with my family.',
      'On the table, there is fresh white cheese and...',
      'There are red tomatoes and green cucumbers.',
      'Everything is warm and delicious.'
    ],
    modelAnswerEn: 'My favorite meal is dinner with my family. On the table, there is warm pizza and fresh cheese. There are four red tomatoes in the salad. The food is very delicious!',
    modelAnswerHe: 'הארוחה האהובה עליי היא ארוחת ערב עם המשפחה. על השולחן יש פיצה חמה וגבינה טרייה. ישנן ארבע עגבניות אדומות בסלט. האוכל טעים מאוד!',
    keyVocabulary: [
      { wordEn: 'There is', meaningHe: 'יש (ליחיד/בלתי ספיר)' },
      { wordEn: 'There are', meaningHe: 'ישנם (לרבים)' },
      { wordEn: 'Cheese', meaningHe: 'גבינה' },
      { wordEn: 'Delicious', meaningHe: 'טעים מאוד' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 8: City Map & Community Helpers
  // Focus: Places in town & Helpers
  // ==========================================
  {
    id: 'oral-unit-8',
    unitId: 'unit-8',
    unitNumber: 8,
    taskNumber: 8,
    category: 'unit_speaking',
    titleEn: 'My Town & Community Helpers',
    titleHe: 'העיר שלי והאנשים שעוזרים בה (יחידה 8)',
    instructionHe: 'ספרו על מקומות אהובים בעיר שלכם ועל בעלי מקצוע (רופאים, מורים, שוטרים) שעוזרים בה.',
    examinerPromptEn: 'Hello! Tell me about your town. What places do you visit, and who helps people in your town?',
    examinerPromptHe: 'שלום! ספרו לי על העיר שלכם. באילו מקומות אתם מבקרים ומי עוזר לאנשים בעיר?',
    audioPromptEn: 'Hello! Tell me about your town. What places do you visit, and who helps people in your town?',
    guideQuestionsHe: [
      'איפה אתם גרים? (I live in a beautiful town)',
      'אילו מקומות יש בה? (There is a big library, a bank, and a park)',
      'מי עוזר לאנשים? (The doctor helps sick people / The teacher helps students)'
    ],
    suggestedStartersEn: [
      'I live in a quiet, green town.',
      'Near my house, there is a big park and a library.',
      'The doctors and nurses help keep people healthy.',
      'I love my town very much.'
    ],
    modelAnswerEn: 'I live in a nice green town. On Main Street, the bank is between the park and the library. The police officer helps children cross the street safely. The doctors at the hospital are very kind.',
    modelAnswerHe: 'אני גר בעיירה ירוקה ויפה. ברחוב הראשי, הבנק נמצא בין הפארק לספרייה. השוטר עוזר לילדים לחצות את הכביש בבטחה. הרופאים בבית החולים אדיבים מאוד.',
    keyVocabulary: [
      { wordEn: 'Bank & Library', meaningHe: 'בנק וספרייה' },
      { wordEn: 'Between', meaningHe: 'בין שני מקומות' },
      { wordEn: 'Doctor & Nurse', meaningHe: 'רופא/ה ואח/ות' },
      { wordEn: 'Helps safely', meaningHe: 'עוזר בבטחה' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 9: Past Adventures & The Time Machine
  // Focus: Past Simple (-ed)
  // ==========================================
  {
    id: 'oral-unit-9',
    unitId: 'unit-9',
    unitNumber: 9,
    taskNumber: 9,
    category: 'unit_speaking',
    titleEn: 'What I Did Yesterday',
    titleHe: 'מה עשיתי אתמול (זמן עבר - יחידה 9)',
    instructionHe: 'ספרו 2-3 משפטים על פעולות שעשיתם אתמול (שיחקתם, ביקרתם, הקשבתם למוזיקה).',
    examinerPromptEn: 'Hello! Tell me about what you did yesterday after school. Where did you go and what did you play?',
    examinerPromptHe: 'שלום! ספרו לי מה עשיתם אתמול אחרי בית הספר. לאן הלכתם ומה שיחקתם?',
    audioPromptEn: 'Hello! Tell me about what you did yesterday after school. Where did you go and what did you play?',
    guideQuestionsHe: [
      'מה עשיתם אתמול? (Yesterday, I visited my friend / grandmother)',
      'במה שיחקתם? (I played soccer / computer games)',
      'איך הרגשתם? (We laughed and watched a movie)'
    ],
    suggestedStartersEn: [
      'Yesterday was a wonderful day.',
      'After school, I visited my...',
      'I played in the garden with...',
      'In the evening, I watched a movie.'
    ],
    modelAnswerEn: 'Yesterday was a wonderful day. After school, I visited my grandmother. We walked in the green garden and cooked soup. Later, I played games with my friend and listened to music.',
    modelAnswerHe: 'אתמול היה יום נפלא. אחרי בית הספר ביקרתי אצל סבתא שלי. טיילנו בגינה הירוקה ובישלנו מרק. מאוחר יותר שיחקתי משחקים עם חבר שלי והקשבתי למוזיקה.',
    keyVocabulary: [
      { wordEn: 'Yesterday', meaningHe: 'אתמול' },
      { wordEn: 'Visited', meaningHe: 'ביקרתי (עבר)' },
      { wordEn: 'Played', meaningHe: 'שיחקתי' },
      { wordEn: 'Walked', meaningHe: 'טיילתי / צעדתי' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 10: The Future & Tech Wonderland
  // Focus: Future (will / going to) & Technology
  // ==========================================
  {
    id: 'oral-unit-10',
    unitId: 'unit-10',
    unitNumber: 10,
    taskNumber: 10,
    category: 'unit_speaking',
    titleEn: 'My Robot of the Future',
    titleHe: 'רובוט העתיד שלי (יחידה 10)',
    instructionHe: 'דמיינו שיש לכם רובוט עוזר בעתיד. מה הרובוט יעשה למענכם?',
    examinerPromptEn: 'Hello! Imagine you have a smart robot in the future. What will it do to help you at school or at home?',
    examinerPromptHe: 'שלום! דמיינו שיש לכם רובוט חכם בעתיד. מה הוא יעשה כדי לעזור לכם בבית או בבית הספר?',
    audioPromptEn: 'Hello! Imagine you have a smart robot in the future. What will it do to help you at school or at home?',
    guideQuestionsHe: [
      'איך יקראו לרובוט שלכם? (My robot’s name will be...)',
      'במה הוא יעזור לכם? (It will help me clean my room / do homework)',
      'מה הוא יעשה בבית הספר? (It will speak English with me)'
    ],
    suggestedStartersEn: [
      'In the future, I will have a smart robot.',
      'Its name will be...',
      'It will help me with my homework.',
      'It is going to play English games with me.'
    ],
    modelAnswerEn: 'In the future, I will have a smart robot named Buddy. It will have digital eyes and speak English. It will help me clean my room and practice vocabulary every day. It will be so cool!',
    modelAnswerHe: 'בעתיד יהיה לי רובוט חכם בשם באדי. יהיו לו עיניים דיגיטליות והוא ידבר אנגלית. הוא יעזור לי לסדר את החדר ולתרגל אוצר מילים כל יום. זה יהיה מגניב מאוד!',
    keyVocabulary: [
      { wordEn: 'Will help', meaningHe: 'יעזור (עתיד)' },
      { wordEn: 'Robot', meaningHe: 'רובוט' },
      { wordEn: 'Future', meaningHe: 'עתיד' },
      { wordEn: 'Smart', meaningHe: 'חכם' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 11: Nature & The Animal Olympics
  // Focus: Comparatives (-er / -est)
  // ==========================================
  {
    id: 'oral-unit-11',
    unitId: 'unit-11',
    unitNumber: 11,
    taskNumber: 11,
    category: 'unit_speaking',
    titleEn: 'Comparing Amazing Animals',
    titleHe: 'השוואת חיות מדהימות בטבע (יחידה 11)',
    instructionHe: 'השוו בין שתי חיות בעזרת תארי השוואה (faster, bigger, slower).',
    examinerPromptEn: 'Hello! Compare two animals you know. Which animal is faster, bigger, or stronger?',
    examinerPromptHe: 'שלום! השוו בין שתי חיות שאתם מכירים. מי מהירה יותר, גדולה יותר או חזקה יותר?',
    audioPromptEn: 'Hello! Compare two animals you know. Which animal is faster, bigger, or stronger?',
    guideQuestionsHe: [
      'אילו חיות בחרתם? (The cheetah and the lion / The elephant and the mouse)',
      'מי מהירה יותר? (The cheetah is faster than the lion)',
      'מי הגדולה ביותר בעולם? (The blue whale is the biggest animal)'
    ],
    suggestedStartersEn: [
      'Nature is full of amazing champions.',
      'A cheetah is faster than a lion.',
      'An elephant is bigger than a horse.',
      'The blue whale is the biggest animal in the sea.'
    ],
    modelAnswerEn: 'Nature is full of amazing champions. A cheetah is faster than any other animal on land. An elephant is bigger and stronger than a horse. The blue whale is the biggest animal in the ocean!',
    modelAnswerHe: 'הטבע מלא באלופים מדהימים. צ׳יטה מהירה יותר מכל חיה אחרת ביבשה. פיל גדול וחזק יותר מסוס. הלווייתן הכחול הוא החיה הכי גדולה באוקיינוס!',
    keyVocabulary: [
      { wordEn: 'Faster than', meaningHe: 'מהיר/ה יותר מ-' },
      { wordEn: 'Bigger than', meaningHe: 'גדול/ה יותר מ-' },
      { wordEn: 'Biggest', meaningHe: 'הכי גדול/ה בעולם' },
      { wordEn: 'Stronger', meaningHe: 'חזק/ה יותר' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  },

  // ==========================================
  // UNIT 12: Stage Stars & Modal Masters
  // Focus: Modals (can, must, should)
  // ==========================================
  {
    id: 'oral-unit-12',
    unitId: 'unit-12',
    unitNumber: 12,
    taskNumber: 12,
    category: 'unit_speaking',
    titleEn: 'School Rules & My Talents',
    titleHe: 'כללי בית ספר והכישרונות שלי (יחידה 12)',
    instructionHe: 'ספרו מה תלמידים חייבים לעשות בבית הספר (must) ואיזה כישרון מיוחד אתם יכולים לעשות (can)!',
    examinerPromptEn: 'Hello! Tell me what students must do in school, and what special talent you can do!',
    examinerPromptHe: 'שלום! ספרו לי מה תלמידים חייבים לעשות בבית הספר ואיזה כישרון מיוחד אתם יכולים לעשות!',
    audioPromptEn: 'Hello! Tell me what students must do in school, and what special talent you can do!',
    guideQuestionsHe: [
      'מה חובה לעשות בכיתה? (In class, students must listen to the teacher)',
      'מה כדאי לעשות? (We should be polite and help friends)',
      'מה אתם יכולים לעשות? (I can sing / draw / speak English)'
    ],
    suggestedStartersEn: [
      'In school, students must arrive on time.',
      'We must listen to the teacher.',
      'We should always help our friends.',
      'I can speak English and I can sing!'
    ],
    modelAnswerEn: 'In school, all students must arrive on time and listen to the teacher. We should always help our classmates. As for my talent, I can speak English and I can play the piano on stage!',
    modelAnswerHe: 'בבית הספר, כל התלמידים חייבים להגיע בזמן ולהקשיב למורה. כדאי לנו תמיד לעזור לחברים לכיתה. ובאשר לכישרון שלי – אני יכול/ה לדבר אנגלית ולנגן בפסנתר על הבמה!',
    keyVocabulary: [
      { wordEn: 'Must', meaningHe: 'חייב / חובה' },
      { wordEn: 'Should', meaningHe: 'כדאי / מומלץ' },
      { wordEn: 'I can', meaningHe: 'אני יכול/ה / מסוגל/ת' },
      { wordEn: 'Listen & Help', meaningHe: 'להקשיב ולעזור' }
    ],
    prepTimeSeconds: 20,
    speakTimeSeconds: 30,
    points: 35
  }
];
