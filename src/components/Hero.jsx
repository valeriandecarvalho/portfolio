import React, {Suspense} from 'react'
import {HeroText, HeroBackground, SpaceMan, Loader} from "./utilities"
import {Canvas, useFrame} from "@react-three/fiber";
import {useMediaQuery} from "react-responsive";
import {easing} from "maath";
import {Float} from "@react-three/drei";

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
      <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
        <HeroText />
        <HeroBackground />
        <figure
            className="absolute inset-0"
            style={{width: "100vw", height: "100vh"}}
        >
            <Canvas camera={{position: [0, 1, 3]}}>
                <Suspense fallback={<Loader/>}>
                    <Float>
                        <SpaceMan
                        scale={isMobile && 0.2}
                        position={isMobile && [0, -1.5, 0]}/>
                    </Float>
                    <Rig/>
                </Suspense>
            </Canvas>
        </figure>
      </section>
  )
}

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
            0.5,
            delta
        );
    });
}

export default Hero