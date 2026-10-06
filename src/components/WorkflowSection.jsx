import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { editingSkills } from '../data/projectsData';
import { GitCommit, Cpu, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const WorkflowSection = () => {
  const { lang, t } = useLanguage();
  const steps = t('workflow.steps') || [];

  return (
    <section id="workflow" className="py-24 border-t border-brand-pine-900/10 dark:border-brand-pine-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-brand-gold bg-brand-gold/10 border border-brand-gold/30 mb-3 font-semibold">
            <GitCommit className="w-3.5 h-3.5" />
            <span>{t('workflow.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-pine-950 dark:text-brand-cream-ivory">
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
              className="relative p-6 rounded-2xl border border-brand-pine-900/10 dark:border-brand-gold/20 bg-white dark:bg-brand-pine-900/60 text-start flex flex-col justify-between group hover:border-brand-gold/60 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-black font-mono text-brand-gold/40 group-hover:text-brand-gold transition-colors">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-brand-pine-950 dark:text-brand-cream-ivory mt-4">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-brand-pine-700/80 dark:text-brand-cream-300/70 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-pine-900/10 dark:border-brand-pine-800 flex items-center gap-2 text-brand-gold text-xs font-mono font-bold">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{lang === 'ar' ? 'معيار جودة معتمد' : 'Standard Pipeline'}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Software Arsenal Bar */}
        <div className="mt-16 p-8 rounded-2xl border border-brand-pine-900/15 dark:border-brand-gold/25 bg-brand-cream-100/50 dark:bg-brand-pine-900 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-4 h-4 text-brand-gold" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-brand-gold font-bold">
              {lang === 'ar' ? 'الترسانة التقنية والبرامج' : 'Software Stack & Tools'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {editingSkills.map((skill, i) => (
              <div key={i} className="text-start">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-brand-pine-950 dark:text-brand-cream-ivory">
                    {lang === 'ar' ? skill.nameAr : skill.nameEn}
                  </h5>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold font-bold border border-brand-gold/30">
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-brand-pine-700/80 dark:text-brand-cream-300/70 mt-1.5 leading-relaxed">
                  {lang === 'ar' ? skill.descAr : skill.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
