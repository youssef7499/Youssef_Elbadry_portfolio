import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InstituteSection } from './components/InstituteSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { WorkflowSection } from './components/WorkflowSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';

function PortfolioContent() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  const mainShowreel = {
    id: "main-showreel",
    titleEn: "Youssef El-Badry — Master Showreel 2026",
    titleAr: "يوسف البدري — شو ريل الأعمال 2026",
    clientEn: "Bilqalam · IslamRoots · Quran Grace",
    clientAr: "بالقلم · جذور الإسلام · نعمة القرآن",
    format: "16:9",
    category: "youtube",
    videoUrl: "/videos/The Teenage Prayer Struggle.mp4",
    tagsEn: ["High Retention", "Sound Design", "Pacing", "Color Master"],
    tagsAr: ["ريتنشن عالي", "ماستر صوت", "إيقاع سريع", "تلوين سينمائي"],
    descriptionEn: "A high-octane montage highlighting high-retention YouTube edits, dynamic short-form hooks, and spiritual cinematic sequences.",
    descriptionAr: "تجميعة سريعة وممتعة بتعرض أفضل لقطات من شغل اليوتيوب الطويل والريلز القصيرة، مع هندسة صوت وتلوين سينمائي عالي الجودة."
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#06201A] text-[#07231D] dark:text-[#F7EFE4] selection:bg-[#E5A83B] selection:text-[#06201A] transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Hero onOpenShowreel={() => setShowreelOpen(true)} />
        <InstituteSection />
        <ProjectShowcase />
        <BeforeAfterSlider />
        <WorkflowSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Global Showreel Modal */}
      {showreelOpen && (
        <VideoModal
          project={mainShowreel}
          onClose={() => setShowreelOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
