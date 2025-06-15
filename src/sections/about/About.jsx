import React from 'react'
import {useRef} from "react";
import { git, raspberry, java } from "../../assets";
import {Card, Globe, CopyEmailButton, SkillsCircle} from './utilities'

const About = () => {
    const grid2container = useRef();
  return (
    <section className="c-space section-spacing">
      <h2 className="text-heading">
        À propos de moi
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
            <img
                src="/grid_1.png"
                className="absolute scale-[1] right-[-1rem] top-[7.5rem]
                md:scale-[2.25] md:left-1 md:top-[75%]
                lg:scale-[1.75] lg:top-[70%]"
            />
            <div className="z-10 absolute top-0 left-0 right-0 p-6">
                <p className="headtext">Technologies Innovantes</p>
                <p className="subtext">
                    Étudiant passionné par l'innovation technologique, j'explore avec curiosité la robotique, l'IA, l'IoT et la blockchain. Ces domaines nourrissent ma soif d'apprendre et d'expérimenter.
                </p>
            </div>
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
            <div ref={grid2container} className="flex items-center justify-center w-full h-full">
                <p className="flex items-end text-5xl text-gray-500 text-center">
                    Coder, C’est Créer
                </p>
                <Card style={{ rotate: "0deg", top: "10%", left: "5%" }} text="Robotique" className="bg-storm w-[9rem]" containerRef={grid2container}/>
                <Card style={{ rotate: "20deg", top: "10%", left: "50%" }} text="Logiciel" className="bg-storm w-[9rem]" containerRef={grid2container}/>
                <Card style={{ rotate: "-10deg", top: "70%", left: "60%" }} text="Cloud" className="bg-storm w-[6rem]" containerRef={grid2container}/>
                <Card style={{ rotate: "-30deg", bottom: "20%", left: "75%" }} text="Data" className="bg-storm w-[6rem]" containerRef={grid2container}/>
                <Card style={{ rotate: "-45deg", top: "65%", left: "1%" }} text="IA" className="bg-storm w-[6rem]" containerRef={grid2container}/>
                <Card style={{ rotate: "5deg", top: "70%", left: "30%" }} text="Web" className="bg-storm w-[6rem]" containerRef={grid2container}/>
                <Card  style={{ rotate: "30deg", top: "70%", left: "70%" }} image={java} containerRef={grid2container} borderColor="#f58219"/>
                <Card  style={{ rotate: "-30deg", top: "20%", left: "20%" }} image={raspberry} containerRef={grid2container} borderColor="#bc1142"/>
                <Card  style={{ rotate: "0deg", top: "20%", left: "70%" }} image={git} containerRef={grid2container} borderColor="#f03c2e"/>
            </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
            <div className="z-10">
                <p className="headtext">Ouverture Internationale</p>
                <p className="subtext w-[45%] md:w-[75%] lg:w-[60%]">Basé en France, ma passion pour la découverte m'ouvre aux opportunités européennes et internationales. Prêt à explorer de nouveaux environnements, en remote ou sur site.</p>
            </div>
            < figure className="absolute left-[40%] md:left-[60%] lg:left-[50%] top-[10%]">
                < Globe />
            </figure>
        </div>
        {/* Grid 4 */}
          <div className="grid-special-color grid-4 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4 size-">
                  <p className="text-center mt-2 mb-2 text-lg">
                      Une opportunité ? Discutons ensemble des possibilités !
                  </p>
                  <CopyEmailButton />
              </div>
          </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
            <div className="z-10 w-[60%]">
                <p className="headtext">Stack Technique</p>
                <p className="subtext">
                    Formation académique et auto-apprentissage m'ont permis d'acquérir une base technique solide. Du développement logiciel au hardware embarqué, je continue d'élargir mes compétences.
                </p>
            </div>
            <div className="absolute inset-y-0 md:inset-y-5 w-full h-full start-[50%] md:scale-90 sm:scale-120 ">
                <SkillsCircle />
            </div>
        </div>
      </div>
    </section>
  )
}

export default About