import { useState } from "react";
import { Sparkles } from "lucide-react";

const GiftTicket = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="w-full max-w-md h-64 cursor-pointer perspective-1000 mx-auto mt-12 mb-20"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full h-full transition-transform duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 flex items-center justify-center border-4 border-white/30">
                    <div className="absolute inset-2 border-2 border-dashed border-amber-700/30 rounded-lg flex flex-col items-center justify-center">
                        <Sparkles className="w-12 h-12 text-amber-800 mb-4 animate-pulse" />
                        <h3 className="font-black text-2xl text-amber-900 uppercase tracking-widest">Biglietto Speciale</h3>
                        <p className="mt-2 text-amber-800 font-typewriter text-sm">Clicca per girare</p>
                    </div>
                    {/* Shine effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Back */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-xl shadow-2xl overflow-hidden bg-white flex items-center justify-center rotate-y-180 border-4 border-amber-400"
                >
                    <div className="absolute inset-2 border-2 border-dashed border-amber-400 rounded-lg flex flex-col items-center justify-center bg-amber-50">
                        <h2 className="font-black text-3xl md:text-4xl text-center text-amber-600 mb-2">BUONO VALIDO PER</h2>
                        <div className="w-16 h-1 bg-amber-300 mb-4" />
                        <p className="font-typewriter text-xl md:text-2xl text-center text-stone-700 px-4">
                            Una giornata alle giostre 🎡
                        </p>
                        <p className="mt-4 text-xs text-stone-400 font-mono">Scadenza: MAI</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftTicket;
