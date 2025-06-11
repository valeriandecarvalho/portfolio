import { useState, useMemo, useRef, useEffect } from 'react';
import { SectionWrapper } from './utilities';
import { myEducations } from "../config/GetEducations.js";
import { myCertifications } from "../config/GetCertifications.js";

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
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
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
                            Voir le certificat
                        </a>
                    </div>
                )}

                {/* Effet de brillance */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-primary/10 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2 z-0"></div>
            </div>
        </div>
    );
};

const Education = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('recent'); // 'recent' ou 'oldest'
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const carouselRef = useRef(null);
    const filterRef = useRef(null);

    // Extraire les entreprises uniques pour le menu déroulant
    const companies = useMemo(() => {
        const uniqueCompanies = [...new Set(myCertifications.map(cert => cert.company))];
        return uniqueCompanies.sort();
    }, []);

    const filteredCertifications = useMemo(() => {
        let result = [...myCertifications];

        // Trier selon l'ordre choisi
        if (sortOrder === 'recent') {
            result.sort((a, b) => b.id - a.id);
        } else {
            result.sort((a, b) => a.id - b.id);
        }

        // Appliquer le filtre texte
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(cert =>
                cert.title.toLowerCase().includes(query) ||
                cert.company.toLowerCase().includes(query) ||
                cert.period.toLowerCase().includes(query) ||
                cert.description.some(desc => desc.toLowerCase().includes(query))
            );
        }

        // Appliquer le filtre par entreprise
        if (companyFilter) {
            result = result.filter(cert => cert.company === companyFilter);
        }

        return result;
    }, [searchQuery, companyFilter, sortOrder]);

    // Remettre le carrousel au début quand les filtres changent
    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, [filteredCertifications]);

    // Fermer le menu des filtres si on clique ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const cardWidth = window.innerWidth < 640 ? 300 : 340;
            const scrollAmount = cardWidth + 16; // card width + gap

            if (direction === 'left') {
                carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const resetFilters = () => {
        setCompanyFilter('');
        setSortOrder('recent');
        setIsFilterOpen(false);
    };

    return (
        <SectionWrapper id="formations">
            <h2 className="text-heading text-white text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">Formations</h2>
            <div className="mb-8 sm:mb-12 space-y-6 sm:space-y-8">
                {myEducations.map(({ title, job, date, contents, logo }, idx) => (
                    <div key={idx} className="p-4 sm:p-6">
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="w-8 sm:w-10 aspect-square rounded-full bg-white flex items-center justify-center overflow-hidden">
                                {logo ? (
                                    <img src={logo} alt={`${title} logo`} className="w-6 sm:w-8 h-6 sm:h-8 object-contain" />
                                ) : (
                                    <div className="w-3 sm:w-4 h-3 sm:h-4 bg-black rounded-sm" />
                                )}
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-white">{title}</h4>
                                <p className="italic text-xs sm:text-sm text-neutral-400">
                                    {job} — {date}
                                </p>
                            </div>
                        </div>

                        <div className="pl-11 sm:pl-14">
                            {contents.map((line, i) => (
                                <p key={i} className="text-xs sm:text-sm mb-1 text-neutral-300">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Section Certifications */}
            <div className="mt-16">
                <h2 className="text-heading text-white text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
                    Certifications
                </h2>

                {/* Barre de recherche et filtres */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {/* Barre de recherche */}
                    <input
                        type="text"
                        placeholder="Rechercher par titre, entreprise ou compétence..."
                        className="flex-1 p-3 rounded-lg bg-secondary/80 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-secondary transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Bouton de filtres */}
                    <div className="relative sm:w-auto" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/80 backdrop-blur-sm border border-gray-700 text-white hover:bg-secondary transition-all duration-300 w-full sm:w-auto ${
                                companyFilter || sortOrder !== 'recent' ? 'ring-2 ring-primary' : ''
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                                />
                            </svg>
                            Filtres
                            {(companyFilter || sortOrder !== 'recent') && (
                                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                                    {[companyFilter, sortOrder !== 'recent'].filter(Boolean).length}
                                </span>
                            )}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Menu déroulant des filtres */}
                        {isFilterOpen && (
                            <div className="absolute top-full left-0 right-0 sm:w-80 mt-2 p-4 bg-secondary/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50 space-y-4">
                                {/* Filtre par entreprise */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Entreprise
                                    </label>
                                    <select
                                        value={companyFilter}
                                        onChange={(e) => setCompanyFilter(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none"
                                        style={{ colorScheme: 'dark' }}
                                    >
                                        <option value="">Toutes les entreprises</option>
                                        {companies.map((company, index) => (
                                            <option key={index} value={company}>
                                                {company}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tri par date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Tri par date
                                    </label>
                                    <select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none"
                                        style={{ colorScheme: 'dark' }}
                                    >
                                        <option value="recent">Plus récent en premier</option>
                                        <option value="oldest">Plus ancien en premier</option>
                                    </select>
                                </div>

                                {/* Bouton de réinitialisation */}
                                <div className="pt-2">
                                    <button
                                        onClick={resetFilters}
                                        className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300"
                                    >
                                        Réinitialiser les filtres
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Conteneur du carrousel avec flèches */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Flèche gauche */}
                    <button
                        onClick={() => scrollCarousel('left')}
                        className="hidden sm:flex items-center justify-center bg-gray-800 hover:bg-primary text-white rounded-full p-3 shadow-lg transition-all duration-300 flex-shrink-0 border border-gray-700 hover:border-primary"
                        aria-label="Précédent"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Carrousel */}
                    <div
                        ref={carouselRef}
                        className="flex-1 overflow-x-auto scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            scrollSnapType: 'x mandatory',
                        }}
                    >
                        <div className="flex space-x-4 py-2 px-1">
                            {filteredCertifications.length > 0 ? (
                                filteredCertifications.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="scroll-snap-align-start flex-shrink-0"
                                        style={{ scrollSnapAlign: 'start' }}
                                    >
                                        <CertificationCard {...cert} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-white italic py-8 text-center w-full min-w-full">
                                    Aucune certification trouvée
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Flèche droite */}
                    <button
                        onClick={() => scrollCarousel('right')}
                        className="hidden sm:flex items-center justify-center bg-gray-800 hover:bg-primary text-white rounded-full p-3 shadow-lg transition-all duration-300 flex-shrink-0 border border-gray-700 hover:border-primary"
                        aria-label="Suivant"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Flèches pour mobile (en dessous du carrousel) */}
                <div className="sm:hidden flex justify-center gap-8 mt-4">
                    <button
                        onClick={() => scrollCarousel('left')}
                        className="bg-gray-800 hover:bg-primary text-white rounded-full p-3 shadow-lg border border-gray-700 hover:border-primary transition-all"
                        aria-label="Précédent"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollCarousel('right')}
                        className="bg-gray-800 hover:bg-primary text-white rounded-full p-3 shadow-lg border border-gray-700 hover:border-primary transition-all"
                        aria-label="Suivant"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Education;