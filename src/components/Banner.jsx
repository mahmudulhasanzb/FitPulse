import React from 'react';
import { Flame, ArrowRight, Activity } from 'lucide-react';

const Banner = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen bg-bg-dark flex items-center overflow-hidden px-6 md:px-16 py-20 z-10">
      {/* Background elements */}
      <div className="absolute inset-0 bg-glow-radial pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-60" />

      {/* Ambient visual decorations */}
      <div className="absolute right-[20%] top-[-20%] w-[1px] h-[140%] bg-gradient-to-b from-transparent via-primary/20 to-transparent rotate-[35deg] pointer-events-none z-0 hidden md:block" />
      <div className="absolute right-[25%] top-[-20%] w-[2px] h-[140%] bg-gradient-to-b from-transparent via-primary/40 to-transparent rotate-[35deg] pointer-events-none z-0 hidden md:block" />

      {/* Giant vertical outline text */}
      <div
        className="absolute right-[5%] top-[15%] text-[14vw] font-black uppercase text-transparent select-none pointer-events-none opacity-10 leading-none hidden md:block font-sans"
        style={{
          WebkitTextStroke: '2px var(--primary)',
          writingMode: 'vertical-rl',
        }}
      >
        PULSE
      </div>

      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent pointer-events-none z-0" />

      {/* Content container */}
      <div className="relative w-full max-w-7xl mx-auto z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-8 lg:col-span-7 flex flex-col items-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-primary/30">
            <Flame className="w-3.5 h-3.5 text-primary fill-primary/20 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-light">
              ELITE PERFORMANCE
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6 uppercase">
            <span className="block text-white mb-2">UNLEASH YOUR</span>
            <span className="block text-primary">INNER ATHLETE</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-light/80 max-w-lg mb-8 leading-relaxed">
            Join the world's most advanced fitness community. Track every rep,
            crush every goal, and train with elite coaches.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-black hover:text-black font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,255,0,0.6)] transform hover:-translate-y-0.5 cursor-pointer text-sm">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
            <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-primary/20 hover:border-primary text-white hover:bg-primary/5 font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm">
              <span>View Classes</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 sm:gap-16 border-t border-white/15 pt-8 w-full max-w-md">
            <div className="transition-transform duration-300 hover:translate-x-1">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
                <span>2.4M</span>
                <span className="text-primary text-xl md:text-2xl">+</span>
              </div>
              <div className="text-[10px] md:text-xs font-semibold text-neutral-light uppercase tracking-widest mt-1">
                Active Athletes
              </div>
            </div>
            <div className="transition-transform duration-300 hover:translate-x-1">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-baseline gap-0.5">
                <span>98</span>
                <span className="text-primary text-xl md:text-2xl">%</span>
              </div>
              <div className="text-[10px] md:text-xs font-semibold text-neutral-light uppercase tracking-widest mt-1">
                Goal Achievement
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Right Column */}
        <div className="hidden md:col-span-4 lg:col-span-5 relative h-full min-h-[400px] flex items-center justify-center">
          {/* Floating energetic badge/widget */}
          <div className="absolute p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/40 max-w-xs group cursor-default">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Training
                </h4>
                <p className="text-[10px] text-neutral-light">
                  542 Active Users Now
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-3/4 animate-pulse" />
              </div>
              <p className="text-xs text-neutral-light/70 leading-normal">
                Elevate your performance. Join high-intensity live sessions led
                by master trainers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
