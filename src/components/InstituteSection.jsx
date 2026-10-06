import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { clientInstitutes } from '../data/projectsData';
import { Award, BookOpen, Compass, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const InstituteSection = () => {
  const { lang, t, isRTL } = useLanguage();

  const getIcon = (id) => {
    switch (id) {
      case 'bilqalam':
        return <BookOpen className="w-5 h-5" />;
      case 'islamroots':
        return <Compass className="w-5 h-5" />;
      case 'qurangrace':
        return <Award className="w-5 h-5" />;
      default:
        return <HeartHandshake className="w-5 h-5" />;
    }
  };

  return (
    <section id="institutes" className="py-20 border-y border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-200/60 dark:bg-neutral-800/60 mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
            <span>{lang === 'ar' ? 'التعاون المؤسسي' : 'Institutional Collaboration'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {t('institutes.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            {t('institutes.subtitle')}
          </p>
        </div>

        {/* 3 Institute Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientInstitutes.map((inst, index) => {
            const instData = t(`institutes.${inst.id}`);
            return (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative rounded-2xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:scale-110 transition-transform">
                      {getIcon(inst.id)}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      {lang === 'ar' ? 'محرر رئيسي' : 'Lead Editor'}
                    </span>
                  </div>

                  {/* Title in Arabic and English */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center justify-between">
                      <span>{lang === 'ar' ? inst.nameAr : inst.nameEn}</span>
                      <span className="text-xs text-neutral-400 font-normal font-mono">
                        {lang === 'ar' ? inst.nameEn : inst.nameAr}
                      </span>
                    </h3>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {lang === 'ar' ? inst.taglineAr : inst.taglineEn}
                    </p>
                  </div>

                  {/* Description of impact */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-3">
                    {instData.impact}
                  </p>
                </div>

                {/* Bottom Stats */}
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/70 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span>{lang === 'ar' ? inst.statsAr : inst.statsEn}</span>
                  <span className="text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
