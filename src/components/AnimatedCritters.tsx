import { useState, useEffect } from 'react';
const DECORATIONS = [
  { emoji: "🐱", top: "4%", left: "3%", size: 32, rotate: -10 },
  { emoji: "🌻", top: "8%", left: "12%", size: 26 },
  { emoji: "🐝", top: "3%", left: "22%", size: 20, rotate: 15 },

  // Top-right corner area
  { emoji: "🐶", top: "5%", right: "4%", size: 30, rotate: 8 },
  { emoji: "🦋", top: "3%", right: "16%", size: 22, rotate: -20 },
  { emoji: "🌼", top: "10%", right: "8%", size: 24 },

  // Left side
  { emoji: "🐾", top: "25%", left: "2%", size: 22 },
  { emoji: "🛼", top: "45%", left: "3%", size: 28, rotate: -5 },
  { emoji: "🐈", top: "65%", left: "2%", size: 30, rotate: 6 },
  { emoji: "🌸", top: "38%", left: "6%", size: 20 },

  // Right side
  { emoji: "🐕", top: "30%", right: "3%", size: 28, rotate: -8 },
  { emoji: "🌻", top: "50%", right: "4%", size: 26 },
  { emoji: "🐾", top: "70%", right: "2%", size: 20, rotate: 12 },
  { emoji: "🦋", top: "42%", right: "7%", size: 22, rotate: 25 },

  // Bottom-left
  { emoji: "🐶", bottom: "5%", left: "4%", size: 30, rotate: -12 },
  { emoji: "🌼", bottom: "3%", left: "15%", size: 22 },
  { emoji: "🐝", bottom: "8%", left: "8%", size: 18, rotate: 30 },

  // Bottom-right
  { emoji: "🐱", bottom: "4%", right: "5%", size: 28, rotate: 10 },
  { emoji: "🛼", bottom: "3%", right: "18%", size: 24, rotate: -15 },
  { emoji: "🌸", bottom: "9%", right: "10%", size: 20 },

  // Bottom center (but not overlapping text area)
  { emoji: "🐾", bottom: "2%", left: "40%", size: 18 },
  { emoji: "🐾", bottom: "3%", left: "55%", size: 16, rotate: 20 },
];

const AnimatedCritters = ({ visible }: { visible: boolean }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {DECORATIONS.map((el, i) => {
        // Skip side decorations on mobile to prevent text overlap
        // Side decorations are roughly indices 6-23 based on the array structure above
        // Let's filter based on position properties instead of index for robustness
        const isSideDecoration = (el as any).top && ((el as any).top > "20%" && (el as any).top < "80%");

        if (isMobile && isSideDecoration) return null;

        const size = isMobile ? el.size * 0.6 : el.size;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: el.top,
              bottom: (el as any).bottom,
              left: el.left,
              right: el.right,
              fontSize: `${size}px`,
              transform: `rotate(${el.rotate || 0}deg)`,
              opacity: 0,
              animation: `deco-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${1.5 + i * 0.12}s forwards`,
            }}
          >
            {el.emoji}
          </div>
        );
      })}

      <style>{`
        @keyframes deco-pop {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          70% { opacity: 1; transform: scale(1.15) rotate(var(--r, 0deg)); }
          100% { opacity: 1; transform: scale(1) rotate(var(--r, 0deg)); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedCritters;
