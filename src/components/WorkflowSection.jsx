import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { editingSkills } from '../data/projectsData';
import { GitCommit, Cpu, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const WorkflowSection = () => {
  const { lang, t, isRTL } = useLanguage();
  const steps = t('workflow.steps') || [];

  return (
    <section id="workflow" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-200/60 dark:bg-neutral-800/60 mb-3">
            <GitCommit className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
            <span>{t('workflow.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
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
              className="relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-start flex flex-col justify-between group hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-sm"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-black font-mono text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-4">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'معيار جودة معتمد' : 'Standard Pipeline'}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Software Arsenal Bar */}
        <div className="mt-16 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {lang === 'ar' ? 'الترسانة التقنية والبرامج' : 'Software Stack & Tools'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {editingSkills.map((skill, i) => (
              <div key={i} className="text-start">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-neutral-900 dark:text-white">
                    {lang === 'ar' ? skill.nameAr : skill.nameEn}
                  </h5>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
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
