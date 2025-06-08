import { myEducation } from "../config/GetEducations.js";
import { Timeline } from "./utilities/Timeline.jsx";

const Education = () => {
  const handleMouseMove = (e) => {
      x.set(e.clientX + 20);
      y.set(e.clientY + 20);
  };
  return (
      <section
          onMouseMove={handleMouseMove}
          className="relative c-space section-spacing scroll-mt-12"
          id="formations"
      >
          <h2 className="text-heading">Formations</h2>
          < Timeline data={myEducation} />
      </section>
  )
}

export default Education