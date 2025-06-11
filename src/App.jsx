import {Navbar, Hero, Projects, About, Education, Experience, Contact, Footer} from "./components";

const App = ()  => {
  return(
    <div className="container mx-auto max-w-7xl">
      < Navbar />
      < Hero />
      < About />
      < Projects />
      < Education />
      < Experience />
      < Contact />
      < Footer />
    </div>
  );
};

export default App;
