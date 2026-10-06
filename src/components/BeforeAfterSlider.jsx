import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sliders, Volume2, VolumeX, Sparkles, Eye, Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const { lang, t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioMode, setAudioMode] = useState('after'); // 'before' (Raw mic) or 'after' (Master sound)
  const [isMuted, setIsMuted] = useState(true); // Default muted for guaranteed browser autoplay
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef(null);
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  // Directly load Youssef's verified 1440x2560 vertical reels
  const beforeSrc = '/videos/compare-before.mp4';
  const afterSrc = '/videos/compare-after.mp4';

  // Apply audio states to native DOM elements
  const updateAudio = useCallback((muted, mode) => {
    const bVid = beforeVideoRef.current;
    const aVid = afterVideoRef.current;
    if (!bVid || !aVid) return;

    if (muted) {
      bVid.muted = true;
      aVid.muted = true;
    } else {
      if (mode === 'before') {
        bVid.muted = false;
        bVid.volume = 1.0;
        aVid.muted = true;
      } else {
        bVid.muted = true;
        aVid.muted = false;
        aVid.volume = 1.0;
      }
    }
  }, []);

  // Update audio when state changes
  useEffect(() => {
    updateAudio(isMuted, audioMode);
  }, [isMuted, audioMode, updateAudio]);

  // Video playback synchronization & loop management
  useEffect(() => {
    const bVid = beforeVideoRef.current;
    const aVid = afterVideoRef.current;
    if (!bVid || !aVid) return;

    // Direct DOM property enforcement so browsers allow autoplay
    bVid.muted = true;
    aVid.muted = true;

    // Resync when drift exceeds 350ms (avoid tight loops that freeze video decoders)
    const handleTimeUpdate = () => {
      if (!aVid.seeking && Math.abs(bVid.currentTime - aVid.currentTime) > 0.35) {
        aVid.currentTime = bVid.currentTime;
      }
    };

    // Keep loop in sync
    const handleSeeked = () => {
      if (!aVid.seeking && Math.abs(bVid.currentTime - aVid.currentTime) > 0.15) {
        aVid.currentTime = bVid.currentTime;
      }
    };

    // If main video pauses to buffer, pause slave video too
    const handleWaiting = () => {
      if (!aVid.paused) aVid.pause();
    };

    // When main video resumes from buffer, resume slave video
    const handlePlaying = () => {
      if (aVid.paused && isPlaying) aVid.play().catch(() => {});
      setIsPlaying(true);
    };

    const handlePlay = () => {
      aVid.play().catch(() => {});
      setIsPlaying(true);
    };

    const handlePause = () => {
      aVid.pause();
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    bVid.addEventListener('timeupdate', handleTimeUpdate);
    bVid.addEventListener('seeked', handleSeeked);
    bVid.addEventListener('waiting', handleWaiting);
    bVid.addEventListener('playing', handlePlaying);
    bVid.addEventListener('play', handlePlay);
    bVid.addEventListener('pause', handlePause);
    bVid.addEventListener('canplay', handleCanPlay);

    // Initial play trigger
    const startPlay = async () => {
      try {
        await bVid.play();
        await aVid.play();
        setIsPlaying(true);
      } catch {
        // Autoplay policy prevented playback, wait for user gesture
        setIsPlaying(false);
      }
    };
    startPlay();

    return () => {
      bVid.removeEventListener('timeupdate', handleTimeUpdate);
      bVid.removeEventListener('seeked', handleSeeked);
      bVid.removeEventListener('waiting', handleWaiting);
      bVid.removeEventListener('playing', handlePlaying);
      bVid.removeEventListener('play', handlePlay);
      bVid.removeEventListener('pause', handlePause);
      bVid.removeEventListener('canplay', handleCanPlay);
    };
  }, [isPlaying]);

  const togglePlayPause = (e) => {
    if (e) e.stopPropagation();
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

  const restartVideo = (e) => {
    if (e) e.stopPropagation();
    const bVid = beforeVideoRef.current;
    const aVid = afterVideoRef.current;
    if (!bVid || !aVid) return;

    bVid.currentTime = 0;
    aVid.currentTime = 0;
    bVid.play().catch(() => {});
    aVid.play().catch(() => {});
    setIsPlaying(true);
  };

  const toggleSound = (e) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    updateAudio(nextMuted, audioMode);
  };

  const toggleAudioMode = (e) => {
    if (e) e.stopPropagation();
    const nextMode = audioMode === 'after' ? 'before' : 'after';
    setAudioMode(nextMode);
    if (isMuted) setIsMuted(false);
    updateAudio(false, nextMode);
  };

  // Slider position handler with auto audio mode switching
  const handlePositionChange = (pct) => {
    const clamped = Math.max(0, Math.min(100, pct));
    setSliderPosition(clamped);

    // Automatically switch audio between Raw mic and Master sound based on which side is prominent
    if (!isMuted) {
      if (clamped > 55 && audioMode !== 'before') {
        setAudioMode('before');
      } else if (clamped < 45 && audioMode !== 'after') {
        setAudioMode('after');
      }
    }
  };

  // Pointer event handler for container dragging / clicking
  const handlePointer = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    handlePositionChange(pct);
  };

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointer(e);
  };

  const handlePointerMove = (e) => {
    if (e.buttons === 1) {
      handlePointer(e);
    }
  };

  const features = t('beforeAfter.features') || [];

  return (
    <section id="before-after" className="pt-10 pb-16 sm:pt-14 sm:pb-20 border-t border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6]/60 dark:bg-[#07241E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-8 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-2.5 font-bold">
            <Sliders className="w-3.5 h-3.5" />
            <span>{t('beforeAfter.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
            {t('beforeAfter.title')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#416358] dark:text-[#A3BFB7]">
            {t('beforeAfter.subtitle')}
          </p>
        </div>

        {/* Comparison Stage Container (Adaptive 9:16 Vertical Reel Box) */}
        <div className="max-w-[340px] sm:max-w-[380px] md:max-w-[420px] mx-auto">
          
          {/* Quick Toolbar above video */}
          <div className="mb-3 flex items-center justify-between text-xs font-mono flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              {/* Play / Pause */}
              <button
                onClick={togglePlayPause}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#0D332B] border border-[#07231D]/10 dark:border-[#E5A83B]/30 text-[#07231D] dark:text-[#F7EFE4] font-bold hover:bg-[#E5A83B] hover:text-[#07231D] transition-colors shadow-sm cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? (lang === 'ar' ? 'إيقاف' : 'Pause') : (lang === 'ar' ? 'تشغيل' : 'Play')}</span>
              </button>

              {/* Mute / Unmute */}
              <button
                onClick={toggleSound}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#0D332B] border border-[#07231D]/10 dark:border-[#E5A83B]/30 text-[#07231D] dark:text-[#F7EFE4] font-bold hover:bg-[#E5A83B] hover:text-[#07231D] transition-colors shadow-sm cursor-pointer"
                title="Mute / Unmute"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#E5A83B]" />}
                <span>{isMuted ? (lang === 'ar' ? 'تشغيل الصوت' : 'Unmute') : (lang === 'ar' ? 'كتم الصوت' : 'Mute')}</span>
              </button>

              {/* Restart */}
              <button
                onClick={restartVideo}
                className="p-1.5 rounded-lg bg-white dark:bg-[#0D332B] border border-[#07231D]/10 dark:border-[#E5A83B]/30 text-[#07231D] dark:text-[#F7EFE4] hover:bg-[#E5A83B] hover:text-[#07231D] transition-colors shadow-sm cursor-pointer"
                title={lang === 'ar' ? 'إعادة من البداية' : 'Restart'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Audio Mode Switch (When Unmuted) */}
            <div className="flex items-center gap-1.5">
              {!isMuted ? (
                <button
                  onClick={toggleAudioMode}
                  className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-[#E5A83B]/20 text-[#E5A83B] border border-[#E5A83B]/40 hover:bg-[#E5A83B] hover:text-[#07231D] transition-colors cursor-pointer"
                  title="Switch audio channel"
                >
                  {audioMode === 'after'
                    ? (lang === 'ar' ? 'صوت الماستر (بعد)' : 'Master Audio')
                    : (lang === 'ar' ? 'صوت الكاميرا (قبل)' : 'Camera Mic')}
                </button>
              ) : (
                <span className="text-[10px] text-[#416358] dark:text-[#A3BFB7] font-mono">
                  9:16 Vertical Reel
                </span>
              )}
            </div>
          </div>

          {/* Interactive Split Frame Container (100% Pixel-Locked via clip-path) */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#E5A83B]/50 bg-black shadow-2xl select-none cursor-ew-resize touch-none"
            style={{ direction: 'ltr' }} // Locked to physical LTR coordinates for 100% cross-browser accuracy
          >
            {/* UNDER LAYER: "AFTER" (Final Graded Cut & Master Sound) */}
            <div className="absolute inset-0 w-full h-full bg-black overflow-hidden pointer-events-none">
              <video
                ref={afterVideoRef}
                src={afterSrc}
                autoPlay
                loop
                muted={isMuted || audioMode !== 'after'}
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              
              {/* After Label (Right Side) */}
              <div className="absolute top-3.5 right-3.5 z-20 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[#E5A83B] border border-[#E5A83B]/40 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#E5A83B] animate-pulse" />
                <span>{t('beforeAfter.afterLabel')}</span>
              </div>
            </div>

            {/* TOP LAYER: "BEFORE" (Raw Flat Log Footage & Raw Mic) */}
            {/* Clipped perfectly using CSS polygon - zero shifts, zero RTL math bugs */}
            <div
              className="absolute inset-0 w-full h-full bg-black overflow-hidden pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              }}
            >
              <video
                ref={beforeVideoRef}
                src={beforeSrc}
                autoPlay
                loop
                muted={isMuted || audioMode !== 'before'}
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              
              {/* Before Label (Left Side) */}
              <div className="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-neutral-200 border border-white/25 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-neutral-400" />
                <span>{t('beforeAfter.beforeLabel')}</span>
              </div>
            </div>

            {/* GLOWING DIVIDER LINE & GOLD CENTER PILL */}
            <div
              className="absolute inset-y-0 w-0.5 sm:w-1 bg-[#E5A83B] shadow-[0_0_15px_rgba(229,168,59,0.95)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Center Grab Handle Circle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center shadow-2xl border-2 border-[#07231D] pointer-events-none">
                <div className="flex items-center -space-x-1">
                  <ChevronLeft className="w-4 h-4 stroke-[3]" />
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </div>
              </div>
            </div>

            {/* Bottom Drag Hint Overlay */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#E5A83B] text-[10px] sm:text-xs font-mono font-bold border border-[#E5A83B]/40 shadow-lg">
                ⟵ {t('beforeAfter.tip')} ⟶
              </span>
            </div>

            {/* Big Central Play Overlay (When Paused / Blocked by browser) */}
            {!isPlaying && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 z-30 bg-black/50 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity"
              >
                <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-black/80 border-2 border-[#E5A83B]/50 shadow-2xl">
                  <div className="w-14 h-14 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center pl-1 shadow-lg shadow-[#E5A83B]/30 hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 fill-current" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#E5A83B]">
                    {lang === 'ar' ? 'دوس هنا وشوف المقارنة شغالة' : 'Click to Play Comparison'}
                  </span>
                </div>
              </div>
            )}

            {/* Invisible Range Slider (Guarantees Native Drag & Touch & Keyboard on all devices) */}
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={sliderPosition}
              onChange={(e) => handlePositionChange(parseFloat(e.target.value))}
              aria-label="Before and after video comparison slider"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
            />
          </div>

          {/* 3 Value Pillars Below */}
          <div className="mt-6 grid grid-cols-1 gap-3.5">
            {features.map((feat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-white dark:bg-[#0D332B] text-start shadow-sm flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E5A83B]/10 border border-[#E5A83B]/30 flex items-center justify-center text-[#E5A83B] flex-shrink-0 mt-0.5">
                  {i === 0 ? <Sparkles className="w-4 h-4" /> : i === 1 ? <Volume2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#07231D] dark:text-[#F7EFE4]">
                    {feat.title}
                  </h4>
                  <p className="mt-1 text-[11px] sm:text-xs text-[#416358] dark:text-[#C5D8D2] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
