import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import { VideoModal } from './VideoModal';
import { Play, Eye, Clock, Film, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectShowcase = () => {
  const { lang, t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const carouselRef = useRef(null);

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

  // Update scroll indicators and current index
  const updateScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    // In RTL, scrollLeft can be negative or inverted depending on browser implementation
    const maxScroll = scrollWidth - clientWidth;
    const absScroll = Math.abs(scrollLeft);
    
    setCanScrollLeft(absScroll > 20);
    setCanScrollRight(absScroll < maxScroll - 20);

    // Approximate active card index
    const cardWidth = 330;
    const index = Math.min(
      filteredProjects.length - 1,
      Math.max(0, Math.round(absScroll / cardWidth))
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState);
      updateScrollState();
      return () => el.removeEventListener('scroll', updateScrollState);
    }
  }, [filteredProjects.length]);

  // Smooth arrow navigation
  const scrollByAmount = (direction) => {
    if (!carouselRef.current) return;
    const cardScrollStep = 360;
    
    // In Arabic RTL, scroll direction is reversed
    let delta = direction === 'next' ? cardScrollStep : -cardScrollStep;
    if (isRTL) {
      delta = -delta;
    }

    carouselRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Click dot to jump directly to card
  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const cardWidth = 350;
    const targetLeft = isRTL ? -index * cardWidth : index * cardWidth;
    carouselRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  return (
    <section id="projects" className="py-20 sm:py-24 relative bg-[#FAF7F2] dark:bg-[#06201A] overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#E5A83B]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6 text-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-2.5 font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>{t('projects.badge')}</span>
            </div>
            
            <div className="flex items-center gap-3.5 flex-wrap">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
                {t('projects.title')}
              </h2>
              {/* Dynamic Project Counter Badge */}
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30">
                {String(currentIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-[#416358] dark:text-[#A3BFB7]">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Filter Tabs & Arrow Navigation Toolbar */}
          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6] dark:bg-[#092821] overflow-x-auto shadow-sm">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                    activeFilter === tab.id
                      ? 'bg-[#E5A83B] text-[#07231D] shadow-md font-black'
                      : 'text-[#416358] dark:text-[#A3BFB7] hover:text-[#E5A83B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Header Arrow Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount('prev')}
                className="w-10 h-10 rounded-xl border-2 border-[#E5A83B]/40 bg-white dark:bg-[#0D332B] hover:bg-[#E5A83B] hover:text-[#07231D] text-[#E5A83B] flex items-center justify-center transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
                title={lang === 'ar' ? 'السابق' : 'Previous'}
              >
                {isRTL ? <ChevronRight className="w-5 h-5 stroke-[2.5]" /> : <ChevronLeft className="w-5 h-5 stroke-[2.5]" />}
              </button>

              <button
                onClick={() => scrollByAmount('next')}
                className="w-10 h-10 rounded-xl border-2 border-[#E5A83B]/40 bg-white dark:bg-[#0D332B] hover:bg-[#E5A83B] hover:text-[#07231D] text-[#E5A83B] flex items-center justify-center transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
                title={lang === 'ar' ? 'التالي' : 'Next'}
              >
                {isRTL ? <ChevronLeft className="w-5 h-5 stroke-[2.5]" /> : <ChevronRight className="w-5 h-5 stroke-[2.5]" />}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* HORIZONTAL CAROUSEL TRACK (Pure Arrow & Touch Driven - No vertical scroll hijacking) */}
      <div className="relative w-full">
        {/* Floating Side Left Arrow (Desktop) */}
        <button
          onClick={() => scrollByAmount('prev')}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-[#E5A83B]/50 bg-[#06201A]/90 backdrop-blur-md text-[#E5A83B] hover:bg-[#E5A83B] hover:text-[#07231D] hover:scale-110 items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer"
          title="Previous"
        >
          {isRTL ? <ChevronRight className="w-6 h-6 stroke-[2.5]" /> : <ChevronLeft className="w-6 h-6 stroke-[2.5]" />}
        </button>

        {/* Floating Side Right Arrow (Desktop) */}
        <button
          onClick={() => scrollByAmount('next')}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-[#E5A83B]/50 bg-[#06201A]/90 backdrop-blur-md text-[#E5A83B] hover:bg-[#E5A83B] hover:text-[#07231D] hover:scale-110 items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer"
          title="Next"
        >
          {isRTL ? <ChevronLeft className="w-6 h-6 stroke-[2.5]" /> : <ChevronRight className="w-6 h-6 stroke-[2.5]" />}
        </button>

        {/* Horizontal Carousel Viewport */}
        <div
          ref={carouselRef}
          className="flex items-stretch gap-6 overflow-x-auto scroll-smooth px-4 sm:px-8 lg:px-16 pb-4 pt-1 no-scrollbar select-none"
        >
          {filteredProjects.map((project, index) => {
            const isWide = project.format === '16:9';
            return (
              <div
                key={project.id}
                className={`flex-shrink-0 transition-transform duration-300 ${
                  isWide
                    ? 'w-[360px] sm:w-[460px] lg:w-[500px]'
                    : 'w-[280px] sm:w-[310px] lg:w-[330px]'
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
        </div>
      </div>

      {/* Bottom Controls: Step Dots & Mobile Navigation Hint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Nav Hint */}
        <p className="text-xs font-mono text-[#E5A83B] font-bold">
          {lang === 'ar'
            ? '⟵ استخدم الأسهم للتنقل بين الفيديوهات ⟶'
            : '⟵ Use arrows or swipe to navigate productions ⟶'}
        </p>

        {/* Clickable Step Dots */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {filteredProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? 'w-7 bg-[#E5A83B] shadow-[0_0_10px_rgba(229,168,59,0.8)]'
                  : 'w-2 bg-[#07231D]/20 dark:bg-[#0D332B] hover:bg-[#E5A83B]/60'
              }`}
              title={`Go to project ${i + 1}`}
            />
          ))}
        </div>
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
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
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
    </motion.div>
  );
};
