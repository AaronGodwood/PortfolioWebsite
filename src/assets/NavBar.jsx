import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";


export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full h-20 bg-white/80 text-black flex justify-between items-center px-8 py-4 z-50 shadow-md backdrop-blur">
            {/* Left: Name/Logo */}
            <div className="flex items-center space-x-3 px-10">
                <img src={"./images/logoDark.png"} alt="Logo" className="w-12 h-12 object-contain" />
                <span className="text-xl font-Sono px-2">Aaron Godwood</span>
            </div>

            {/* Right: Links */}
            <div className="flex gap-10 items-center text-xl">
                <a href="#contact" className="text-black visited:text-black hover:text-black no-underline transition">
                    Contact
                </a>
                <a
                    href="https://github.com/AaronGodwood"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black visited:text-black hover:text-black no-underline transition flex items-center gap-1"
                >
                    <FaGithub /> GitHub
                </a>
                <a
                    href="https://instagram.com/a_godwood12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black visited:text-black hover:text-black no-underline transition flex items-center gap-1"
                >
                    <FaInstagram /> Instagram
                </a>
                <a
                    href="https://linkedin.com/in/aaron-godwood-0769a1361"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black visited:text-black hover:text-black no-underline transition flex items-center gap-1"
                >
                    <FaLinkedin /> LinkedIn
                </a>
            </div>
        </nav>
    );
}
