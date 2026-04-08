import ScrollReveal from "./ScrollReveal";

const highlights = [
  "Developed multiple web projects during studies",
  "Built a personal portfolio website using HTML, CSS, JavaScript",
  "Found and reported a bug in the college's EDU website",
  "Self-driven full-stack learning beyond curriculum",
  "Hands-on experience in a computer center",
];

// High-frequency fractal noise for authentic certificate paper texture
const certificateNoiseUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E";

// Dotted pattern for the gold swashes
const goldDotsPattern = "data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='0.6' fill='%23ffffff' fill-opacity='0.15'/%3E%3C/svg%3E";

const EducationSection = () => (
  <section className="py-32 relative flex items-center justify-center p-6" style={{ backgroundColor: "#ffffffff", minHeight: "100vh" }}>
    {/* Page wrapping texture */}
    <div 
      className="absolute inset-0 pointer-events-none" 
      style={{ backgroundImage: `url("${certificateNoiseUrl}")`, mixBlendMode: "multiply", opacity: 0.5 }} 
    />

    <div className="relative z-10 w-full max-w-[1100px]">
      <ScrollReveal>
        
        {/* Certificate Landscape Container */}
        <div 
          className="relative w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] select-none"
          style={{ 
            backgroundColor: "#f9f6f0", 
            minHeight: "min-content" // Allows content to safely push height
          }}
        >
          {/* Internal Certificate noise overlay */}
          <div className="absolute inset-0 pointer-events-none"
               style={{ backgroundImage: `url("${certificateNoiseUrl}")`, mixBlendMode: "multiply" }} 
          />

          {/* Thin Golden Inner Border with Corner Accents */}
          <div 
            className="absolute inset-[20px] md:inset-[40px] pointer-events-none z-10"
            style={{ border: "1px solid #b89052" }}
          >
            {/* Top Left Diamonds */}
            <div className="absolute -top-[15px] -left-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <div className="w-[12px] h-[12px] border border-[#b89052] rotate-45 transform origin-center" />
              <div className="absolute w-[20px] h-[20px] border border-[#b89052] rotate-45 transform origin-center opacity-40" />
            </div>
            
            {/* Top Right Diamonds */}
            <div className="absolute -top-[15px] -right-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <div className="w-[12px] h-[12px] border border-[#b89052] rotate-45 transform origin-center" />
              <div className="absolute w-[20px] h-[20px] border border-[#b89052] rotate-45 transform origin-center opacity-40" />
            </div>
            
            {/* Bottom Left Diamonds */}
            <div className="absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <div className="w-[12px] h-[12px] border border-[#b89052] rotate-45 transform origin-center" />
              <div className="absolute w-[20px] h-[20px] border border-[#b89052] rotate-45 transform origin-center opacity-40" />
            </div>
            
            {/* Bottom Right Diamonds */}
            <div className="absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <div className="w-[12px] h-[12px] border border-[#b89052] rotate-45 transform origin-center" />
              <div className="absolute w-[20px] h-[20px] border border-[#b89052] rotate-45 transform origin-center opacity-40" />
            </div>
          </div>

          {/* Golden Corner SVGs (Placed at z-0 so they never hide text) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <svg className="absolute top-0 left-0 w-[45%] md:w-[35%] max-w-[280px] h-auto drop-shadow-[2px_5px_10px_rgba(0,0,0,0.15)]" viewBox="0 0 300 300">
              <defs>
                <linearGradient id="goldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a3762c" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#8c611b" />
                </linearGradient>
                <linearGradient id="goldInner" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8c611b" />
                  <stop offset="40%" stopColor="#e2c875" />
                  <stop offset="100%" stopColor="#c59837" />
                </linearGradient>
              </defs>
              <path d="M0,0 L300,0 C180,60 120,180 0,300 Z" fill="url(#goldOuter)" />
              <path d="M0,0 L300,0 C180,60 120,180 0,300 Z" fill={`url("${goldDotsPattern}")`} />
              <path d="M0,0 L200,0 C100,20 40,100 0,180 Z" fill="url(#goldInner)" style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))" }} />
            </svg>

            <svg className="absolute bottom-0 right-0 w-[45%] md:w-[35%] max-w-[280px] h-auto drop-shadow-[-2px_-5px_10px_rgba(0,0,0,0.15)]" viewBox="0 0 300 300">
              <path d="M300,300 L0,300 C120,240 180,120 300,0 Z" fill="url(#goldOuter)" />
              <path d="M300,300 L0,300 C120,240 180,120 300,0 Z" fill={`url("${goldDotsPattern}")`} />
              <path d="M300,300 L100,300 C200,280 260,200 300,120 Z" fill="url(#goldInner)" style={{ filter: "drop-shadow(-2px -4px 6px rgba(0,0,0,0.3))" }} />
            </svg>
          </div>

          {/* Core Text Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center pt-16 pb-28 px-10 md:pt-24 md:pb-32 md:px-[12%]">
            
            {/* Header section */}
            <div className="text-center mt-2 w-full">
              <h1 
                className="text-3xl md:text-5xl lg:text-6xl mb-4 font-serif uppercase font-bold tracking-[0.15em] md:tracking-[0.2em] leading-tight"
                style={{ color: "#a3762c" }}
              >
                Academic Foundation
              </h1>
              <p className="font-serif text-[10px] md:text-sm lg:text-base uppercase tracking-[0.2em] md:tracking-[0.25em]" style={{ color: "#5a4d3c" }}>
                Bachelor of Science — Information Technology (BCA IT)
              </p>
            </div>

            {/* This Certifies That block */}
            <div className="text-center mt-12 md:mt-16 w-full flex flex-col items-center">
              <p className="italic font-serif text-sm md:text-lg lg:text-xl mb-4" style={{ color: "#665a48" }}>
                This certifies that
              </p>
              
              <div className="w-full max-w-[85%] md:max-w-[80%] border-b border-[#b89052] py-2 mb-4">
                <h2 className="font-serif font-bold text-xl md:text-3xl lg:text-4xl text-[#222]">
                  St. Joseph's College (Autonomous)
                </h2>
              </div>
              
              <p className="font-serif uppercase tracking-widest text-[10px] md:text-sm text-[#444]">
                Tiruchirappalli, Tamil Nadu, India
              </p>
            </div>

            {/* Sub-details (CGPA / Graduation) */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-20 mt-10 md:mt-12 font-serif font-bold text-xs md:text-sm uppercase tracking-widest text-center" style={{ color: "#a3762c" }}>
              <div className="border-b border-[#cca76a] pb-1 px-4">
                CGPA: 7.9
              </div>
              <div className="border-b border-[#cca76a] pb-1 px-4">
                Graduation: May 2026
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="w-full mt-10 md:mt-14 font-serif bg-[#f9f6f0]/90 p-4 md:p-0 rounded-lg text-[#333] grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 md:gap-x-12 mx-auto pt-4 md:pt-6 border-t border-dotted border-[#b89052]">
              <div className="col-span-full font-bold uppercase tracking-widest text-center text-[10px] md:text-xs mb-3" style={{ color: "#8c611b" }}>
                College Highlights
              </div>
              {highlights.map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-bold text-[#b89052] mt-[1px] md:mt-[2px]">•</span>
                  <p className="text-xs md:text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Footer Signatures and Seal */}
            <div className="w-full relative mt-16 md:mt-24 flex justify-between items-end">
              
              {/* Left Signature */}
              <div className="flex flex-col items-center">
                <div className="w-[100px] md:w-[150px] border-b border-[#333] mb-2" />
                <span className="font-serif uppercase tracking-widest text-[8px] md:text-[10px] font-bold text-[#555] text-center">
                  Institution
                </span>
              </div>

              {/* Center Seal */}
              <div className="absolute left-[50%] -translate-x-[50%] bottom-0 flex justify-center drop-shadow-md z-10 w-0 md:w-auto overflow-visible">
                {/* Ribbons */}
                <div className="absolute top-[50%] flex gap-1 -z-10">
                  <div className="w-[16px] h-[50px] md:w-[20px] md:h-[60px] bg-[#1a4a75] transform -rotate-[22deg] -translate-x-[2px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }} />
                  <div className="w-[16px] h-[50px] md:w-[20px] md:h-[60px] bg-[#1a4a75] transform rotate-[22deg] translate-x-[2px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }} />
                </div>
                {/* Golden Badge Ring */}
                <div 
                  className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full flex items-center justify-center shadow-inner"
                  style={{ 
                    background: "radial-gradient(circle, #fcf6ba 0%, #bf953f 70%, #aa771c 100%)",
                    border: "3px dashed #8c611b"
                  }}
                >
                  <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full border-[1px] border-[#fcf6ba] flex items-center justify-center shadow-lg"
                       style={{ background: "linear-gradient(135deg, #a3762c 0%, #e2c875 50%, #8c611b 100%)" }}
                  >
                     <div className="w-[42px] h-[42px] md:w-[60px] md:h-[60px] rounded-full border-[2px] border-dotted border-[#fcf6ba] flex flex-col items-center justify-center opacity-80 text-[#fcf8f2] text-[7px] md:text-[9px] uppercase font-bold tracking-tight font-serif leading-none italic text-center">
                        <span>Academic</span>
                        <span>Excellence</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Right Signature */}
              <div className="flex flex-col items-center">
                <div className="w-[100px] md:w-[150px] border-b border-[#333] mb-2" />
                <span className="font-serif uppercase tracking-widest text-[8px] md:text-[10px] font-bold text-[#555] text-center">
                  Authorized<br className="md:hidden"/> Signature
                </span>
              </div>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default EducationSection;
