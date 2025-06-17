import { FlipWords } from "./";
import { motion } from "motion/react";
import { wavinghand } from "../../../assets/index.js";
import { useMediaQuery } from "react-responsive";

const HeroText = () => {
    const words = ["Stages","Contacts","Postes","Missions","Projets"];
    const variants = {
        hidden: {opacity: 0, x:-50},
        visible: {opacity: 1, x:0}
    };

    const isMobileLandscape = useMediaQuery({
        maxWidth: 853,
        orientation: 'landscape',
        maxHeight: 500
    });

    return (
        <div className={`z-10 text-center md:text-left rounded-3xl bg-clip-text ${
            isMobileLandscape ? 'mt-2' : 'mt-20 md:mt-40'
        }`}>
            {/* Desktop */}
            <div className="flex-col hidden md:flex c-space space-y-2">
                <motion.h1
                    className="text-3xl font-medium"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{delay: 1}}
                >
                    <img src={wavinghand} alt="main qui salue" className="inline w-8 h-8" /> , je suis Valérian De Carvalho
                </motion.h1>
                <div className="flex flex-col items-start">
                    <motion.p className="text-5xl font-medium text-neutral-300"
                              variants={variants}
                              initial="hidden"
                              animate="visible"
                              transition={{delay: 1.2}}
                    >
                        Étudiant En Informatique<br/>
                    </motion.p>
                    <motion.p className="text-5xl font-medium text-neutral-300"
                              variants={variants}
                              initial="hidden"
                              animate="visible"
                              transition={{delay: 1.5}}
                    >
                        Je Recherche Des<br/>
                    </motion.p>
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{delay: 1.8}}>
                        <FlipWords words={words} className="text-8xl font-medium -mt-2" />
                    </motion.div>
                </div>
            </div>

            {/* Mobile */}
            <div className={`flex-col space-y-6 md:hidden ${isMobileLandscape ? 'hidden' : 'flex'}`}>
                <motion.h1
                    className="text-xl font-medium"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{delay: 1}}
                >
                    <img src={wavinghand} alt="main qui salue" className="inline w-6 h-6" /> , je suis Valérian De Carvalho
                </motion.h1>
                <motion.p className="font-medium"
                          variants={variants}
                          initial="hidden"
                          animate="visible"
                          transition={{delay: 1.2}}>
                    <span className="text-2xl text-neutral-300">
                        Je suis&nbsp;
                    </span>
                    <span className="text-4xl">
                        Étudiant<br/>
                    </span>
                    <span className="text-2xl text-neutral-300">
                        en&nbsp;
                    </span>
                    <span className="text-4xl">
                        informatique
                    </span>
                </motion.p>
                <motion.p className="text-3xl text-neutral-300 font-medium"
                          variants={variants}
                          initial="hidden"
                          animate="visible"
                          transition={{delay: 1.5}}>
                    Je recherche des
                </motion.p>
                <motion.div className="-mt-6"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{delay: 1.8}}>
                    <FlipWords words={words} className="text-6xl font-medium"/>
                </motion.div>
            </div>

            {/* Mobile Landscape */}
            <div className={`${isMobileLandscape ? 'flex' : 'hidden'} flex-col space-y-0 md:hidden mt-12`}>
                <motion.h1
                    className="text-sm font-medium"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{delay: 1}}
                >
                    <img src={wavinghand} alt="main qui salue" className="inline w-4 h-4" /> , je suis Valérian De Carvalho
                </motion.h1>
                <motion.p className="font-medium "
                          variants={variants}
                          initial="hidden"
                          animate="visible"
                          transition={{delay: 1.2}}>
                    <span className="text-sm text-neutral-300">
                        Je suis&nbsp;
                    </span>
                    <span className="text-lg">
                        Étudiant<br/>
                    </span>
                    <div className="-mt-2">
                        <span className="text-sm text-neutral-300">
                            en&nbsp;
                        </span>
                        <span className="text-lg">
                            informatique
                        </span>
                    </div>
                </motion.p>
                <motion.p className="text-base text-neutral-300 font-medium"
                          variants={variants}
                          initial="hidden"
                          animate="visible"
                          transition={{delay: 1.5}}>
                    Je recherche des
                </motion.p>
                <motion.div className="-mt-2"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{delay: 1.8}}>
                    <FlipWords words={words} className="text-3xl font-medium"/>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroText;