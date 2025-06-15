import React from "react";

const SectionWrapper = ({ children, id }) => (
    <section
        id={id}
        className="c-space section-spacing">
        {children}
    </section>
);

export default SectionWrapper;
