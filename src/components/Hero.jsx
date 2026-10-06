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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-200/40 via-transparent to-transparent dark:from-neutral-800/20 dark:via-transparent dark:to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content (Left on LTR / Right on RTL) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-start space-y-6">
            
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                {t('hero.greeting')}
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
                {lang === 'ar' ? (
                  <>
                    <span className="block font-black">{t('hero.name')}</span>
                    <span className="block text-2xl sm:text-4xl font-semibold text-neutral-600 dark:text-neutral-400 mt-2">
                      {t('hero.role')}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block font-editorial italic font-normal text-neutral-800 dark:text-neutral-200">
                      Youssef
                    </span>
                    <span className="block font-black tracking-tight">El-Badry</span>
                    <span className="block text-xl sm:text-2xl font-mono font-medium text-neutral-500 dark:text-neutral-400 mt-2 tracking-normal">
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
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-light"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold text-sm tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center gap-2"
              >
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/201144735499"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/80 text-neutral-900 dark:text-white font-semibold text-sm tracking-wide active:scale-95 transition-all flex items-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>{t('hero.ctaSecondary')}</span>
              </a>
            </motion.div>

            {/* Quick Highlights / Proof Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-neutral-200 dark:border-neutral-800/80"
            >
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-950 dark:text-white">3</span>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {lang === 'ar' ? 'مؤسسات كبرى' : 'Islamic Institutes'}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-950 dark:text-white">50M+</span>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {lang === 'ar' ? 'مشاهدات محققة' : 'Platform Views'}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-950 dark:text-white">300+</span>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {lang === 'ar' ? 'فيديو منجز' : 'Videos Delivered'}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">68%+</span>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
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
            {/* Decorative Studio Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-neutral-900 shadow-2xl aspect-[4/5] sm:aspect-[3/4] cursor-pointer"
                 onClick={() => onOpenShowreel && onOpenShowreel()}>
              
              {/* Looping ambient showreel */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/videos/Where Is Allah.mp4"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-black/30 pointer-events-none" />

              {/* Top Bar with Badge & Audio Toggle */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
                <div className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>SHOWREEL 2026</span>
                </div>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 pl-0.5">
                  <Play className="w-6 h-6 fill-current" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 inset-x-4 z-20 text-white">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  {lang === 'ar' ? 'انقر لتشغيل العرض الكامل' : 'Click to Watch Full Showreel'}
                </p>
                <h4 className="text-base font-bold tracking-tight text-white mt-0.5">
                  {lang === 'ar' ? 'ملخص أفضل الأعمال والإنتاجات' : 'Selected Visual Highlights'}
                </h4>
              </div>
            </div>

            {/* Floating Editorial Stamp Badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-start">
                <p className="text-xs font-bold text-neutral-900 dark:text-white">
                  {lang === 'ar' ? 'محتوى متوافق مع الهوية' : 'Institution Certified'}
                </p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
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
