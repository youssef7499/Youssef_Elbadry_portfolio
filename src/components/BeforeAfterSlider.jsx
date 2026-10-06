import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sliders, Volume2, VolumeX, Sparkles, Wand2, Eye } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const { lang, t, isRTL } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioEnhanced, setIsAudioEnhanced] = useState(true);
  const containerRef = useRef(null);
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  // Synchronize playback between both videos
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (beforeVideoRef.current && afterVideoRef.current) {
        // Keep in sync within 0.1s tolerance
        if (Math.abs(beforeVideoRef.current.currentTime - afterVideoRef.current.currentTime) > 0.15) {
          afterVideoRef.current.currentTime = beforeVideoRef.current.currentTime;
        }
      }
    };

    const bVid = beforeVideoRef.current;
    if (bVid) {
      bVid.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (bVid) bVid.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const features = t('beforeAfter.features') || [];

  return (
    <section id="before-after" className="py-24 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-200/60 dark:bg-neutral-800/60 mb-3">
            <Sliders className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('beforeAfter.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            {t('beforeAfter.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            {t('beforeAfter.subtitle')}
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="relative max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-black shadow-2xl select-none cursor-ew-resize"
          >
            {/* UNDER LAYER: "AFTER" (Graded, Vibrant, Cinematic) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                ref={afterVideoRef}
                src="/videos/Chasing The World.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter contrast-125 saturate-125 brightness-105"
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white border border-emerald-500/30 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('beforeAfter.afterLabel')}</span>
              </div>
            </div>

            {/* TOP LAYER: "BEFORE" (Flat Log, Desaturated, Low Contrast) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="relative h-full"
                style={{
                  width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
                }}
              >
                <video
                  ref={beforeVideoRef}
                  src="/videos/Chasing The World.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter saturate-50 contrast-75 brightness-110 sepia-[0.15]"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-neutral-300 border border-white/10 text-xs font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-400" />
                  <span>{t('beforeAfter.beforeLabel')}</span>
                </div>
              </div>
            </div>

            {/* DIVIDER HANDLE */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-xl border-2 border-neutral-900 pointer-events-auto">
                <Sliders className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* Drag Hint at the bottom */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-neutral-300 text-xs font-mono border border-white/10">
                ⟵ {t('beforeAfter.tip')} ⟶
              </span>
            </div>
          </div>

          {/* 3 Pill Features Below */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-start"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white mb-3">
                  {i === 0 ? <Sparkles className="w-4 h-4 text-amber-500" /> : i === 1 ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <Eye className="w-4 h-4 text-blue-500" />}
                </div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {feat.title}
                </h4>
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
