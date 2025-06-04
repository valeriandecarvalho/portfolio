import { useState } from "react";
import { menu, close, logo } from "../assets";
import { motion } from "motion/react";

function Navigation() {
    return (
        <ul className="nav-ul">
            <li className="nav-li">
                <a className="nav-link" href="">
                    Menu
                </a>
            </li>
            <li className="nav-li">
                <a className="nav-link" href="">
                    Expériences
                </a>
            </li>
            <li className="nav-li">
                <a className="nav-link" href="">
                    Formations
                </a>
            </li>
            <li className="nav-li">
                <a className="nav-link" href="">
                    Projets
                </a>
            </li>
            <li className="nav-li">
                <a className="nav-link" href="">
                    Contacter
                </a>
            </li>
        </ul>
    );
}
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
            <div className="mx-auto c-space max-w-7xl">
                <div className="flex items-center justify-between py-2 sm:py-0">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold transition-colors text-neutral-400 hover:text-white"
                    >
                        <img src={logo} alt="logo" className="w-6 h-6" />
                        Valérian DC
                    </a>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
                    >
                        <img
                            src={isOpen ? close : menu}
                            className="w-6 h-6"
                            alt="toggle"
                        />
                    </button>
                    <nav className="hidden sm:flex">
                        <Navigation />
                    </nav>
                </div>
            </div>
            {isOpen && (
                <motion.div
                    className="block overflow-hidden text-center sm:hidden"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ maxHeight: "100vh" }}
                    transition={{ duration: 1 }}
                >
                    <nav className="pb-5">
                        <Navigation />
                    </nav>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;