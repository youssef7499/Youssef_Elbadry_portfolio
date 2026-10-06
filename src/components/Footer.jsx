import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#FAF7F2] dark:bg-[#06201A] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3.5">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E5A83B] shadow-sm"
          />
          <div className="flex flex-col text-start">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-[#07231D] dark:text-[#F7EFE4]">
                {lang === 'ar' ? 'يوسف البدري' : 'Youssef El-Badry'}
              </span>
              <span className="text-[#E5A83B]">·</span>
              <span className="text-xs text-[#E5A83B] font-mono font-bold">
                {lang === 'ar' ? 'مونتاج وسرد سينمائي' : 'Lead Video Editor'}
              </span>
            </div>
            <p className="text-xs text-[#416358] dark:text-[#A3BFB7]">
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#416358] dark:text-[#A3BFB7] font-mono font-medium">
            © {new Date().getFullYear()} {t('footer.rights')}
          </span>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/30 bg-white dark:bg-[#0D332B] hover:bg-[#E5A83B] hover:text-[#07231D] dark:hover:bg-[#E5A83B] dark:hover:text-[#07231D] text-[#07231D] dark:text-[#F7EFE4] transition-all shadow-sm"
            title={t('footer.backToTop')}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
