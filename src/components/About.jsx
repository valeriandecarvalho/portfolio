import React from 'react'
import {useRef} from "react";
import { git_card, raspberry_card, java_card } from "../assets/card";
import {Card} from './utilities'

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
                src="/grid_1.svg"
                className="absolute scale-[1.5] right-[-1rem] top-[6rem]
                md:scale-[2.75] md:left-1 md:top-[65%]
                lg:scale-[2.25] lg:top-[70%]"
            />
            <div className="z-10 absolute top-0 left-0 right-0 p-6">
                <p className="headtext">Title 1</p>
                <p className="subtext">
                    Text
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
                <Card  style={{ rotate: "30deg", top: "70%", left: "70%" }} image={java_card} containerRef={grid2container}/>
                <Card  style={{ rotate: "-30deg", top: "20%", left: "20%" }} image={raspberry_card} containerRef={grid2container}/>
                <Card  style={{ rotate: "0deg", top: "20%", left: "70%" }} image={git_card} containerRef={grid2container}/>
            </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
        </div>
      </div>
    </section>
  )
}

export default About