import React from "react";
import {motion, useScroll, useTransform, useSpring} from "motion/react";

const HeroBackground = () => {
    const {scrollYProgress} = useScroll();
    const x = useSpring(scrollYProgress, {damping: 50});
    const mountain3Y =
        useTransform(x, [0,0.5], ["0%", "70%"]);
    const mountain2Y =
        useTransform(x, [0,0.5], ["0%", "50%"]);
    const mountain1Y =
        useTransform(x, [0,0.5], ["0%", "0%"]);
    return (
        <section className="absolute inset-0 bg-black/40">
            <div className="relative h-screen overflow-y-hidden">
            {/* Sky */}
                <div className="absolute inset-0 w-full h-screen -z-50"
                    style = {{
                        backgroundImage: "url(/background/sky.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom"
                    }}
                />
            {/* Mountain 1 */}
                <motion.div className="absolute inset-0 -z-10"
                     style = {{
                         backgroundImage: "url(/background/mountain-1.png)",
                         backgroundSize: "cover",
                         backgroundPosition: "bottom",
                         y: mountain1Y
                     }} />
            {/* Mountain 2 */}
                <motion.div className="absolute inset-0 -z-20"
                     style = {{
                         backgroundImage: "url(/background/mountain-2.png)",
                         backgroundSize: "cover",
                         backgroundPosition: "bottom",
                         y: mountain2Y
                     }} />
            {/* Mountain 3 */}
                <motion.div className="absolute inset-0 -z-40"
                     style = {{
                         backgroundImage: "url(/background/mountain-3.png)",
                         backgroundSize: "cover",
                         backgroundPosition: "bottom",
                         y: mountain3Y
                     }} />
        </div>
        </section>
    );
};

export default HeroBackground;