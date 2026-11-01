import React, { useState } from 'react';
import { X, BookOpen, Layers, Award, Sparkles, HelpCircle, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import { fullCurriculumData } from '../data/curriculumData';

interface CurriculumGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUnit?: (unitId: string) => void;
}

export const CurriculumGuideModal: React.FC<CurriculumGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectUnit
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'pillars' | 'stages'>('table');
  const [selectedUnitNum, setSelectedUnitNum] = useState<number | null>(null);

  if (!isOpen) return null;

  const units = fullCurriculumData.units;

  const unitMatrix = [
    {
      num: 1,
      id: 'unit-1',
      titleHe: 'בלש הצלילים והמשפטים',
      titleEn: 'Sound & Sentence Detective',
      topicHe: 'חברים, משפחה ופארק ציבורי',
      phonicsHe: 'P מול F (Pan vs Fan, Pig vs Fig)',
      grammarHe: 'פועל העזר To Be (am / is / are) - פתרון מלכודת השמטת הפועל',
      unseenHe: 'בוקר שמשי בפארק (A Sunny Morning in the Park)',
      oralHe: 'החבר/ה הכי טוב/ה שלי ובילוי בפארק'
    },
    {
      num: 2,
      id: 'unit-2',
      titleHe: 'הזמנה למסיבה ופעולות',
      titleEn: 'Party Time & Action Verbs',
      topicHe: 'מסיבות, מוזיקה, שחייה וריקוד',
      phonicsHe: 'B מול V (Berry vs Very, Best vs Vest)',
      grammarHe: 'הווה ממושך Present Progressive (-ing)',
      unseenHe: 'מסיבת ההפתעה של דן (Dan’s Surprise Birthday Party)',
      oralHe: 'מסיבת יום הולדת שמחה ופעולות הילדים'
    },
    {
      num: 3,
      id: 'unit-3',
      titleHe: 'חיות מחמד ומספרים',
      titleEn: 'Pets, Numbers & Plural Quest',
      topicHe: 'חיות בית, חווה ומספרים',
      phonicsHe: 'תנועה קצרה מול ארוכה (Ship vs Sheep, Sit vs Seat)',
      grammarHe: 'סיומות ריבוי שמות עצם Plural Nouns (-s / -es / irregulars)',
      unseenHe: 'ליאם וחיות החווה המצחיקות (Liam and the Funny Farm Pets)',
      oralHe: 'חיות המחמד האהובות עליי ומספרים'
    },
    {
      num: 4,
      id: 'unit-4',
      titleHe: 'מסע השאלות וצלילי TH',
      titleEn: 'The Question Journey & TH',
      topicHe: 'שאלות, משפחה, טבע וכיוונים',
      phonicsHe: 'צליל TH קולי ובלתי-קולי (Three, Think, Mother, Brother)',
      grammarHe: 'מבנה שאלות Wh- Questions והיפוך נושא-פועל',
      unseenHe: 'תעלומת שלושת הרמזים ביער (Mystery of Three Forest Clues)',
      oralHe: 'המשפחה שלי וטיול משותף בשביל הטבע'
    },
    {
      num: 5,
      id: 'unit-5',
      titleHe: 'ה-E הקסומה וממלכת הכיתה',
      titleEn: 'Magic E & The Classroom Kingdom',
      topicHe: 'חדר כיתה, כלי כתיבה וציוד למידה',
      phonicsHe: 'אות ה-E הקסומה (Cap ➔ Cape, Kit ➔ Kite, Hop ➔ Hope)',
      grammarHe: 'שייכות עם Have got / Has got',
      unseenHe: 'העיפרון הקסום בכיתה חמש (The Magic Pencil in Room Five)',
      oralHe: 'הילקוט שלי ומה שיש לי על שולחן הכיתה'
    },
    {
      num: 6,
      id: 'unit-6',
      titleHe: 'חיות בספארי וגוף האדם',
      titleEn: 'Safari Animals & Human Body',
      topicHe: 'חיות בר, תנועה ואיברי גוף',
      phonicsHe: 'CH מול SH (Sheep vs Cheap, Share vs Chair)',
      grammarHe: 'הווה פשוט גוף שלישי Present Simple (-s / -es)',
      unseenHe: 'בוקר בספארי ברמת גן (A Safari Morning in Ramat Gan)',
      oralHe: 'חיות בר בספארי ותכונות גופן המיוחדות'
    },
    {
      num: 7,
      id: 'unit-7',
      titleHe: 'שף במטבח ומאכלים טעימים',
      titleEn: 'Chef in the Kitchen & Tasty Foods',
      topicHe: 'מאכלים, ירקות, בישול ומשקאות',
      phonicsHe: 'C ו-G רכים וקשים (City / Cat, Giraffe / Garden)',
      grammarHe: 'קיום ושמות עצם בלתי ספירים (There is / There are)',
      unseenHe: 'שפים צעירים במטבח בית הספר (Little Chefs in the Kitchen)',
      oralHe: 'הארוחה והמאכלים האהובים עליי'
    },
    {
      num: 8,
      id: 'unit-8',
      titleHe: 'מפת העיר ובעלי המקצוע',
      titleEn: 'City Map & Community Helpers',
      topicHe: 'מקומות בעיר, תחבורה ובעלי מקצוע',
      phonicsHe: 'אותיות שקטות Silent Letters (Knee, Knife, Write, Doubt)',
      grammarHe: 'מילות יחס למיקום Prepositions of Place (between, behind, next to)',
      unseenHe: 'סיור בעיירה המועילה שלנו (A Walk Through Our Helpful Town)',
      oralHe: 'העיר שלי והאנשים שעוזרים לקהילה'
    },
    {
      num: 9,
      id: 'unit-9',
      titleHe: 'הרפתקאות בעבר ומכונת הזמן',
      titleEn: 'Past Adventures & Time Machine',
      topicHe: 'היסטוריה, ביקור בטירה ומוזיאון',
      phonicsHe: '3 צלילי סיומת העבר -ed (/t/, /d/, /ɪd/ כמו ב-walked, played, visited)',
      grammarHe: 'זמן עבר פשוט Past Simple לפעולות שהסתיימו',
      unseenHe: 'הביקור של אתמול בטירה העתיקה (Yesterday’s Visit to Castle)',
      oralHe: 'מה עשיתי אתמול אחרי בית הספר'
    },
    {
      num: 10,
      id: 'unit-10',
      titleHe: 'העתיד ועולם הטכנולוגיה',
      titleEn: 'The Future & Tech Wonderland',
      topicHe: 'טכנולוגיה, מחשבים ורובוטים',
      phonicsHe: 'תנועות וקיצורי עתיד (will ➔ \'ll, won\'t)',
      grammarHe: 'זמן עתיד Future (will & be going to)',
      unseenHe: 'רובו-באדי: עוזר בית הספר של העתיד (Robo-Buddy)',
      oralHe: 'רובוט העתיד שלי וכיצד הוא יעזור לי'
    },
    {
      num: 11,
      id: 'unit-11',
      titleHe: 'עולם הטבע והשוואות',
      titleEn: 'Nature & The Animal Olympics',
      topicHe: 'טבע, יבשה, ים והשוואת שיאים',
      phonicsHe: 'צלילי השוואה וסיומות -er / -est',
      grammarHe: 'תארי השוואה והפלגה Comparatives & Superlatives',
      unseenHe: 'אולימפיאדת החיות: אלופי הטבע (The Animal Olympics)',
      oralHe: 'השוואת חיות מדהימות בטבע (מהיר, גדול, חזק)'
    },
    {
      num: 12,
      id: 'unit-12',
      titleHe: 'כוכבי הבמה ומילות מודאל',
      titleEn: 'Stage Stars & Modal Masters',
      topicHe: 'תיאטרון, מוזיקה, כישרונות וכללים',
      phonicsHe: 'הגיית פעלי עזר ומודאל (L שקטה ב-should)',
      grammarHe: 'פעלי מודאל של חובה ורשות Modals (must, should, can)',
      unseenHe: 'ערב הפתיחה על במת בית הספר (Opening Night at School Stage)',
      oralHe: 'כללי בית ספר והכישרונות שלי על הבמה'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-right">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  מדריך תוכנית הלימודים: כיצד בנויות 12 היחידות?
                </h2>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                  Band I · כיתות ד׳-ה׳
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                הסבר פדגוגי מקיף למורים, הורים ותלמידים על ארבעת עמודי התווך של כל יחידה
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            title="סגירה"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-100 flex items-center gap-2 bg-white">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'table'
                ? 'border-sky-600 text-sky-700 bg-sky-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>טבלת ההשוואה המלאה (12 יחידות)</span>
          </button>
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pillars'
                ? 'border-sky-600 text-sky-700 bg-sky-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>4 עמודי התווך של כל יחידה</span>
          </button>
          <button
            onClick={() => setActiveTab('stages')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stages'
                ? 'border-sky-600 text-sky-700 bg-sky-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>מסלול 8 התחנות בכל יחידה</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: Comparison Table */}
          {activeTab === 'table' && (
            <div className="space-y-4">
              <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl text-xs text-sky-950 font-medium leading-relaxed">
                💡 <strong>כיצד שונות היחידות זו מזו?</strong> כל יחידה היא <strong>פרק שלם</strong> המשלב: נושא אוצר מילים (27 מילים), מלכודת פונטיקה ספציפית לישראלים, מוקד דקדוקי שונה, סיפור קריאה מקורי, ומשימת דיבור מונחית.
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 font-black border-b border-slate-200">
                      <th className="p-3 w-12 text-center">#</th>
                      <th className="p-3">שם היחידה</th>
                      <th className="p-3">נושא אוצר המילים (27 מילים)</th>
                      <th className="p-3">מלכודת פונטיקה (Phonics)</th>
                      <th className="p-3">מוקד דקדוקי (Grammar)</th>
                      <th className="p-3">סיפור הבנת הנקרא</th>
                      <th className="p-3">סטודיו דיבור והקלטה</th>
                      {onSelectUnit && <th className="p-3 w-20 text-center">מעבר</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {unitMatrix.map((item) => (
                      <tr
                        key={item.num}
                        className="hover:bg-sky-50/40 transition-colors"
                      >
                        <td className="p-3 text-center font-bold font-mono text-sky-700">
                          {item.num}
                        </td>
                        <td className="p-3 font-bold text-slate-900 whitespace-nowrap">
                          <div>{item.titleHe}</div>
                          <div className="text-[10px] text-slate-400 font-english font-normal">
                            {item.titleEn}
                          </div>
                        </td>
                        <td className="p-3 text-slate-700">{item.topicHe}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-semibold text-[11px] inline-block">
                            {item.phonicsHe}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[11px] inline-block">
                            {item.grammarHe}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700">{item.unseenHe}</td>
                        <td className="p-3 text-slate-700">{item.oralHe}</td>
                        {onSelectUnit && (
                          <td className="p-3 text-center">
                            <button
                              onClick={() => {
                                onSelectUnit(item.id);
                                onClose();
                              }}
                              className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                            >
                              פתח
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: The 4 Pillars */}
          {activeTab === 'pillars' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl border border-sky-100 bg-sky-50/30">
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  אוצר מילים נושאי (27 מילים לכל יחידה)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  324 מילות יסוד מרשימות Band I של משרד החינוך. כל יחידה מלמדת נושא חיים מעשי (חברים, בעלי חיים, משפחה, כיתה, בישול, עיר, עבר, טכנולוגיה) כדי שהתלמיד יוכל לחבר משפטים בעלי משמעות אישית.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-purple-100 bg-purple-50/30">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  מלכודת פונטיקה ייחודית לישראלים
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  העברית חסרה צלילים רבים הקיימים באנגלית. בכל יחידה מוצג תרגול שמיעתי ומנח שפתיים ייעודי: P מול F (אות פ׳ אחת בעברית), B מול V, צליל TH, עיצורים שורקים, אותיות שקטות וסיומות -ed.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-emerald-100 bg-emerald-50/30">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  מוקד דקדוקי מדורג (Grammar Focus)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  התקדמות ספירלית במבנה המשפט משמאל לימין: פועל העזר To Be (ביטול השמטת הפועל), הווה ממושך -ing, סיומות ריבוי -s/-es, שאלות Wh-, שייכות have/has got, עבר פשוט, עתיד ומודאלים.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-amber-100 bg-amber-50/30">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  4
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  אינטגרציה של 8 שלבי למידה בכל יחידה
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  התלמיד לא לומד חוקים יבשים: הוא מזהה את הצליל, מתרגל את הדקדוק, מרכיב משפט פיזי, לומד את 27 המילים, משחק תמונה-מילה, קורא סיפור שלם (Unseen) ומקליט דיבור שוטף של 2-3 משפטים באנגלית.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: 8 Stages */}
          {activeTab === 'stages' && (
            <div className="space-y-3">
              {[
                { step: 1, title: 'אתגר צלילים (Phonics)', desc: 'הבחנה בין צלילים בעייתיים (P/F, B/V, TH) עם הדמיית שפתיים וקול מורה.' },
                { step: 2, title: 'טכנאי פועל עזר (Grammar)', desc: 'חיבור הפועל או הכלל התחבירי הנכון למשפט (am/is/are, There is/are, have got).' },
                { step: 3, title: 'בנאי משפטים (Sentence Builder)', desc: 'הרכבת משפט תקני משמאל לימין (LTR) מקוביות מעורבבות עם אות גדולה ופיסוק.' },
                { step: 4, title: 'אוסף סיומות (Suffix Collector)', desc: 'משחק איסוף מהיר של מילים לפי סיומת דקדוקית (-ing, -s, -es, -ed, -er).' },
                { step: 5, title: 'מרכז אוצר מילים (Vocab Studio)', desc: '27 כרטיסיות מילים של היחידה עם הגיית מורה, דוגמאות ומלכודות הגייה.' },
                { step: 6, title: 'אתגר תמונה-מילה (Picture Match)', desc: 'משחק התאמה ויזואלי של 5 מילות תמונה מתוך היחידה.' },
                { step: 7, title: 'הבנת הנקרא (Unseen Lab)', desc: 'סיפור מקורי של 8-9 שורות עם הקראת שורות, מילון מונחים ו-4 שאלות הבנה ואיתור רמזים.' },
                { step: 8, title: 'סטודיו דיבור והקלטה (Kids Speaking)', desc: 'הקלטה קצרה (20-30 שנ׳) של 2-3 משפטים באנגלית סביב נושא היחידה.' }
              ].map((s) => (
                <div key={s.step} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            הקובץ המלא זמין גם בתיעוד הפרויקט תחת <code className="bg-slate-200 px-1.5 py-0.5 rounded text-[11px] font-mono">CURRICULUM_STRUCTURE.md</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            סגור מדריך
          </button>
        </div>
      </div>
    </div>
  );
};
