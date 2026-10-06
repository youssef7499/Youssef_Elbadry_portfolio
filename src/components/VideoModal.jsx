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
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (!project) return null;

  const isVertical = project.format === '9:16';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl">
        {/* Overlay click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative z-10 bg-[#06201A] border-2 border-[#E5A83B]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] w-full ${
            isVertical ? 'max-w-sm sm:max-w-md' : 'max-w-3xl lg:max-w-4xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[#E5A83B]/20 bg-[#092821]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5A83B] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#E5A83B]">
                {lang === 'ar' ? project.clientAr : project.clientEn}
              </span>
              <span className="text-xs text-[#416358]">·</span>
              <span className="text-xs font-mono text-[#F7EFE4] uppercase font-bold">
                {project.format}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-[#0D332B] hover:bg-[#E5A83B] hover:text-[#07231D] text-[#F7EFE4] transition-colors"
              title="Close"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
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
                isVertical ? 'aspect-[9/16] max-h-[58vh] sm:max-h-[65vh] object-cover' : 'aspect-video object-contain'
              }`}
            />

            {/* Play/Pause Center Indicator on Pause */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              >
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center pl-1 shadow-2xl">
                  <Play className="w-6 sm:w-7 h-6 sm:h-7 fill-current" />
                </div>
              </div>
            )}

            {/* Custom Modern Control Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 sm:p-4 opacity-95 transition-opacity">
              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#E5A83B] mb-2 sm:mb-3"
              />

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-[#E5A83B]" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#E5A83B]" />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize className="w-4 h-4 text-[#E5A83B]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details Footer with clean scroll support */}
          <div className="p-3.5 sm:p-5 bg-[#092821] border-t border-[#E5A83B]/20 text-start overflow-y-auto max-h-[22vh]">
            <h3 className="text-sm sm:text-lg font-bold text-[#F7EFE4] tracking-tight">
              {lang === 'ar' ? project.titleAr : project.titleEn}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#A3BFB7] leading-relaxed">
              {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {(lang === 'ar' ? project.tagsAr : project.tagsEn).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30 font-semibold"
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
