"use client";

import { twMerge } from "tailwind-merge";
import React, {
    createContext,
    useState,
    useContext,
    useRef,
    useEffect,
} from "react";

const MouseEnterContext = createContext(undefined);

export const Card3D = ({
                           children,
                           className,
                           containerClassName,
                       }) => {
    const containerRef = useRef(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseEnter = () => {
        setIsMouseEntered(true);
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    return (
        <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
            <div
                className={twMerge("py-20 flex items-center justify-center", containerClassName)}
                style={{
                    perspective: "1000px",
                }}
            >
                <div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={twMerge(
                        "flex items-center justify-center relative transition-all duration-200 ease-linear",
                        className
                    )}
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    {children}
                </div>
            </div>
        </MouseEnterContext.Provider>
    );
};

export const CardBody = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                "h-96 w-96 bg-gray-800 rounded-xl [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
                className
            )}
            style={{
                // si tu veux un fond avec un peu d'opacité (optionnel)
                backgroundColor: 'rgba(55, 65, 81, 0.9)',
                backfaceVisibility: 'visible' // pour éviter que ça disparaisse avec la 3D
            }}
        >
            {children}
        </div>
    );
};


export const CardItem = ({
                             as: Tag = "div",
                             children,
                             className,
                             translateX = 0,
                             translateY = 0,
                             translateZ = 0,
                             rotateX = 0,
                             rotateY = 0,
                             rotateZ = 0,
                             ...rest
                         }) => {
    const ref = useRef(null);
    const [isMouseEntered] = useMouseEnter();

    useEffect(() => {
        if (!ref.current) return;
        if (isMouseEntered) {
            ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        }
    }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

    return (
        <Tag
            ref={ref}
            className={twMerge("w-fit transition duration-200 ease-linear", className)}
            {...rest}
        >
            {children}
        </Tag>
    );
};

// Hook pour accéder au contexte
export const useMouseEnter = () => {
    const context = useContext(MouseEnterContext);
    if (context === undefined) {
        throw new Error("useMouseEnter must be used within a MouseEnterProvider");
    }
    return context;
};

