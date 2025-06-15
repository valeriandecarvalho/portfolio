/**
 * Utilitaires pour la navigation vers la section Education avec des filtres préremplis
 */

/**
 * Génère une URL vers la section certifications complémentaires avec des filtres
 * @param {Object} options - Options de filtrage
 * @param {string} options.search - Terme de recherche
 * @param {string} options.company - Entreprise à filtrer
 * @param {string} options.sort - Ordre de tri ('relevance', 'recent', 'oldest')
 * @param {string} baseUrl - URL de base (optionnel)
 * @returns {string} URL complète avec paramètres
 */
export const generateCertificationUrl = (options = {}, baseUrl = '') => {
    const params = new URLSearchParams();

    // Toujours ajouter tab=complementaires
    params.set('tab', 'complementaires');

    // Ajouter les paramètres de filtrage s'ils sont fournis
    if (options.search && options.search.trim()) {
        params.set('search', options.search.trim());
    }

    if (options.company && options.company.trim()) {
        params.set('company', options.company.trim());
    }

    if (options.sort && options.sort !== 'relevance') {
        params.set('sort', options.sort);
    }

    return `${baseUrl}#formations?${params.toString()}`;
};

/**
 * Navigue directement vers la section certifications complémentaires avec des filtres
 * @param {Object} options - Options de filtrage (même format que generateCertificationUrl)
 */
export const navigateToComplementaryCertifications = (options = {}) => {
    const url = generateCertificationUrl(options, window.location.origin + window.location.pathname);
    window.location.href = url;
};

/**
 * Génère des liens prédéfinis vers des certifications complémentaires populaires
 */
export const getPresetComplementaryCertificationLinks = (baseUrl = '') => {
    return {
        // Certifications Microsoft
        microsoft: generateCertificationUrl({
            company: 'Microsoft',
            sort: 'recent'
        }, baseUrl),

        // Certifications AWS
        aws: generateCertificationUrl({
            company: 'AWS',
            sort: 'recent'
        }, baseUrl),

        // Certifications Google
        google: generateCertificationUrl({
            company: 'Google',
            sort: 'recent'
        }, baseUrl),

        // Recherche par compétences
        cloud: generateCertificationUrl({
            search: 'cloud'
        }, baseUrl),

        javascript: generateCertificationUrl({
            search: 'javascript'
        }, baseUrl),

        react: generateCertificationUrl({
            search: 'react'
        }, baseUrl),

        security: generateCertificationUrl({
            search: 'security sécurité'
        }, baseUrl),

        // Certifications les plus récentes
        recent: generateCertificationUrl({
            sort: 'recent'
        }, baseUrl)
    };
};

/**
 * Composant React pour créer facilement des liens vers les certifications complémentaires
 */
export const ComplementaryCertificationLink = ({
                                                   children,
                                                   search,
                                                   company,
                                                   sort,
                                                   className = "",
                                                   ...props
                                               }) => {
    const url = generateCertificationUrl({ search, company, sort });

    return (
        <a
            href={url}
            className={`inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors ${className}`}
            {...props}
        >
            {children}
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
        </a>
    );
};

// Alias pour la compatibilité arrière
export const CertificationLink = ComplementaryCertificationLink;
export const navigateToCertifications = navigateToComplementaryCertifications;
export const getPresetCertificationLinks = getPresetComplementaryCertificationLinks;