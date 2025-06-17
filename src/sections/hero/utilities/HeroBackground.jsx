import React, { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const HeroBackground = () => {
    const { scrollYProgress } = useScroll();
    const x = useSpring(scrollYProgress, { damping: 50 });

    const mountain3Y = useTransform(x, [0, 0.5], ["0%", "200%"]);
    const mountain2Y = useTransform(x, [0, 0.5], ["0%", "100%"]);
    const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, []);

    return (
        <section className="absolute inset-0 w-full h-full min-h-screen bg-black/40">
            <div className="relative w-full h-screen min-h-screen overflow-hidden">
                {/* Sky */}
                <div
                    className="absolute inset-0 w-full h-full min-h-screen -z-50"
                    style={{
                        backgroundImage: "url(/background/sky.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center bottom",
                        backgroundRepeat: "no-repeat"
                    }}
                />
                {/* Mountain 1 */}
                <motion.div
                    className="absolute inset-0 w-full h-full min-h-screen -z-10"
                    style={{
                        backgroundImage: "url(/background/mountain-1.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center bottom",
                        backgroundRepeat: "no-repeat",
                        y: mountain1Y
                    }}
                />
                {/* Mountain 2 */}
                <motion.div
                    className="absolute inset-0 w-full h-full min-h-screen -z-20"
                    style={{
                        backgroundImage: "url(/background/mountain-2.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center bottom",
                        backgroundRepeat: "no-repeat",
                        y: mountain2Y
                    }}
                />
                {/* Mountain 3 */}
                <motion.div
                    className="absolute inset-0 w-full h-full min-h-screen -z-40"
                    style={{
                        backgroundImage: "url(/background/mountain-3.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center bottom",
                        backgroundRepeat: "no-repeat",
                        y: mountain3Y
                    }}
                />
            </div>
        </section>
    );
};

export default HeroBackground;