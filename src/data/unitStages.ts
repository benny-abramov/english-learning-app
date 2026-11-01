import { ActiveTab } from '../components/TabletHeader';

export interface UnitStage {
  id: ActiveTab;
  stepNumber: number;
  titleHe: string;
  shortTitleHe: string;
  icon: string;
  subtitleHe: string;
  badgeLabel: string;
  colorScheme: 'sky' | 'emerald' | 'violet' | 'amber' | 'rose' | 'teal' | 'indigo' | 'purple';
}

export const UNIT_STAGES: UnitStage[] = [
  {
    id: 'phonics',
    stepNumber: 1,
    titleHe: 'אתגר צלילים',
    shortTitleHe: 'צלילים',
    icon: '🗣️',
    subtitleHe: 'הבחנה בין צלילים ומלכודות הגייה',
    badgeLabel: 'זוגות מינימליים',
    colorScheme: 'sky'
  },
  {
    id: 'verb_to_be',
    stepNumber: 2,
    titleHe: 'טכנאי פועל עזר',
    shortTitleHe: 'דקדוק',
    icon: '⚙️',
    subtitleHe: 'חיבור פועל העזר am / is / are',
    badgeLabel: 'דקדוק ופעלים',
    colorScheme: 'emerald'
  },
  {
    id: 'sentence_builder',
    stepNumber: 3,
    titleHe: 'בנאי משפטים',
    shortTitleHe: 'משפטים',
    icon: '🧱',
    subtitleHe: 'הרכבת משפט משמאל לימין (LTR)',
    badgeLabel: 'מבנה משפט',
    colorScheme: 'violet'
  },
  {
    id: 'suffix_collector',
    stepNumber: 4,
    titleHe: 'אוסף סיומות',
    shortTitleHe: 'סיומות',
    icon: '🔤',
    subtitleHe: 'סיומות ריבוי, גוף שלישי ו-ing',
    badgeLabel: 'סיומות מילים',
    colorScheme: 'indigo'
  },
  {
    id: 'vocab_glossary',
    stepNumber: 5,
    titleHe: 'אוצר מילים',
    shortTitleHe: '27 מילים',
    icon: '📖',
    subtitleHe: 'כל 27 מילות היחידה עם הגיית מורה',
    badgeLabel: '27 מילים במאגר',
    colorScheme: 'rose'
  },
  {
    id: 'vocab_challenge',
    stepNumber: 6,
    titleHe: 'אתגר תמונה-מילה',
    shortTitleHe: 'תמונה-מילה',
    icon: '🎮',
    subtitleHe: 'משחק מהיר של התאמת תמונה למילה',
    badgeLabel: 'אתגר 5 מילים',
    colorScheme: 'amber'
  },
  {
    id: 'unseen_lab',
    stepNumber: 7,
    titleHe: 'הבנת הנקרא',
    shortTitleHe: 'קריאה',
    icon: '📜',
    subtitleHe: 'קריאת סיפור קצר ומענה לשאלות',
    badgeLabel: 'Unseen Lab',
    colorScheme: 'teal'
  },
  {
    id: 'cobe_oral',
    stepNumber: 8,
    titleHe: 'סטודיו דיבור והקלטה',
    shortTitleHe: 'דיבור',
    icon: '🎙️',
    subtitleHe: 'תרגול דיבור והקלטה קצרה באנגלית (20-30 שנ׳)',
    badgeLabel: 'סטודיו דיבור',
    colorScheme: 'purple'
  }
];

export const isUnitStageTab = (tab: ActiveTab): boolean => {
  return UNIT_STAGES.some((s) => s.id === tab);
};

export const getUnitStageIndex = (tab: ActiveTab): number => {
  return UNIT_STAGES.findIndex((s) => s.id === tab);
};
