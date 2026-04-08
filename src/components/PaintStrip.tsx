const PaintStrip = ({ text = "BUILD FOR DEV ✦ FULL STACK ✦ KIRUBA ✦" }) => {
  const content = Array(10).fill(text).join("   ");

  return (
    <div
      className="relative w-full h-[50px] md:h-[68px] overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #01ff9e 90%, #00d6fc)",
      }}
    >
      {/* 🟡 Paint Fill */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{
          width: "65%", // 📱 reduce for mobile
          background: "linear-gradient(90deg, #ffcc00, #ffb623)",
          zIndex: 10,
        }}
      />

      {/* 🎨 Paint Image */}
      <img
        src="/rt.png"
        alt="paint"
        className="absolute top-0 object-contain h-[120%] md:h-[120%] sd:h-[120%]"
         
        style={{
          left: "50%", // 📱 adjusted
          width: "35%", // 📱 slightly bigger for mobile clarity
          zIndex: 5,
          filter: "brightness(1.3)",
          
        }}
      />

      {/* ✨ Glow Blend */}
      <div
        className="absolute top-0 h-full"
        style={{
          left: "58%",
          width: "15%",
          background:
            "linear-gradient(to right, rgba(255,204,0,0.8), transparent)",
          filter: "blur(8px)",
          zIndex: 6,
          
        }}
      />

      {/* 🔥 MARQUEE TEXT */}
      <div className="absolute inset-0 flex items-center overflow-hidden z-9">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="mx-4 md:mx-6 text-[10px] md:text-base font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-black">
            {content}
          </span>
          <span className="mx-4 md:mx-6 text-[10px] md:text-base font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-black">
            {content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaintStrip;