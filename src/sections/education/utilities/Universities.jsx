import { myEducations } from "../../../config/GetEducations.js";

const Universities = () => {
    return (
        <div className="grid gap-6 md:gap-8">
            {myEducations.map(({ title, job, date, contents, logo }, idx) => (
                <div key={idx} className="group relative">
                    {/* Design en colonnes avec barre latérale colorée */}
                    <div className="relative bg-slate-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/30 group-hover:border-purple-400/40 transition-all duration-300">

                        {/* Barre latérale colorée */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700"></div>

                        <div className="flex flex-col lg:flex-row">
                            {/* Section gauche - Header */}
                            <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-slate-700/30 bg-slate-800/30">
                                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                    {/* Logo */}
                                    <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-4 group-hover:shadow-purple-500/20 transition-shadow duration-300">
                                        {logo ? (
                                            <img
                                                src={logo}
                                                alt={`${title} logo`}
                                                className="w-12 h-12 object-contain"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl" />
                                        )}
                                    </div>

                                    {/* Titre et infos */}
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                                        {title}
                                    </h3>

                                    <div className="space-y-2">
                                        <span className="inline-block text-sm font-medium text-white bg-purple-600/80 px-3 py-1 rounded-lg">
                                            {job}
                                        </span>
                                        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-purple-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-medium">{date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section droite - Contenu */}
                            <div className="lg:w-2/3 p-6">
                                <div className="space-y-3">
                                    {contents.map((line, i) => (
                                        <div key={i} className="flex items-start gap-3 group/item">
                                            {/* Numéro ou icône */}
                                            <div className="flex-shrink-0 w-6 h-6 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center mt-0.5">
                                                <span className="text-xs font-medium text-purple-300">{i + 1}</span>
                                            </div>

                                            {/* Texte */}
                                            <p className="text-sm text-slate-300 leading-relaxed group-hover/item:text-white transition-colors duration-300 flex-1">
                                                {line}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Academic decoration */}
                        <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                            <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zM18.82 9L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Universities;