import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Database, BookOpen } from 'lucide-react';
import { CurriculumModule } from '../types/curriculum';

interface SchemaInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleData: CurriculumModule;
}

export const SchemaInspectorModal: React.FC<SchemaInspectorModalProps> = ({
  isOpen,
  onClose,
  moduleData
}) => {
  const [activeTab, setActiveTab] = useState<'json' | 'typescript' | 'curriculum'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(moduleData, null, 2);

  const typescriptSchemaString = `/**
 * Israeli Ministry of Education - English Curriculum Band I Specification
 * Target Demographic: 4th & 5th Grade Elementary School (גילאי 9-11)
 * Multi-Unit Suite: Units 1-4 with Phonics, Verbs, Sentence Builder & Suffixes
 */

export interface CurriculumModule {
  id: string;
  version: string;
  metadata: {
    titleEn: string;
    titleHe: string;
    gradeLevel: '4th' | '5th' | '4th-5th';
    ministryBand: 'Band I' | 'Band II';
    curriculumDomain: string;
    estimatedMinutes: number;
    recommendedDevice: string;
    learningObjectives: { en: string[]; he: string[] };
    targetLinguisticGaps: { gapNameHe: string; descriptionHe: string; pedagogicalStrategy: string }[];
  };
  units: CurriculumUnit[];
}

export interface CurriculumUnit {
  id: string;
  unitNumber: number;
  titleEn: string;
  titleHe: string;
  themeHe: string;
  descriptionHe: string;
  badgeIcon: string;
  xpReward: number;
  phonicsGapName: string;
  grammarFocusName: string;
  phonicsExercises: PhonicsExercise[];
  verbExercises: VerbConjugationExercise[];
  sentenceExercises: SentenceBuildingExercise[];
  suffixItems?: SuffixCollectorItem[];
  vocabulary: Band1VocabWord[];
}

export interface PhonicsExercise {
  id: string;
  type: 'phonics_minimal_pair';
  titleHe: string;
  instructionHe: string;
  targetLetter: 'P' | 'F';
  distractorLetter: 'P' | 'F';
  targetWord: MinimalPairItem;
  distractorWord: MinimalPairItem;
  hebrewHint: string;
  articulationGuide: {
    mouthShape: 'lips_closed_pop' | 'teeth_on_lip_air';
    soundNameEn: string;
    soundNameHe: string;
    hebrewRule: string;
    mnemonicHe: string;
  };
  explanationHe: string;
}

export interface VerbConjugationExercise {
  id: string;
  hebrewPromptSentence: string;
  subject: string;
  baseTemplateBefore: string;
  baseTemplateAfter: string;
  correctAnswer: 'am' | 'is' | 'are' | "isn't" | "aren't";
  options: ('am' | 'is' | 'are' | "isn't" | "aren't")[];
  hebrewContrastLesson: string;
  fullSentenceEn: string;
  audioText: string;
}

export interface SentenceBuildingExercise {
  id: string;
  hebrewPromptSentence: string;
  targetSentenceTokens: string[];
  scrambledTokens: { id: string; text: string; isPunctuation?: boolean; isDistractor?: boolean }[];
  grammarFocus: 'to_be_copula' | 'p_f_phonics' | 'capitalization_rule';
  capitalizationTipHe: string;
  ruleExplanationHe: string;
  audioFullSentence: string;
}`;

  const handleCopy = () => {
    const textToCopy = activeTab === 'json' ? jsonString : typescriptSchemaString;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `israeli_band1_vocabulary_module_${moduleData.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                מבנה הנתונים והסכמה (Curriculum JSON Schema)
              </h3>
              <p className="text-xs text-slate-500">
                מפרט טכני ופדגוגי מותאם משרד החינוך (Band I לכיתות ד׳-ה׳)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Copy / Download Tools */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Full Module JSON</span>
            </button>

            <button
              onClick={() => setActiveTab('typescript')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'typescript'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>TypeScript Schema</span>
            </button>

            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'curriculum'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>ייעוץ פדגוגי ומשרד החינוך</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'הועתק ללוח!' : 'העתקת תוכן'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>הורדת JSON</span>
            </button>

            <a
              href="/english-tutorial.tar.gz"
              download="english-tutorial.tar.gz"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>הורדת פרויקט (Codebase Archive)</span>
            </a>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="p-6 overflow-y-auto max-h-[60vh] bg-slate-50/50">
          {activeTab === 'json' && (
            <pre className="p-4 bg-slate-900 text-sky-300 rounded-2xl text-xs font-code overflow-x-auto leading-relaxed dir-ltr selection:bg-sky-700 selection:text-white" dir="ltr">
              {jsonString}
            </pre>
          )}

          {activeTab === 'typescript' && (
            <pre className="p-4 bg-slate-900 text-emerald-300 rounded-2xl text-xs font-code overflow-x-auto leading-relaxed dir-ltr selection:bg-emerald-700 selection:text-white" dir="ltr">
              {typescriptSchemaString}
            </pre>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-4 text-sm text-slate-800">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-base text-slate-900 mb-1">
                  1. דרישות משרד החינוך (Band I - יסודי)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  תכנית הלימודים באנגלית של משרד החינוך בישראל מחלקת את אוצר המילים לשלוש רמות (Bands).
                  רמת <strong>Band I</strong> מיועדת לסוף בית הספר היסודי (כיתות ד׳-ו׳) וכוללת כ-1,200 מילים בסיסיות.
                  הסכמה שלנו מתמקדת במילים המרכזיות ביותר ומצליבה אותן ישירות עם נקודות הכשל הפונטיות והתחביריות האופייניות לדוברי עברית.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-base text-slate-900 mb-1">
                  2. פתרון פער הצלילים P/F (האות פ״א הכפולה)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  בעברית אות אחת (פ) משמשת לשני צלילים (דגושה ורפה), ללא הבחנה גרפית בטקסטים ללא ניקוד. באנגלית, החלפת P ב-F משנה לחלוטין את משמעות המילה (Pan לעומת Fan, Pig לעומת Fig).
                  הסכמה מבודדת זוגות מינימליים (Minimal Pairs) ומספקת לילד עוגן גופני-מוטורי: הצמדת שפתיים מתפרצת לעומת מגע שיניים-שפה.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-base text-slate-900 mb-1">
                  3. פתרון השמטת פועל עזר (Zero Copula Trap)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  בשפות שמיות כמו עברית, משפט שמני בהווה אינו דורש פועל (&quot;דני תלמיד&quot;, &quot;הכלב בפארק&quot;). תלמידים ישראלים מתרגמים זאת ישירות כ-&quot;Danny student&quot;.
                  מבנה הנתונים מגדיר את המשפט במתכונת &quot;טכנאי הברגים&quot; שבו התלמיד מתרגל השחלה מודעת של am, is, are כמרכיב הכרחי לקיום המשפט.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
