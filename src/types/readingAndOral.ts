export interface ReadingLine {
  lineNumber: number;
  text: string;
  audioText: string;
}

export interface ReadingParagraph {
  paragraphNumber: number;
  lines: ReadingLine[];
}

export interface VocabularyGlossaryItem {
  word: string;
  translationHe: string;
  partOfSpeech: string;
  exampleHe: string;
}

export interface ReadingQuestion {
  id: string;
  questionNumber: number;
  type: 'multiple_choice' | 'true_false_evidence' | 'vocabulary_context';
  questionEn: string;
  questionHe: string;
  options: string[];
  correctOptionIndex: number;
  evidenceLineNumbers: number[];
  explanationHe: string;
  points: number;
}

export interface ReadingPassage {
  id: string;
  unitId?: string;
  unitNumber?: number;
  titleEn: string;
  titleHe: string;
  band: 'Band I' | 'Band II';
  gradeLevel: string;
  topicHe: string;
  estimatedReadTimeMin: number;
  wordCount: number;
  paragraphs: ReadingParagraph[];
  vocabularyGlossary: VocabularyGlossaryItem[];
  questions: ReadingQuestion[];
}

export interface CobeOralTask {
  id: string;
  unitId?: string;
  unitNumber?: number;
  taskNumber: number;
  category: 'interview' | 'picture_project' | 'dilemma_opinion' | 'unit_speaking';
  titleEn: string;
  titleHe: string;
  instructionHe: string;
  examinerPromptEn: string;
  examinerPromptHe: string;
  audioPromptEn: string;
  guideQuestionsHe: string[];
  suggestedStartersEn: string[];
  modelAnswerEn: string;
  modelAnswerHe: string;
  keyVocabulary: {
    wordEn: string;
    meaningHe: string;
  }[];
  prepTimeSeconds: number;
  speakTimeSeconds: number;
  points: number;
}
