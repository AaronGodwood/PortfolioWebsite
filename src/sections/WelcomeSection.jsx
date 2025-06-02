import { useState, useEffect } from "react";

const multiLineText = [
    "Spiel about welcome and brief explanation of website this is all just filler text and none of it really matters",
    "this should be on a new line and there is plenty of waffle to say",
    "i can keep on like this to fill the space or it'll look terrible"
];

export default function WelcomePage() {
    const [typedText, setTypedText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [typingStarted, setTypingStarted] = useState(false);

    // Start typing after delay
    useEffect(() => {
        const delayTimeout = setTimeout(() => {
            setTypingStarted(true);
        }, 1200); // 1.2s delay

        return () => clearTimeout(delayTimeout);
    }, []);

    // Typing effect
    useEffect(() => {
        if (!typingStarted) return;

        if (lineIndex < multiLineText.length) {
            if (charIndex < multiLineText[lineIndex].length) {
                const timeout = setTimeout(() => {
                    setTypedText((prev) => prev + multiLineText[lineIndex][charIndex]);
                    setCharIndex(charIndex + 1);
                }, 40); // typing speed per char
                return () => clearTimeout(timeout);
            } else {
                // Finished line, add newline and move to next line
                setTypedText((prev) => prev + "\n");
                setLineIndex(lineIndex + 1);
                setCharIndex(0);
            }
        }
    }, [charIndex, lineIndex, typingStarted]);

    return (
        <section className="z-20 p-6 text-white w-full h-100 px-20 py-10 mx-auto">
            <h1 className="text-4xl font-bold mb-4">Welcome</h1>
            <pre className="text-lg py-5 leading-relaxed whitespace-pre-wrap font-sans">
        {typedText}
                <span className="animate-blink">|</span>
      </pre>

            <style>{`
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
        </section>
    );
}
