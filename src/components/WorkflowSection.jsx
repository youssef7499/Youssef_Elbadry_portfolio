import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { editingSkills } from '../data/projectsData';
import { GitCommit, Cpu, Check, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export const WorkflowSection = () => {
  const { lang, t } = useLanguage();
  const steps = t('workflow.steps') || [];

  return (
    <section id="workflow" className="py-20 sm:py-24 border-t border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-[#FAF7F2] dark:bg-[#06201A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-[#E5A83B] bg-[#E5A83B]/10 border border-[#E5A83B]/30 mb-3 font-bold">
            <GitCommit className="w-3.5 h-3.5" />
            <span>{t('workflow.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#07231D] dark:text-[#F7EFE4]">
            {t('workflow.title')}
          </h2>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-white dark:bg-[#0D332B] text-start flex flex-col justify-between group hover:border-[#E5A83B] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#E5A83B]/40 group-hover:text-[#E5A83B] transition-colors">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#07231D] dark:text-[#F7EFE4] mt-4">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#416358] dark:text-[#C5D8D2] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#07231D]/10 dark:border-[#E5A83B]/20 flex items-center gap-2 text-[#E5A83B] text-xs font-mono font-bold">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{lang === 'ar' ? 'خطوة أساسية في كل فيديو' : 'Core Quality Standard'}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Software Stack & Tools (CapCut Pro, DaVinci, Freepik, Google Flow, Claude Code) */}
        <div className="mt-14 sm:mt-16 p-6 sm:p-8 rounded-2xl border border-[#07231D]/10 dark:border-[#E5A83B]/25 bg-[#F4EFE6] dark:bg-[#092821] shadow-md">
          <div className="flex items-center gap-2 mb-6 text-start">
            <Wrench className="w-4 h-4 text-[#E5A83B]" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#E5A83B] font-bold">
              {t('workflow.stackBadge')}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {editingSkills.map((skill, i) => (
              <motion.div
                key={skill.id || i}
                whileHover={{ y: -3 }}
                className="p-4 sm:p-4.5 rounded-xl border border-[#07231D]/10 dark:border-[#E5A83B]/20 bg-white dark:bg-[#0D332B] text-start flex flex-col justify-between shadow-sm hover:border-[#E5A83B] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <h5 className="font-extrabold text-sm text-[#07231D] dark:text-[#F7EFE4]">
                      {lang === 'ar' ? skill.nameAr : skill.nameEn}
                    </h5>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#E5A83B]/15 text-[#E5A83B] font-bold border border-[#E5A83B]/30 whitespace-nowrap">
                      {skill.level}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-semibold text-[#E5A83B] block mb-2">
                    {lang === 'ar' ? skill.categoryAr : skill.categoryEn}
                  </span>

                  <p className="text-[11px] sm:text-xs text-[#416358] dark:text-[#C5D8D2] leading-relaxed">
                    {lang === 'ar' ? skill.descAr : skill.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
