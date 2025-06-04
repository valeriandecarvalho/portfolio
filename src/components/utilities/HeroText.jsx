import { FlipWords } from "./FlipWords.jsx";
import { motion } from "motion/react";
import { wavinghand } from "../../assets";
const words = ["Stages","Contacts","Postes","Missions","Projets"]
const HeroText = () => {
  return (
      <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
          {/* Desktop */}
          <div className="flex-col hidden md:flex c-space space-y-2">
              <motion.h1
                  className="text-3xl font-medium"
                  initial={{opacity:0, x:-50}}
                  animate={{opacity:1, x:0}}
                  transition={{delay: 1}}
              >
                  <img src={wavinghand} alt="main qui salue" className="inline w-8 h-8 =" /> , je suis Valérian De Carvalho
              </motion.h1>
              <p className="text-5xl font-medium" >
                  <span className="text-neutral-300">
                      Étudiant En Informatique<br/>
                      Je Recherche Des<br/>
                  </span>
                  <FlipWords words={words} className="text-8xl font-medium"/>
              </p>
          </div>

          {/* Mobile */}
          <div className="flex- flex-col space-y-6 md:hidden">
              <motion.img src={wavinghand}
                          alt="main qui salue"
                          className="inline w-8 h-8"
                          initial={{opacity:0, x:-50}}
                          animate={{opacity:1, x:0}}
                          transition={{delay: 1}}
              />
              <p className="font-medium">
                  <span className="text-2xl text-neutral-300">
                      Je suis&nbsp;
                  </span>
                  <span className="text-5xl">
                      Étudiant<br/>
                  </span>
                  <span className="text-2xl text-neutral-300">
                      en&nbsp;
                  </span>
                  <span className="text-5xl">
                      informatique
                  </span>
              </p>
              <p className="font-medium">
                  <span className="text-4xl text-neutral-300">Je recherche des<br/></span>
                  <FlipWords words={words} className="text-7xl font-medium"/>
              </p>
          </div>
      </div>
  )
}

export default HeroText;