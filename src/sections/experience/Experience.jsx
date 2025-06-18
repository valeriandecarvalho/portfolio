import { myExperiences } from "../../config/GetExperiences.js";
import { Timeline } from "./utilities/Timeline.jsx";
import SectionWrapper from "../SectionWrapper.jsx";

const Experience = () => {
    return (
        <SectionWrapper id="experiences">
            <div className="relative">
                <h2 className="text-heading">Expériences</h2>
                <Timeline data={myExperiences} />
            </div>
        </SectionWrapper>
    );
};

export default Experience;