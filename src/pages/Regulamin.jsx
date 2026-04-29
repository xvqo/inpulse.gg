import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { MdOutlineChangeCircle } from 'react-icons/md';
import Footer from '../components/Footer';
import styles from './Regulamin.module.css';

/* ── Data ─────────────────────────────────────────────── */
const sections = [
  {
    id: 'postanowienia',
    title: '§1 — Postanowienia ogólne',
    items: [
      'Serwer Inpulse jest prywatnym serwerem FiveM o charakterze Roleplay (RP).',
      'Dołączając do serwera, gracz akceptuje niniejszy regulamin w całości.',
      'Nieznajomość regulaminu nie zwalnia z odpowiedzialności za jego naruszenie.',
      'Administracja zastrzega sobie prawo do zmiany regulaminu bez wcześniejszego uprzedzenia.',
      'Wszelkie decyzje administracji są ostateczne i niepodważalne.',
    ],
  },
  {
    id: 'roleplay',
    title: '§2 — Zasady Roleplay',
    items: [
      'Gracz zobowiązany jest do odgrywania swojej postaci w sposób realistyczny i zgodny z tematyką serwera.',
      'Zakazane jest wychodzenie z roli (OOC) podczas trwającej scenki bez zgody wszystkich stron.',
      'PowerGaming — zmuszanie innych graczy do określonego zachowania wbrew ich woli — jest zakazane.',
      'MetaGaming — używanie informacji zdobytych poza grą w rozgrywce — jest surowo zabronione.',
      'RDM (Random Deathmatch) — atakowanie graczy bez powodu fabularnego — jest zabronione.',
      'VDM (Vehicle Deathmatch) — używanie pojazdu jako broni bez uzasadnienia RP — jest zabronione.',
      'Gracze mają obowiązek respektować życie swojej postaci (Fear RP / Value of Life).',
    ],
  },
  {
    id: 'komunikacja',
    title: '§3 — Komunikacja i zachowanie',
    items: [
      'Zakazane jest używanie wulgarnych, rasistowskich, ksenofobicznych lub obraźliwych wyrażeń.',
      'Wszelkie spory należy rozwiązywać na kanale administracyjnym Discorda, nie w grze.',
      'Zakazane jest celowe utrudnianie gry innym graczom (grief).',
      'Chat globalny OOC służy wyłącznie do komunikacji technicznej.',
      'Reklama innych serwerów FiveM lub projektów gamingowych jest surowo zabroniona.',
    ],
  },
  {
    id: 'fakcje',
    title: '§4 — Fakcje i organizacje',
    items: [
      'Każda organizacja musi być zarejestrowana u administracji i posiadać zatwierdzony regulamin wewnętrzny.',
      'Fakcje przestępcze mają obowiązek prowadzić działalność w sposób realistyczny i spójny fabularnie.',
      'Służby mundurowe zobowiązane są do przestrzegania protokołów ustalonych przez administrację.',
      'Wipe fakcji przez administrację następuje w przypadku rażącego naruszenia zasad lub braku aktywności.',
    ],
  },
  {
    id: 'sklep',
    title: '§5 — Sklep i płatności',
    items: [
      'Zakupione przedmioty i przywileje mają charakter wyłącznie kosmetyczny lub ułatwiający rozgrywkę.',
      'Administracja nie zwraca środków za zakupione pakiety VIP z wyjątkiem przypadków przewidzianych prawem.',
      'Chargeback zakupu skutkuje permanentnym banem konta na serwerze.',
      'Handel wirtualnymi dobrami serwera za prawdziwe pieniądze poza oficjalnym sklepem jest zakazany.',
    ],
  },
  {
    id: 'kary',
    title: '§6 — Kary i sankcje',
    items: [
      'Administracja może nałożyć upomnienie, kick, ban czasowy lub permanentny za naruszenie regulaminu.',
      'Odwołania od kar składa się wyłącznie przez formularz na Discordzie serwera.',
      'Obchodzenie bana (ban evade) poprzez nowe konto skutkuje permanentnym banem wszystkich kont.',
      'Administracja nie jest zobowiązana do podania szczegółowego uzasadnienia decyzji o banie.',
    ],
  },
  {
    id: 'koniec',
    title: '§7 — Postanowienia końcowe',
    items: [
      'Regulamin wchodzi w życie z dniem jego opublikowania na stronie i Discordzie serwera.',
      'W sprawach nieuregulowanych niniejszym regulaminem decyzję podejmuje administracja.',
      'Serwer Inpulse nie ponosi odpowiedzialności za utratę przedmiotów wynikającą z błędów technicznych.',
      'Kontakt z administracją możliwy jest wyłącznie przez kanał ticketów na Discordzie.',
    ],
  },
];

const changelog = [
  {
    version: 'v1.3',
    date: '18 kwiecień 2025',
    author: 'Head Admin · Marek',
    changes: [
      'Dodano §5 dotyczący sklepu i chargeback policy.',
      'Zaktualizowano zasady dotyczące fakcji przestępczych (§4).',
      'Uszczegółowiono definicję PowerGaming (§2).',
    ],
  },
  {
    version: 'v1.2',
    date: '2 marzec 2025',
    author: 'Head Admin · Marek',
    changes: [
      'Dodano przepis o ban evade (§6).',
      'Rozszerzono zasady OOC w chacie globalnym (§3).',
    ],
  },
  {
    version: 'v1.1',
    date: '10 styczeń 2025',
    author: 'Admin · Piotr',
    changes: [
      'Pierwsza oficjalna wersja regulaminu serwera.',
      'Dodano §1–§4 regulaminu.',
    ],
  },
];


/* ── Changelog widget ─────────────────────────────────── */
function ChangelogWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      {/* Floating button */}
      <motion.button
        className={styles.clBtn}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Changelog regulaminu"
      >
        <MdOutlineChangeCircle size={20} />
        <span>Changelog</span>
        <span className={styles.clBadge}>{changelog.length}</span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.clPanel}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22 }}
          >
            <div className={styles.clHeader}>
              <span className={styles.clTitle}>Zmiany regulaminu</span>
              <button className={styles.clClose} onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className={styles.clList}>
              {changelog.map((entry, i) => (
                <div key={i} className={styles.clEntry}>
                  <button
                    className={styles.clEntryHead}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <div className={styles.clEntryLeft}>
                      <span className={styles.clVersion}>{entry.version}</span>
                      <span className={styles.clDate}>{entry.date}</span>
                    </div>
                    <div className={styles.clEntryRight}>
                      <span className={styles.clAuthor}>{entry.author}</span>
                      {expanded === i ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded === i && (
                      <motion.ul
                        className={styles.clChanges}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        {entry.changes.map((c, ci) => (
                          <li key={ci} className={styles.clChange}>
                            <span className={styles.clDot} />
                            {c}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Main page ────────────────────────────────────────── */
export default function Regulamin() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const scrollingRef = useRef(false);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return;
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.bgBlob} />

      {/* Navbar */}
      <nav className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoAccent}>IN</span>PULSE
          </Link>
          <Link to="/" className={styles.backBtn}>
            <HiArrowLeft size={16} />
            Powrót
          </Link>
        </div>
      </nav>

      {/* Page header */}
      <div className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.tag}>Regulamin</span>
            <h1 className={styles.pageTitle}>Regulamin serwera Inpulse RP</h1>
            <p className={styles.pageSub}>
              Ostatnia aktualizacja: <strong>18 kwiecień 2025</strong> · Wersja 1.3
            </p>
          </motion.div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className={styles.body}>
        {/* Sticky TOC */}
        <aside className={styles.toc}>
          <p className={styles.tocLabel}>Spis treści</p>
          <nav className={styles.tocNav}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`${styles.tocLink} ${activeId === s.id ? styles.tocActive : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveId(s.id);
                  scrollingRef.current = true;
                  clearTimeout(scrollTimerRef.current);
                  const el = document.getElementById(s.id);
                  if (el) {
                    const offset = 100;
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                  scrollTimerRef.current = setTimeout(() => {
                    scrollingRef.current = false;
                  }, 900);
                }}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className={styles.content}>
          {sections.map((sec, si) => (
            <motion.section
              key={sec.id}
              id={sec.id}
              className={styles.section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: si * 0.04, duration: 0.45 }}
            >
              <h2 className={styles.sectionTitle}>{sec.title}</h2>
              <ul className={styles.list}>
                {sec.items.map((item, ii) => (
                  <li key={ii} className={styles.item}>
                    <span className={styles.dot} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}

          <div className={styles.sectionFooter}>
            <p>Masz pytania? Skontaktuj się z administracją na Discordzie.</p>
            <a
              href="https://discord.gg/inpulse"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordBtn}
            >
              <FaDiscord size={16} />
              Przejdź na Discord
            </a>
          </div>
        </main>
      </div>

      <Footer />

      <ChangelogWidget />
    </div>
  );
}
