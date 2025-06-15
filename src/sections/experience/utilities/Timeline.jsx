"use client";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

export const Timeline = ({ data }) => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);

    // Fonction de calcul de hauteur optimisée
    const calculateHeight = useCallback(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, []);

    // Calcul initial de la hauteur
    useEffect(() => {
        calculateHeight();
    }, [calculateHeight, data]);

    // Gestionnaire de redimensionnement avec debounce
    useEffect(() => {
        let timeoutId;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(calculateHeight, 100);
        };

        window.addEventListener('resize', handleResize);
        // Forcer un recalcul après le premier rendu
        const initialTimeout = setTimeout(calculateHeight, 50);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
            clearTimeout(initialTimeout);
        };
    }, [calculateHeight]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    // Hooks useTransform appelés directement (pas dans useMemo)
    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="min-h-screen py-20" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4">
                <div ref={ref} className="relative">
                    {data.map((item, index) => (
                        <TimelineItem
                            key={item.id || `timeline-${index}`}
                            item={item}
                            index={index}
                        />
                    ))}

                    {/* Ligne principale animée */}
                    <div
                        style={{ height: height ? `${height}px` : 'auto' }}
                        className="absolute left-8 md:left-11.5 top-0 w-1 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent"
                    >
                        <motion.div
                            style={{
                                height: heightTransform,
                                opacity: opacityTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-1 bg-gradient-to-b from-purple-400 via-indigo-400 to-cyan-400 shadow-lg shadow-purple-500/50"
                        />

                        {/* Effet de lueur qui suit la progression */}
                        <motion.div
                            style={{
                                height: heightTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-3 -left-1 bg-gradient-to-b from-purple-400/30 via-indigo-400/30 to-cyan-400/30 blur-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant TimelineItem mémorisé pour éviter les re-renders inutiles
const TimelineItem = React.memo(({ item, index }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, {
        once: true,
        amount: 0.3,
        margin: "0px 0px -50px 0px"
    });

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className="relative flex items-start mb-16 md:mb-24"
        >
            {/* Point de la timeline avec animation */}
            <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                }}
                className="relative z-10 flex-shrink-0 mt-3"
            >
                <div className="relative w-6 h-6 ml-5 md:ml-9">
                    {/* Cercle principal */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 shadow-lg shadow-purple-500/50">
                        <div className="absolute inset-1 rounded-full bg-white/90 shadow-inner" />
                    </div>

                    {/* Effet de pulsation */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut"
                        }}
                        className="absolute -inset-2 rounded-full bg-purple-400/30 blur-sm"
                    />
                </div>
            </motion.div>

            {/* Contenu de la timeline */}
            <div className="flex-1 ml-8 md:ml-12">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{
                        duration: 0.8,
                        delay: index * 0.1 + 0.2,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="relative"
                >
                    {/* Carte de contenu avec effet glassmorphism */}
                    <motion.div
                        className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-xl group"
                        whileHover={{
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                    >
                        {/* Effet de brillance au survol */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Date et titre */}
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                                className="mb-4"
                            >
                                <span className="inline-block px-3 py-1 mb-3 text-sm font-semibold rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30">
                                    {item.date}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    {item.title}
                                </h3>
                                <h4 className="text-lg md:text-xl font-medium text-purple-300 mb-4">
                                    {item.job}
                                </h4>
                            </motion.div>

                            {/* Contenu avec espacement amélioré */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                                className="space-y-4"
                            >
                                {item.contents.map((content, contentIndex) => (
                                    <motion.div
                                        key={contentIndex}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1 + 0.8 + contentIndex * 0.1,
                                            ease: "easeOut"
                                        }}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400" />
                                        <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                            {content}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Décoration d'angle */}
                        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-transparent transform rotate-45 translate-x-4 -translate-y-4" />
                        </div>
                    </motion.div>

                    {/* Ligne de connexion vers le point */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.1 + 0.5,
                            ease: "easeInOut"
                        }}
                        className="absolute left-0 top-6 w-8 md:w-12 h-0.5 bg-gradient-to-r from-purple-400/50 to-transparent -translate-x-8 md:-translate-x-12 origin-left"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
});

TimelineItem.displayName = 'TimelineItem';