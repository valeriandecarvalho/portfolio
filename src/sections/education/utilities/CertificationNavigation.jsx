import { ComplementaryCertificationLink, getPresetComplementaryCertificationLinks } from './CertificationLinks.js';

const ComplementaryCertificationNavigation = () => {
    const presetLinks = getPresetComplementaryCertificationLinks();

    return (
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
                Explorez mes certifications complémentaires
            </h3>

            {/* Section par entreprise */}
            <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-3">
                    Par entreprise
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <ComplementaryCertificationLink
                        company="Microsoft"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
                    >
                        Microsoft
                    </ComplementaryCertificationLink>

                    <ComplementaryCertificationLink
                        company="AWS"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-center"
                    >
                        AWS
                    </ComplementaryCertificationLink>

                    <ComplementaryCertificationLink
                        company="Google"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center"
                    >
                        Google
                    </ComplementaryCertificationLink>
                </div>
            </div>

            {/* Section par compétence */}
            <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-3">
                    Par compétence
                </h4>
                <div className="flex flex-wrap gap-2">
                    <ComplementaryCertificationLink
                        search="cloud"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm"
                    >
                        Cloud
                    </ComplementaryCertificationLink>

                    <ComplementaryCertificationLink
                        search="javascript"
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-full text-sm"
                    >
                        JavaScript
                    </ComplementaryCertificationLink>

                    <ComplementaryCertificationLink
                        search="react"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                        React
                    </ComplementaryCertificationLink>

                    <ComplementaryCertificationLink
                        search="security"
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
                    >
                        Sécurité
                    </ComplementaryCertificationLink>
                </div>
            </div>

            {/* Section tri */}
            <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-3">
                    Parcourir
                </h4>
                <div className="space-y-2">
                    <ComplementaryCertificationLink
                        sort="recent"
                        className="block w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-left"
                    >
                        📅 Certifications les plus récentes
                    </ComplementaryCertificationLink>

                    <ComplementaryCertificationLink
                        sort="relevance"
                        className="block w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-left"
                    >
                        ⭐ Certifications par pertinence
                    </ComplementaryCertificationLink>
                </div>
            </div>

            {/* Liens combinés */}
            <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-3">
                    Recherches populaires
                </h4>
                <div className="space-y-2">
                    <ComplementaryCertificationLink
                        company="Microsoft"
                        search="Azure"
                        sort="recent"
                        className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-left"
                    >
                        🔥 Certifications Microsoft Azure récentes
                    </ComplementaryCertificationLink>

                    <ComplementaryCertificationLink
                        company="AWS"
                        search="Cloud"
                        className="block w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg text-left"
                    >
                        ☁️ Certifications AWS Cloud
                    </ComplementaryCertificationLink>
                </div>
            </div>
        </div>
    );
};

export default ComplementaryCertificationNavigation;