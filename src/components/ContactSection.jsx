import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Mail, Instagram, Copy, Check, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  const { lang, t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = "youssefalbadry02@gmail.com";
  const whatsappNumber = "+201144735499";
  const whatsappUrl = "https://wa.me/201144735499";
  const instagramUrl = "https://instagram.com/youssef.elbadry_0";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-200/60 dark:bg-neutral-800/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('contact.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {t('contact.title')}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: WhatsApp (Primary direct route) */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="p-7 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30 transition-all flex flex-col justify-between text-start group shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-6 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                {lang === 'ar' ? 'الرد الأسرع' : 'Instant Messaging'}
              </span>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white mt-1">
                WhatsApp
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-mono">
                {whatsappNumber}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                {t('contact.whatsappSub')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>{t('contact.whatsappBtn')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* Card 2: Email Copy */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all flex flex-col justify-between text-start shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                {lang === 'ar' ? 'البريد الرسمي' : 'Inquiries & Retainers'}
              </span>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white mt-1">
                Email
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 font-mono break-all">
                {email}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {t('contact.emailCopied')}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-500" />
                    <span>{t('contact.copyEmail')}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Card 3: Instagram */}
          <motion.a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all flex flex-col justify-between text-start group shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                {lang === 'ar' ? 'المعرض اليومي' : 'Social & Behind The Scenes'}
              </span>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white mt-1">
                Instagram
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 font-mono">
                {t('contact.instagramUser')}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                {lang === 'ar' ? 'شاهد كواليس المونتاج وأحدث المقاطع' : 'Watch reels, breakdowns & updates'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white">
              <span>{t('contact.instagramBtn')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

        </div>

        {/* Location & Status Banner */}
        <div className="mt-12 text-center text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
          <span>{t('contact.location')}</span>
        </div>

      </div>
    </section>
  );
};
