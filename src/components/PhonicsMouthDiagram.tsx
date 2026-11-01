import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { playAcousticPlosiveP, playAcousticFricativeF, speakPhonicsTargetSound } from '../utils/audio';

interface PhonicsMouthDiagramProps {
  letter: 'P' | 'F';
  size?: 'sm' | 'md' | 'lg';
}

export const PhonicsMouthDiagram: React.FC<PhonicsMouthDiagramProps> = ({ letter }) => {
  const isP = letter === 'P';

  const handleAcousticDemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isP) {
      playAcousticPlosiveP();
    } else {
      playAcousticFricativeF();
    }
  };

  const handleSpeechSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakPhonicsTargetSound(letter);
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
      <div className="relative w-28 h-24 flex items-center justify-center overflow-hidden">
        {isP ? (
          // Visual mouth cue for /p/: Lips closed tight with pop burst
          <svg viewBox="0 0 120 100" className="w-full h-full text-sky-600">
            {/* Face profile outline */}
            <path
              d="M 15 20 Q 30 18, 45 28 Q 50 38, 46 50 Q 56 50, 60 52 Q 54 55, 46 58 Q 52 70, 40 85"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Upper & lower lips pressing together */}
            <ellipse cx="62" cy="49" rx="14" ry="6" fill="#f43f5e" />
            <ellipse cx="62" cy="55" rx="14" ry="6" fill="#e11d48" />
            {/* Pop explosion burst particles */}
            <circle cx="85" cy="45" r="4" fill="#0284c7" className="animate-ping" />
            <circle cx="92" cy="52" r="3" fill="#38bdf8" />
            <circle cx="86" cy="60" r="3" fill="#0284c7" />
            {/* Air burst rays */}
            <path d="M 76 52 L 95 44" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 78 52 L 100 52" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <path d="M 76 52 L 95 60" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          // Visual mouth cue for /f/: Upper teeth gently on lower lip with stream of air
          <svg viewBox="0 0 120 100" className="w-full h-full text-emerald-600">
            {/* Face profile outline */}
            <path
              d="M 15 20 Q 30 18, 45 28 Q 50 38, 46 50 Q 56 50, 60 52 Q 54 55, 46 58 Q 52 70, 40 85"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Upper teeth visible */}
            <rect x="54" y="47" width="12" height="7" rx="1" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Lower lip curled up touching teeth */}
            <path
              d="M 52 57 Q 60 52, 68 56 Q 66 63, 54 62 Z"
              fill="#e11d48"
            />
            {/* Continuous stream of air (friction waves) */}
            <path
              d="M 72 49 C 80 47, 85 52, 98 48"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />
            <path
              d="M 70 54 C 82 52, 88 56, 102 54"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      <div className="mt-1 text-center w-full">
        <span className="text-xs font-bold text-slate-800 block">
          {isP ? 'שפתיים נסגרות ומתפוצצות' : 'שיניים על שפה תחתונה'}
        </span>
        
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <button
            onClick={handleSpeechSound}
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer"
            title={`השמעת צליל האות ${letter} (Web Speech API)`}
          >
            <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            <span>צליל {letter}</span>
          </button>

          <button
            onClick={handleAcousticDemo}
            className="inline-flex items-center justify-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            title="הדמיית פיצוץ/חיכוך אוויר"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>אקוסטיקה</span>
          </button>
        </div>
      </div>
    </div>
  );
};
