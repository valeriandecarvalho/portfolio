import {Navbar, Hero, Projects, About, Education, Experience, Contact} from "./components";

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
      <section className="min-h-screen"/>
    </div>
  );
};

export default App;
