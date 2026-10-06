import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { clientInstitutes } from '../data/projectsData';
import { Award, BookOpen, Compass, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const InstituteSection = () => {
  const { lang, t } = useLanguage();

  const getIcon = (id) => {
    switch (id) {
      case 'bilqalam':
        return <BookOpen className="w-5 h-5 text-brand-gold" />;
      case 'islamroots':
        return <Compass className="w-5 h-5 text-brand-gold" />;
      case 'qurangrace':
        return <Award className="w-5 h-5 text-brand-gold" />;
      default:
        return <HeartHandshake className="w-5 h-5 text-brand-gold" />;
    }
  };

  return (
    <section id="institutes" className="py-20 border-y border-brand-pine-900/10 dark:border-brand-pine-800 bg-brand-cream-100/50 dark:bg-brand-pine-950/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-brand-gold bg-brand-gold/10 border border-brand-gold/30 mb-3 font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'التعاون المؤسسي' : 'Institutional Collaboration'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-pine-950 dark:text-brand-cream-ivory">
            {t('institutes.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-pine-700/80 dark:text-brand-cream-300/80">
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
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative rounded-2xl p-6 sm:p-7 border border-brand-pine-900/10 dark:border-brand-gold/20 bg-white dark:bg-brand-pine-900/80 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/10 dark:bg-brand-pine-850 border border-brand-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      {getIcon(inst.id)}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 font-bold">
                      {lang === 'ar' ? 'محرر رئيسي' : 'Lead Editor'}
                    </span>
                  </div>

                  {/* Title in Arabic and English */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xl font-bold text-brand-pine-950 dark:text-brand-cream-ivory flex items-center justify-between">
                      <span>{lang === 'ar' ? inst.nameAr : inst.nameEn}</span>
                      <span className="text-xs text-brand-gold font-mono font-bold">
                        {lang === 'ar' ? inst.nameEn : inst.nameAr}
                      </span>
                    </h3>
                    <p className="text-xs font-semibold text-brand-gold">
                      {lang === 'ar' ? inst.taglineAr : inst.taglineEn}
                    </p>
                  </div>

                  {/* Description of impact */}
                  <p className="text-xs sm:text-sm text-brand-pine-700/80 dark:text-brand-cream-300/80 leading-relaxed mt-3">
                    {instData.impact}
                  </p>
                </div>

                {/* Bottom Stats */}
                <div className="mt-6 pt-4 border-t border-brand-pine-900/10 dark:border-brand-pine-800 flex items-center justify-between text-xs font-mono text-brand-pine-600 dark:text-brand-cream-300/60">
                  <span className="font-semibold text-brand-pine-900 dark:text-brand-cream-ivory">
                    {lang === 'ar' ? inst.statsAr : inst.statsEn}
                  </span>
                  <span className="text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
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
