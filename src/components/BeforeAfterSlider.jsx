import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sliders, Volume2, VolumeX, Sparkles, Wand2, Eye, Play, Pause } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const { lang, t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioMode, setAudioMode] = useState('after'); // 'before' (Raw mic) or 'after' (Mastered sound)
  const [isMuted, setIsMuted] = useState(true); // Start muted for autostart compliance

  const containerRef = useRef(null);
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  // File paths: Youssef can place 'compare-before.mp4' and 'compare-after.mp4' in public/videos/
  // Fallbacks gracefully to 'Chasing The World.mp4' if the custom files are not yet uploaded.
  const [beforeSrc, setBeforeSrc] = useState('/videos/compare-before.mp4');
  const [afterSrc, setAfterSrc] = useState('/videos/compare-after.mp4');
  const [usingFallback, setUsingFallback] = useState(false);

  // Check if custom comparison files exist, otherwise fallback cleanly
  useEffect(() => {
    fetch('/videos/compare-before.mp4', { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) {
          setBeforeSrc('/videos/Chasing The World.mp4');
          setAfterSrc('/videos/Chasing The World.mp4');
          setUsingFallback(true);
        }
      })
      .catch(() => {
        setBeforeSrc('/videos/Chasing The World.mp4');
        setAfterSrc('/videos/Chasing The World.mp4');
        setUsingFallback(true);
      });
  }, []);

  // Strict frame-by-frame synchronization between both video layers
  useEffect(() => {
    const bVid = beforeVideoRef.current;
    const aVid = afterVideoRef.current;
    if (!bVid || !aVid) return;

    const syncPlayback = () => {
      if (Math.abs(bVid.currentTime - aVid.currentTime) > 0.08) {
        aVid.currentTime = bVid.currentTime;
      }
    };

    const handlePlay = () => {
      aVid.play().catch(() => {});
      setIsPlaying(true);
    };

    const handlePause = () => {
      aVid.pause();
      setIsPlaying(false);
    };

    bVid.addEventListener('timeupdate', syncPlayback);
    bVid.addEventListener('play', handlePlay);
    bVid.addEventListener('pause', handlePause);

    return () => {
      bVid.removeEventListener('timeupdate', syncPlayback);
      bVid.removeEventListener('play', handlePlay);
      bVid.removeEventListener('pause', handlePause);
    };
  }, [beforeSrc, afterSrc]);

  // Audio channel management: Switch sound between Before (Raw mic) and After (Master mix)
  useEffect(() => {
    const bVid = beforeVideoRef.current;
    const aVid = afterVideoRef.current;
    if (!bVid || !aVid) return;

    if (isMuted) {
      bVid.muted = true;
      aVid.muted = true;
    } else {
      if (audioMode === 'before') {
        bVid.muted = false;
        aVid.muted = true;
      } else {
        bVid.muted = true;
        aVid.muted = false;
      }
    }
  }, [audioMode, isMuted]);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    const bVid = beforeVideoRef.current;
    const aVid = afterVideoRef.current;
    if (!bVid || !aVid) return;

    if (isPlaying) {
      bVid.pause();
      aVid.pause();
      setIsPlaying(false);
    } else {
      bVid.play().catch(() => {});
      aVid.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPosition(percentage);

    // Auto-switch audio based on slider side if not muted!
    if (!isMuted) {
      if (percentage > 60 && audioMode !== 'before') {
        setAudioMode('before');
      } else if (percentage < 40 && audioMode !== 'after') {
        setAudioMode('after');
      }
    }
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
        <div className="max-w-3xl mb-10 text-start">
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

        {/* Comparison Stage */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Quick Toolbar above video */}
          <div className="mb-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlayPause}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#0D332B] border border-[#07231D]/10 dark:border-[#E5A83B]/30 text-[#07231D] dark:text-[#F7EFE4] font-bold hover:bg-[#E5A83B] hover:text-[#07231D] transition-colors shadow-sm"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? (lang === 'ar' ? 'إيقاف' : 'Pause') : (lang === 'ar' ? 'تشغيل' : 'Play')}</span>
              </button>

              <button
                onClick={toggleSound}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#0D332B] border border-[#07231D]/10 dark:border-[#E5A83B]/30 text-[#07231D] dark:text-[#F7EFE4] font-bold hover:bg-[#E5A83B] hover:text-[#07231D] transition-colors shadow-sm"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#E5A83B]" />}
                <span>{isMuted ? (lang === 'ar' ? 'تشغيل الصوت' : 'Unmute Audio') : (audioMode === 'after' ? (lang === 'ar' ? 'صوت الماستر (بعد)' : 'Master Audio') : (lang === 'ar' ? 'صوت الكاميرا (قبل)' : 'Raw Camera Audio'))}</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[#416358] dark:text-[#A3BFB7]">
              <span className="w-2 h-2 rounded-full bg-[#E5A83B] animate-pulse" />
              <span>{lang === 'ar' ? 'مزامنة حية للإطارات' : 'Frame-accurate Live Sync'}</span>
            </div>
          </div>

          {/* Interactive Split Frame */}
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
            {/* UNDER LAYER: "AFTER" (Final Color Graded Cut & Master Mix) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                ref={afterVideoRef}
                src={afterSrc}
                autoPlay
                loop
                muted={isMuted || audioMode !== 'after'}
                playsInline
                className={`w-full h-full object-cover ${
                  usingFallback ? 'filter contrast-125 saturate-125 brightness-105' : ''
                }`}
              />
              
              {/* After Label (Right side) */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[#E5A83B] border border-[#E5A83B]/40 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#E5A83B] animate-pulse" />
                <span>{t('beforeAfter.afterLabel')}</span>
              </div>
            </div>

            {/* TOP LAYER: "BEFORE" (Raw Flat Log Footage & Raw Mic) */}
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
                  src={beforeSrc}
                  autoPlay
                  loop
                  muted={isMuted || audioMode !== 'before'}
                  playsInline
                  className={`w-full h-full object-cover ${
                    usingFallback ? 'filter saturate-40 contrast-70 brightness-110 sepia-[0.2]' : ''
                  }`}
                />
                
                {/* Before Label (Left side) */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-neutral-300 border border-white/20 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-neutral-400" />
                  <span>{t('beforeAfter.beforeLabel')}</span>
                </div>
              </div>
            </div>

            {/* DIVIDER HANDLE */}
            <div
              className="absolute inset-y-0 w-1 bg-[#E5A83B] shadow-[0_0_15px_rgba(229,168,59,0.95)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center shadow-2xl border-2 border-[#07231D] pointer-events-auto cursor-grab active:cursor-grabbing">
                <Sliders className="w-5 sm:w-6 h-5 sm:h-6 rotate-90 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Drag Hint */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none">
              <span className="px-3 sm:px-4 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#E5A83B] text-[10px] sm:text-xs font-mono font-bold border border-[#E5A83B]/40 shadow-lg">
                ⟵ {t('beforeAfter.tip')} ⟶
              </span>
            </div>
          </div>

          {/* 3 Value Pillars Below */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
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
