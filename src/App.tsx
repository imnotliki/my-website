/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Github, 
  Linkedin,
  Cpu,
  Globe,
  Zap,
  Layout,
  Type as TypeIcon,
  ArrowRight,
  Languages,
  Lightbulb
} from 'lucide-react';
import { translations, Language } from './translations';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    {subtitle && <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-2 block">{subtitle}</span>}
    <h2 className="text-4xl md:text-5xl font-serif text-zinc-900">{children}</h2>
  </div>
);

const BeforeAfterSlider = ({ before, after, beforeLabel, afterLabel }: any) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return (
    <div 
      className="relative w-full h-full cursor-ew-resize select-none overflow-hidden touch-none"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After Image (Base) */}
      <img 
        src={after} 
        className="absolute inset-0 w-full h-full object-cover" 
        draggable="false" 
      />
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white font-bold uppercase tracking-widest z-10">
        {afterLabel}
      </div>

      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img 
          src={before} 
          className="absolute inset-0 w-full h-full object-cover" 
          draggable="false" 
        />
        <div className="absolute top-4 left-4 bg-brand-purple/80 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white font-bold uppercase tracking-widest z-10">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-xl z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-brand-purple/20">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-brand-purple rounded-full" />
            <div className="w-0.5 h-3 bg-brand-purple rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TypewriterEffect = ({ text }: { text: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = text[currentTextIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % text.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, text]);

  return (
    <div className="min-h-[2em]">
      {displayText}
      <span className="animate-pulse">_</span>
    </div>
  );
};

const ProjectCard = ({ title, role, description, period, tags, image, images, customEffects, dynamicVisual }: any) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const displayImages = images || [image];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
    >
      <div className="aspect-video overflow-hidden relative bg-zinc-100 perspective-1000">
        {dynamicVisual ? (
          <div className="w-full h-full relative">
            {dynamicVisual}
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIdx}
                src={displayImages[currentImageIdx]} 
                alt={title} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {/* Custom Effects Overlay (Magnification, Highlights) */}
            {customEffects && (
              <div className="absolute inset-0 pointer-events-none group-hover:pointer-events-auto">
                {customEffects}
              </div>
            )}

            {/* Carousel Controls */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {displayImages.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIdx(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      currentImageIdx === idx ? 'bg-brand-purple w-4' : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-mono text-brand-purple mb-1 block">{period}</span>
            <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-purple transition-colors">{title}</h3>
            <p className="text-sm font-medium text-zinc-500 mb-4">{role}</p>
          </div>
        </div>
        <p className="text-zinc-600 leading-relaxed mb-6 line-clamp-4 text-sm">{description}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-zinc-50 text-zinc-500 text-[10px] uppercase tracking-wider rounded-full border border-zinc-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceItem = ({ company, role, period, description }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-12 border-l border-zinc-200 last:border-0"
  >
    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-brand-purple" />
    <span className="text-xs font-mono text-zinc-400 mb-1 block">{period}</span>
    <h3 className="text-xl font-serif mb-1">{company}</h3>
    <p className="text-sm font-medium text-brand-purple mb-3">{role}</p>
    <p className="text-zinc-600 leading-relaxed max-w-2xl">{description}</p>
  </motion.div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const t = translations[lang];

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');

  const navItems = Object.entries(t.nav).map(([key, label]) => ({
    id: key,
    label: label,
  }));

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <div className="min-h-screen selection:bg-brand-purple selection:text-white">
      {/* Side Index Bar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center gap-4 justify-end"
          >
            <span 
              className={`text-[10px] uppercase tracking-widest font-bold transition-all px-2 py-1 rounded border shadow-sm ${
                activeSection === item.id 
                  ? 'opacity-100 bg-brand-purple text-white border-brand-purple translate-x-0' 
                  : 'opacity-0 group-hover:opacity-100 bg-white/80 text-zinc-900 border-zinc-200 translate-x-2 group-hover:translate-x-0'
              }`}
            >
              {item.label}
            </span>
            <div 
              className={`w-2 h-2 rounded-full transition-all border border-white shadow-sm ${
                activeSection === item.id 
                  ? 'bg-brand-purple scale-150' 
                  : 'bg-zinc-300 group-hover:bg-brand-purple group-hover:scale-125'
              }`} 
            />
          </a>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference text-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-serif tracking-tighter"
        >
          SU.
        </motion.div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-semibold">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className={`transition-colors hover:text-brand-purple ${
                  activeSection === item.id ? 'text-brand-purple' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest font-bold"
          >
            <Languages size={14} />
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="text-center z-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold mb-6 block">
                {t.hero.subtitle}
              </span>
              <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.9] tracking-tighter mb-8">
                {t.hero.title} <span className="serif-italic">{t.hero.titleItalic}</span>
              </h1>
              <p className="max-w-xl mx-auto text-zinc-500 text-lg md:text-xl font-light leading-relaxed text-balance">
                {t.hero.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[15%] w-64 h-80 rounded-[4rem] overflow-hidden opacity-20 grayscale"
          >
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=800" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[10%] w-72 h-96 rounded-[5rem] overflow-hidden opacity-20 grayscale"
          >
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600&h=800" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-300"
        >
          <div className="w-px h-12 bg-zinc-200 mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-zinc-200"
          >
            <img 
              src="/portrait.jpg" 
              alt="Su Zhenyao" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              onError={(e) => {
                e.currentTarget.src = "https://storage.googleapis.com/static.vusercontent.net/images/ais-dev-xi3yzdmsivmjxlpghmt7sk-118786349601.asia-southeast1.run.app/portrait.jpg";
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-purple/10 mix-blend-multiply" />
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SectionTitle subtitle={t.about.subtitle}>{t.about.title}</SectionTitle>
              <div className="space-y-6 text-zinc-600 text-lg leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <h4 className="text-zinc-900 font-serif text-xl mb-2">{t.about.edu}</h4>
                    <p className="text-sm">{t.about.edu1}</p>
                    <p className="text-sm">{t.about.edu2}</p>
                  </div>
                  <div>
                    <h4 className="text-zinc-900 font-serif text-xl mb-2">{t.about.lang}</h4>
                    <p className="text-sm">{t.about.lang1}</p>
                    <p className="text-sm">{t.about.lang2}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t.experience.subtitle}>{t.experience.title}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-4">
              {t.experience.items.map((item, i) => (
                <ExperienceItem 
                  key={i}
                  company={item.company}
                  role={item.role}
                  period={item.period}
                  description={item.description}
                />
              ))}
            </div>
            <div className="bg-zinc-50 rounded-[3rem] p-12 flex flex-col justify-center border border-zinc-100">
              <h3 className="text-3xl font-serif mb-8">{t.experience.competencies}</h3>
              <div className="space-y-8">
                {[Cpu, Zap, Layout, Globe].map((Icon, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-purple shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg mb-1">{t.experience.skills[i].title}</h4>
                      <p className="text-sm text-zinc-500">{t.experience.skills[i].desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t.projects.subtitle}>{t.projects.title}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12">
            {t.projects.items.map((project, i) => {
              // Special handling for the Fundus project (usually index 1)
              const isFundusProject = project.title.includes("Fundus") || project.title.includes("眼底");
              const isRobotProject = project.title.includes("Robot") || project.title.includes("机器人");
              const isILightProject = project.title.includes("ILight") || project.title.includes("路灯");
              const isWSIProject = project.title.includes("WSI") || project.title.includes("肿瘤");
              
              const fundusImages = [
                '/projects/fundus-diagnosis.png',
                '/projects/fundus-stats.png',
                '/projects/fundus-list.png',
                '/projects/fundus-app.png'
              ];

              const wsiDynamicVisual = isWSIProject ? (
                <div className="w-full h-full relative bg-[#0a0a0c] group-hover:bg-[#0d0d10] transition-colors duration-500 overflow-hidden">
                  {/* Base Layer: Pathology Slide */}
                  <div className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity duration-700">
                    <img 
                      src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800&h=600" 
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  {/* Layer 2: Attention Map Heatmap Grid */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {Array.from({ length: 48 }).map((_, idx) => {
                      // Generate a pseudo-random attention value
                      const attention = Math.sin(idx * 0.5) * 0.5 + 0.5;
                      const isHigh = attention > 0.7;
                      const isMedium = attention > 0.4 && attention <= 0.7;
                      
                      return (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: idx * 0.01 }}
                          className={`border-[0.5px] border-white/5 transition-colors duration-500 ${
                            isHigh ? 'bg-red-500/40 group-hover:bg-red-500/60' : 
                            isMedium ? 'bg-orange-500/20 group-hover:bg-orange-500/30' : 
                            'bg-blue-500/10 group-hover:bg-blue-500/20'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Layer 3: Scanning Line (CLAM Demo Style) */}
                  <motion.div 
                    className="absolute inset-0 w-full h-[2px] bg-brand-purple/40 shadow-[0_0_20px_rgba(124,58,237,0.8)] z-30 pointer-events-none"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Layer 4: Interpretability Legend & Stats */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[8px] text-white font-black tracking-widest uppercase">Attention: High (Tumor)</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-60">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-[8px] text-white font-black tracking-widest uppercase">Attention: Low (Normal)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-brand-purple font-mono font-bold">CLAM ARCHITECTURE</div>
                        <div className="text-[6px] text-zinc-400 uppercase font-bold">Weakly Supervised Learning</div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Crosshair (Pointer events enabled here) */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                    onPointerMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty('--x', `${x}px`);
                      e.currentTarget.style.setProperty('--y', `${y}px`);
                    }}
                    style={{ '--x': '50%', '--y': '50%' } as any}
                  >
                    <div 
                      className="absolute top-0 bottom-0 w-[1px] bg-white/40 left-[var(--x)] pointer-events-none" 
                      style={{ left: 'var(--x)' }}
                    />
                    <div 
                      className="absolute left-0 right-0 h-[1px] bg-white/40 top-[var(--y)] pointer-events-none" 
                      style={{ top: 'var(--y)' }}
                    />
                  </motion.div>

                  {/* Floating Tech Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-40 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    <span className="bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10 text-[7px] text-white font-bold tracking-widest uppercase">Interpretability Demo</span>
                    <span className="bg-brand-purple/60 backdrop-blur px-2 py-1 rounded border border-white/10 text-[7px] text-white font-bold tracking-widest uppercase">Dynamic Pseudo-labeling</span>
                  </div>
                </div>
              ) : null;

              const ilightDynamicVisual = isILightProject ? (
                <div className="w-full h-full relative bg-zinc-900 group-hover:bg-zinc-800 transition-colors duration-500">
                  {/* Layer 1: Base City Environment (Vector Style) */}
                  <div className="absolute inset-0 bg-[#0F172A] overflow-hidden rounded-t-xl">
                    {/* Road */}
                    <div className="absolute bottom-0 left-0 w-full h-[40%] bg-[#1E293B] perspective-1000">
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-dashed border-t-2 border-white/20" />
                    </div>
                    
                    {/* Smart Poles */}
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="absolute bottom-[35%] w-2 h-32 bg-zinc-600 rounded-t-sm" style={{ left: `${i * 20}%` }}>
                        <div className="absolute top-0 right-0 w-8 h-1 bg-zinc-500 rounded-r-sm" />
                        {/* Light Head */}
                        <motion.div 
                          className="absolute top-0 right-0 w-8 h-4 bg-yellow-100/10 rounded-br-xl origin-top-left"
                          style={{ filter: 'blur(8px)' }}
                          animate={{ 
                            opacity: [0.2, 1, 0.2],
                            backgroundColor: ['rgba(254, 243, 199, 0.1)', 'rgba(254, 243, 199, 0.8)', 'rgba(254, 243, 199, 0.1)']
                          }}
                          transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                        />
                        {/* Light Cone */}
                        <motion.div 
                          className="absolute top-1 -right-2 w-12 h-40 bg-gradient-to-b from-yellow-200/30 to-transparent transform -skew-x-12 origin-top"
                          animate={{ opacity: [0, 0.6, 0] }}
                          transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                        />
                      </div>
                    ))}

                    {/* Moving Car */}
                    <motion.div 
                      className="absolute bottom-[10%] w-12 h-6 bg-blue-500 rounded-lg shadow-[0_0_15px_#3B82F6] z-10"
                      animate={{ left: ['-20%', '120%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Headlights */}
                      <div className="absolute right-0 top-1 w-8 h-4 bg-gradient-to-r from-white/50 to-transparent skew-x-12 blur-sm" />
                    </motion.div>
                  </div>

                  {/* Layer 2: Weather Overlay (Rain/Fog) */}
                  <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30">
                     {Array.from({ length: 20 }).map((_, i) => (
                       <motion.div
                         key={i}
                         className="absolute w-[1px] h-4 bg-white/50"
                         style={{ left: `${Math.random() * 100}%`, top: -20 }}
                         animate={{ top: '120%' }}
                         transition={{ duration: 0.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
                       />
                     ))}
                  </div>

                  {/* Layer 3: IoT Dashboard Overlay */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg w-32 shadow-2xl z-20">
                    <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                      <span className="text-[7px] text-brand-purple font-bold uppercase">Smart Node #03</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[6px] text-zinc-400">STATUS</span>
                        <span className="text-[6px] text-white font-mono bg-green-900/50 px-1 rounded">ACTIVE</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[6px] text-zinc-400">DIMMING</span>
                        <motion.div 
                          className="w-12 h-1 bg-zinc-700 rounded-full overflow-hidden"
                        >
                          <motion.div 
                            className="h-full bg-yellow-400"
                            animate={{ width: ['20%', '100%', '20%'] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          />
                        </motion.div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[6px] text-zinc-400">POWER</span>
                        <span className="text-[6px] text-white font-mono">12W</span>
                      </div>
                    </div>
                  </div>

                  {/* Layer 4: Interactive Hardware View (Bottom Left) - Simplified for Visibility */}
                  <div className="absolute bottom-4 left-4 flex gap-2 items-end z-50">
                    <motion.div 
                      className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/40 relative group/hw cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black"
                      whileHover={{ scale: 1.1, borderColor: 'rgba(124, 58, 237, 0.6)' }}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=200&h=200" 
                        alt="Hardware"
                        className="w-full h-full object-cover opacity-90" 
                      />
                      <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover/hw:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[6px] text-white text-center py-1 backdrop-blur font-bold tracking-wider">OLED VIEW</div>
                    </motion.div>
                    
                    <div className="bg-black/80 backdrop-blur px-2 py-1.5 rounded border border-white/20 shadow-xl">
                      <div className="text-[6px] text-zinc-400 uppercase font-bold mb-0.5">Traffic Flow</div>
                      <div className="text-[10px] text-white font-mono font-bold leading-none">12 <span className="text-[6px] text-zinc-500">c/m</span></div>
                    </div>
                  </div>
                </div>
              ) : null;

              const robotDynamicVisual = isRobotProject ? (
                <div className="w-full h-full relative bg-white group-hover:bg-zinc-50 transition-colors duration-500 overflow-hidden">
                  {/* Layer 1: Research Paper Background */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none p-8 font-serif text-[6px] leading-relaxed overflow-hidden">
                    <p>ABSTRACT: This paper presents a novel approach to 3D facial projection using expression generation modules and polynomial image alignment. Our method addresses the distortion inherent in 2D-to-3D mapping by utilizing driving frames to synchronize facial movements onto target meshes. EXPERIMENTAL RESULTS: The proposed system achieves a 98.4% alignment accuracy across diverse facial geometries...</p>
                    <div className="mt-4 border-t border-black pt-2">Fig 1. Expression Mapping Pipeline</div>
                  </div>

                  {/* Layer 2: Detailed Flowchart (Top) */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-[45%] p-4 bg-zinc-50/80 backdrop-blur-sm border-b border-zinc-200 overflow-hidden z-10"
                    whileHover={{ height: '50%' }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[8px] font-serif italic text-zinc-400">Fig 2. Image Alignment Pipeline</span>
                      <div className="px-2 py-0.5 bg-zinc-900 text-white text-[6px] font-bold rounded">ALGORITHM V2.4</div>
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                      <img 
                        src="/projects/robot-flowchart-detailed.png" 
                        className="h-full w-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <motion.div 
                        className="absolute top-[50%] left-[40%] w-16 h-10 border-2 border-brand-purple rounded shadow-[0_0_15px_rgba(124,58,237,0.3)] pointer-events-none"
                        animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  {/* Layer 3: Expression Mapping (Middle) */}
                  <motion.div 
                    className="absolute top-[45%] left-0 w-full h-[30%] p-4 bg-white border-b border-zinc-100 flex flex-col z-20 shadow-sm"
                    whileHover={{ y: -10 }}
                  >
                    <div className="text-[7px] text-zinc-400 uppercase tracking-widest mb-2 font-bold flex gap-4">
                      <span>Expression Synthesis</span>
                      <span className="text-brand-purple">2D → 3D Sync</span>
                    </div>
                    <div className="flex-grow flex items-center justify-center gap-6">
                      <div className="relative">
                        <img src="/projects/robot-expressions.png" className="h-16 w-auto object-contain rounded shadow-md border border-zinc-100" />
                        <div className="absolute -bottom-2 -right-2 bg-brand-purple text-white text-[5px] px-1 rounded font-bold shadow-lg">MAPPED</div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-12 h-1 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-brand-purple" animate={{ width: ['20%', '90%', '20%'] }} transition={{ duration: 4, repeat: Infinity }} />
                        </div>
                        <div className="w-12 h-1 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-blue-400" animate={{ width: ['40%', '70%', '40%'] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Layer 4: Live Slider (Bottom) */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[25%] group-hover:h-[35%] transition-all duration-500 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
                  >
                    <div className="absolute -top-5 left-4 bg-white px-3 py-1 rounded-t-lg border-t border-x border-zinc-200 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                      <span className="text-[7px] text-zinc-900 font-bold uppercase tracking-widest">Real-time Correction Slider</span>
                    </div>
                    <BeforeAfterSlider 
                      before="/projects/robot-before.png"
                      after="/projects/robot-after.png"
                      beforeLabel="Uncorrected"
                      afterLabel="Aligned"
                    />
                  </motion.div>
                </div>
              ) : null;

              const fundusDynamicVisual = isFundusProject ? (
                <div className="w-full h-full relative bg-black overflow-hidden group">
                  {/* Layer 1: Fundus Image (Base) */}
                  <img 
                    src="/projects/fundus-diagnosis.png" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 scale-105 group-hover:scale-110 transition-transform"
                  />

                  {/* Layer 2: Dynamic Multi-Band Scanning Beam */}
                  <motion.div 
                    className="absolute top-0 bottom-0 w-[40px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent z-10 mix-blend-screen"
                    animate={{ left: ['-20%', '120%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-10"
                    animate={{ left: ['-20%', '120%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Layer 3: AI Analysis Grid (Hexagonal - Animated) */}
                  <div className="absolute inset-0 z-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #000 120%)' }}>
                    <svg className="w-full h-full opacity-30" width="100%" height="100%">
                      <defs>
                        <pattern id="hex-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z" fill="none" stroke="#22D3EE" strokeWidth="0.5" />
                          <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hex-grid)" />
                    </svg>
                  </div>

                  {/* Layer 4: Auto-detected Lesions (Interactive Markers) */}
                  {[
                    { x: '30%', y: '40%', label: 'Microaneurysm', conf: '98%', color: 'text-red-400', border: 'border-red-500' },
                    { x: '65%', y: '55%', label: 'Exudates', conf: '92%', color: 'text-yellow-400', border: 'border-yellow-500' },
                    { x: '45%', y: '25%', label: 'Hemorrhage', conf: '89%', color: 'text-orange-400', border: 'border-orange-500' }
                  ].map((lesion, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute z-30 cursor-crosshair group/marker"
                      style={{ left: lesion.x, top: lesion.y }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.5 + 0.5, duration: 0.5, type: "spring" }}
                    >
                      <div className="relative">
                        {/* Ping Effect */}
                        <div className={`w-8 h-8 border-2 ${lesion.border} rounded-full animate-ping absolute inset-0 opacity-50`} />
                        {/* Core Marker */}
                        <div className={`w-8 h-8 border ${lesion.border} rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover/marker:bg-black/80 transition-colors`}>
                          <div className={`w-1.5 h-1.5 ${lesion.border.replace('border', 'bg')} rounded-full shadow-[0_0_10px_currentColor]`} />
                        </div>
                        
                        {/* Connecting Line (Appears on Hover) */}
                        <div className="absolute left-8 top-4 w-0 h-[1px] bg-white/50 group-hover/marker:w-8 transition-all duration-300" />
                        
                        {/* Data Card (Appears on Hover) */}
                        <div className="absolute left-16 top-0 bg-black/90 border border-white/20 p-2 rounded backdrop-blur-md w-32 opacity-0 group-hover/marker:opacity-100 -translate-x-2 group-hover/marker:translate-x-0 transition-all duration-300 pointer-events-none">
                          <div className={`text-[9px] ${lesion.color} font-bold uppercase tracking-wide mb-1`}>{lesion.label}</div>
                          <div className="w-full h-[1px] bg-white/10 mb-1" />
                          <div className="flex justify-between items-center">
                            <span className="text-[7px] text-zinc-400">CONFIDENCE</span>
                            <span className="text-[9px] text-white font-mono">{lesion.conf}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Layer 5: AI Processing Terminal (Bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-40">
                    <div className="flex justify-between items-end">
                      <div className="font-mono text-[8px] text-cyan-400/80 leading-tight">
                        <TypewriterEffect text={[
                          "> INITIALIZING RETINA SCAN...",
                          "> LOADING MODEL: RESNET-50_V2...",
                          "> DETECTING ANOMALIES...",
                          "> ANALYSIS COMPLETE."
                        ]} />
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-cyan-950/50 border border-cyan-500/30 px-3 py-1.5 rounded backdrop-blur">
                           <div className="text-[6px] text-cyan-300 tracking-wider mb-0.5">PROCESSING TIME</div>
                           <div className="text-[12px] text-white font-mono font-bold leading-none">12<span className="text-[8px] text-zinc-500 ml-0.5">ms</span></div>
                        </div>
                        <div className="bg-red-950/50 border border-red-500/30 px-3 py-1.5 rounded backdrop-blur animate-pulse-slow">
                           <div className="text-[6px] text-red-300 tracking-wider mb-0.5">RISK LEVEL</div>
                           <div className="text-[12px] text-white font-mono font-bold leading-none">HIGH</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;

              const projectPlaceholders = [
                'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800&h=600', // AI Healthcare
                'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800&h=600', // IoT Smart City
                'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&h=600', // Robotics
                'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600', // Tech
              ];

              return (
                <ProjectCard 
                  key={i}
                  title={project.title}
                  role={project.role}
                  period={project.period}
                  description={project.description}
                  tags={project.tags}
                  image={projectPlaceholders[i] || projectPlaceholders[0]}
                  images={isFundusProject ? fundusImages : null}
                  dynamicVisual={wsiDynamicVisual || ilightDynamicVisual || fundusDynamicVisual || robotDynamicVisual || null}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Features/Highlights Section (Opus Style) */}
      <section id="highlights" className="py-32 px-6 bg-brand-purple text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">
            {t.highlights.title1} <span className="serif-italic">{t.highlights.italic1}</span>,<br />
            {t.highlights.title2} <span className="serif-italic">{t.highlights.italic2}</span>.
          </h2>
          <div className="grid md:grid-cols-3 gap-12 pt-12">
            {t.highlights.stats.map((stat, i) => (
              <div key={i} className="p-12 rounded-[3rem] bg-white/10 backdrop-blur-lg border border-white/10">
                <span className="text-xs uppercase tracking-widest opacity-60 mb-4 block">{stat.label}</span>
                <div className="text-5xl font-serif mb-2">{stat.value}</div>
                <div className="text-sm opacity-60">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <SectionTitle subtitle={t.contact.subtitle}>{t.contact.title}</SectionTitle>
              <p className="text-zinc-500 text-lg mb-12">
                {t.contact.description}
              </p>
              <div className="space-y-6">
                <a href="mailto:imnotliki@gmail.com" className="flex items-center gap-4 text-xl hover:text-brand-purple transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-brand-purple group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  imnotliki@gmail.com
                </a>
                <div className="flex items-center gap-4 text-xl">
                  <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  +86 151 3986 4126
                </div>
                <div className="flex items-center gap-4 text-xl">
                  <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  {t.contact.location}
                </div>
              </div>
            </div>
            <div className="bg-zinc-50 rounded-[3rem] p-12 border border-zinc-100">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">{t.contact.form.name}</label>
                    <input type="text" className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-purple transition-colors" placeholder={t.contact.form.placeholderName} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">{t.contact.form.email}</label>
                    <input type="email" className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-purple transition-colors" placeholder={t.contact.form.placeholderEmail} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">{t.contact.form.message}</label>
                  <textarea rows={4} className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-purple transition-colors" placeholder={t.contact.form.placeholderMessage} />
                </div>
                <button className="w-full bg-zinc-900 text-white rounded-2xl py-5 font-bold uppercase tracking-widest hover:bg-brand-purple transition-all flex items-center justify-center gap-3 group">
                  {t.contact.form.submit}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="text-2xl font-serif tracking-tighter">SU.</div>
          <div className="flex gap-8">
            <a href="#" className="text-zinc-400 hover:text-brand-purple transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-zinc-400 hover:text-brand-purple transition-colors"><Github size={20} /></a>
          </div>
          <div className="text-zinc-400 text-xs uppercase tracking-widest">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
