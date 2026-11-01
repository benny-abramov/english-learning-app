import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabletHeader, ActiveTab, DeviceMode } from './components/TabletHeader';
import { PhonicsArena } from './components/PhonicsArena';
import { VerbToBeArena } from './components/VerbToBeArena';
import { SentenceBuilderArena } from './components/SentenceBuilderArena';
import { SuffixCollectorArena } from './components/SuffixCollectorArena';
import { VocabGlossaryTab } from './components/VocabGlossaryTab';
import { UnitRoadmap } from './components/UnitRoadmap';
import { ParentTeacherPortal } from './components/ParentTeacherPortal';
import { Achievements } from './components/Achievements';
import { DailyGoalWidget } from './components/DailyGoalWidget';
import { WeeklyConsistencyChart } from './components/WeeklyConsistencyChart';
import { ClassroomLeaderboard } from './components/ClassroomLeaderboard';
import { CollapsibleAnalyticsWidget } from './components/CollapsibleAnalyticsWidget';
import { UnseenReadingLab } from './components/UnseenReadingLab';
import { CobeOralLab } from './components/CobeOralLab';
import { VocabChallengeArena } from './components/VocabChallengeArena';
import { SchemaInspectorModal } from './components/SchemaInspectorModal';
import { StudentAuthModal } from './components/StudentAuthModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { fullCurriculumData } from './data/curriculumData';
import { playXpEarnedTone } from './utils/audio';
import { BookOpen, RotateCw, MapPin } from 'lucide-react';
import { UnitStagesStepper, UnitBottomStageNavigator } from './components/UnitStagesStepper';
import { isUnitStageTab } from './data/unitStages';

function SababaAppContent() {
  const { user, profile, isAuthModalOpen, setIsAuthModalOpen, recordExerciseReward } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('roadmap');
  const [currentUnitId, setCurrentUnitId] = useState<string>(fullCurriculumData.units[0].id);
  const [localXp, setLocalXp] = useState(480);
  const [localCompletedExercisesToday, setLocalCompletedExercisesToday] = useState(7);
  const [localStreakDays, setLocalStreakDays] = useState(5);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('fluid');
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  // Sync state with cloud profile if logged in
  const xpPoints = profile ? profile.xp : localXp;
  const completedExercisesToday = profile ? profile.dailyExercisesDone : localCompletedExercisesToday;
  const streakDays = profile ? profile.streak : localStreakDays;

  const currentUnit = fullCurriculumData.units.find(u => u.id === currentUnitId) || fullCurriculumData.units[0];

  // Auto-open login modal if user visits /login or has ?login query parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoginPath = window.location.pathname.toLowerCase().includes('/login');
      const isLoginQuery = window.location.search.toLowerCase().includes('login');
      if (isLoginPath || isLoginQuery) {
        setIsAuthModalOpen(true);
      }
    }
  }, [setIsAuthModalOpen]);

  const handleReward = async (points: number) => {
    // Play sound immediately
    playXpEarnedTone(points);

    // Record via AuthContext to sync with Firestore and update daily goals & leaderboard
    const result = await recordExerciseReward(points);
    setLocalXp(result.newXp);
    setLocalCompletedExercisesToday(result.newDone);
    setLocalStreakDays(result.newStreak);
  };

  const handleSelectUnitFromRoadmap = (unitId: string) => {
    setCurrentUnitId(unitId);
    setActiveTab('phonics'); // Jump straight into the unit's exercises
  };

  // Content for the active module
  const renderActiveModule = () => {
    switch (activeTab) {
      case 'roadmap':
        return (
          <UnitRoadmap
            units={fullCurriculumData.units}
            currentUnitId={currentUnitId}
            onSelectUnit={handleSelectUnitFromRoadmap}
            onNavigateToTab={(tab, unitId) => {
              setCurrentUnitId(unitId);
              setActiveTab(tab);
            }}
            xpPoints={xpPoints}
          />
        );
      case 'phonics':
        return (
          <PhonicsArena
            key={`phonics-${currentUnit.id}`}
            exercises={currentUnit.phonicsExercises}
            onReward={handleReward}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        );
      case 'verb_to_be':
        return (
          <VerbToBeArena
            key={`verb-${currentUnit.id}`}
            exercises={currentUnit.verbExercises}
            onReward={handleReward}
          />
        );
      case 'sentence_builder':
        return (
          <SentenceBuilderArena
            key={`sentence-${currentUnit.id}`}
            exercises={currentUnit.sentenceExercises}
            onReward={handleReward}
          />
        );
      case 'suffix_collector':
        return (
          <SuffixCollectorArena
            key={`suffix-${currentUnit.id}`}
            items={currentUnit.suffixItems && currentUnit.suffixItems.length > 0 ? currentUnit.suffixItems : fullCurriculumData.units[1].suffixItems || []}
            onReward={handleReward}
          />
        );
      case 'vocab_glossary':
        return (
          <VocabGlossaryTab
            key={`vocab-${currentUnit.id}`}
            vocabList={currentUnit.vocabulary}
            currentUnit={currentUnit}
            allUnits={fullCurriculumData.units}
            onReward={handleReward}
          />
        );
      case 'vocab_challenge':
        return (
          <VocabChallengeArena
            key={`vocab-challenge-${currentUnit.id}`}
            initialUnitId={currentUnit.id}
            onReward={handleReward}
            onNavigateToUnit={(unitId) => setCurrentUnitId(unitId)}
          />
        );
      case 'unseen_lab':
        return (
          <UnseenReadingLab
            key={`unseen-lab-${currentUnit.id}`}
            currentUnit={currentUnit}
            onReward={handleReward}
            onNavigateToUnit={(unitId) => setCurrentUnitId(unitId)}
          />
        );
      case 'cobe_oral':
        return (
          <CobeOralLab
            key={`cobe-oral-${currentUnit.id}`}
            currentUnit={currentUnit}
            onReward={handleReward}
            onNavigateToUnit={(unitId) => setCurrentUnitId(unitId)}
          />
        );
      case 'achievements':
        return (
          <Achievements
            xpPoints={xpPoints}
            streakDays={streakDays}
          />
        );
      case 'leaderboard':
        return (
          <ClassroomLeaderboard
            xpPoints={xpPoints}
            streakDays={streakDays}
            onNavigateToExercise={(tab) => setActiveTab(tab)}
          />
        );
      case 'parent_portal':
        return (
          <ParentTeacherPortal
            units={fullCurriculumData.units}
            xpPoints={xpPoints}
            streakDays={streakDays}
          />
        );
      default:
        return null;
    }
  };

  // Framer Motion animated container wrapper for smooth tab & unit transitions
  const renderAnimatedModuleContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${currentUnit.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="w-full"
        >
          {renderActiveModule()}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Wrap active module with Right Stepper Rail (in RTL) and Bottom Stage Navigator when inside a unit stage
  const renderModuleWithNavigation = () => {
    if (!isUnitStageTab(activeTab)) {
      return renderAnimatedModuleContent();
    }

    return (
      <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
        {/* RTL Right Sidebar: Unit Progress & Rolling Stepper Rail */}
        <UnitStagesStepper
          currentUnit={currentUnit}
          units={fullCurriculumData.units}
          activeTab={activeTab}
          onNavigateToTab={(tab) => setActiveTab(tab)}
          onSelectUnit={(unitId) => setCurrentUnitId(unitId)}
        />

        {/* Main Arena Workspace */}
        <div className="flex-1 w-full min-w-0 space-y-4">
          <div>
            {renderAnimatedModuleContent()}
          </div>

          {/* Bottom Stage Progress Navigator */}
          <UnitBottomStageNavigator
            currentUnit={currentUnit}
            activeTab={activeTab}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            units={fullCurriculumData.units}
            onSelectUnit={(unitId) => setCurrentUnitId(unitId)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800 font-hebrew">
      {/* Top Application Bar */}
      <TabletHeader
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        units={fullCurriculumData.units}
        currentUnitId={currentUnitId}
        onSelectUnit={(id) => setCurrentUnitId(id)}
        xpPoints={xpPoints}
        streakDays={streakDays}
        deviceMode={deviceMode}
        onDeviceModeChange={(mode) => setDeviceMode(mode)}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
      />

      {/* Main Viewport Area */}
      <main className="flex-1 py-4 sm:py-6 px-3 sm:px-6">
        {/* Device Simulator Frame (if toggled) */}
        {deviceMode === 'tablet_landscape' && (
          <div className="max-w-[1040px] mx-auto mb-4">
            <div className="bg-slate-800 p-4 sm:p-6 rounded-[36px] shadow-2xl border-4 border-slate-700">
              <div className="flex items-center justify-between text-slate-300 text-xs px-2 mb-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>iPad Air / Galaxy Tab (Landscape View 1024×768)</span>
                </span>
                <span className="text-slate-400">יחידה {currentUnit.unitNumber}: {currentUnit.titleHe}</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 overflow-hidden min-h-[580px]">
                {renderModuleWithNavigation()}
              </div>
            </div>
          </div>
        )}

        {deviceMode === 'tablet_portrait' && (
          <div className="max-w-[768px] mx-auto mb-4">
            <div className="bg-slate-800 p-4 sm:p-5 rounded-[36px] shadow-2xl border-4 border-slate-700">
              <div className="flex items-center justify-between text-slate-300 text-xs px-2 mb-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span>Tablet Portrait (768×1024)</span>
                </span>
                <button
                  onClick={() => setDeviceMode('tablet_landscape')}
                  className="flex items-center gap-1 text-sky-300 hover:text-white cursor-pointer font-hebrew text-xs"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>סובבו לרוחב לתרגול משפטים</span>
                </button>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 overflow-hidden min-h-[640px]">
                {renderModuleWithNavigation()}
              </div>
            </div>
          </div>
        )}

        {deviceMode === 'mobile' && (
          <div className="max-w-[420px] mx-auto mb-4">
            <div className="bg-slate-900 p-3 sm:p-4 rounded-[42px] shadow-2xl border-4 border-slate-700">
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2.5"></div>
              <div className="bg-slate-50 rounded-3xl p-3.5 overflow-hidden min-h-[620px]">
                {renderModuleWithNavigation()}
              </div>
            </div>
          </div>
        )}

        {deviceMode === 'fluid' && (
          <div className="max-w-6xl mx-auto space-y-4">
            {/* If on roadmap: show roadmap hub with goals, charts, and unit cards */}
            {activeTab === 'roadmap' ? (
              <div className="space-y-4">
                {/* Guest Welcome & Sign-In Callout */}
                {!profile && (
                  <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-3xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0 shadow-inner">
                        👋
                      </div>
                      <div>
                        <h3 className="font-black text-base sm:text-lg tracking-tight">
                          ברוכים הבאים ל-Sababa English! רוצים לשמור נקודות ורצף יומי?
                        </h3>
                        <p className="text-xs sm:text-sm text-sky-100 font-medium mt-0.5">
                          התחברו בשניות עם שם וכיתה (ללא צורך במייל!), עם חשבון Google או אימייל בית-ספרי, והתחרו בלוח המובילים!
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="px-5 py-2.5 rounded-2xl bg-white text-indigo-700 hover:bg-sky-50 active:scale-95 font-black text-xs sm:text-sm transition-all shadow-sm cursor-pointer whitespace-nowrap self-stretch sm:self-auto text-center shrink-0"
                    >
                      כניסת תלמידים 🚀
                    </button>
                  </div>
                )}

                {/* Daily Goal & Habit Tracker */}
                <DailyGoalWidget
                  completedExercises={completedExercisesToday}
                  currentXpEarnedToday={130}
                  streakDays={streakDays}
                />

                {/* Analytics & Social Engagement Widgets with Fold / Unfold (+ / -) */}
                <CollapsibleAnalyticsWidget
                  xpPoints={xpPoints}
                  streakDays={streakDays}
                  completedToday={completedExercisesToday}
                  dailyGoal={profile?.dailyGoal || 5}
                  onNavigateToExercise={(tab) => setActiveTab(tab)}
                />

                {/* Full Unit Roadmap */}
                {renderAnimatedModuleContent()}
              </div>
            ) : (
              renderModuleWithNavigation()
            )}
          </div>
        )}
      </main>

      {/* Curriculum Summary & Pedagogical Benchmark Strip */}
      <footer className="bg-white border-t border-slate-200/90 py-5 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-700">
              Sababa English © 2026
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Ministry of Education Band I & Band II Curriculum (12 Units · 384 Words)</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Firebase Cloud Sync & Classroom Leaderboard Active</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSchemaModalOpen(true)}
              className="text-sky-700 hover:text-sky-900 font-semibold cursor-pointer underline underline-offset-4"
            >
              Export Multi-Unit JSON
            </button>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Tablet Landscape Ready</span>
          </div>
        </div>
      </footer>

      {/* Interactive Curriculum JSON Schema Modal */}
      <SchemaInspectorModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
        moduleData={fullCurriculumData}
      />

      {/* Student Firebase Login & Profile Modal */}
      <StudentAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SababaAppContent />
    </AuthProvider>
  );
}
