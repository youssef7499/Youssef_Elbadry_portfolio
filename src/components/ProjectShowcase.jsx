import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import { VideoModal } from './VideoModal';
import { Play, Eye, Clock, Film, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ProjectShowcase = () => {
  const { lang, t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);
  const mobileScrollRef = useRef(null);

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

  // Calculate percentage of track movement
  const totalOffsetPercentage = Math.max(45, (filteredProjects.length - 1) * 26);
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    isRTL ? ['0%', `${totalOffsetPercentage}%`] : ['0%', `-${totalOffsetPercentage}%`]
  );

  // Sync scroll progress with current index for indicators
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const idx = Math.min(
        filteredProjects.length - 1,
        Math.floor(latest * filteredProjects.length)
      );
      setCurrentIndex(idx);
    });
    return () => unsubscribe();
  }, [filteredProjects.length, scrollYProgress]);

  // Navigate to a specific index via vertical scroll position
  const navigateTo = (index) => {
    if (!containerRef.current) return;
    const clampedIndex = Math.max(0, Math.min(filteredProjects.length - 1, index));
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollDistance = containerHeight - windowHeight;

    const targetY = containerTop + (clampedIndex / (filteredProjects.length - 1)) * scrollDistance;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    setCurrentIndex(clampedIndex);
  };

  const handleNext = () => {
    if (isRTL) {
      navigateTo(currentIndex + 1);
    } else {
      navigateTo(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    navigateTo(currentIndex - 1);
  };

  // Mobile manual carousel scroll
  const scrollMobileBy = (direction) => {
    if (mobileScrollRef.current) {
      const amount = direction === 'next' ? 320 : -320;
      mobileScrollRef.current.scrollBy({ left: isRTL ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative bg-[#FAF7F2] dark:bg-[#06201A] overflow-hidden">
      
      {/* Background Animated Gradient Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#E5A83B]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* DESKTOP PINNED HORIZONTAL SCROLL CONTAINER */}
      <div ref={containerRef} className="hidden md:block relative h-[360vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden py-8 z-10">
          
          {/* Top Bar: Title, Live Counter, and Filter Tabs */}
          <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 text-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-2 font-bold">
                  <Film className="w-3.5 h-3.5" />
                  <span>{t('projects.badge')}</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-[#07231D] dark:text-[#F7EFE4] flex items-center gap-3">
                  <span>{t('projects.title')}</span>
                  {/* Glowing Index Badge */}
                  <span className="text-sm font-mono font-bold px-3 py-1 rounded-full bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                  </span>
                </h2>
                <p className="mt-1 text-xs lg:text-sm text-[#416358] dark:text-[#A3BFB7]">
                  {t('projects.subtitle')}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6] dark:bg-[#092821] shadow-sm">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveFilter(tab.id);
                        navigateTo(0);
                      }}
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
              </div>
            </div>
          </div>

          {/* Large Floating Side Navigation Arrows (Left & Right) */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full border-2 border-[#E5A83B]/50 bg-[#06201A]/85 backdrop-blur-xl text-[#E5A83B] flex items-center justify-center transition-all duration-300 shadow-xl ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:scale-110 hover:bg-[#E5A83B] hover:text-[#07231D] hover:shadow-[0_0_30px_rgba(229,168,59,0.5)] cursor-pointer'
            }`}
            title="Previous Video"
          >
            {isRTL ? <ChevronRight className="w-7 h-7 stroke-[2.5]" /> : <ChevronLeft className="w-7 h-7 stroke-[2.5]" />}
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= filteredProjects.length - 1}
            className={`absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full border-2 border-[#E5A83B]/50 bg-[#06201A]/85 backdrop-blur-xl text-[#E5A83B] flex items-center justify-center transition-all duration-300 shadow-xl ${
              currentIndex >= filteredProjects.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:scale-110 hover:bg-[#E5A83B] hover:text-[#07231D] hover:shadow-[0_0_30px_rgba(229,168,59,0.5)] cursor-pointer'
            }`}
            title="Next Video"
          >
            {isRTL ? <ChevronLeft className="w-7 h-7 stroke-[2.5]" /> : <ChevronRight className="w-7 h-7 stroke-[2.5]" />}
          </button>

          {/* Horizontally Moving Cards Track */}
          <div className="w-full overflow-hidden px-8 lg:px-24 my-auto">
            <motion.div
              style={{ x: xTransform }}
              className="flex items-center gap-8 w-max pr-24"
            >
              {filteredProjects.map((project, index) => {
                const isCurrent = index === currentIndex;
                return (
                  <div
                    key={project.id}
                    className="w-[310px] lg:w-[350px] flex-shrink-0 transition-transform duration-500"
                  >
                    <VideoCard
                      project={project}
                      index={index}
                      isCurrent={isCurrent}
                      lang={lang}
                      t={t}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Bar: Interactive Progress Stepper & Slider Indicator */}
          <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-mono text-[#E5A83B] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5A83B] animate-ping" />
              <span>
                {lang === 'ar'
                  ? 'مرر للأسفل أو انقر الأسهم للتنقل بين الفيديوهات'
                  : 'Scroll down or click side arrows to glide through productions'}
              </span>
            </div>

            {/* Step Dots that are Clickable to Jump! */}
            <div className="flex items-center gap-1.5">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-8 bg-[#E5A83B] shadow-[0_0_12px_rgba(229,168,59,0.8)]'
                      : 'w-2 bg-[#07231D]/20 dark:bg-[#0D332B] hover:bg-[#E5A83B]/60'
                  }`}
                  title={`Go to video ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE RESPONSIVE CAROUSEL WITH BIG ARROWS (< md) */}
      <div className="block md:hidden py-16 px-4">
        {/* Mobile Header */}
        <div className="mb-6 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-2.5 font-bold">
            <Film className="w-3.5 h-3.5" />
            <span>{t('projects.badge')}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
              {t('projects.title')}
            </h2>
            
            {/* Mobile Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollMobileBy('prev')}
                className="p-2 rounded-lg border border-[#E5A83B]/40 bg-[#06201A] text-[#E5A83B] active:scale-90"
              >
                {isRTL ? <ChevronRight className="w-4 h-4 stroke-[2.5]" /> : <ChevronLeft className="w-4 h-4 stroke-[2.5]" />}
              </button>
              <button
                onClick={() => scrollMobileBy('next')}
                className="p-2 rounded-lg border border-[#E5A83B]/40 bg-[#06201A] text-[#E5A83B] active:scale-90"
              >
                {isRTL ? <ChevronLeft className="w-4 h-4 stroke-[2.5]" /> : <ChevronRight className="w-4 h-4 stroke-[2.5]" />}
              </button>
            </div>
          </div>

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
          ref={mobileScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar"
        >
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center">
              <VideoCard
                project={project}
                index={index}
                isCurrent={false}
                lang={lang}
                t={t}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-2 text-center text-xs font-mono text-[#E5A83B] font-bold">
          <span>{lang === 'ar' ? '⟵ اسحب أو استخدم الأسهم للتنقل ⟶' : '⟵ Swipe or tap arrows to navigate ⟶'}</span>
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

const VideoCard = ({ project, index, isCurrent, lang, t, onClick }) => {
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
      transition={{ duration: 0.3 }}
      className={`group relative rounded-2xl overflow-hidden border-2 bg-white dark:bg-[#0D332B] shadow-xl hover:shadow-[0_15px_40px_rgba(229,168,59,0.25)] transition-all duration-300 flex flex-col cursor-pointer select-none ${
        isCurrent
          ? 'border-[#E5A83B] shadow-[0_0_25px_rgba(229,168,59,0.25)]'
          : 'border-[#07231D]/10 dark:border-[#E5A83B]/25 hover:border-[#E5A83B]'
      }`}
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 pointer-events-none group-hover:opacity-70 transition-opacity" />

        {/* Index Corner Stamp (e.g. 01, 02...) */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-black bg-[#E5A83B] text-[#07231D] shadow-md">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/75 text-white border border-white/20 backdrop-blur-md">
            {project.format}
          </span>
        </div>

        {/* Client Tag (Top Right) */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#07241E]/95 text-[#F7EFE4] border border-[#E5A83B]/40 backdrop-blur-md truncate max-w-[130px] block">
            {lang === 'ar' ? project.clientAr : project.clientEn}
          </span>
        </div>

        {/* Play Icon Badge Center with Ripple Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-14 h-14 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center pl-0.5 shadow-2xl transition-all duration-300 ${
              isHovered
                ? 'scale-115 shadow-[0_0_30px_rgba(229,168,59,0.8)]'
                : 'scale-90 opacity-90'
            }`}
          >
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>

        {/* Bottom Overlay Info (Views & Duration) */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between text-white text-[11px] font-mono">
          <span className="flex items-center gap-1 bg-black/70 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10 font-bold">
            <Eye className="w-3.5 h-3.5 text-[#E5A83B]" />
            <span>{project.views}</span>
          </span>
          <span className="flex items-center gap-1 bg-black/70 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10 font-bold">
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
          <p className="mt-1 text-xs text-[#416358] dark:text-[#A3BFB7] line-clamp-2 leading-relaxed">
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
