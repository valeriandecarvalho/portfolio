import { useState } from "react";
import { Project } from "./utilities";
import { myProjects } from "../config/GetProjects.js";
import { motion, useMotionValue, useSpring } from "motion/react";

const Projects = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    return (
        <section className="relative c-space section-spacing scroll-mt-12" id="projets">
            <h2 className="text-heading">Projets Sélectionnés</h2>
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[2px] w-full" />
            {myProjects.map((project) => (
                <Project key={project.id} {...project} />
            ))}
        </section>
    );
};

export default Projects;