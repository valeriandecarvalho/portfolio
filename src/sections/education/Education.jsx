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

        // Vérifier si on a un hash avec des paramètres
        if (hash.includes('?')) {
            const [, queryString] = hash.split('?');
            const urlParams = new URLSearchParams(queryString);

            const tab = urlParams.get('tab');
            const search = urlParams.get('search');
            const company = urlParams.get('company');
            const sort = urlParams.get('sort');

            return { tab, search, company, sort };
        }

        return { tab: null, search: null, company: null, sort: null };
    };

    // Effet pour initialiser depuis l'URL au chargement
    useEffect(() => {
        const { tab, search, company, sort } = parseUrlParams();

        if (tab === 'complementaires') {
            setActiveTab('complementaires');
            setInitialFilters({
                search: search || '',
                company: company || '',
                sort: sort || 'relevance'
            });
        }
    }, []);

    // Écouter les changements de hash
    useEffect(() => {
        const handleHashChange = () => {
            const { tab, search, company, sort } = parseUrlParams();

            if (tab === 'complementaires') {
                setActiveTab('complementaires');
                setInitialFilters({
                    search: search || '',
                    company: company || '',
                    sort: sort || 'relevance'
                });
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Ne pas modifier l'URL lors du changement d'onglet manuel
        // L'URL ne change que lors de navigation externe (liens de certification)
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