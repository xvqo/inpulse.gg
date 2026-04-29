import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CinematicIntro.module.css';

const EASE = [0.76, 0, 0.24, 1];

let hasPlayed = false;

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(hasPlayed ? 3 : 0);

  useEffect(() => {
    if (hasPlayed) { onComplete?.(); return; }
    hasPlayed = true;

    const t0 = setTimeout(() => setPhase(1), 350);
    const t1 = setTimeout(() => setPhase(2), 2700);
    const t2 = setTimeout(() => { setPhase(3); onComplete?.(); }, 3700);
    return () => [t0, t1, t2].forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 3) return null;

  const barAnim = (isTop) => {
    if (phase === 0) return { height: '54vh' };
    if (phase === 1) return { height: '14vh' };
    return { height: '14vh', y: isTop ? '-100%' : '100%' };
  };

  return (
    <>
      {/* Blur layer behind bars, fades out when bars slide away */}
      <motion.div
        className={styles.blurOverlay}
        animate={{ opacity: phase >= 2 ? 0 : 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      <motion.div
        className={styles.barTop}
        initial={{ height: '54vh' }}
        animate={barAnim(true)}
        transition={{ duration: 0.9, ease: EASE }}
      />

      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            className={styles.center}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className={styles.url}
              initial={{ opacity: 0, letterSpacing: '14px' }}
              animate={{ opacity: 1, letterSpacing: '6px' }}
              exit={{ opacity: 0, letterSpacing: '22px' }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            >
              <span className={styles.urlAccent}>IN</span>PULSE.GG
            </motion.p>
            <motion.p
              className={styles.presents}
              initial={{ opacity: 0, letterSpacing: '6px' }}
              animate={{ opacity: 1, letterSpacing: '6px' }}
              exit={{ opacity: 0, letterSpacing: '14px' }}
              transition={{ duration: 0.7, delay: 0.85 }}
            >
              prezentuje
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={styles.barBottom}
        initial={{ height: '54vh' }}
        animate={barAnim(false)}
        transition={{ duration: 0.9, ease: EASE }}
      />
    </>
  );
}
