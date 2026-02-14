import { useMemo } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
  opacity: number;
  emoji: string;
}

const PETAL_TYPES = ["🌻", "🌻", "🌻", "🌻", "🌻"];

const FallingPetals = ({ visible }: { visible: boolean }) => {
  const petals = useMemo<Petal[]>(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 8,
      delay: 2 + Math.random() * 8,
      duration: 8 + Math.random() * 10,
      sway: 30 + Math.random() * 50,
      opacity: 0.3 + Math.random() * 0.3,
      emoji: PETAL_TYPES[i % PETAL_TYPES.length],
    })),
  []);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            fontSize: `${p.size}px`,
            opacity: 0,
            animation: `petal-fall ${p.duration}s ease-in-out ${p.delay}s infinite`,
            ["--sway" as string]: `${p.sway}px`,
            ["--petal-opacity" as string]: p.opacity,
          }}
        >
          {p.emoji}
        </div>
      ))}

      <style>{`
        @keyframes petal-fall {
          0% {
            top: -5%;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
          }
          10% {
            opacity: var(--petal-opacity, 0.4);
          }
          50% {
            transform: translateX(var(--sway, 40px)) rotate(180deg);
          }
          90% {
            opacity: var(--petal-opacity, 0.4);
          }
          100% {
            top: 105%;
            opacity: 0;
            transform: translateX(calc(var(--sway, 40px) * -0.5)) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FallingPetals;
