import { useState, useEffect, useCallback } from "react";
import sunflowersImg from "@/assets/sunflowers.jpg";
import AnimatedCritters from "@/components/AnimatedCritters";
import FallingPetals from "@/components/FallingPetals";
import SoftClouds from "@/components/SoftClouds";
import DedicationText from "@/components/DedicationText";
import Envelope from "@/components/Envelope";
import GiftTicket from "@/components/GiftTicket";

type TimeOfDay = "day" | "sunset";

const Index = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");

  const handleOpenEnvelope = useCallback(() => {
    setEnvelopeOpen(true);
    // Slight delay before starting the main reveal
    setTimeout(() => {
      setRevealed(true);
    }, 500);
  }, []);

  const handleTextComplete = useCallback(() => {
    setShowTicket(true);
  }, []);

  // Time of Day Transitions
  useEffect(() => {
    if (!revealed) return;

    // Transition to sunset after 50 seconds
    const sunsetTimer = setTimeout(() => {
      setTimeOfDay("sunset");
    }, 50000);

    return () => {
      clearTimeout(sunsetTimer);
    };
  }, [revealed]);


  // Text Color based on Time of Day for better contrast
  const getTextColor = () => {
    return "hsl(30, 90%, 20%)";
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden cursor-default select-none"
    >
      {/* Background Layers for Smooth Transitions */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, hsl(200, 100%, 85%), hsl(48, 90%, 85%))",
          opacity: revealed && timeOfDay === "day" ? 1 : 0,
          transition: "opacity 8000ms ease-in-out"
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, hsl(330, 80%, 65%), hsl(20, 90%, 70%), hsl(40, 100%, 75%))",
          opacity: revealed && timeOfDay === "sunset" ? 1 : 0,
          transition: "opacity 8000ms ease-in-out"
        }}
      />

      {/* Initial Dark Background */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out pointer-events-none"
        style={{ backgroundColor: "hsl(0, 0%, 0%)", opacity: revealed ? 0 : 1, zIndex: 5 }}
      />

      {/* Initial State: Envelope */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-1000"
        style={{
          opacity: envelopeOpen ? 0 : 1,
          pointerEvents: envelopeOpen ? "none" : "auto",
        }}
      >
        <Envelope onOpen={handleOpenEnvelope} />
      </div>

      {/* Revealed sunflower world */}
      <div
        className="absolute inset-0 flex flex-col items-center z-20 overflow-y-auto"
        style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
          pointerEvents: revealed ? "auto" : "none",
          paddingTop: "3rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Sunflower image */}
        <div
          className="w-full max-w-4xl mx-auto px-4 mb-8"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1.5s ease-out 1s, transform 1.5s ease-out 1s",
          }}
        >
          <img
            src={sunflowersImg}
            alt="Campo di girasoli dorati"
            className="w-full rounded-3xl shadow-2xl object-cover"
            style={{
              maxHeight: "40vh",
              boxShadow: "0 25px 60px -15px rgba(180, 140, 20, 0.4)",
            }}
          />
        </div>

        {/* Typewriter text */}
        <div
          className="max-w-2xl mx-auto px-6 text-center relative z-30 mb-20 rounded-xl transition-all duration-[5000ms]"
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 1s ease-out 1.5s, background-color 5000ms ease-in-out",
            color: getTextColor(), // Dynamic text color
            backgroundColor: "transparent",
            padding: "1.5rem",
          }}
        >
          <div style={{
            transition: "color 3000ms ease-in-out",
          }}>
            <DedicationText start={revealed} onComplete={handleTextComplete} />
          </div>
        </div>

        {/* Gift Ticket (Appears at the end) */}
        <div
          className={`w-full px-4 transition-all duration-1000 transform ${showTicket ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {showTicket && <GiftTicket />}
        </div>
      </div>

      {/* Radial glow during transition */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: revealed && timeOfDay === 'day'
            ? "radial-gradient(ellipse at center, hsl(45, 100%, 70%, 0.3) 0%, transparent 70%)"
            : "none",
          transition: "background 2s ease-out 0.3s",
        }}
      />

      {/* Soft clouds (Only visible during day/sunset) */}
      <div className="transition-opacity duration-[5000ms]" style={{ opacity: timeOfDay === 'night' ? 0.2 : 1 }}>
        <SoftClouds visible={revealed} />
      </div>

      {/* Falling petals */}
      <FallingPetals visible={revealed} />

      {/* Animated critters (Maybe hide at night or keep them) */}
      <AnimatedCritters visible={revealed} />
    </div>
  );
};

export default Index;
