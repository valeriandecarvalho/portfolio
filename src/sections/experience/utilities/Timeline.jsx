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
        const initialTimeout = setTimeout(calculateHeight, 50);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
            clearTimeout(initialTimeout);
        };
    }, [calculateHeight]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 30%", "end 80%"],
    });

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

                    {/* Ligne principale animée avec nouveau style */}
                    <div
                        style={{ height: height ? `${height}px` : 'auto' }}
                        className="absolute left-8 md:left-11.5 top-0 w-1 bg-slate-700/50"
                    >
                        <motion.div
                            style={{
                                height: heightTransform,
                                opacity: opacityTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-1 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700"
                        />

                        {/* Effet de lueur */}
                        <motion.div
                            style={{
                                height: heightTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-3 -left-1 bg-gradient-to-b from-purple-500/20 via-purple-600/20 to-purple-700/20 blur-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant TimelineItem avec nouveau design
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
            className="relative flex items-start mb-16 md:mb-24 group"
        >
            {/* Point de la timeline avec nouveau design */}
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
                className="relative z-10 flex-shrink-0 mt-6"
            >
                <div className="relative w-8 h-8 ml-4 md:ml-8">
                    {/* Cercle principal avec style business */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg">
                        <div className="absolute inset-1 rounded-full bg-slate-800 flex items-center justify-center">
                            {/* Icône briefcase pour les expériences */}
                            <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 2L8 4H5C3.89 4 3 4.89 3 6V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V6C21 4.89 20.11 4 19 4H16L14 2H10ZM10.5 4H13.5L14.5 5H19V19H5V6H9.5L10.5 4ZM7 9V11H17V9H7Z"/>
                            </svg>
                        </div>
                    </div>

                    {/* Effet de pulsation */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                        }}
                        className="absolute -inset-2 rounded-full bg-purple-500/20 blur-sm"
                    />
                </div>
            </motion.div>

            {/* Contenu de la timeline avec design similaire à Universities */}
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
                    {/* Carte de contenu avec design unifié */}
                    <motion.div
                        className="relative bg-slate-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/30 group-hover:border-purple-400/40 transition-all duration-300 shadow-xl"
                        whileHover={{
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                    >
                        {/* Barre latérale colorée comme Universities */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700"></div>

                        <div className="flex flex-col lg:flex-row">
                            {/* Section gauche - Header */}
                            <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-slate-700/30 bg-slate-800/30">
                                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

                                    {/* Icône d'entreprise */}
                                    <div className="w-16 h-16 rounded-2xl bg-slate-800 shadow-xl flex items-center justify-center mb-4 group-hover:shadow-purple-500/20 transition-shadow duration-300 border border-slate-600/50">
                                        <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19ZM6 10V12H18V10H6Z"/>
                                        </svg>
                                    </div>

                                    {/* Titre et infos */}
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                                        {item.title}
                                    </h3>

                                    <div className="space-y-2">
                                        <span className="inline-block text-sm font-medium text-white bg-purple-600/80 px-3 py-1 rounded-lg">
                                            {item.job}
                                        </span>
                                        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-purple-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-medium">{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section droite - Contenu */}
                            <div className="lg:w-2/3 p-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                                    className="space-y-3"
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
                                            className="flex items-start gap-3 group/item"
                                        >
                                            {/* Puce avec style business */}
                                            <div className="flex-shrink-0 w-6 h-6 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center mt-0.5">
                                                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                            </div>

                                            {/* Texte */}
                                            <p className="text-sm text-slate-300 leading-relaxed group-hover/item:text-white transition-colors duration-300 flex-1">
                                                {content}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Décoration d'entreprise */}
                        <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                            <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 7V3C12 2.45 11.55 2 11 2H5C4.45 2 4 2.45 4 3V21H12V14H20V21H22V11L12 7ZM6 19H8V17H6V19ZM6 15H8V13H6V15ZM6 11H8V9H6V11ZM6 7H8V5H6V7ZM16 19H18V17H16V19ZM16 15H18V13H16V15Z"/>
                            </svg>
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
                        className="absolute left-0 top-10 w-8 md:w-12 h-0.5 bg-gradient-to-r from-purple-500/60 to-transparent -translate-x-8 md:-translate-x-12 origin-left"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
});

TimelineItem.displayName = 'TimelineItem';