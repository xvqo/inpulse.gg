import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';
import styles from './Footer.module.css';

const socials = [
  { Icon: FaDiscord, href: 'https://discord.gg/inpulse', label: 'Discord' },
];

const footerLinks = [
  {
    heading: 'Serwer',
    links: [
      { label: 'Połącz', href: 'fivem://connect/inpulse.gg' },
      { label: 'Regulamin', href: '/regulamin' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    heading: 'Sklep',
    links: [
      { label: 'VIP', href: null },
      { label: 'Pakiety', href: null },
      { label: 'Regulamin sklepu', href: null },
    ],
  },
  {
    heading: 'Społeczność',
    links: [
      { label: 'Discord', href: 'https://discord.gg/inpulse' },
      { label: 'Galeria', href: '#gallery' },
      { label: 'Kontakt', href: 'https://discord.gg/inpulse' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} />
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#home" className={styles.logo}>
              <span className={styles.logoAccent}>IN</span>PULSE
            </a>
            <p className={styles.tagline}>
              Najlepszy serwer FiveM Roleplay w Polsce.
              <br />
              Twoja historia zaczyna się tutaj.
            </p>
            <div className={styles.socials}>
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialIcon}
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            {footerLinks.map((col) => (
              <div key={col.heading} className={styles.col}>
                <h4 className={styles.colHead}>{col.heading}</h4>
                <ul className={styles.colList}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href ? (
                        <a href={l.href} className={styles.colLink}>{l.label}</a>
                      ) : (
                        <span className={styles.colLinkDisabled}>{l.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Inpulse. Wszelkie prawa zastrzeżone.</span>
          <span className={styles.bottomRight}>
            Stworzone z pasją dla społeczności FiveM
          </span>
        </div>
      </div>
    </footer>
  );
}
