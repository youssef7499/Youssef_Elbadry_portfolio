import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, MessageCircle, ArrowDown, Sparkles, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = ({ onOpenShowreel }) => {
  const { lang, t, isRTL } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Radial Glow in Logo Colors (Deep Pine & Golden Amber) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-gold/10 dark:bg-brand-gold/[0.08] rounded-full blur-[120px] pointer-events-none animate-glow" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-brand-pine-600/10 dark:bg-brand-pine-500/[0.08] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content (Left on LTR / Right on RTL) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-start space-y-6">
            
            {/* Top Pill Badge with Logo Emblem */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider border border-brand-gold/30 bg-brand-cream-100/80 dark:bg-brand-pine-850/80 text-brand-pine-900 dark:text-brand-cream-ivory w-fit shadow-sm"
            >
              <img
                src="/logo.jpg"
                alt="Logo"
                className="w-4 h-4 rounded-full ring-1 ring-brand-gold"
              />
              <span className="text-brand-gold font-bold">★</span>
              <span>{t('hero.badge')}</span>
            </motion.div>

            {/* Main Headline styled with Logo Typography & Accents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-brand-pine-700 dark:text-brand-gold font-semibold">
                {t('hero.greeting')}
              </p>
              
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-brand-pine-950 dark:text-brand-cream-ivory leading-[1.08]">
                {lang === 'ar' ? (
                  <>
                    <span className="block font-black text-brand-cream-50 dark:text-brand-cream-ivory">
                      يوسف
                    </span>
                    <span className="block font-black text-brand-gold drop-shadow-sm">
                      البدري
                    </span>
                    <span className="block text-xl sm:text-3xl font-semibold text-brand-pine-700 dark:text-brand-cream-300/80 mt-2">
                      {t('hero.role')}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block font-editorial italic font-normal text-brand-pine-900 dark:text-brand-cream-ivory">
                      Youssef
                    </span>
                    <span className="block font-black tracking-tight text-brand-gold">
                      El-Badry
                    </span>
                    <span className="block text-xl sm:text-2xl font-mono font-medium text-brand-pine-700 dark:text-brand-cream-300/70 mt-2 tracking-normal">
                      // {t('hero.role')}
                    </span>
                  </>
                )}
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-brand-pine-800/90 dark:text-brand-cream-200/90 leading-relaxed max-w-2xl font-light"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-brand-pine-950 font-bold text-sm tracking-wide active:scale-95 transition-all shadow-lg shadow-brand-gold/20 flex items-center gap-2"
              >
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="https://wa.me/201144735499"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl border border-brand-pine-900/15 dark:border-brand-gold/30 bg-white/70 dark:bg-brand-pine-850/80 hover:bg-white dark:hover:bg-brand-pine-800 text-brand-pine-950 dark:text-brand-cream-ivory font-bold text-sm tracking-wide active:scale-95 transition-all flex items-center gap-2.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                <span>{t('hero.ctaSecondary')}</span>
              </a>
            </motion.div>

            {/* Quick Highlights / Proof Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-brand-pine-900/10 dark:border-brand-pine-800"
            >
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-brand-gold">3</span>
                <p className="text-xs text-brand-pine-700 dark:text-brand-cream-300/70 font-medium">
                  {lang === 'ar' ? 'مؤسسات إسلامية' : 'Islamic Institutes'}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-brand-pine-950 dark:text-brand-cream-ivory">50M+</span>
                <p className="text-xs text-brand-pine-700 dark:text-brand-cream-300/70 font-medium">
                  {lang === 'ar' ? 'مشاهدات محققة' : 'Platform Views'}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-brand-pine-950 dark:text-brand-cream-ivory">300+</span>
                <p className="text-xs text-brand-pine-700 dark:text-brand-cream-300/70 font-medium">
                  {lang === 'ar' ? 'فيديو منجز' : 'Videos Delivered'}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-brand-gold">68%+</span>
                <p className="text-xs text-brand-pine-700 dark:text-brand-cream-300/70 font-medium">
                  {lang === 'ar' ? 'متوسط البقاء' : 'Avg. Retention'}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Showreel Preview Frame (Right on LTR / Left on RTL) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative group"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-gold/30 to-brand-pine-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none" />

            {/* Decorative Studio Frame */}
            <div
              className="relative rounded-2xl overflow-hidden border-2 border-brand-gold/30 dark:border-brand-gold/40 bg-brand-pine-950 shadow-2xl aspect-[4/5] sm:aspect-[3/4] cursor-pointer"
              onClick={() => onOpenShowreel && onOpenShowreel()}
            >
              {/* Actual Video Stream */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/videos/Where Is Allah.mp4"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-pine-950 via-brand-pine-950/20 to-black/30 pointer-events-none" />

              {/* Top Bar with Badge & Audio Toggle */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
                <div className="px-3 py-1 rounded-md bg-brand-pine-950/80 backdrop-blur-md border border-brand-gold/30 text-[11px] font-mono text-brand-cream-ivory flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                  <span>SHOWREEL 2026</span>
                </div>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-brand-pine-950/80 hover:bg-brand-pine-900 text-brand-cream-ivory backdrop-blur-md border border-brand-gold/30 transition-colors shadow-md"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-brand-gold" />}
                </button>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-pine-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 pl-0.5">
                  <Play className="w-7 h-7 fill-current" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 inset-x-4 z-20 text-brand-cream-ivory text-start">
                <p className="text-xs font-mono text-brand-gold uppercase tracking-wider font-bold">
                  {lang === 'ar' ? 'انقر لتشغيل العرض الكامل' : 'Click to Watch Full Showreel'}
                </p>
                <h4 className="text-base font-bold tracking-tight text-white mt-0.5">
                  {lang === 'ar' ? 'أفضل إنتاجات المؤسسات الإسلامية واليوتيوب' : 'Featured Institutional Productions'}
                </h4>
              </div>
            </div>

            {/* Floating Identity Stamp with Actual Logo */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white dark:bg-brand-pine-900 border-2 border-brand-gold/40 p-3 sm:p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
              <img
                src="/logo.jpg"
                alt="Youssef El-Badry"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-gold"
              />
              <div className="text-start">
                <p className="text-xs font-extrabold text-brand-pine-950 dark:text-brand-cream-ivory">
                  {lang === 'ar' ? 'يوسف البدري' : 'Youssef El-Badry'}
                </p>
                <p className="text-[10px] text-brand-gold font-mono font-semibold">
                  Bilqalam · IslamRoots · Quran Grace
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
