import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import useCountUp from '../hooks/useCountUp';
import useFivemPlayers from '../hooks/useFivemPlayers';
import styles from './Hero.module.css';

const staticStats = [
  { target: null, label: 'Uptime serwera', static: '24/7' },
  { target: null, label: 'Serwer RP w PL', static: '#1' },
  { target: 50, suffix: '+', label: 'Unikalnych misji', static: null },
];

function StatCard({ stat, index }) {
  const { ref, display } = useCountUp(stat.target ?? null, 1600, stat.suffix ?? '');
  return (
    <motion.div ref={ref} className={styles.statCard}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 + index * 0.1 }}>
      <span className={styles.statValue}>
        {stat.static !== null ? stat.static : display}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </motion.div>
  );
}

function PlayersCard() {
  const { players, max, loading } = useFivemPlayers();
  const { ref, display } = useCountUp(players, 1400, '');
  return (
    <motion.div ref={ref} className={styles.statCard}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}>
      <span className={styles.statValue}>
        {loading ? '…' : players === null ? '—' : display}
        {!loading && max && players !== null && <span className={styles.statMax}>/{max}</span>}
      </span>
      <span className={styles.statLabel}>Graczy online</span>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* Backgrounds */}
      <div className={styles.blobLeft} />
      <div className={styles.blobRight} />

      {/* Character image — absolute, behind grid */}
      <motion.div className={styles.charWrap}
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 1.0 }}>
        <img src="/characters.png" alt="" aria-hidden className={styles.img} />
        <div className={styles.fadeLeft} />
        <div className={styles.fadeBottom} />
      </motion.div>

      {/* Content grid — single column, text only */}
      <div className={styles.grid}>
        <div className={styles.left}>
          <motion.div className={styles.badge}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}>
            <span className={styles.badgeDot} />
            Serwer aktywny: dołącz teraz
          </motion.div>

          <motion.h1 className={styles.title}
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}>
            Witaj na serwerze<br />
            <span className={styles.titleAccent}>INPULSE</span>
          </motion.h1>

          <motion.p className={styles.sub}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}>
            Najbardziej rozbudowany serwer FiveM Roleplay w Polsce.
            Realistyczna rozgrywka, unikalne systemy i aktywna społeczność.
          </motion.p>

          <motion.div className={styles.buttons}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58 }}>
            <a href="https://discord.gg/inpulse" target="_blank" rel="noopener noreferrer"
              className={styles.btnDiscord}>
              <FaDiscord size={19} />
              Dołącz do Discord

            </a>
          </motion.div>

          <div className={styles.statsRow}>
            <PlayersCard />
            {staticStats.map((s, i) => <StatCard key={s.label} stat={s} index={i + 1} />)}
          </div>
        </div>
      </div>

      {/* Bottom section fade */}
      <div className={styles.bottomFade} />

      <motion.a href="#gallery" className={styles.scrollDown}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        <HiArrowDown size={20} />
      </motion.a>
    </section>
  );
}
