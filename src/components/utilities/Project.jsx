import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import { arrowright } from "../../assets";

const Project = ({
                     title,
                     description,
                     subDescription,
                     href,
                     image,
                     tags,
                 }) => {
    const [isHidden, setIsHidden] = useState(false);
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center md:items-center md:justify-between py-10 space-y-5 md:space-y-0 text-center md:text-left">
                <div className="w-full md:w-auto">
                    <p className="text-2xl">{title}</p>
                    <p className="mt-2 text-neutral-400 text-sm max-w-xl mx-auto md:mx-0">{description}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-5 mt-2 text-sand">
                        {tags.map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-auto flex items-center justify-center pt-2 md:pt-0">
                    <button
                        onClick={() => setIsHidden(true)}
                        className="flex items-center gap-1 cursor-pointer px-4 py-2 hover-animation font-bold
                        md:bg-transparent md:text-inherit md:shadow-none
                        rounded-sm sm:bg-white sm:text-black sm:shadow sm:hover:shadow-md"
                    >
                        Aperçu
                        <img src={arrowright} className="w-5 hidden md:inline" />
                    </button>
                </div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[2px] w-full" />

            {isHidden && (
                <ProjectDetails
                    title={title}
                    description={description}
                    subDescription={subDescription}
                    image={image}
                    tags={tags}
                    href={href}
                    closeModal={() => setIsHidden(false)}
                />
            )}
        </>
    );
};

export default Project;
