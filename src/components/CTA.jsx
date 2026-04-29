import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section id="cta" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className={styles.glow} />
          <div className={styles.glowLeft} />

          <div className={styles.cardLeft}>
            <motion.div
              className={styles.icon}
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HiUsers size={30} />
            </motion.div>
            <h2 className={styles.title}>
              Gotowy na nową<br />przygodę?
            </h2>
            <p className={styles.sub}>
              Dołącz do tysięcy graczy na serwerze Inpulse. Stwórz postać
              i zacznij swoją historię w jednym z najlepszych serwerów RP w Polsce.
            </p>
            <p className={styles.hint}>Brak rejestracji • Darmowy • Aktywna społeczność</p>
          </div>

          <div className={styles.cardRight}>
            <a
              href="https://discord.gg/inpulse"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnDiscord}
            >
              <FaDiscord size={22} />
              Dołącz do Discord
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
