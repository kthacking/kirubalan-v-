const MarqueeStrip = ({ text, variant = "primary" }: { text: string; variant?: "primary" | "outline" }) => {
  const content = Array(10).fill(text).join(" ✦ ");
  
  return (
  <div className={`overflow-hidden py-4`} style={{background:"linear-gradient(90deg, #00ff88ff, #01ff9eff, #29f0e6ff, #00d6fcff)",}}>
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-sm md:text-base font-bold tracking-[0.3em] uppercase mr-4">
          {content}
        </span>
        <span className="text-sm md:text-base font-bold tracking-[0.3em] uppercase mr-4">
          {content}
        </span>
      </div>
    </div>
  );
};

export default MarqueeStrip;
