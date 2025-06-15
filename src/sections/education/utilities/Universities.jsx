import { myEducations } from "../../../config/GetEducations.js";

const Universities = () => {
    return (
        <div className="space-y-6 sm:space-y-8">
            {myEducations.map(({ title, job, date, contents, logo }, idx) => (
                <div key={idx} className="relative rounded-xl p-4 sm:p-6 overflow-hidden">
                    {/* Fond dégradé */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-950/50 backdrop-blur-sm"></div>

                    {/* Bordure */}
                    <div className="absolute inset-0 border border-gray-700/30 rounded-xl"></div>

                    {/* Contenu */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="w-10 sm:w-12 aspect-square rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                                {logo ? (
                                    <img
                                        src={logo}
                                        alt={`${title} logo`}
                                        className="w-7 sm:w-9 h-7 sm:h-9 object-contain"
                                    />
                                ) : (
                                    <div className="w-4 sm:w-5 h-4 sm:h-5 bg-gradient-to-br from-primary to-secondary rounded-sm" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                                    {title}
                                </h3>
                                <p className="italic text-xs sm:text-sm text-neutral-400">
                                    {job} — {date}
                                </p>
                            </div>
                        </div>

                        <div className="pl-13 sm:pl-16 space-y-1">
                            {contents.map((line, i) => (
                                <p key={i} className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-primary/5 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
            ))}
        </div>
    );
};

export default Universities;