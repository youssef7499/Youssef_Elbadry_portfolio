import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import { VideoModal } from './VideoModal';
import { Play, Eye, Clock, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectShowcase = () => {
  const { lang, t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const touchStartRef = useRef(0);

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'shorts') return p.category === 'shorts';
    if (activeFilter === 'youtube') return p.category === 'youtube';
    if (activeFilter === 'documentary') return p.category === 'documentary';
    return true;
  });

  const filterTabs = [
    { id: 'all', label: t('projects.filterAll') },
    { id: 'shorts', label: t('projects.filterShorts') },
    { id: 'youtube', label: t('projects.filterYoutube') },
    { id: 'documentary', label: t('projects.filterDocumentary') },
  ];

  // Reset to first card when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setTrackOffset(0);
  }, [activeFilter]);

  // Recalculate track offset whenever currentIndex or filtered projects change
  useEffect(() => {
    if (cardRefs.current[currentIndex]) {
      const cardEl = cardRefs.current[currentIndex];
      setTrackOffset(cardEl.offsetLeft);
    } else {
      setTrackOffset(0);
    }
  }, [currentIndex, filteredProjects.length]);

  // Handle window resize recalculation
  useEffect(() => {
    const handleResize = () => {
      if (cardRefs.current[currentIndex]) {
        setTrackOffset(cardRefs.current[currentIndex].offsetLeft);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < filteredProjects.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    // Minimum swipe threshold of 45px
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swiped Left
        if (isRTL) handlePrev();
        else handleNext();
      } else {
        // Swiped Right
        if (isRTL) handleNext();
        else handlePrev();
      }
    }
  };

  return (
    <section id="projects" className="pt-14 pb-12 sm:pt-20 sm:pb-16 relative bg-[#FAF7F2] dark:bg-[#06201A] overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#E5A83B]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-5 text-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-2 font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>{t('projects.badge')}</span>
            </div>
            
            <div className="flex items-center gap-3.5 flex-wrap">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
                {t('projects.title')}
              </h2>
              {/* Dynamic Project Counter Badge */}
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30 shadow-sm">
                {String(currentIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-[#416358] dark:text-[#A3BFB7]">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Desktop Filter Tabs & Desktop Arrow Controls (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Filter Tabs on Desktop */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6] dark:bg-[#092821] shadow-sm">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#E5A83B] text-[#07231D] shadow-md font-black'
                      : 'text-[#416358] dark:text-[#A3BFB7] hover:text-[#E5A83B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-10 h-10 rounded-xl border-2 border-[#E5A83B]/40 bg-white dark:bg-[#0D332B] text-[#E5A83B] flex items-center justify-center transition-all duration-200 shadow-md ${
                  currentIndex === 0
                    ? 'opacity-35 cursor-not-allowed'
                    : 'hover:bg-[#E5A83B] hover:text-[#07231D] active:scale-95 cursor-pointer'
                }`}
                title={lang === 'ar' ? 'السابق' : 'Previous'}
              >
                {isRTL ? <ChevronRight className="w-5 h-5 stroke-[2.5]" /> : <ChevronLeft className="w-5 h-5 stroke-[2.5]" />}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredProjects.length - 1}
                className={`w-10 h-10 rounded-xl border-2 border-[#E5A83B]/40 bg-white dark:bg-[#0D332B] text-[#E5A83B] flex items-center justify-center transition-all duration-200 shadow-md ${
                  currentIndex === filteredProjects.length - 1
                    ? 'opacity-35 cursor-not-allowed'
                    : 'hover:bg-[#E5A83B] hover:text-[#07231D] active:scale-95 cursor-pointer'
                }`}
                title={lang === 'ar' ? 'التالي' : 'Next'}
              >
                {isRTL ? <ChevronLeft className="w-5 h-5 stroke-[2.5]" /> : <ChevronRight className="w-5 h-5 stroke-[2.5]" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SPECIFIC: Full-Width Clean Scrollable Filter Tabs */}
        <div className="md:hidden w-full mb-3">
          <div className="w-full overflow-x-auto no-scrollbar scroll-smooth touch-pan-x py-1.5 px-2 flex items-center gap-2 border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6] dark:bg-[#092821] rounded-xl shadow-sm">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#E5A83B] text-[#07231D] shadow-md font-black'
                    : 'text-[#416358] dark:text-[#A3BFB7] hover:text-[#E5A83B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE SPECIFIC: Dedicated Video Navigation Bar (Clear, not stuck under filters) */}
        <div className="md:hidden flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-mono font-bold text-[#E5A83B] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E5A83B] animate-pulse" />
            <span>{t('projects.mobileNavHint')}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-9 h-9 rounded-lg border-2 border-[#E5A83B]/40 bg-white dark:bg-[#0D332B] text-[#E5A83B] flex items-center justify-center transition-all shadow-sm ${
                currentIndex === 0 ? 'opacity-30' : 'active:scale-90 text-[#E5A83B]'
              }`}
              title="Previous"
            >
              {isRTL ? <ChevronRight className="w-4 h-4 stroke-[2.5]" /> : <ChevronLeft className="w-4 h-4 stroke-[2.5]" />}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredProjects.length - 1}
              className={`w-9 h-9 rounded-lg border-2 border-[#E5A83B]/40 bg-white dark:bg-[#0D332B] text-[#E5A83B] flex items-center justify-center transition-all shadow-sm ${
                currentIndex === filteredProjects.length - 1 ? 'opacity-30' : 'active:scale-90 text-[#E5A83B]'
              }`}
              title="Next"
            >
              {isRTL ? <ChevronLeft className="w-4 h-4 stroke-[2.5]" /> : <ChevronRight className="w-4 h-4 stroke-[2.5]" />}
            </button>
          </div>
        </div>

      </div>

      {/* CAROUSEL TRACK (Pure Arrow & Touch Swipe - Trackpad/mouse wheel horizontal scroll locked) */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden select-none"
      >
        {/* Floating Side Left Arrow (Desktop Only) */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-[#E5A83B]/50 bg-[#06201A]/90 backdrop-blur-md text-[#E5A83B] items-center justify-center transition-all shadow-xl ${
            currentIndex === 0
              ? 'opacity-0 pointer-events-none'
              : 'hover:bg-[#E5A83B] hover:text-[#07231D] hover:scale-110 active:scale-95 cursor-pointer'
          }`}
          title="Previous"
        >
          {isRTL ? <ChevronRight className="w-6 h-6 stroke-[2.5]" /> : <ChevronLeft className="w-6 h-6 stroke-[2.5]" />}
        </button>

        {/* Floating Side Right Arrow (Desktop Only) */}
        <button
          onClick={handleNext}
          disabled={currentIndex === filteredProjects.length - 1}
          className={`hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-[#E5A83B]/50 bg-[#06201A]/90 backdrop-blur-md text-[#E5A83B] items-center justify-center transition-all shadow-xl ${
            currentIndex === filteredProjects.length - 1
              ? 'opacity-0 pointer-events-none'
              : 'hover:bg-[#E5A83B] hover:text-[#07231D] hover:scale-110 active:scale-95 cursor-pointer'
          }`}
          title="Next"
        >
          {isRTL ? <ChevronLeft className="w-6 h-6 stroke-[2.5]" /> : <ChevronRight className="w-6 h-6 stroke-[2.5]" />}
        </button>

        {/* Framer Motion Smooth Sliding Track */}
        <motion.div
          animate={{ x: isRTL ? trackOffset : -trackOffset }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          className="flex items-stretch gap-6 px-4 sm:px-8 lg:px-16 pb-4 pt-1"
        >
          {filteredProjects.map((project, index) => {
            const isWide = project.format === '16:9';
            return (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`flex-shrink-0 transition-all duration-300 ${
                  isWide
                    ? 'w-[340px] sm:w-[460px] lg:w-[500px]'
                    : 'w-[270px] sm:w-[310px] lg:w-[330px]'
                } ${
                  index === currentIndex
                    ? 'scale-100 opacity-100 ring-2 ring-[#E5A83B]/50 rounded-2xl'
                    : 'scale-[0.98] opacity-80'
                }`}
              >
                <VideoCard
                  project={project}
                  index={index}
                  lang={lang}
                  t={t}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Controls: Step Dots & Live Arrow Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-5 flex items-center justify-between gap-4">
        {/* Step Dots */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filteredProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? 'w-7 bg-[#E5A83B] shadow-[0_0_10px_rgba(229,168,59,0.8)]'
                  : 'w-2 bg-[#07231D]/20 dark:bg-[#0D332B] hover:bg-[#E5A83B]/60'
              }`}
              title={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Live Project Indicator */}
        <span className="text-xs font-mono font-bold text-[#416358] dark:text-[#A3BFB7]">
          {currentIndex + 1} / {filteredProjects.length}
        </span>
      </div>

      {/* Full-Screen Modal Player */}
      {selectedProject && (
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

const VideoCard = ({ project, index, lang, t, onClick }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isVertical = project.format === '9:16';

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0.001;
    }
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border-2 border-[#07231D]/10 dark:border-[#E5A83B]/25 hover:border-[#E5A83B] dark:hover:border-[#E5A83B] bg-white dark:bg-[#0D332B] shadow-xl hover:shadow-[0_15px_35px_rgba(229,168,59,0.25)] transition-all duration-300 flex flex-col cursor-pointer select-none h-full"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Frame */}
      <div
        className={`relative w-full overflow-hidden bg-[#041612] ${
          isVertical ? 'aspect-[9/13]' : 'aspect-video'
        }`}
      >
        <video
          ref={videoRef}
          src={`${project.videoUrl}#t=0.001`}
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/40 pointer-events-none group-hover:opacity-75 transition-opacity" />

        {/* Index Corner Badge & Format */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-black bg-[#E5A83B] text-[#07231D] shadow-md">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase backdrop-blur-md ${
            isVertical ? 'bg-black/75 text-white border border-white/20' : 'bg-[#E5A83B]/90 text-[#07231D] font-black'
          }`}>
            {project.format}
          </span>
        </div>

        {/* Client Tag (Top Right) */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#07241E]/95 text-[#F7EFE4] border border-[#E5A83B]/40 backdrop-blur-md truncate max-w-[140px] block">
            {lang === 'ar' ? project.clientAr : project.clientEn}
          </span>
        </div>

        {/* Center Play Icon with Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-13 h-13 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center pl-0.5 shadow-2xl transition-all duration-300 ${
              isHovered
                ? 'scale-115 shadow-[0_0_25px_rgba(229,168,59,0.8)]'
                : 'scale-90 opacity-90'
            }`}
          >
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>

        {/* Bottom Overlay Info (Views & Duration) */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between text-white text-[11px] font-mono">
          <span className="flex items-center gap-1 bg-black/75 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10 font-bold">
            <Eye className="w-3.5 h-3.5 text-[#E5A83B]" />
            <span>{project.views}</span>
          </span>
          <span className="flex items-center gap-1 bg-black/75 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10 font-bold">
            <Clock className="w-3.5 h-3.5 text-[#E5A83B]" />
            <span>{project.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 text-start bg-white dark:bg-[#0D332B] transition-colors">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#07231D] dark:text-[#F7EFE4] group-hover:text-[#E5A83B] dark:group-hover:text-[#E5A83B] transition-colors line-clamp-1">
            {lang === 'ar' ? project.titleAr : project.titleEn}
          </h3>
          <p className="mt-1.5 text-xs text-[#416358] dark:text-[#A3BFB7] line-clamp-2 leading-relaxed">
            {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-[#07231D]/10 dark:border-[#E5A83B]/15">
          {(lang === 'ar' ? project.tagsAr : project.tagsEn).map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
