import React, { useState, useEffect } from 'react';
import { X, Play, Volume2, UserCheck, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import {
  getAvailableEnglishVoices,
  getBestVoice,
  getVoiceGender,
  setVoiceGender,
  getSelectedVoiceURI,
  setSelectedVoiceURI,
  speakEnglish
} from '../utils/audio';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [gender, setGender] = useState<'female' | 'male'>(getVoiceGender());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedURI, setSelectedURI] = useState<string>(getSelectedVoiceURI() || '');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeVoiceName, setActiveVoiceName] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    const refreshVoices = () => {
      const available = getAvailableEnglishVoices();
      setVoices(available);
      const current = getBestVoice();
      if (current) {
        setActiveVoiceName(current.name);
      }
    };

    refreshVoices();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = refreshVoices;
    }
  }, [isOpen, gender, selectedURI]);

  if (!isOpen) return null;

  const handleGenderChange = (newGender: 'female' | 'male') => {
    setGender(newGender);
    setVoiceGender(newGender);
    setSelectedURI('');
    setSelectedVoiceURI(null);

    // Speak quick preview
    setIsPlaying(true);
    speakEnglish(
      newGender === 'female'
        ? "Hello! I am your English teacher. Let's practice together!"
        : "Hello! I am your English teacher. Ready to learn?",
      0.85,
      () => setIsPlaying(false)
    );
  };

  const handleSelectSpecificVoice = (uri: string) => {
    setSelectedURI(uri);
    setSelectedVoiceURI(uri ? uri : null);
    const chosen = voices.find((v) => v.voiceURI === uri);
    if (chosen) {
      setActiveVoiceName(chosen.name);
    }

    setIsPlaying(true);
    speakEnglish("Hello! This is my voice. I will help you with phonics and grammar.", 0.85, () => {
      setIsPlaying(false);
    });
  };

  const handleTestVoice = () => {
    setIsPlaying(true);
    speakEnglish("Pop the balloon with letter P! Puh, puh, panda!", 0.82, () => {
      setIsPlaying(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-sm shadow-sky-600/30">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 font-hebrew">
                הגדרות קול והגייה באנגלית
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                English Pronunciation Voice Settings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Active Voice Status Card */}
          <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-2xl flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>הקול הפעיל כרגע:</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 truncate mt-0.5" title={activeVoiceName}>
                {activeVoiceName || 'Default Educational Voice'}
              </p>
            </div>
            <button
              onClick={handleTestVoice}
              disabled={isPlaying}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : 'fill-white'}`} />
              <span>{isPlaying ? 'משמיע...' : 'השמע דוגמה'}</span>
            </button>
          </div>

          {/* Voice Gender Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 font-hebrew">
              סגנון קול מועדף (טבעי וללא עיוות מתכתי):
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleGenderChange('female')}
                className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                  gender === 'female'
                    ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-slate-900 font-hebrew">
                    קול מורה נשי (מומלץ)
                  </span>
                  {gender === 'female' && (
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Natural Female (Google / Samantha / Jenny) - הגייה חמה וברורה
                </p>
              </button>

              <button
                onClick={() => handleGenderChange('male')}
                className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                  gender === 'male'
                    ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-slate-900 font-hebrew">
                    קול מורה גברי
                  </span>
                  {gender === 'male' && (
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Natural Male (David / Guy / Alex)
                </p>
              </button>
            </div>
          </div>

          {/* Specific Voice Picker Dropdown (if multiple voices detected) */}
          {voices.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-hebrew">
                בחירת קול ספציפי מהדפדפן שלך:
              </label>
              <select
                value={selectedURI}
                onChange={(e) => handleSelectSpecificVoice(e.target.value)}
                className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500/30 cursor-pointer"
              >
                <option value="">-- אוטומטי (הקול הטבעי המומלץ ביותר) --</option>
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1 font-hebrew">
                נבחר אוטומטית הקול באיכות הגבוהה ביותר המותקן במכשירך.
              </p>
            </div>
          )}

          {/* Educational Note */}
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 font-medium">
            💡 <strong>טיפ פונטיקה:</strong> הקול מכוון כעת לטמפו מדוד של 85% וגובה צליל טבעי (1.0 Formant), מה שמבטל לחלוטין את הצליל הרובוטי-מתכתי ומבליט את ההבדל החשוב בין צליל <strong>/p/</strong> (פ׳ דגושה) לבין <strong>/f/</strong> (פ׳ רפה).
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            אישור וסיום
          </button>
        </div>
      </div>
    </div>
  );
};
