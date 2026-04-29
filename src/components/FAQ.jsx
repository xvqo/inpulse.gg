import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { FaDiscord } from 'react-icons/fa';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: 'Jak dołączyć do serwera Inpulse?',
    a: 'Pobierz FiveM z oficjalnej strony fivem.net, następnie wyszukaj "Inpulse" w przeglądarce serwerów lub kliknij przycisk "Połącz z serwerem" na naszej stronie. Upewnij się, że posiadasz legalną kopię GTA V.',
  },
  {
    q: 'Czy serwer jest darmowy?',
    a: 'Tak! Serwer Inpulse jest w pełni darmowy. Oferujemy jednak opcjonalne pakiety VIP w naszym sklepie, które dają kosmetyczne bonusy i wspierają utrzymanie serwera.',
  },
  {
    q: 'Jakie systemy RP oferuje Inpulse?',
    a: 'Posiadamy rozbudowane systemy: praca (policja, EMS, straż pożarna, prokurator), biznesu, nieruchomości, pojazdów, banku, przestępczości zorganizowanej, sądownictwa i wiele innych unikalnych mechanik.',
  },
  {
    q: 'Jak mogę zgłosić bug lub problem?',
    a: 'Wszystkie bugi zgłaszaj na naszym Discordzie w dedykowanym kanale #zgłoś-buga. Staraj się opisać problem jak najdokładniej i dołączyć ewentualny zapis z ekranu.',
  },
  {
    q: 'Gdzie znajdę regulamin serwera?',
    a: 'Regulamin dostępny jest w zakładce "Regulamin" na tej stronie oraz na naszym Discordzie w kanale #regulamin. Przeczytanie i przestrzeganie regulaminu jest obowiązkowe.',
  },
  {
    q: 'Czy mogę zostać administratorem?',
    a: 'Rekrutacja na stanowiska administracyjne odbywa się cyklicznie. Informacje o naborach znajdziesz na naszym Discordzie. Wymagane jest minimum 30 godzin na serwerze i nienagannej reputacji.',
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <button className={styles.question} onClick={onToggle}>
        <span>{item.q}</span>
        <motion.span
          className={styles.chevron}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22 }}
        >
          <HiChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.answer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.bgGlow} />
      <div className={styles.container}>
        <motion.div
          className={styles.sideHead}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.tag}>FAQ</span>
          <h2 className={styles.title}>Często zadawane<br />pytania</h2>
          <p className={styles.sub}>
            Tutaj znajdziesz odpowiedzi na najczęstsze pytania.
            Nie znalazłeś tego czego szukasz?
          </p>
          <a
            href="https://discord.gg/inpulse"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.discordLink}
          >
            <FaDiscord size={17} />
            Zapytaj na Discordzie
          </a>
        </motion.div>

        <div className={styles.list}>
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              item={f}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
