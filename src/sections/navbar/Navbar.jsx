import { useState } from "react";
import { menu, close, logo } from "../../assets/index.js";

const NAV_LINKS = [
    { id: "#accueil", label: "Accueil" },
    { id: "#projets", label: "Projets" },
    { id: "#formations", label: "Formations" },
    { id: "#experiences", label: "Expériences" },
    { id: "#contacter", label: "Contacter" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id) => {
        const el = document.querySelector(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    const NavLinks = ({ className = "" }) => (
        <ul className={`flex gap-3 sm:gap-4 md:gap-6 ${className}`}>
            {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                    <a
                        href={id}
                        className="text-navbar hover:text-white font-medium transition-colors duration-200 text-sm sm:text-base"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(id);
                        }}
                    >
                        {label}
                    </a>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="fixed inset-x-0 z-[100] w-full backdrop-blur-lg bg-primary/90">
            <div className="mx-auto w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:max-w-7xl xl:px-0">
                <div className="flex items-center justify-center md:justify-between py-2 relative">
                {/* Logo */}
                    <a
                        href="/public"
                        className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg md:text-xl font-bold transition-colors text-navbar hover:text-white flex-shrink-0 "
                    >
                        <img src={logo} alt="logo" className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="hidden sm:block">Valérian DC</span>
                        <span className="block sm:hidden">VDC</span>
                    </a>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-navbar hover:text-white focus:outline-none md:hidden flex-shrink-0 absolute right-2"
                        aria-label="Toggle menu"
                    >
                        <img
                            src={isOpen ? close : menu}
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            alt="toggle"
                        />
                    </button>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex flex-shrink-0">
                        <NavLinks />
                    </nav>
                </div>

                {/* Mobile navigation */}
                {isOpen && (
                    <nav className="block text-center md:hidden pb-5">
                        <NavLinks className="flex flex-col items-center space-y-2" />
                    </nav>
                )}
            </div>
        </div>
    );
};

export default Navbar;