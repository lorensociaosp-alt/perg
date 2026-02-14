import { useState } from "react";

interface EnvelopeProps {
    onOpen: () => void;
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (isOpen) return;
        setIsOpen(true);
        // Wait for animation to finish before calling onOpen
        setTimeout(() => {
            onOpen();
        }, 1500);
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 scale-90 md:scale-100"
            onClick={handleClick}
        >
            <div className={`relative w-80 h-52 bg-amber-100 shadow-2xl rounded-lg transition-opacity duration-500 ${isOpen ? 'opacity-0 delay-1000' : 'opacity-100'}`}>
                {/* Envelope Flap */}
                <div
                    className="absolute top-0 left-0 w-full h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent border-t-amber-300 origin-top transition-transform duration-700 ease-in-out z-20"
                    style={{
                        transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                    }}
                />

                {/* Envelope Body (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-l-transparent border-r-transparent border-b-amber-200 rounded-b-lg z-10" />

                {/* Envelope Sides */}
                <div className="absolute top-0 left-0 w-full h-full border-l-[160px] border-b-[104px] border-l-amber-100 border-b-transparent rounded-bl-lg z-10" />
                <div className="absolute top-0 right-0 w-full h-full border-r-[160px] border-b-[104px] border-r-amber-100 border-b-transparent rounded-br-lg z-10" />

                {/* Letter (hidden inside) */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 bg-white w-[90%] h-[90%] shadow-md transition-all duration-700 ease-out z-0 flex items-center justify-center
            ${isOpen ? '-translate-y-24' : 'top-2'}
          `}
                >
                    <p className="font-typewriter text-xs text-stone-600">Per Gaia...</p>
                </div>

                {/* Text on front */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 font-typewriter text-stone-600 font-bold text-lg pointer-events-none transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                    Per Gaia
                </div>
            </div>

            <p className={`mt-8 font-typewriter text-stone-500 animate-pulse transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                (tocca per aprire)
            </p>
        </div>
    );
};

export default Envelope;
