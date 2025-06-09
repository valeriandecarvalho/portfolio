import React from 'react';
import { SectionWrapper } from "./utilities";

const Contact = () => {
    const handleMouseMove = (e) => {
        x.set(e.clientX + 20);
        y.set(e.clientY + 20);
    };
    return (
        <SectionWrapper
            onMouseMove={handleMouseMove}
            className="relative c-space section-spacing scroll-mt-12"
            id="contacter"
        >
            <h2 className="text-heading">Contacter</h2>
        </SectionWrapper>
    )
}

export default Contact