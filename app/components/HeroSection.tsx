'use client';
import { useEffect, useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection({ slug }: { slug: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className={styles.circleWrapper}>
          {progress < 100 ? (
            <svg className={styles.circle} viewBox="0 0 100 100">
              <circle className={styles.track} cx="50" cy="50" r="45" strokeWidth="5" fill="none" />
              <circle
                className={styles.progress}
                cx="50"
                cy="50"
                r="45"
                strokeWidth="5"
                fill="none"
                strokeDasharray="282.6"
                strokeDashoffset={282.6 - (progress / 100) * 282.6}
              />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" className={styles.text}>
                {progress}%
              </text>
            </svg>
          ) : (
            <a
              href={`/api/download-zip?slug=${slug}`}
              className="bg-white text-black rounded-full px-6 py-3 text-lg font-semibold shadow transition hover:bg-gray-200"
            >
              ⬇ Download alles
            </a>
          )}
        </div>

        {progress >= 100 && (
          <div className="mt-16 flex flex-col items-center animate-bounce">
            <a href="#gallery" className="text-white text-4xl">↓</a>
            <p className="text-sm mt-2">Klik hier voor alle thumbnails</p>
          </div>
        )}
      </div>
    </section>
  );
}
