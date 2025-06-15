import { useState, useMemo, useRef, useEffect } from 'react';
import { myCertifications } from "../../../config/GetCertifications.js";
import CertificationCard from "./CertificationCard.jsx";

const Certifications = ({ initialFilters = {} }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('relevance');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const carouselRef = useRef(null);
    const filterRef = useRef(null);

    // Appliquer les filtres initiaux depuis l'URL
    useEffect(() => {
        console.log('Initial filters changed:', initialFilters); // Debug

        if (initialFilters.search !== undefined) {
            setSearchQuery(initialFilters.search);
        }
        if (initialFilters.company !== undefined) {
            setCompanyFilter(initialFilters.company);
        }
        if (initialFilters.sort !== undefined) {
            setSortOrder(initialFilters.sort);
        }
    }, [initialFilters]); // Dépendance sur initialFilters

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
        } else if (sortOrder === 'oldest') {
            result.sort((a, b) => a.id - b.id);
        } else if (sortOrder === 'relevance') {
            result.sort((a, b) => {
                const relevanceA = a.relevance || 0;
                const relevanceB = b.relevance || 0;

                if (relevanceB !== relevanceA) {
                    return relevanceB - relevanceA;
                }
                return b.id - a.id;
            });
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
            const scrollAmount = cardWidth + 16;

            if (direction === 'left') {
                carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const resetFilters = () => {
        setSearchQuery('');
        setCompanyFilter('');
        setSortOrder('relevance');
        setIsFilterOpen(false);
    };

    return (
        <div>
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
                            companyFilter ? 'ring-2 ring-primary' : ''
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
                        {companyFilter && (
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                                1
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

                            {/* Ordre de tri */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Ordre de tri
                                </label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none"
                                    style={{ colorScheme: 'dark' }}
                                >
                                    <option value="relevance">Par pertinence</option>
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

            {/* Flèches pour mobile */}
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
    );
};

export default Certifications;