import { wavinghand } from "../../../assets/index.js";
import { FlipWords } from "./";

const HeroText = () => {
    const words = ["Stages","Contacts","Postes","Missions","Projets"];
    return (
        <div className="absolute inset-0 text-center z-30 flex-col items-center text-white text-base md:text-lg lg:text-2xl xl:text-3xl font-bold pointer-events-none pt-[20vh]">
            <h1 className="hidden md:inline">
                <img src={wavinghand} alt="main qui salue" className="inline w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />, je suis Valérian De Carvalho<br/>
            </h1>
            <span className="inline md:hidden">
                <img src={wavinghand} alt="main qui salue" className="inline w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" /><br/>
            </span>
            <span className="text-navbar">
                Étudiant En Informatique<br/>
                Je Recherche Des<br/>
            </span>
            <FlipWords words={words} className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl" />
        </div>
    );
};

export default HeroText;
