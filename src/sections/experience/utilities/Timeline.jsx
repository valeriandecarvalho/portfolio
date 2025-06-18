"use client";
import { useScroll, useTransform, motion } from "framer-motion";
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
        <div className="min-h-screen py-10 sm:py-20" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4">
                <div ref={ref} className="relative">
                    {data.map((item, index) => (
                        <TimelineItem
                            key={item.id || `timeline-${index}`}
                            item={item}
                            index={index}
                        />
                    ))}

                    {/* Ligne principale animée - Repositionnée pour mobile */}
                    <div
                        style={{ height: height ? `${height}px` : 'auto' }}
                        className="absolute left-4 sm:left-8 md:left-11.5 top-0 w-0.5 sm:w-1 bg-slate-700/50"
                    >
                        <motion.div
                            style={{
                                height: heightTransform,
                                opacity: opacityTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-0.5 sm:w-1 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700"
                        />

                        {/* Effet de lueur - Ajusté pour mobile */}
                        <motion.div
                            style={{
                                height: heightTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-2 sm:w-3 -left-0.5 sm:-left-1 bg-gradient-to-b from-purple-500/20 via-purple-600/20 to-purple-700/20 blur-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant TimelineItem optimisé pour mobile
const TimelineItem = React.memo(({ item, index }) => {
    const itemRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Détection mobile plus robuste
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const maxItemsOnMobile = 2;
    const shouldShowButton = isMobile && item.contents && item.contents.length > maxItemsOnMobile;
    const displayedContents = shouldShowButton && !isExpanded
        ? item.contents.slice(0, maxItemsOnMobile)
        : item.contents || [];

    return (
        <div
            ref={itemRef}
            className="relative flex items-start mb-12 sm:mb-16 md:mb-24 group"
        >
            {/* Point de la timeline - Repositionné pour mobile */}
            <div className="relative z-10 flex-shrink-0 mt-4 sm:mt-6">
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 ml-1 sm:ml-4 md:ml-8">
                    {/* Cercle principal avec style business */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg">
                        <div className="absolute inset-0.5 sm:inset-1 rounded-full bg-slate-800 flex items-center justify-center">
                            {/* Icône briefcase pour les expériences */}
                            <svg className="w-2 h-2 sm:w-3 sm:h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 2L8 4H5C3.89 4 3 4.89 3 6V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V6C21 4.89 20.11 4 19 4H16L14 2H10ZM10.5 4H13.5L14.5 5H19V19H5V6H9.5L10.5 4ZM7 9V11H17V9H7Z"/>
                            </svg>
                        </div>
                    </div>

                    {/* Effet de pulsation - Réduit sur mobile */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                        }}
                        className="absolute -inset-1 sm:-inset-2 rounded-full bg-purple-500/20 blur-sm"
                    />
                </div>
            </div>

            {/* Contenu de la timeline - Layout adaptatif */}
            <div className="flex-1 ml-4 sm:ml-8 md:ml-12">
                <div className="relative">
                    {/* Carte de contenu avec design unifié */}
                    <motion.div
                        className="relative bg-slate-900/60 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden border border-slate-700/30 group-hover:border-purple-400/40 transition-all duration-300 shadow-xl"
                        whileHover={{
                            scale: isMobile ? 1 : 1.02,
                            transition: { type: "spring", stiffness: 300, damping: 30 }
                        }}
                    >
                        {/* Barre latérale colorée */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700"></div>

                        {/* Layout responsive - Stack sur mobile, flex sur desktop */}
                        <div className="flex flex-col">
                            {/* Section header - Toujours en haut sur mobile */}
                            <div className="p-4 sm:p-6 border-b border-slate-700/30 bg-slate-800/30">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                    {/* Icône d'entreprise - Plus petite sur mobile */}
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-800 shadow-xl flex items-center justify-center group-hover:shadow-purple-500/20 transition-shadow duration-300 border border-slate-600/50 flex-shrink-0 self-center sm:self-start">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19ZM6 10V12H18V10H6Z"/>
                                        </svg>
                                    </div>

                                    {/* Titre et infos */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300 break-words">
                                            {item.title}
                                        </h3>

                                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                                            <span className="inline-block text-xs sm:text-sm font-medium text-white bg-purple-600/80 px-2 sm:px-3 py-1 rounded-lg">
                                                {item.job}
                                            </span>
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-300">
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-medium whitespace-nowrap">{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section contenu */}
                            <div className="p-4 sm:p-6">
                                <div className="space-y-2 sm:space-y-3">
                                    {displayedContents.map((content, contentIndex) => (
                                        <div
                                            key={contentIndex}
                                            className="flex items-start gap-2 sm:gap-3 group/item"
                                        >
                                            {/* Puce avec style business */}
                                            <div className="flex-shrink-0 w-4 h-4 sm:w-6 sm:h-6 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center mt-0.5">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400"></div>
                                            </div>

                                            {/* Texte */}
                                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed group-hover/item:text-white transition-colors duration-300 flex-1 break-words">
                                                {content}
                                            </p>
                                        </div>
                                    ))}

                                    {/* Bouton Voir plus/moins sur mobile */}
                                    {shouldShowButton && (
                                        <div className="pt-2 sm:pt-3">
                                            <button
                                                onClick={() => setIsExpanded(!isExpanded)}
                                                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200 group/btn w-full justify-center sm:justify-start"
                                            >
                                                <span>
                                                    {isExpanded ? 'Voir moins' : `Voir plus (${item.contents.length - maxItemsOnMobile} élément${item.contents.length - maxItemsOnMobile > 1 ? 's' : ''})`}
                                                </span>
                                                <svg
                                                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/btn:scale-110 ${isExpanded ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Décoration d'entreprise - Masquée sur très petits écrans */}
                        <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 hidden sm:block">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 7V3C12 2.45 11.55 2 11 2H5C4.45 2 4 2.45 4 3V21H12V14H20V21H22V11L12 7ZM6 19H8V17H6V19ZM6 15H8V13H6V15ZM6 11H8V9H6V11ZM6 7H8V5H6V7ZM16 19H18V17H16V19ZM16 15H18V13H16V15Z"/>
                            </svg>
                        </div>
                    </motion.div>

                    {/* Ligne de connexion vers le point - Ajustée pour mobile */}
                    <div className="absolute left-0 top-6 sm:top-10 w-4 sm:w-8 md:w-12 h-0.5 bg-gradient-to-r from-purple-500/60 to-transparent -translate-x-4 sm:-translate-x-8 md:-translate-x-12" />
                </div>
            </div>
        </div>
    );
});

TimelineItem.displayName = 'TimelineItem';