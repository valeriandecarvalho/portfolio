import { useState } from "react";
import { menu, close, logo } from "../../assets/index.js";

function Navigation({ onLinkClick }) {
    return (
        <ul className="nav-ul">
            {[
                { id: "#accueil", label: "Accueil" },
                { id: "#projets", label: "Projets" },
                { id: "#formations", label: "Formations" },
                { id: "#experiences", label: "Expériences" },
                { id: "#contacter", label: "Contacter" },
            ].map(({ id, label }) => (
                <li key={id} className="nav-li">
                    <a
                        href={id}
                        className="nav-link"
                        onClick={(e) => {
                            e.preventDefault();
                            onLinkClick(id);
                        }}
                    >
                        {label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = (id) => {
        const el = document.querySelector(id);
        if (el) {
            const offset = -80; // décalage vers le haut en pixels (ajuste selon la hauteur de ta navbar)
            const y = el.getBoundingClientRect().top + window.scrollY + offset;

            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-x-0 z-[100] w-full backdrop-blur-lg bg-primary/75">
            <div className="mx-auto c-space max-w-7xl">
                <div className="flex items-center justify-between py-2 md:py-0">
                    <a
                        href="#accueil"
                        className="flex items-center gap-2 text-xl font-bold transition-colors text-neutral-400 hover:text-white"
                    >
                        <img src={logo} alt="logo" className="w-6 h-6" />
                        Valérian DC
                    </a>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none md:hidden"
                    >
                        <img src={isOpen ? close : menu} className="w-6 h-6" alt="toggle" />
                    </button>
                    <nav className="hidden md:flex">
                        <Navigation onLinkClick={handleLinkClick} />
                    </nav>
                </div>
            </div>
            {isOpen && (
                <div className="block text-center md:hidden">
                    <nav className="flex flex-col items-center space-y-4 pb-5">
                        <Navigation onLinkClick={handleLinkClick} />
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;