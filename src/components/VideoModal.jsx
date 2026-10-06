import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoModal = ({ project, onClose }) => {
  const { lang } = useLanguage();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (!project) return null;

  const isVertical = project.format === '9:16';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-pine-950/90 backdrop-blur-2xl">
        {/* Overlay click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative z-10 bg-brand-pine-950 border-2 border-brand-gold/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] w-full ${
            isVertical ? 'max-w-md' : 'max-w-4xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-brand-gold/20 bg-brand-pine-900/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs font-mono font-bold text-brand-gold">
                {lang === 'ar' ? project.clientAr : project.clientEn}
              </span>
              <span className="text-xs text-brand-pine-600">·</span>
              <span className="text-xs font-mono text-brand-cream-ivory uppercase">
                {project.format}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-brand-pine-850 hover:bg-brand-gold hover:text-brand-pine-950 text-brand-cream-ivory transition-colors"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Container */}
          <div className="relative bg-black flex items-center justify-center overflow-hidden flex-1 group">
            <video
              ref={videoRef}
              src={project.videoUrl}
              autoPlay
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className={`w-full cursor-pointer ${
                isVertical ? 'aspect-[9/16] max-h-[65vh] object-cover' : 'aspect-video object-contain'
              }`}
            />

            {/* Play/Pause Center Indicator on Pause */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-pine-950 flex items-center justify-center pl-1 shadow-2xl">
                  <Play className="w-7 h-7 fill-current" />
                </div>
              </div>
            )}

            {/* Custom Modern Control Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 opacity-95 transition-opacity">
              {/* Progress Slider in Brand Gold */}
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#E5A83B] mb-3"
              />

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-brand-gold" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-brand-gold" />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize className="w-4 h-4 text-brand-gold" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details Footer */}
          <div className="p-4 sm:p-5 bg-brand-pine-900 border-t border-brand-gold/20 text-start">
            <h3 className="text-base sm:text-lg font-bold text-brand-cream-ivory tracking-tight">
              {lang === 'ar' ? project.titleAr : project.titleEn}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-brand-cream-300/80 leading-relaxed">
              {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(lang === 'ar' ? project.tagsAr : project.tagsEn).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-brand-gold/15 text-brand-gold border border-brand-gold/30 font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
