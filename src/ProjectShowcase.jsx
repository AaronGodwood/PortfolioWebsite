import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import WelcomeSection from "./sections/WelcomeSection.jsx";

const projects = [
    {
        id: 1,
        name: "Bread AI",
        image: "/images/kneading.jpg",
        icon: "/images/kneading.jpg",
        description: "A naive bayes algorithm implementation that informs you weather a sentance is about bread or not",
        technologies: ["React", "Tailwind", "Node.js"],
        link: "https://example.com/project-one",
    },
    {
        id: 2,
        name: "Project Two",
        image: "/images/city.jpg",
        icon: "/images/city.jpg",
        description: "Urban city development dashboard.",
        technologies: ["Vue", "Firebase"],
        link: "https://example.com/project-two",
    },
    {
        id: 3,
        name: "Project Three",
        image: "/images/kyack.jpg",
        icon: "/images/kyack.jpg",
        description: "Adventure tracker for kayaking trips.",
        technologies: ["Next.js", "Mapbox", "GraphQL"],
        link: "https://example.com/project-three",
    },
    {
        id: 4,
        name: "Project Four",
        image: "/images/coast.jpg",
        icon: "/images/coast.jpg",
        description: "Coastal preservation and monitoring system.",
        technologies: ["Python", "Django", "PostgreSQL"],
        link: "https://example.com/project-four",
    },
    {
        id: 5,
        name: "Project Five",
        image: "/images/bin.jpg",
        icon: "/images/bin.jpg",
        description: "Waste management optimization tool.",
        technologies: ["Angular", "Node.js", "MongoDB"],
        link: "https://example.com/project-five",
    },
];

export default function ProjectsCarousel() {
    const projectCount = projects.length;
    const fullProjects = [...projects, ...projects, ...projects]; // Cloned list for loop
    const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
    const [fade, setFade] = useState(true);
    const carouselRef = useRef(null);
    const scrollInterval = useRef(null);
    const ticking = useRef(false);

    const activeProject = projects.find((p) => p.id === activeProjectId);

    // Fade background on activeProjectId change
    useEffect(() => {
        setFade(false);
        const timeout = setTimeout(() => setFade(true), 300);
        return () => clearTimeout(timeout);
    }, [activeProjectId]);

    // Initial scroll to center list
    useEffect(() => {
        const container = carouselRef.current;
        if (container) {
            const itemWidth = container.firstChild.offsetWidth + 48; // 48 = Tailwind's space-x-12
            container.scrollLeft = itemWidth * projectCount;
        }
    }, []);

    // Auto-scroll on hover near edges
    const handleMouseMove = (e) => {
        const container = carouselRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX;
        const edgeSize = 100;
        const scrollSpeed = 10;

        clearInterval(scrollInterval.current);

        if (mouseX < rect.left + edgeSize) {
            scrollInterval.current = setInterval(() => {
                container.scrollBy({ left: -scrollSpeed, behavior: "smooth" });
            }, 20);
        } else if (mouseX > rect.right - edgeSize) {
            scrollInterval.current = setInterval(() => {
                container.scrollBy({ left: scrollSpeed, behavior: "smooth" });
            }, 20);
        }
    };

    const handleMouseLeave = () => {
        clearInterval(scrollInterval.current);
    };

    // Scroll + loop logic + active project update
    const handleScroll = () => {
        const container = carouselRef.current;
        if (!container) return;

        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                const itemWidth = container.firstChild.offsetWidth + 48;
                const totalItems = fullProjects.length;
                const scrollLeft = container.scrollLeft;
                const totalWidth = itemWidth * totalItems;
                const loopThreshold = itemWidth;

                // Loop reset logic
                if (scrollLeft <= loopThreshold) {
                    requestAnimationFrame(() => {
                        container.style.scrollBehavior = "auto";
                        container.scrollLeft += itemWidth * projectCount;
                        requestAnimationFrame(() => {
                            container.style.scrollBehavior = "smooth";
                        });
                    });
                } else if (scrollLeft >= totalWidth - loopThreshold - itemWidth * projectCount) {
                    requestAnimationFrame(() => {
                        container.style.scrollBehavior = "auto";
                        container.scrollLeft -= itemWidth * projectCount;
                        requestAnimationFrame(() => {
                            container.style.scrollBehavior = "smooth";
                        });
                    });
                }

                // Find centered project
                const containerRect = container.getBoundingClientRect();
                const centerX = containerRect.left + containerRect.width / 2;

                let closest = null;
                let minDist = Infinity;
                Array.from(container.children).forEach((el, i) => {
                    const rect = el.getBoundingClientRect();
                    const itemCenter = rect.left + rect.width / 2;
                    const dist = Math.abs(itemCenter - centerX);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = projects[i % projectCount].id;
                    }
                });

                if (closest !== activeProjectId) {
                    setActiveProjectId(closest);
                }

                ticking.current = false;
            });

            ticking.current = true;
        }
    };

    return (
        <div className="relative w-screen min-h-screen no-scrollbar bg-black select-none text-white flex flex-col">
            {/* Background Image */}
            <img
                key={activeProject?.image}
                src={activeProject?.image}
                alt={activeProject?.name}
                className={`
          absolute inset-0 w-full h-full object-cover
          filter blur-sm brightness-100 scale-100
          transition-opacity duration-700 ease-in-out
          ${fade ? "opacity-100" : "opacity-0"}
        `}
            />
            <div className="absolute inset-0 bg-black/60 z-0" />
            <WelcomeSection />

            {/* Carousel */}
            <div className="relative z-10 flex items-center justify-center h-[60vh]">
                <div
                    ref={carouselRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onScroll={handleScroll}
                    className="flex space-x-12 overflow-x-auto no-scrollbar w-full max-w-full px-12 snap-x snap-mandatory scroll-smooth"
                >
                    {fullProjects.map((project, index) => {
                        const isActive = project.id === activeProjectId;
                        return (
                            <button
                                key={`${project.id}-${index}`}
                                onClick={() => {
                                    setActiveProjectId(project.id);

                                    // Scroll clicked item into view
                                    const container = carouselRef.current;
                                    const child = container.children[index];

                                    if (child && container) {
                                        const containerRect = container.getBoundingClientRect();
                                        const childRect = child.getBoundingClientRect();
                                        const scrollOffset = (childRect.left + childRect.width / 2) - (containerRect.left + containerRect.width / 2);

                                        container.scrollBy({
                                            left: scrollOffset,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className={`
                  relative flex-shrink-0 w-106 h-106 rounded-lg overflow-hidden cursor-pointer
                  transition-transform duration-300 snap-center
                  ${isActive ? "scale-100 shadow-2xl border-4 border-blue-500" : "opacity-70 hover:opacity-100"}
                `}
                            >
                                <img
                                    src={project.icon}
                                    alt={project.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/20 text-white text-center py-2 text-lg font-semibold backdrop-blur-sm">
                                    {project.name}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Project Details Section */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeProject?.id}
                    className="relative z-10 w-full mx-auto px-20 py-12 bg-zinc-900/0 rounded-lg my-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-3xl font-bold mb-4">{activeProject?.name}</h2>
                    <p className="text-zinc-300 mb-6">{activeProject?.description || "No description available."}</p>
                    {activeProject?.technologies && (
                        <>
                            <h3 className="font-semibold text-xl mb-2">Technologies Used:</h3>
                            <ul className="list-disc list-inside text-zinc-400 mb-6">
                                {activeProject.technologies.map((tech, idx) => (
                                    <li key={idx}>{tech}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {activeProject?.link && (
                        <a
                            href={activeProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-white"
                        >
                            View Project
                        </a>
                    )}
                </motion.div>
            </AnimatePresence>

            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
}
