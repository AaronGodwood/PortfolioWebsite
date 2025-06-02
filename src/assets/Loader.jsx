import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
    const [animate, setAnimate] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisited");

        if (hasVisited) {
            setShow(false);
            onFinish();
        } else {
            localStorage.setItem("hasVisited", "true");
            setTimeout(() => setAnimate(true), 100); // start animation
            setTimeout(() => {
                setShow(false);
                onFinish();
            }, 2000); // remove overlay after animation
        }
    }, [onFinish]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            <div className="absolute inset-0 bg-black z-0" /> {/* fallback bg */}



            {/* Left panel */}
            <div
                className={`fixed top-0 left-0 h-full w-1/2 bg-black z-20 transition-transform duration-1000 ease-in-out ${
                    animate ? "-translate-x-full" : ""
                }`}
            />
            {/* Centered message (optional) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-3xl font-bold">
                Welcome to my site
            </div>


            {/* Right panel */}
            <div
                className={`fixed top-0 right-0 h-full w-1/2 bg-black z-20 transition-transform duration-1000 ease-in-out ${
                    animate ? "translate-x-full" : ""
                }`}
            />
        </div>
    );
}
