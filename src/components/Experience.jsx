import { myExperiences } from "../config/GetExperiences.js";
import { Timeline } from "./utilities/Timeline.jsx";
import { SectionWrapper } from "./utilities";

const Experience = () => {
    const handleMouseMove = (e) => {
        x.set(e.clientX + 20);
        y.set(e.clientY + 20);
    };

    return (
        <SectionWrapper id="experiences">
            <div onMouseMove={handleMouseMove} className="relative">
                <h2 className="text-heading">Expériences</h2>
                <Timeline data={myExperiences} />
            </div>
        </SectionWrapper>
    );
};

export default Experience;