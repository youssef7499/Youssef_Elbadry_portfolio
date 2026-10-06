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
          ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/60 dark:border-white/10 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-bold text-lg font-mono tracking-tighter group-hover:scale-105 transition-transform duration-200 shadow-sm">
            Y
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              {lang === 'ar' ? 'يوسف البدري' : 'Youssef El-Badry'}
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                {lang === 'ar' ? 'متاح للعمل' : 'Available'}
              </span>
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono tracking-wide">
              {lang === 'ar' ? 'محرر فيديو ومخرج بصري' : 'Lead Video Editor'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions & Toggles */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all duration-200"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            href="https://wa.me/201144735499"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
            <span>{t('nav.hireMe')}</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-1">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 text-xs font-medium border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-300"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-300"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 dark:text-neutral-300 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/201144735499"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm text-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('nav.hireMe')} (WhatsApp)</span>
          </a>
        </div>
      )}
    </header>
  );
};
