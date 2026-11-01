import React, { useState } from 'react';
import { Award, Printer, Clock, BookOpen, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { CurriculumUnit } from '../types/curriculum';
import { Achievements } from './Achievements';
import { CollapsibleAnalyticsWidget } from './CollapsibleAnalyticsWidget';
import { CurriculumGuideModal } from './CurriculumGuideModal';

interface ParentTeacherPortalProps {
  units: CurriculumUnit[];
  xpPoints: number;
  streakDays: number;
}

export const ParentTeacherPortal: React.FC<ParentTeacherPortalProps> = ({
  units,
  xpPoints,
  streakDays
}) => {
  const [studentName, setStudentName] = useState('יוסי אברמוב');
  const [showCertificate, setShowCertificate] = useState(false);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Portal Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                פורטל הורים ומורים
              </span>
              <span className="text-xs text-slate-500 font-medium">
                מעקב יעדי משרד החינוך (Band I)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              דוח התקדמות פדגוגי וניהול הישגים
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              סקירת שליטה בפערי השפה העברית-אנגלית, תגים שהושגו, זמן למידה והנפקת תעודות להדפסה.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsCurriculumModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-sky-600" />
              <span>מדריך 12 היחידות</span>
            </button>

            <button
              onClick={() => setShowCertificate(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>הנפקת תעודת הצטיינות</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">סה״כ נקודות שנצברו</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1 block">
              {xpPoints} XP
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              עמידה ב-85% מיעדי השבוע
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">רצף למידה פעיל</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1 block">
              {streakDays} ימים
            </span>
            <span className="text-[11px] text-sky-600 font-semibold mt-1 block">
              התמדה יומית גבוהה
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">רמת תכנית לימודים</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
              כיתות ד׳-ה׳ (Band I)
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              4 יחידות לימוד מותאמות
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Collapsible Analytics & Classroom Leaderboard Widget */}
      <section>
        <CollapsibleAnalyticsWidget
          xpPoints={xpPoints}
          streakDays={streakDays}
          completedToday={7}
          dailyGoal={5}
        />
      </section>

      {/* Embedded Achievements & Badges Showcase */}
      <section className="space-y-2">
        <Achievements xpPoints={xpPoints} streakDays={streakDays} />
      </section>

      {/* Competency Mastery Matrix */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          מטריצת עמידה ביעדי משרד החינוך (Curriculum Competency Matrix)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          מעקב מדויק אחרי נקודות הכשל האופייניות לתלמידים ישראלים ביסודי:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                1. הבחנה פונטית בין P ל-F (אות פ׳ דגושה מול רפה)
              </span>
              <span className="text-xs text-slate-500">
                זיהוי זוגות מינימליים (Pan/Fan, Pig/Fig, Park/Fork, Peel/Feel) ושליטה במנח השפתיים.
              </span>
            </div>
            <span className="self-start sm:self-auto text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full shrink-0">
              נשלט (94% דיוק)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                2. פועל עזר To Be בהווה (פתרון ה-Zero Copula Trap)
              </span>
              <span className="text-xs text-slate-500">
                החדרת am, is, are במשפטים כמו &quot;I am a student&quot; במקום תרגום שגוי מעברית.
              </span>
            </div>
            <span className="self-start sm:self-auto text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full shrink-0">
              נשלט (90% דיוק)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                3. כיווניות LTR, אותיות רישיות וסימני פיסוק
              </span>
              <span className="text-xs text-slate-500">
                הקפדה על Capital Letters בראש משפט ובשמות אנשים (Danny, Maya), ונקודה בסוף משפט.
              </span>
            </div>
            <span className="self-start sm:self-auto text-xs font-bold text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full shrink-0">
              בתהליך תרגול (82% דיוק)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                4. הווה ממושך (Present Progressive) וצלילי B/V
              </span>
              <span className="text-xs text-slate-500">
                הרכבת is running / are playing והבחנה בין Berry ל-Very.
              </span>
            </div>
            <span className="self-start sm:self-auto text-xs font-bold text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full shrink-0">
              נשלט בהצלחה
            </span>
          </div>
        </div>
      </div>

      {/* Printable Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl relative">
            <div className="text-center border-4 border-double border-amber-300 p-6 sm:p-8 rounded-2xl bg-radial from-amber-50/40 to-white">
              <Award className="w-12 h-12 text-amber-500 mx-auto mb-2" />
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-english uppercase">
                Certificate of Achievement
              </h3>
              <h4 className="text-sm font-bold text-amber-800 mt-1 font-hebrew">
                תעודת הצטיינות באנגלית לכיתות היסודי
              </h4>

              <div className="my-5">
                <span className="text-xs text-slate-500 block">מוענק בזאת לתלמיד/ה:</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-1 text-center font-bold text-xl sm:text-2xl text-slate-900 border-b-2 border-slate-300 focus:border-amber-500 outline-none px-4 py-1"
                />
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-hebrew">
                על התמדה ראויה לשבח, שליטה בצלילי האותיות P ו-F, פועל העזר to be, והרכבת משפטי אנגלית תקניים בהתאם לתכנית הלימודים של משרד החינוך (Band I).
              </p>

              {/* Badges on Certificate */}
              <div className="my-5 py-3 border-y border-amber-200/80 bg-amber-50/60 rounded-xl flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1 font-hebrew">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>תגים שהושגו:</span>
                </span>
                <span className="text-[11px] font-bold bg-white text-sky-800 px-2.5 py-1 rounded-lg border border-sky-200">
                  P & F Master
                </span>
                <span className="text-[11px] font-bold bg-white text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Sentence Mechanic (To Be)
                </span>
                <span className="text-[11px] font-bold bg-white text-orange-800 px-2.5 py-1 rounded-lg border border-orange-200">
                  5-Day Streak
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div className="text-right">
                  <span className="block font-bold">סבבה אנגלית</span>
                  <span className="text-[10px]">תכנית Band I</span>
                </div>
                <div className="text-left font-english">
                  <span className="block font-bold">Sababa English</span>
                  <span className="text-[10px]">Official Certificate</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                סגירה
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>הדפסת תעודה למקרר</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Guide Modal */}
      <CurriculumGuideModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
      />
    </div>
  );
};
