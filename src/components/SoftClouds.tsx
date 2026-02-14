const CLOUDS = [
  { top: "3%", left: "-2%", scale: 1.4, opacity: 0.45, delay: 1.8 },
  { top: "10%", right: "-3%", scale: 1.6, opacity: 0.4, delay: 2.2 },
  { top: "0%", left: "25%", scale: 1.1, opacity: 0.35, delay: 2.6 },
  { top: "14%", right: "18%", scale: 1.2, opacity: 0.42, delay: 3 },
  { top: "5%", left: "50%", scale: 1.0, opacity: 0.3, delay: 2.4 },
  { top: "18%", left: "8%", scale: 0.9, opacity: 0.32, delay: 3.2 },
  { top: "12%", right: "38%", scale: 1.05, opacity: 0.36, delay: 2.8 },
  { top: "7%", left: "70%", scale: 1.3, opacity: 0.38, delay: 3.4 },
];

const CloudShape = ({ scale, opacity: op }: { scale: number; opacity: number }) => (
  <svg
    width={120 * scale}
    height={60 * scale}
    viewBox="0 0 120 60"
    fill="none"
    style={{ opacity: op }}
  >
    <ellipse cx="60" cy="40" rx="50" ry="18" fill="white" />
    <ellipse cx="38" cy="30" rx="28" ry="22" fill="white" />
    <ellipse cx="75" cy="28" rx="30" ry="24" fill="white" />
    <ellipse cx="55" cy="22" rx="22" ry="18" fill="white" />
  </svg>
);

const SoftClouds = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: c.top,
            left: c.left,
            right: (c as any).right,
            opacity: 0,
            animation: `cloud-fade 1.2s ease-out ${c.delay}s forwards`,
          }}
        >
          <CloudShape scale={c.scale} opacity={c.opacity} />
        </div>
      ))}

      <style>{`
        @keyframes cloud-fade {
          0% { opacity: 0; transform: translateY(10px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SoftClouds;
