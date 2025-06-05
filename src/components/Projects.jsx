const Projects = () => {
    const handleMouseMove = (e) => {
        x.set(e.clientX + 20);
        y.set(e.clientY + 20);
    };
  return (
      <section
          onMouseMove={handleMouseMove}
          className="relative c-space section-spacing scroll-mt-12"
          id="projets"
      >
      <h2 className="text-heading">My Selected Projects</h2>
    <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      </section>);
};

export default Projects;