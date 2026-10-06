import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import { VideoModal } from './VideoModal';
import { Play, Eye, Clock, Film, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectShowcase = () => {
  const { lang, t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

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

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-start">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-200/60 dark:bg-neutral-800/60 mb-3">
              <Film className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
              <span>{t('projects.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              {t('projects.title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeFilter === tab.id
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-sm font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <VideoCard
              key={project.id}
              project={project}
              index={index}
              lang={lang}
              t={t}
              onClick={() => setSelectedProject(project)}
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
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Preview Frame */}
      <div
        className={`relative w-full overflow-hidden bg-neutral-950 ${
          isVertical ? 'aspect-[9/13] sm:aspect-[9/14]' : 'aspect-video'
        }`}
      >
        {/* Poster Image */}
        <img
          src={project.thumbnail}
          alt={lang === 'ar' ? project.titleAr : project.titleEn}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Video Stream (Plays muted on hover, preloads nothing until hover) */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          playsInline
          loop
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Format Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
            {project.format}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/80 text-white backdrop-blur-md">
            {lang === 'ar' ? project.clientAr : project.clientEn}
          </span>
        </div>

        {/* Play Icon Badge Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-12 h-12 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center pl-0.5 shadow-lg transition-transform duration-300 ${
              isHovered ? 'scale-110 bg-white' : 'scale-90 opacity-75'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Bottom Overlay Info (Views & Duration) */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between text-white text-xs font-mono">
          <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5 text-neutral-300" />
            <span>{project.views}</span>
          </span>
          <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-neutral-300" />
            <span>{project.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-5 flex flex-col justify-between flex-1 text-start">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {lang === 'ar' ? project.titleAr : project.titleEn}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          {(lang === 'ar' ? project.tagsAr : project.tagsEn).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
