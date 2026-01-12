import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Scene3D from '@/components/Scene3D';
import SparkleTrail from '@/components/SparkleTrail';
import FloatingButton from '@/components/FloatingButton';
import PersonalityQuiz from '@/components/PersonalityQuiz';
import { Brain, Zap, Trophy, ChevronRight } from 'lucide-react';

const BIRTHDAY_NAME = "Harish G";

export default function QuizPage() {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleStartQuiz = useCallback(() => {
    setShowQuiz(true);
  }, []);

  const handleQuizClose = useCallback(() => {
    setShowQuiz(false);
    setQuizComplete(true);
  }, []);

  const handleContinue = useCallback(() => {
    navigate('/guestbook');
  }, [navigate]);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Scene3D />
      <SparkleTrail />

      {/* Floating brain icons background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Brain className="text-purple-400/30" size={30 + Math.random() * 30} />
          </motion.div>
        ))}
      </div>

      {/* Animated lightning bolts */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: '20%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <Zap className="text-yellow-400/20" size={40} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="mb-8 relative"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="relative inline-block">
              <Brain className="w-24 h-24 text-purple-400" />
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Zap className="w-8 h-8 text-yellow-400" fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display text-gradient text-glow mb-6">
            Fun Quiz Time!
          </h1>

          <p className="text-xl text-champagne mb-12 max-w-lg mx-auto">
            Test your knowledge and discover something fun about {BIRTHDAY_NAME}!
          </p>

          <AnimatePresence mode="wait">
            {!quizComplete ? (
              <motion.div key="start" exit={{ opacity: 0, scale: 0.8 }}>
                <FloatingButton
                  icon={<Brain className="w-6 h-6 text-purple-400" />}
                  onClick={handleStartQuiz}
                  delay={0}
                >
                  Start Quiz
                </FloatingButton>
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
                </motion.div>
                <p className="text-lg text-secondary">
                  🏆 Quiz completed! Time to sign the guestbook!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <FloatingButton
                    icon={<Brain className="w-6 h-6 text-purple-400" />}
                    onClick={handleStartQuiz}
                    delay={0}
                  >
                    Play Again
                  </FloatingButton>
                  <button
                    onClick={handleContinue}
                    className="neon-button flex items-center gap-2"
                  >
                    Continue to Guestbook
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <PersonalityQuiz
          isOpen={showQuiz}
          onClose={handleQuizClose}
          birthdayName={BIRTHDAY_NAME}
        />
      </main>
    </div>
  );
}
