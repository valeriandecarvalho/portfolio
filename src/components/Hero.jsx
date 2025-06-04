import React from 'react'
import {HeroText, HeroBackground} from "./utilities"

const Hero = () => {
  return (
      <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
        <HeroText />
        <HeroBackground />
      </section>
  )
}

export default Hero