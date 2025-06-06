import React from 'react'

const Contact = () => {
  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
  return (
      <section
          onMouseMove={handleMouseMove}
          className="relative c-space section-spacing scroll-mt-12"
          id="contacter"
      >
        <h2 className="text-heading">Contacter</h2>
      </section>
  )
}

export default Contact