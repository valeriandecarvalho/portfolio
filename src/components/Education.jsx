import { useState, useMemo, useRef } from 'react';
import { SectionWrapper } from './utilities';
import { myEducations } from "../config/GetEducations.js";
import { myCertifications } from "../config/GetCertifications.js";

const CertificationCard = ({ title, company, period, description }) => (
    <div className="bg-tertiary rounded-xl p-4 sm:p-6 shadow-lg text-neutral-300 w-[280px] sm:w-[320px] flex-shrink-0 h-full">
        <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">
            {title}
        </h3>
        <p className="italic text-xs sm:text-sm mb-2 sm:mb-4 text-neutral-400">
            {company} — {period}
        </p>
        <div>
            {description.map((line, i) => (
                <p key={i} className="text-xs sm:text-sm mb-1 sm:mb-2">
                    {line}
                </p>
            ))}
        </div>
    </div>
);

const Education = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const carouselRef = useRef(null);

    const filteredCertifications = useMemo(() => {
        if (!searchQuery) return myCertifications;

        const query = searchQuery.toLowerCase();
        return myCertifications.filter(cert =>
            cert.title.toLowerCase().includes(query) ||
            cert.company.toLowerCase().includes(query) ||
            cert.period.toLowerCase().includes(query) ||
            cert.description.some(desc => desc.toLowerCase().includes(query))
        );
    }, [searchQuery]);

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
                <h3 className="text-heading text-white text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
                    Certifications
                </h3>

                {/* Barre de recherche */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Rechercher par titre, entreprise ou compétence..."
                        className="w-full p-3 rounded-lg bg-secondary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Conteneur du carrousel avec flèches */}
                <div className="flex items-center justify-between gap-4">
                    {/* Flèche gauche */}
                    <button
                        onClick={() => scrollCarousel('left')}
                        className="hidden sm:flex items-center justify-center bg-primary/80 hover:bg-primary text-white rounded-full p-3 shadow-lg transition-colors duration-300 flex-shrink-0"
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
                        className="hidden sm:flex items-center justify-center bg-primary/80 hover:bg-primary text-white rounded-full p-3 shadow-lg transition-colors duration-300 flex-shrink-0"
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
                        className="bg-primary/80 hover:bg-primary text-white rounded-full p-2 shadow-lg"
                        aria-label="Précédent"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollCarousel('right')}
                        className="bg-primary/80 hover:bg-primary text-white rounded-full p-2 shadow-lg"
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