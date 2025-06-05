import React, {Suspense} from 'react'
import {HeroText, HeroBackground,Robot, Loader} from "./utilities"
import {Canvas} from "@react-three/fiber";
import {useMediaQuery} from "react-responsive";

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
      <section
          className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
            id="accueil"
      >
        <HeroText />
        <HeroBackground />
        <figure
            className="absolute inset-0"
            style={{width: "100vw", height: "100vh"}}
        >
            <Canvas camera={{position: [0, 0, 1.75]}}>
                <Suspense fallback={<Loader/>}>
                        <Robot
                            scale ={isMobile ? 0.005 : 0.0075}
                            position={isMobile ?[0,-1.75,-0.85] : [0,-1.75,-0.9]}/>
                </Suspense>
            </Canvas>
        </figure>
      </section>
  )
}
export default Hero