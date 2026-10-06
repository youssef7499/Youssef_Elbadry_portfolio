import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sliders, Volume2, Sparkles, Eye } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const { lang, t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (beforeVideoRef.current && afterVideoRef.current) {
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
    <section id="before-after" className="py-24 border-t border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6]/60 dark:bg-[#07241E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-3 font-bold">
            <Sliders className="w-3.5 h-3.5" />
            <span>{t('beforeAfter.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
            {t('beforeAfter.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#416358] dark:text-[#A3BFB7]">
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
            className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#E5A83B]/40 bg-black shadow-2xl select-none cursor-ew-resize touch-none"
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
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[#E5A83B] border border-[#E5A83B]/40 text-xs font-mono font-bold flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#E5A83B] animate-pulse" />
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
                  className="w-full h-full object-cover filter saturate-40 contrast-70 brightness-110 sepia-[0.2]"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-neutral-300 border border-white/10 text-xs font-mono font-bold flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-neutral-400" />
                  <span>{t('beforeAfter.beforeLabel')}</span>
                </div>
              </div>
            </div>

            {/* DIVIDER HANDLE */}
            <div
              className="absolute inset-y-0 w-1 bg-[#E5A83B] shadow-[0_0_15px_rgba(229,168,59,0.9)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center shadow-2xl border-2 border-[#07231D] pointer-events-auto">
                <Sliders className="w-5 h-5 rotate-90 stroke-[2.5]" />
              </div>
            </div>

            {/* Drag Hint */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none">
              <span className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[#E5A83B] text-xs font-mono font-bold border border-[#E5A83B]/40 shadow-lg">
                ⟵ {t('beforeAfter.tip')} ⟶
              </span>
            </div>
          </div>

          {/* 3 Features Below */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-white dark:bg-[#0D332B] text-start shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E5A83B]/10 border border-[#E5A83B]/30 flex items-center justify-center text-[#E5A83B] mb-3">
                  {i === 0 ? <Sparkles className="w-4 h-4" /> : i === 1 ? <Volume2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </div>
                <h4 className="text-sm font-bold text-[#07231D] dark:text-[#F7EFE4]">
                  {feat.title}
                </h4>
                <p className="mt-1.5 text-xs text-[#416358] dark:text-[#C5D8D2] leading-relaxed">
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
