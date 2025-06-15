import { mySocials } from "../../config/GetSocials.js";

const Footer = () => {
    return (
        <footer className="c-space py-8 mt-16">
            {/* Ligne de séparation */}
            <div className="mb-8 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

            {/* Contenu principal du footer */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

                {/* Section gauche - Copyright */}
                <div className="order-3 lg:order-1">
                    <p className="text-sm text-neutral-400 text-center lg:text-left">
                        © 2025 Valérian. Tous droits réservés.
                    </p>
                </div>

                {/* Section centre - Réseaux sociaux */}
                <div className="order-1 lg:order-2 flex items-center gap-4">
                    <span className="text-sm text-neutral-500 hidden sm:block">Suivez-moi :</span>
                    <div className="flex gap-4">
                        {mySocials.map((social, index) => (
                            <a
                                href={social.href}
                                key={index}
                                className="group relative p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/70 transition-all duration-300 hover:scale-110"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visiter mon profil ${social.name}`}
                            >
                                <img
                                    src={social.icon}
                                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                                    alt={social.name}
                                />

                                {/* Tooltip pour le nom du réseau social */}
                                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    {social.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Section droite - Liens légaux */}
                <div className="order-2 lg:order-3">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-neutral-400">
                        <a
                            href="#"
                            className="hover:text-neutral-300 transition-colors duration-300 hover:underline"
                        >
                            Conditions générales
                        </a>
                        <span className="hidden sm:block text-neutral-600">|</span>
                        <a
                            href="#"
                            className="hover:text-neutral-300 transition-colors duration-300 hover:underline"
                        >
                            Politique de confidentialité
                        </a>
                    </div>
                </div>

            </div>

            {/* Section bonus - Message ou citation (optionnel) */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
                <p className="text-center text-xs text-neutral-500 italic">
                    "La technologie au service de l'innovation"
                </p>
            </div>
        </footer>
    );
};

export default Footer;