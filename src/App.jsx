import {Navbar, Hero, About} from "./sections/index.js";

const App = ()  => {
    return(
        <div className="container mx-auto max-w-7xl">
            < Navbar />
            < Hero />
            < About />
            <div className="h-1000"></div>


        </div>
    );
};

export default App;