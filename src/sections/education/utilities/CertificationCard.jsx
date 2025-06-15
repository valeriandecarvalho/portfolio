import { useState, useRef, useEffect } from 'react';

const CertificationCard = ({ title, company, period, description, href }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isTitleTruncated, setIsTitleTruncated] = useState(false);
    const titleRef = useRef(null);

    // Vérifier si le titre est tronqué
    useEffect(() => {
        if (titleRef.current) {
            const element = titleRef.current;
            setIsTitleTruncated(element.scrollWidth > element.clientWidth);
        }
    }, [title]);

    const handleTitleInteraction = () => {
        if (isTitleTruncated) {
            setShowTooltip(!showTooltip);
        }
    };

    const handleMouseEnter = () => {
        if (isTitleTruncated) {
            setShowTooltip(true);
        }
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    // Fermer la tooltip si on clique ailleurs (pour mobile)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (titleRef.current && !titleRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };

        if (showTooltip) {
            document.addEventListener('touchstart', handleClickOutside);
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showTooltip]);

    return (
        <div className="relative rounded-xl p-4 sm:p-6 text-neutral-300 w-[280px] sm:w-[320px] flex-shrink-0 h-full overflow-hidden">
            {/* Fond dégradé */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-950/90 backdrop-blur-sm z-0"></div>

            {/* Bordure animée */}
            <div className="absolute inset-0 border border-gray-700/50 rounded-xl z-10"></div>

            {/* Contenu */}
            <div className="relative z-20 h-full flex flex-col">
                <div className="relative">
                    <h3
                        ref={titleRef}
                        className={`text-white font-bold text-xl sm:text-2xl mb-2 truncate ${
                            isTitleTruncated ? 'cursor-pointer select-none' : ''
                        }`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleTitleInteraction}
                        onTouchEnd={handleTitleInteraction}
                    >
                        {title}
                        {/* Indicateur visuel pour les titres tronqués */}
                        {isTitleTruncated && (
                            <span className="ml-1 text-primary text-sm opacity-60">ⓘ</span>
                        )}
                    </h3>

                    {/* Tooltip personnalisée */}
                    {showTooltip && isTitleTruncated && (
                        <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-gray-900 border border-gray-600 rounded-lg shadow-xl z-50 text-sm text-white animate-in fade-in duration-200">
                            {title}
                            <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 border-l border-t border-gray-600 transform rotate-45"></div>
                        </div>
                    )}
                </div>
                <p className="italic text-xs sm:text-sm mb-2 sm:mb-4 text-neutral-400">
                    {company} — {period}
                </p>
                <div className="flex-grow">
                    {description.map((line, i) => (
                        <p key={i} className="text-xs sm:text-sm mb-1 sm:mb-2">
                            {line}
                        </p>
                    ))}
                </div>

                {/* Bouton de certification (si href existe) */}
                {href && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-b from-royal to-lavender hover:from-purple-600 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-700/25 hover:scale-105 overflow-hidden w-full"
                        >
                            {/* Effet de brillance animé */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                            <span className="relative z-10">Voir le certificat</span>

                            {/* Flèche avec animation */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>
                )}

                {/* Effet de brillance */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-primary/10 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2 z-0"></div>
            </div>
        </div>
    );
};

export default CertificationCard;