import { motion } from "motion/react";
import { close, github, arrowup } from "../../../assets/index.js"

const ProjectDetails = ({
                            title,
                            description,
                            subDescription,
                            image,
                            tags,
                            href,
                            closeModal,
                        }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-auto backdrop-blur-sm p-4">
            <motion.div
                className="relative w-full max-w-2xl max-h-[90vh] border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 overflow-auto"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <button
                    onClick={closeModal}
                    className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500 z-10"
                >
                    <img src={ close } className="w-6 h-6" />
                </button>
                <img src={image} alt={title} className="w-full rounded-t-2xl" />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
                    <p className="mb-3 font-normal text-neutral-400">{description}</p>
                    {subDescription.map((subDesc, index) => (
                        <p key={index} className="mb-3 font-normal text-neutral-400">{subDesc}</p>
                    ))}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                            {tags.map((tag) => (
                                <img
                                    key={tag.id}
                                    src={tag.path}
                                    alt={tag.name}
                                    className="rounded-lg size-10 hover-animation"
                                />
                            ))}
                        </div>
                        {href && (
                            <div className="flex justify-center sm:justify-end">
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 font-medium cursor-pointer hover-animation text-white hover:text-gray-300 whitespace-nowrap bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-200"
                                >
                                    <img src={github} alt="GitHub" className="w-5 h-5" />
                                    GitHub
                                    <img src={arrowup} className="size-4" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectDetails;