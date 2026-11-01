export interface VocabChallengeCard {
  id: string;
  word: string;
  translationHe: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  emojiFallback: string;
  phoneticTipHe?: string;
  exampleSentenceEn: string;
  exampleSentenceHe: string;
  distractorsEn: string[]; // 3 distractor words for quiz mode
}

export interface UnitVocabChallenge {
  unitId: string;
  unitNumber: number;
  unitTitleHe: string;
  unitTitleEn: string;
  themeHe: string;
  badgeEmoji: string;
  words: VocabChallengeCard[]; // 5 words per unit
}
