import { wavinghand } from "../../../assets/index.js";
import { FlipWords } from "./";
import { motion } from "framer-motion"; // Correction de l'import

const HeroText = () => {
    const words = ["Stages","Contacts","Postes","Missions","Projets"];
    const variants = {
        hidden: {opacity: 0, scale: 0.25},
        visible: {opacity: 1, scale: 1}
    };

    return (
        <motion.div className="absolute inset-0 text-center z-30 flex-col items-center text-white text-xl lg:text-2xl xl:text-4xl font-bold pointer-events-none pt-[20vh]"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{delay: 1}}>
            {/* Version desktop */}
            <h1 className="hidden md:inline">
                <img src={wavinghand} alt="main qui salue" className="inline w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />, je suis Valérian De Carvalho<br/>
            </h1>

            {/* Version mobile - Main qui salue seulement */}
            <span className="inline md:hidden">
                <img src={wavinghand} alt="main qui salue" className="inline w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" /><br/>
            </span>

            {/* Texte commun */}
            <span className="text-quick-silver">
                Étudiant En Informatique<br/>
                Je Recherche Des<br/>
            </span>
            <FlipWords words={words} className="text-4xl lg:text-5xl xl:text-8xl" />

        </motion.div>
    );
};

export default HeroText;