import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HeroBackground = () => {
    const { scrollYProgress } = useScroll();

    // Simplification des animations parallax
    const slowMove = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
    const mediumMove = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
    const fastMove = useTransform(scrollYProgress, [0, 0.5], ["0%", "200%"]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Sky - Statique */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url(/background/sky.jpg)" }}
            />

            {/* Mountain 3 */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url(/background/mountain-3.png)",
                    y: fastMove
                }}
            />

            {/* Mountain 2 */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url(/background/mountain-2.png)",
                    y: mediumMove
                }}
            />

            {/* Mountain 1 */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url(/background/mountain-1.png)",
                    y: slowMove
                }}
            />
        </div>
    );
};

export default HeroBackground;