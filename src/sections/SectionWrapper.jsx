import React from "react";

const SectionWrapper = ({ children, id }) => (
    <section
        id={id}
        className="">
        {children}
    </section>
);

export default SectionWrapper;