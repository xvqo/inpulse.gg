import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import styles from './Gallery.module.css';

const images = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85', alt: 'Patrol policji na ulicach miasta' },
  { src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85', alt: 'Rajd samochodowy' },
  { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=85', alt: 'Nocne miasto' },
  { src: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=85', alt: 'Akcja ratownicza EMS' },
  { src: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=85', alt: 'Luksusowe pojazdy' },
  { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85', alt: 'Panorama metropolii' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const prev = useCallback(() => setLightbox((i) => (i - 1 + images.length) % images.length), []);
  const next = useCallback(() => setLightbox((i) => (i + 1) % images.length), []);
  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prev, next, close]);

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.bgGlow} />
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.tag}>Galeria</span>
          <h2 className={styles.title}>Życie na serwerze</h2>
          <p className={styles.sub}>Zajrzyj w kulisy naszej rozgrywki</p>
        </motion.div>

        <div className={styles.grid}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${styles[`card${i}`]}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              onClick={() => setLightbox(i)}
            >
              <img src={img.src} alt={img.alt} className={styles.img} loading="lazy" />
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.overlayIndex}>0{i + 1}</span>
                  <span className={styles.overlayText}>{img.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxTop}>
                <span className={styles.lightboxCounter}>
                  {lightbox + 1} / {images.length}
                </span>
                <button className={styles.closeBtn} onClick={close}>
                  <HiX size={20} />
                </button>
              </div>

              <div className={styles.lightboxImgWrap}>
                <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prev}>
                  <HiChevronLeft size={26} />
                </button>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightbox}
                    src={images[lightbox].src}
                    alt={images[lightbox].alt}
                    className={styles.lightboxImg}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.18 }}
                  />
                </AnimatePresence>
                <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={next}>
                  <HiChevronRight size={26} />
                </button>
              </div>

              <p className={styles.lightboxCaption}>{images[lightbox].alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
