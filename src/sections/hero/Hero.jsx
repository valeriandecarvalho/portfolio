import React, {Suspense} from 'react'
import {HeroBackground, Robot} from "./utilities"
import {Canvas} from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const isSm = useMediaQuery({ maxWidth: 767 });
    const isMd = useMediaQuery({ minWidth: 768 });

    let position = [0, -0.65, 4];
    let rotation = [-0.25, Math.PI, 0];
    let scale = 1;

    if (isSm) {
        scale= 0.75;
    } else if (isMd) {
        scale= 1;
    }

    return (
    <section
        id="accueil">
        <HeroBackground/>
        <Canvas>
            < Suspense fallback={null}>
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