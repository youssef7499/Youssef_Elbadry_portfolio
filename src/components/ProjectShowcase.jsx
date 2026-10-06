import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import { VideoModal } from './VideoModal';
import { Play, Eye, Clock, Film } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectShowcase = () => {
  const { lang, t } = useLanguage();
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
    <section id="projects" className="py-24 relative bg-[#FAF7F2] dark:bg-[#06201A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-start">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-3 font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>{t('projects.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
              {t('projects.title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#416358] dark:text-[#A3BFB7]">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6] dark:bg-[#092821] self-start md:self-auto shadow-sm">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#E5A83B] text-[#07231D] shadow-md font-black'
                    : 'text-[#416358] dark:text-[#A3BFB7] hover:text-[#E5A83B] hover:bg-[#E5A83B]/10'
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
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden border border-[#07231D]/10 dark:border-[#E5A83B]/25 bg-white dark:bg-[#0D332B] shadow-lg hover:shadow-2xl hover:border-[#E5A83B] dark:hover:border-[#E5A83B] transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Frame displaying the actual video first frame natively (NO stock photos) */}
      <div
        className={`relative w-full overflow-hidden bg-[#041612] ${
          isVertical ? 'aspect-[9/13] sm:aspect-[9/14]' : 'aspect-video'
        }`}
      >
        {/* Native Video Stream: displays its true first frame via #t=0.001, plays on hover */}
        <video
          ref={videoRef}
          src={`${project.videoUrl}#t=0.001`}
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none group-hover:opacity-75 transition-opacity" />

        {/* Badges Overlay (Top) */}
        <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-black/75 text-[#E5A83B] border border-[#E5A83B]/40 backdrop-blur-md">
            {project.format}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#07241E]/95 text-[#F7EFE4] border border-[#E5A83B]/40 backdrop-blur-md">
            {lang === 'ar' ? project.clientAr : project.clientEn}
          </span>
        </div>

        {/* Play Icon Badge Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-14 h-14 rounded-full bg-[#E5A83B] text-[#07231D] flex items-center justify-center pl-0.5 shadow-2xl transition-all duration-300 ${
              isHovered ? 'scale-110 shadow-[#E5A83B]/50' : 'scale-95 opacity-90'
            }`}
          >
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>

        {/* Bottom Overlay Info (Views & Duration) */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between text-white text-xs font-mono">
          <span className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10 font-bold">
            <Eye className="w-3.5 h-3.5 text-[#E5A83B]" />
            <span>{project.views}</span>
          </span>
          <span className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10 font-bold">
            <Clock className="w-3.5 h-3.5 text-[#E5A83B]" />
            <span>{project.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Info Body - Explicit Dark background #0D332B & Light #FFFFFF */}
      <div className="p-5 flex flex-col justify-between flex-1 text-start bg-white dark:bg-[#0D332B] transition-colors">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#07231D] dark:text-[#F7EFE4] group-hover:text-[#E5A83B] dark:group-hover:text-[#E5A83B] transition-colors line-clamp-1">
            {lang === 'ar' ? project.titleAr : project.titleEn}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-[#416358] dark:text-[#A3BFB7] line-clamp-2 leading-relaxed">
            {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#07231D]/10 dark:border-[#E5A83B]/15">
          {(lang === 'ar' ? project.tagsAr : project.tagsEn).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
