import { useState, useEffect } from 'react';
import SectionWrapper from "../SectionWrapper.jsx";
import Universities from "./utilities/Universities.jsx";
import Certifications from "./utilities/Certifications.jsx";

const Education = () => {
    const [activeTab, setActiveTab] = useState('academiques');
    const [initialFilters, setInitialFilters] = useState({});

    // Fonction pour parser les paramètres d'URL depuis le hash
    const parseUrlParams = () => {
        const hash = window.location.hash;

        // Cas 1: Hash simple comme #formations
        if (hash === '#formations') {
            return { tab: 'academiques', search: null, company: null, sort: null };
        }

        // Cas 2: Hash avec des paramètres comme #formations?tab=complementaires
        if (hash.includes('?')) {
            const [hashPart, queryString] = hash.split('?');

            // Vérifier que le hash correspond bien à notre section
            if (hashPart === '#formations') {
                const urlParams = new URLSearchParams(queryString);

                const tab = urlParams.get('tab');
                const search = urlParams.get('search');
                const company = urlParams.get('company');
                const sort = urlParams.get('sort');

                return { tab, search, company, sort };
            }
        }

        return { tab: null, search: null, company: null, sort: null };
    };

    // Effet pour initialiser depuis l'URL au chargement
    useEffect(() => {
        const { tab, search, company, sort } = parseUrlParams();

        // Si on a un hash #formations (avec ou sans paramètres)
        if (tab !== null) {
            if (tab === 'complementaires') {
                setActiveTab('complementaires');
                setInitialFilters({
                    search: search || '',
                    company: company || '',
                    sort: sort || 'relevance'
                });
            } else {
                // Par défaut ou pour 'academiques'
                setActiveTab('academiques');
                setInitialFilters({});
            }

            // Scroll vers la section si nécessaire
            const element = document.getElementById('formations');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    // Écouter les changements de hash
    useEffect(() => {
        const handleHashChange = () => {
            const { tab, search, company, sort } = parseUrlParams();

            if (tab !== null) {
                if (tab === 'complementaires') {
                    setActiveTab('complementaires');
                    setInitialFilters({
                        search: search || '',
                        company: company || '',
                        sort: sort || 'relevance'
                    });
                } else {
                    setActiveTab('academiques');
                    setInitialFilters({});
                }

                // Scroll vers la section
                const element = document.getElementById('formations');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        // Mettre à jour l'URL si nécessaire
        const currentHash = window.location.hash;
        if (currentHash.startsWith('#formations')) {
            if (tab === 'complementaires') {
                window.history.replaceState(null, null, '#formations?tab=complementaires');
            } else {
                window.history.replaceState(null, null, '#formations');
            }
        }
    };

    return (
        <SectionWrapper id="formations">
            <h2 className="text-heading text-white text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
                Mes Formations
            </h2>

            {/* Navigation par onglets - Version compacte */}
            <div className="flex justify-center mb-6">
                <div className="inline-flex bg-gray-800 rounded-lg p-1">
                    <button
                        onClick={() => handleTabChange('academiques')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                            activeTab === 'academiques'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                    >
                        Académiques
                    </button>
                    <button
                        onClick={() => handleTabChange('complementaires')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                            activeTab === 'complementaires'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                    >
                        Complémentaires
                    </button>
                </div>
            </div>

            {/* Contenu des onglets */}
            <div className="transition-all duration-300">
                {activeTab === 'academiques' && <Universities />}
                {activeTab === 'complementaires' && <Certifications initialFilters={initialFilters} />}
            </div>
        </SectionWrapper>
    );
};

export default Education;