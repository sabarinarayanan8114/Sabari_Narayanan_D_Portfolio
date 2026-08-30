import React from 'react';
import { profileData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const stats = [
    {
      value: "2+",
      label: "Years Dev Journey"
    },
    {
      value: "3+",
      label: "Featured Projects"
    },
    {
      value: "4",
      label: "Certifications"
    },
    {
      value: profileData.cgpa ? profileData.cgpa.split('/')[0].trim() : "8.02",
      label: "B.E. CGPA"
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative bg-[#06080e] border-t border-slate-900/90 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Portrait Card with Neon Glow Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] group">
              
              {/* Outer Glowing Neon Border Frame */}
              <div className="relative rounded-[28px] sm:rounded-[32px] p-[2px] bg-gradient-to-b from-indigo-500/60 via-cyan-400/40 to-indigo-900/60 shadow-[0_0_50px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.3)] transition-all duration-500">
                
                {/* Inner Image Wrapper */}
                <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden bg-[#0a0d18] aspect-[4/5] w-full">
                  <img
                    src={profileData.avatar || '/passport_photo.jpeg'}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== '/passport_photo.jpeg') {
                        target.src = '/passport_photo.jpeg';
                      }
                    }}
                  />
                  
                  {/* Subtle edge illumination overlay */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[26px] sm:rounded-[30px] pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Content & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Section Eyebrow Header */}
            <div>
              <span className="text-indigo-400 font-mono tracking-[0.25em] text-xs sm:text-sm uppercase font-semibold block mb-4">
                ABOUT ME
              </span>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
                <p>
                  I am a Computer Science & Engineering student based in Coimbatore, specialized in building full-stack web applications, SaaS architectures, enterprise ERP workflows, and AI-powered software solutions.
                </p>
                <p>
                  My technical capabilities include integrating Generative AI systems, prompt engineering, designing scalable backend architectures, setting up cloud deployment pipelines, and building robust SQL and NoSQL database ecosystems.
                </p>
                <p>
                  I enjoy transforming real-world problems into practical digital solutions by combining software engineering principles with modern AI technologies. From concept to deployment, I focus on creating applications that are scalable, secure, intuitive, and optimized for performance.
                </p>
                <p>
                  Alongside development, I continuously explore backend engineering, system design, REST APIs, authentication, cloud technologies, and modern development workflows to strengthen my ability to build production-ready software.
                </p>
              </div>
            </div>

            {/* 4 Stat Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  id={`about-stat-${idx}`}
                  className="bg-[#0b0f1a]/90 backdrop-blur-sm border border-slate-800/90 hover:border-indigo-500/50 hover:bg-[#0f1526] rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-indigo-950/30 group"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-[13px] text-slate-400 font-medium mt-1 tracking-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
