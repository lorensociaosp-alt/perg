import { useState, useEffect } from "react";

const TYPEWRITER_TEXT = `Cara Gaia, dato che sei una lesbica assurda e non ti fai regalare i fiori che io amo regalare, anche se ne ho regalati veramente pochissimi in tutta la mia vita, voglio scriverti una dedica.

Non c'è una vera e propria motivazione per il quale voglio fartela, ma dopo ormai 6 mesi (6 MESI? TROPPO TEMPO) voglio dirti un paio di cose su di te, cose che tu probabilmente non vedi, ma che io vedo ogni giorno e che io sento in dovere di dovertele dire. Credo che essendo sempre "bravo" con tutti, poi quando dico quello che penso nessuno mi crede.

Eppure io so che tu sei la persona che rende me e tantissime altre persone felici ogni giorno.

Il primo ricordo che ho di te è: oh che bella una rana, alzo lo sguardo e c'è una lesbica che mi sta guardando come per dire: ma questo è stupido. Eppure è un ricordo speciale perchè avevi un sorrisone tra le labbra che mi hanno fatto sentire a mio agio anche senza conoscerti.

Sei la persona che rende sempre felici le persone e su questo un po ti invidio, io voglio rendere felici tutti e mi devo impegnare tantissimo Eppure a te basta un sorriso.

Ed ora passiamo al restante. ORA TU PROBABILMENTE DIRAI: TOO MUTCH ed io ti dirò: ma sparati AHAHA solo perchè dico la verità? Gay, perchè penso che tu abbia bisogno di qualcuno che ti dica la verità e se non sarò io, sono sicuro che sarà qualcun'altro/a quindi

Se pensi di non essere abbastanza, posso dirti che basterebbe il tuo 0,00001% per essere abbastanza in qualsiasi cosa.

Se pensi di non essere brava in quello che fai, posso dirti che basterebbe il tuo 0,00001% della tua bravura per essere brava

Se pensi di essere brutta, posso dirti che basterebbe il tuo 0,00001% della tua bellezza per essere bella

Se pensi qualcosa di brutto su di te, qualsiasi cosa, sappi e ricordati che in realtà ti basterebbe anche una minima percentuale di qualsiasi cosa per essere brava o bella in quello.

Sono felice di averti incontrata e con questo sito voglio che tu realizzi che non devi farti problemi a parlare con me, Lorenzo per te, ci sarà sempre, in qualsiasi momento ed in qualsiasi posto

Concludendo.

Mi pentirò di quello che sto per dirti ma.....

Ti do il consenso di prendermi e portarmi su una giostra (non troppo brutta AHAHAH) così da farla.....

Quanto mai sto dicendo questo😭😭😭😭😭

IN POCHE PAROLE IL MIO REGALO DI SANVALENTINO, dato che non posso regalarti fiori perchè: "blah blah fiori solo i fidanzati" ti regalo un BUONO per le giostre questa estate.

Spero che ti piaccia

Grazie per essere Gaia e so che sembra una frase stupida, ma vale molto più di quanto pensi`;

interface DedicationTextProps {
  start: boolean;
  onComplete?: () => void;
}

const DedicationText = ({ start, onComplete }: DedicationTextProps) => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!start) return;

    const delay = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(TYPEWRITER_TEXT.slice(0, i + 1));
        i++;
        if (i >= TYPEWRITER_TEXT.length) {
          clearInterval(interval);
          // Keep cursor blinking for a bit then hide
          setTimeout(() => setShowCursor(false), 5000);
          // Notify completion
          if (onComplete) onComplete();
        }
      }, 75);
      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(delay);
  }, [start]);

  return (
    <p
      className="font-typewriter text-base md:text-xl leading-relaxed whitespace-pre-line px-4 md:px-0"
      style={{ color: "hsl(30, 90%, 20%)" }}
    >
      {typedText}
      {showCursor && start && (
        <span className="cursor-blink ml-0.5" style={{ color: "hsl(30, 90%, 30%)" }}>|</span>
      )}
    </p>
  );
};

export default DedicationText;
