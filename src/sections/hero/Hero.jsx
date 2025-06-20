import React, {Suspense} from 'react'
import {HeroBackground, Robot, HeroText, Loader} from "./utilities"
import {Canvas} from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const isSm = useMediaQuery({ maxWidth: 767 });
    const isMd = useMediaQuery({ minWidth: 768 });

    let position = [0, -0.65, 4];
    let rotation = [-0.25, Math.PI, 0];
    let scale = 1;

    if (isSm) {
        scale= 0.9;
    } else if (isMd) {
        scale= 1;
    }

    return (
    <section
        id="accueil">
        <HeroBackground/>
        <HeroText/>
        <Canvas className="absolute inset-0 z-20">
            <Suspense fallback={<Loader/>}>
                <Robot position={position}
                       rotation={rotation}
                       scale={scale}
                />
            </Suspense>
        </Canvas>

    </section>
)
}

export default Hero;