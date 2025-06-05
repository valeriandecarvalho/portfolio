import React from 'react'
import {Card} from './utilities'

const About = () => {
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
            <div className="flex items-center justify-center w-full h-full">
                <p className="flex items-end text-5xl text-gray-500 text-center">
                    Coder, C’est Créer
                </p>
                <Card text="Number 1"/>
                <Card text="Number 2"/>
                <Card text="Number 3"/>
                <Card text="Number 4"/>
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