import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const goHome = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="/" onClick={goHome} className={styles.logo}>
          <span className={styles.logoAccent}>IN</span>PULSE
        </a>

        <div className={styles.desktopLinks}>
          <Link to="/regulamin" className={styles.navLink}>Regulamin</Link>
          <a href="#sklep" className={styles.navLink}>Sklep</a>
          <a
            href="https://discord.gg/inpulse"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.discordBtn}
          >
            <FaDiscord size={18} />
            Discord
          </a>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Link
                to="/regulamin"
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                Regulamin
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <a
                href="#sklep"
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                Sklep
              </a>
            </motion.div>
            <motion.a
              href="https://discord.gg/inpulse"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileDiscord}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.17 }}
            >
              <FaDiscord size={20} />
              Dołącz do Discord
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
