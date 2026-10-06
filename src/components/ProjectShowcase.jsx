import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import { VideoModal } from './VideoModal';
import { Play, Eye, Clock, Film, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ProjectShowcase = () => {
  const { lang, t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);

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

  // Framer Motion vertical-to-horizontal pinning scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate horizontal translation based on number of items and direction (RTL vs LTR)
  // For ~10 items with card width ~340px, translate across the card row
  const totalOffsetPercentage = Math.max(35, (filteredProjects.length - 2) * 22);
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    isRTL ? ['0%', `${totalOffsetPercentage}%`] : ['0%', `-${totalOffsetPercentage}%`]
  );

  // Manual scroll helper for buttons or mobile swipe
  const scrollHorizontally = (direction) => {
    if (scrollTrackRef.current) {
      const scrollAmount = direction === 'next' ? 360 : -360;
      scrollTrackRef.current.scrollBy({ left: isRTL ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative bg-[#FAF7F2] dark:bg-[#06201A]">
      
      {/* DESKTOP PINNED HORIZONTAL SCROLL CONTAINER (Sticky on scroll) */}
      <div ref={containerRef} className="hidden md:block relative h-[320vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-8">
          
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            {/* Header with Title and Filter Tabs */}
            <div className="flex flex-row items-end justify-between gap-6 text-start">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-2.5 font-bold">
                  <Film className="w-3.5 h-3.5" />
                  <span>{t('projects.badge')}</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
                  {t('projects.title')}
                </h2>
                <p className="mt-1 text-xs lg:text-sm text-[#416358] dark:text-[#A3BFB7]">
                  {t('projects.subtitle')}
                </p>
              </div>

              {/* Filter Tabs & Scroll Hint */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6] dark:bg-[#092821] shadow-sm">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                        activeFilter === tab.id
                          ? 'bg-[#E5A83B] text-[#07231D] shadow-md font-black'
                          : 'text-[#416358] dark:text-[#A3BFB7] hover:text-[#E5A83B]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => scrollHorizontally('prev')}
                    className="p-2 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-white dark:bg-[#0D332B] hover:bg-[#E5A83B] hover:text-[#07231D] text-[#07231D] dark:text-[#F7EFE4] transition-colors shadow-sm"
                    title="Previous"
                  >
                    {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => scrollHorizontally('next')}
                    className="p-2 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-white dark:bg-[#0D332B] hover:bg-[#E5A83B] hover:text-[#07231D] text-[#07231D] dark:text-[#F7EFE4] transition-colors shadow-sm"
                    title="Next"
                  >
                    {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontally Moving Cards Track */}
          <div className="w-full overflow-hidden pl-4 sm:pl-8 lg:pl-12">
            <motion.div
              style={{ x: xTransform }}
              className="flex items-center gap-6 cursor-grab active:cursor-grabbing w-max pr-12"
            >
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="w-[300px] lg:w-[340px] flex-shrink-0">
                  <VideoCard
                    project={project}
                    index={index}
                    lang={lang}
                    t={t}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Progress Bar & Pinning Indicator */}
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E5A83B] font-bold">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>{lang === 'ar' ? 'مرر للأسفل للتنقل أفقياً عبر الأعمال' : 'Scroll down to travel horizontally through showcase'}</span>
            </div>

            {/* Visual Gold Progress Bar */}
            <div className="w-48 sm:w-64 h-1.5 bg-[#07231D]/10 dark:bg-[#0D332B] rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: isRTL ? 'right' : 'left' }}
                className="h-full bg-[#E5A83B] rounded-full"
              />
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE RESPONSIVE SMOOTH HORIZONTAL CAROUSEL (< md) */}
      <div className="block md:hidden py-16 px-4">
        {/* Mobile Header */}
        <div className="mb-6 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-2.5 font-bold">
            <Film className="w-3.5 h-3.5" />
            <span>{t('projects.badge')}</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
            {t('projects.title')}
          </h2>
          <p className="mt-1 text-xs text-[#416358] dark:text-[#A3BFB7]">
            {t('projects.subtitle')}
          </p>

          {/* Mobile Filter Tabs */}
          <div className="mt-4 flex items-center gap-1.5 p-1 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6] dark:bg-[#092821] overflow-x-auto shadow-sm">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
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
        </div>

        {/* Mobile Horizontal Snap Row */}
        <div
          ref={scrollTrackRef}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar"
        >
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="w-[82vw] max-w-[320px] flex-shrink-0 snap-center">
              <VideoCard
                project={project}
                index={index}
                lang={lang}
                t={t}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-2 text-center text-xs font-mono text-[#E5A83B] font-bold">
          <span>{lang === 'ar' ? '⟵ اسحب أفقياً لاستعراض الفيديوهات ⟶' : '⟵ Swipe horizontally to explore reels ⟶'}</span>
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
    <div
      className="group relative rounded-2xl overflow-hidden border border-[#07231D]/10 dark:border-[#E5A83B]/25 bg-white dark:bg-[#0D332B] shadow-lg hover:shadow-2xl hover:border-[#E5A83B] dark:hover:border-[#E5A83B] transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 h-full select-none"
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
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none group-hover:opacity-75 transition-opacity" />

        {/* Badges Overlay (Top) */}
        <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 text-[#E5A83B] border border-[#E5A83B]/40 backdrop-blur-md">
            {project.format}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#07241E]/95 text-[#F7EFE4] border border-[#E5A83B]/40 backdrop-blur-md truncate max-w-[140px]">
            {lang === 'ar' ? project.clientAr : project.clientEn}
          </span>
        </div>

        {/* Play Icon Badge Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-12 h-12 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center pl-0.5 shadow-2xl transition-all duration-300 ${
              isHovered ? 'scale-110 shadow-[#E5A83B]/50' : 'scale-90 opacity-90'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Bottom Overlay Info (Views & Duration) */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between text-white text-[11px] font-mono">
          <span className="flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10 font-bold">
            <Eye className="w-3 h-3 text-[#E5A83B]" />
            <span>{project.views}</span>
          </span>
          <span className="flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10 font-bold">
            <Clock className="w-3 h-3 text-[#E5A83B]" />
            <span>{project.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-4 flex flex-col justify-between flex-1 text-start bg-white dark:bg-[#0D332B] transition-colors">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#07231D] dark:text-[#F7EFE4] group-hover:text-[#E5A83B] dark:group-hover:text-[#E5A83B] transition-colors line-clamp-1">
            {lang === 'ar' ? project.titleAr : project.titleEn}
          </h3>
          <p className="mt-1 text-xs text-[#416358] dark:text-[#A3BFB7] line-clamp-2 leading-relaxed">
            {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-[#07231D]/10 dark:border-[#E5A83B]/15">
          {(lang === 'ar' ? project.tagsAr : project.tagsEn).map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
