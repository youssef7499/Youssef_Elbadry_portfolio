import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Mail, Instagram, Copy, Check, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  const { lang, t } = useLanguage();
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
    <section id="contact" className="py-20 sm:py-24 border-t border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6]/60 dark:bg-[#07241E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
            {t('contact.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#416358] dark:text-[#A3BFB7] max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: WhatsApp */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="p-7 rounded-2xl border-2 border-[#E5A83B]/40 bg-[#E5A83B]/5 hover:bg-[#E5A83B]/10 dark:bg-[#0D332B] dark:hover:bg-[#092821] transition-all flex flex-col justify-between text-start group shadow-md"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E5A83B] text-[#07231D] flex items-center justify-center mb-6 shadow-lg shadow-[#E5A83B]/25 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E5A83B] font-bold">
                {lang === 'ar' ? 'أسرع تواصل' : 'Instant Messaging'}
              </span>
              <h3 className="text-xl font-bold text-[#07231D] dark:text-[#F7EFE4] mt-1">
                WhatsApp
              </h3>
              <p className="text-xs text-[#416358] dark:text-[#A3BFB7] mt-2 font-mono">
                {whatsappNumber}
              </p>
              <p className="text-xs text-[#416358] dark:text-[#A3BFB7] mt-2">
                {t('contact.whatsappSub')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5A83B]/20 flex items-center justify-between text-xs font-bold text-[#E5A83B]">
              <span>{t('contact.whatsappBtn')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
            </div>
          </motion.a>

          {/* Card 2: Email Copy */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-7 rounded-2xl border border-[#07231D]/10 dark:border-[#E5A83B]/25 bg-white dark:bg-[#0D332B] transition-all flex flex-col justify-between text-start shadow-md"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#07231D] dark:bg-[#092821] text-[#E5A83B] border border-[#E5A83B]/30 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E5A83B] font-bold">
                {lang === 'ar' ? 'إيميل الشغل' : 'Inquiries & Retainers'}
              </span>
              <h3 className="text-xl font-bold text-[#07231D] dark:text-[#F7EFE4] mt-1">
                Email
              </h3>
              <p className="text-xs text-[#07231D] dark:text-[#F7EFE4] mt-2 font-mono break-all font-bold">
                {email}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#07231D]/10 dark:border-[#E5A83B]/20">
              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-3 rounded-lg bg-[#FAF7F2] dark:bg-[#092821] hover:bg-[#E5A83B] hover:text-[#07231D] dark:hover:bg-[#E5A83B] dark:hover:text-[#07231D] text-[#07231D] dark:text-[#F7EFE4] text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {t('contact.emailCopied')}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#E5A83B]" />
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
            className="p-7 rounded-2xl border border-[#07231D]/10 dark:border-[#E5A83B]/25 bg-white dark:bg-[#0D332B] transition-all flex flex-col justify-between text-start group shadow-md"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E5A83B] font-bold">
                {lang === 'ar' ? 'كواليس وفيديوهات' : 'Social & Behind The Scenes'}
              </span>
              <h3 className="text-xl font-bold text-[#07231D] dark:text-[#F7EFE4] mt-1">
                Instagram
              </h3>
              <p className="text-xs text-[#07231D] dark:text-[#F7EFE4] mt-2 font-mono font-bold">
                {t('contact.instagramUser')}
              </p>
              <p className="text-xs text-[#416358] dark:text-[#A3BFB7] mt-2">
                {lang === 'ar' ? 'شوف كواليس المونتاج وأجدد الريلز' : 'Watch reels, breakdowns & updates'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#07231D]/10 dark:border-[#E5A83B]/20 flex items-center justify-between text-xs font-bold text-[#E5A83B]">
              <span>{t('contact.instagramBtn')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
            </div>
          </motion.a>

        </div>

        {/* Location & Status Banner */}
        <div className="mt-12 text-center text-xs font-mono text-[#416358] dark:text-[#A3BFB7] flex items-center justify-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#E5A83B]" />
          <span>{t('contact.location')}</span>
        </div>

      </div>
    </section>
  );
};
