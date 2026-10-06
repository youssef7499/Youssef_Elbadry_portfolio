import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Globe, MessageCircle, Menu, X } from 'lucide-react';

export const Header = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#institutes', label: t('nav.institutes') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#before-after', label: t('nav.beforeAfter') },
    { href: '#workflow', label: t('nav.workflow') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 dark:bg-[#06201A]/95 backdrop-blur-md border-b border-[#07231D]/10 dark:border-[#E5A83B]/20 shadow-md'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="يوسف البدري - Youssef El-Badry"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#E5A83B] group-hover:scale-105 transition-all duration-300 shadow-md"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#FAF7F2] dark:ring-[#06201A]" />
          </div>

          <div className="flex flex-col text-start">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#07231D] dark:text-[#F7EFE4] flex items-center gap-2">
              {lang === 'ar' ? 'يوسف البدري' : 'Youssef El-Badry'}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30">
                {lang === 'ar' ? 'متاح للعمل' : 'Available'}
              </span>
            </span>
            <span className="text-[11px] text-[#416358] dark:text-[#A3BFB7] font-mono tracking-wide">
              {lang === 'ar' ? 'محرر فيديو ومخرج سردي' : 'Lead Video Editor'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#07231D] hover:text-[#E5A83B] dark:text-[#F7EFE4]/90 dark:hover:text-[#E5A83B] transition-colors rounded-lg hover:bg-[#E5A83B]/10"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions & Toggles */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-[#07231D]/15 dark:border-[#E5A83B]/30 bg-white/90 dark:bg-[#0D332B] hover:bg-[#E5A83B]/15 text-[#07231D] dark:text-[#F7EFE4] transition-all duration-200 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-[#E5A83B]" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg border border-[#07231D]/15 dark:border-[#E5A83B]/30 bg-white/90 dark:bg-[#0D332B] hover:bg-[#E5A83B]/15 text-[#07231D] dark:text-[#F7EFE4] transition-all duration-200 shadow-sm"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#E5A83B]" /> : <Moon className="w-4 h-4 text-[#07231D]" />}
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            href="https://wa.me/201144735499"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E5A83B] hover:bg-[#F5BD55] text-[#07231D] font-extrabold text-xs tracking-wide transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-[#07231D] text-[#E5A83B]" />
            <span>{t('nav.hireMe')}</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 text-xs font-bold border border-[#07231D]/15 dark:border-[#E5A83B]/30 rounded-lg text-[#07231D] dark:text-[#F7EFE4]"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 border border-[#07231D]/15 dark:border-[#E5A83B]/30 rounded-lg text-[#07231D] dark:text-[#F7EFE4]"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#E5A83B]" /> : <Moon className="w-4 h-4 text-[#07231D]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#07231D] dark:text-[#F7EFE4] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-[#FAF7F2] dark:bg-[#06201A] border-b border-[#07231D]/10 dark:border-[#E5A83B]/20 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-bold text-[#07231D] dark:text-[#F7EFE4] hover:bg-[#E5A83B]/10"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/201144735499"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#E5A83B] text-[#07231D] font-extrabold text-sm text-center shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('nav.hireMe')} (WhatsApp)</span>
          </a>
        </div>
      )}
    </header>
  );
};
