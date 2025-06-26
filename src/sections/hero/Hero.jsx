import React, {Suspense} from 'react'
import {HeroText, HeroBackground,Robot, Loader} from "./utilities"
import {Canvas} from "@react-three/fiber";
import {useMediaQuery} from "react-responsive";

const Hero = () => {
    const isSm = useMediaQuery({ maxWidth: 767 });
    const isMd = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isLg = useMediaQuery({ minWidth: 992, maxWidth: 1199 });
    const isXl = useMediaQuery({ minWidth: 1200 });

    let position = [0, -0.65, 4];
    let rotation = [-0.25, Math.PI, 0];
    let scale = 1;

    if (isSm) {
        scale= 1;
    } else if (isMd) {
        scale= 1.2;
    } else if (isLg) {
        scale= 1.3;
    } else if (isXl) {
        scale = 1.4;
    }

  return (
      <section
          className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
            id="accueil"
      >
        <HeroText />
        <HeroBackground />
        <figure
            className="absolute inset-0 w-full h-screen"
        >
            <Canvas className="absolute inset-0 z-20">
                <Suspense fallback={<Loader/>}>
                    <Robot position={position}
                           rotation={rotation}
                           scale={scale}
                    />
                </Suspense>
            </Canvas>
        </figure>
      </section>
  )
}

export default Hero;