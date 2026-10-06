import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-brand-pine-900/10 dark:border-brand-pine-800 bg-brand-cream-50 dark:bg-brand-pine-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3.5">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-gold/40 shadow-sm"
          />
          <div className="flex flex-col text-start">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-brand-pine-950 dark:text-brand-cream-ivory">
                {lang === 'ar' ? 'يوسف البدري' : 'Youssef El-Badry'}
              </span>
              <span className="text-brand-gold">·</span>
              <span className="text-xs text-brand-gold font-mono font-semibold">
                {lang === 'ar' ? 'مونتاج وسرد سينمائي' : 'Lead Video Editor'}
              </span>
            </div>
            <p className="text-xs text-brand-pine-600 dark:text-brand-cream-300/70">
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-brand-pine-600 dark:text-brand-cream-300/60 font-mono">
            © {new Date().getFullYear()} {t('footer.rights')}
          </span>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl border border-brand-pine-900/10 dark:border-brand-pine-800 bg-white dark:bg-brand-pine-900 hover:bg-brand-gold hover:text-brand-pine-950 text-brand-pine-900 dark:text-brand-cream-ivory transition-all shadow-sm"
            title={t('footer.backToTop')}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
