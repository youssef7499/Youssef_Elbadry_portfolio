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
        return <BookOpen className="w-5 h-5 text-[#E5A83B]" />;
      case 'islamroots':
        return <Compass className="w-5 h-5 text-[#E5A83B]" />;
      case 'qurangrace':
        return <Award className="w-5 h-5 text-[#E5A83B]" />;
      default:
        return <HeartHandshake className="w-5 h-5 text-[#E5A83B]" />;
    }
  };

  return (
    <section id="institutes" className="py-20 border-y border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#F4EFE6]/60 dark:bg-[#07241E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-3 font-bold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'شراكات ومؤسسات' : 'Institutional Collaboration'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
            {t('institutes.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#416358] dark:text-[#A3BFB7]">
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
                className="relative rounded-2xl p-6 sm:p-7 border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-white dark:bg-[#0D332B] hover:border-[#E5A83B] dark:hover:border-[#E5A83B] transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#E5A83B]/10 dark:bg-[#07241E] border border-[#E5A83B]/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      {getIcon(inst.id)}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#E5A83B]/15 text-[#E5A83B] border border-[#E5A83B]/30 font-bold">
                      {lang === 'ar' ? 'مونتير أساسي' : 'Lead Editor'}
                    </span>
                  </div>

                  {/* Title in Arabic and English */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xl font-bold text-[#07231D] dark:text-[#F7EFE4] flex items-center justify-between">
                      <span>{lang === 'ar' ? inst.nameAr : inst.nameEn}</span>
                      <span className="text-xs text-[#E5A83B] font-mono font-bold">
                        {lang === 'ar' ? inst.nameEn : inst.nameAr}
                      </span>
                    </h3>
                    <p className="text-xs font-semibold text-[#E5A83B]">
                      {lang === 'ar' ? inst.taglineAr : inst.taglineEn}
                    </p>
                  </div>

                  {/* Description of impact */}
                  <p className="text-xs sm:text-sm text-[#416358] dark:text-[#C5D8D2] leading-relaxed mt-3">
                    {instData.impact}
                  </p>
                </div>

                {/* Bottom Stats */}
                <div className="mt-6 pt-4 border-t border-[#07231D]/10 dark:border-[#E5A83B]/15 flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#07231D] dark:text-[#F7EFE4]">
                    {lang === 'ar' ? inst.statsAr : inst.statsEn}
                  </span>
                  <span className="text-[#E5A83B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
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
