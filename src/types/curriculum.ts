/**
 * Israeli Ministry of Education - English Curriculum Band I Specification
 * Target Demographic: 4th & 5th Grade Elementary School (גילאי 9-11)
 * Multi-Unit Expansion Covering:
 * - Unit 1: P/F Phonetics & "To Be" Copula
 * - Unit 2: B/V Phonetics & Present Progressive (-ing)
 * - Unit 3: Vowel Gap (ship/sheep) & Plurals (-s / -es / irregulars)
 * - Unit 4: "TH" sounds & Question Inversion (Yes/No & WH Questions)
 */

export type GradeLevel = '4th' | '5th' | '4th-5th';
export type MinistryBand = 'Band I' | 'Band II';
export type ExerciseCategory = 'phonics' | 'verb_to_be' | 'sentence_builder' | 'vocab_mastery' | 'suffix_collector';

export type PhoneticSoundType = 'bilabial_plosive' | 'labiodental_fricative' | 'short_vs_long_vowel' | 'interdental_th';

export interface ArticulationGuide {
  mouthShape: 'lips_closed_pop' | 'teeth_on_lip_air' | 'lips_vibrate_b' | 'tongue_between_teeth' | 'short_relaxed_vowel';
  soundNameEn: string;
  soundNameHe: string;
  hebrewRule: string;
  mnemonicHe: string;
  articulationCueEn: string;
}

export interface MinimalPairItem {
  id: string;
  letter: string; // 'P' | 'F' | 'B' | 'V' | 'TH' | 'short-I' | 'long-EE'
  word: string;
  ipa: string;
  hebrewTranslation: string;
  audioText: string;
  hebrewLetterEquivalent: string;
  exampleSentence: string;
}

export interface PhonicsExercise {
  id: string;
  type: 'phonics_minimal_pair' | 'phonics_fill_blank' | 'phonics_sound_sort';
  titleHe: string;
  instructionHe: string;
  targetLetter: string;
  distractorLetter: string;
  targetWord: MinimalPairItem;
  distractorWord: MinimalPairItem;
  hebrewHint: string;
  articulationGuide: ArticulationGuide;
  explanationHe: string;
}

export type ToBeConjugation = 'am' | 'is' | 'are' | "isn't" | "aren't" | 'am not' | 'is eating' | 'are playing' | 'am reading';

export interface VerbConjugationExercise {
  id: string;
  hebrewPromptSentence: string;
  subject: string;
  subjectType: 'first_singular' | 'third_singular' | 'plural_or_you';
  baseTemplateBefore: string;
  baseTemplateAfter: string;
  correctAnswer: string;
  options: string[];
  hebrewContrastLesson: string;
  fullSentenceEn: string;
  audioText: string;
  isNegative?: boolean;
}

export interface SentenceBuildingExercise {
  id: string;
  hebrewPromptSentence: string;
  targetSentenceTokens: string[];
  scrambledTokens: {
    id: string;
    text: string;
    isPunctuation?: boolean;
    isDistractor?: boolean;
  }[];
  grammarFocus: 'to_be_copula' | 'p_f_phonics' | 'b_v_phonics' | 'present_progressive' | 'plural_nouns' | 'question_inversion';
  capitalizationTipHe: string;
  ruleExplanationHe: string;
  audioFullSentence: string;
}

export interface SuffixCollectorItem {
  id: string;
  baseWord: string;
  targetSuffix: '-ing' | '-s' | '-es';
  fullWord: string;
  hebrewMeaning: string;
  ruleHintHe: string;
}

export interface Band1VocabWord {
  id: string;
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'pronoun' | 'preposition';
  hebrewTranslation: string;
  ipa: string;
  phoneticTrap?: 'P' | 'F' | 'B' | 'V' | 'TH' | 'short_vowel' | 'magic_e';
  hebrewPhoneticTip?: string;
  exampleSentenceEn: string;
  exampleSentenceHe: string;
  band: 'Band I' | 'Band II' | 'Custom';
  category?: string;
  isCustom?: boolean;
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

export interface CurriculumModule {
  id: string;
  version: string;
  metadata: {
    titleEn: string;
    titleHe: string;
    gradeLevel: GradeLevel;
    ministryBand: MinistryBand;
    curriculumDomain: string;
    estimatedMinutes: number;
    recommendedDevice: string;
    authors: string;
    learningObjectives: { en: string[]; he: string[] };
    targetLinguisticGaps: { gapNameHe: string; descriptionHe: string; pedagogicalStrategy: string }[];
  };
  units: CurriculumUnit[];
}
