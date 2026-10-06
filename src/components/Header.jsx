import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Globe, MessageCircle, Menu, X } from 'lucide-react';

export const Header = () => {
  const { lang, toggleLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
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
          ? 'bg-brand-cream-50/90 dark:bg-brand-pine-950/90 backdrop-blur-md border-b border-brand-pine-900/10 dark:border-brand-gold/15 shadow-sm'
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
              className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-gold/40 group-hover:ring-brand-gold transition-all duration-300 shadow-md group-hover:scale-105"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-brand-cream-50 dark:ring-brand-pine-950" />
          </div>

          <div className="flex flex-col text-start">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-brand-pine-900 dark:text-brand-cream-ivory flex items-center gap-2">
              {lang === 'ar' ? 'يوسف البدري' : 'Youssef El-Badry'}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-gold/15 text-brand-gold dark:text-brand-gold border border-brand-gold/30">
                {lang === 'ar' ? 'متاح للعمل' : 'Available'}
              </span>
            </span>
            <span className="text-[11px] text-brand-pine-700/80 dark:text-brand-pine-500/90 font-mono tracking-wide">
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
              className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-brand-pine-800 hover:text-brand-gold dark:text-brand-cream-200/80 dark:hover:text-brand-gold transition-colors rounded-lg hover:bg-brand-pine-900/5 dark:hover:bg-brand-pine-850"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-brand-pine-900/10 dark:border-brand-pine-800 bg-white/80 dark:bg-brand-pine-900 hover:bg-brand-cream-200/60 dark:hover:bg-brand-pine-850 text-brand-pine-900 dark:text-brand-cream-ivory transition-all duration-200 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-brand-gold" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg border border-brand-pine-900/10 dark:border-brand-pine-800 bg-white/80 dark:bg-brand-pine-900 hover:bg-brand-cream-200/60 dark:hover:bg-brand-pine-850 text-brand-pine-900 dark:text-brand-cream-ivory transition-all duration-200 shadow-sm"
          >
            {isDark ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-pine-900" />}
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            href="https://wa.me/201144735499"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-gold hover:bg-brand-gold-hover text-brand-pine-950 font-bold text-xs tracking-wide transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-brand-pine-950 text-brand-gold" />
            <span>{t('nav.hireMe')}</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 text-xs font-bold border border-brand-pine-900/10 dark:border-brand-pine-800 rounded-lg text-brand-pine-900 dark:text-brand-cream-ivory"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 border border-brand-pine-900/10 dark:border-brand-pine-800 rounded-lg text-brand-pine-900 dark:text-brand-cream-ivory"
          >
            {isDark ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-pine-900" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-pine-900 dark:text-brand-cream-ivory rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-brand-cream-50 dark:bg-brand-pine-950 border-b border-brand-pine-900/10 dark:border-brand-pine-800 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-semibold text-brand-pine-900 dark:text-brand-cream-ivory hover:bg-brand-cream-200/50 dark:hover:bg-brand-pine-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/201144735499"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-brand-gold text-brand-pine-950 font-bold text-sm text-center shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('nav.hireMe')} (WhatsApp)</span>
          </a>
        </div>
      )}
    </header>
  );
};
