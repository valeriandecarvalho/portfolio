import { Project, SectionWrapper } from "./utilities";
import { myProjects } from "../config/GetProjects.js";
import { useMotionValue } from "motion/react";

const Projects = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    return (
        <SectionWrapper id="projets">
            <h2 className="text-heading">Projets Sélectionnés</h2>
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[2px] w-full" />
            {myProjects.map((project) => (
                <Project key={project.id} {...project} />
            ))}
        </SectionWrapper>
    );
};

export default Projects;