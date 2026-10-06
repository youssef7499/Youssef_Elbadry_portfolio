import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, Heart } from 'lucide-react';

export const Footer = () => {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-neutral-950 dark:text-white">
              {lang === 'ar' ? 'يوسف البدري' : 'Youssef El-Badry'}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-xs text-neutral-500 font-mono">
              {lang === 'ar' ? 'مونتاج وسرد سينمائي' : 'Video Editor'}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-400 font-mono">
            © {new Date().getFullYear()} {t('footer.rights')}
          </span>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            title={t('footer.backToTop')}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
