import {Navbar, Hero, Projects, About} from "./components";

const App = ()  => {
  return(
    <div className="container mx-auto max-w-7xl">
      < Navbar />
      < Hero />
      < About />
      < Projects />
      <section className="min-h-screen"/>
      <section className="min-h-screen"/>
    </div>
  );
};

export default App;
