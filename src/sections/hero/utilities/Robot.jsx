import React, {useEffect, useRef} from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import { useMotionValue, useSpring } from "motion/react";

export function Robot(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF('/background/robot.glb');
    const { actions } = useAnimations(animations, group);
    const offsetTime = 0.32
    const targetPosition = props.position ?? [0, 0, 0];
    const yPosition = useMotionValue(targetPosition[1] + 2);
    const ySpring = useSpring(yPosition, { damping: 50});

    useEffect(() => {
        const action = actions["Take 001"]
        if (action) {
            action.reset()
            action.setLoop(THREE.LoopRepeat)
            action.timeScale = 0.75
            action.play()
            action.time = 0
        }
    }, [actions])

    useFrame(() => {
        const action = actions["Take 001"]
        if (action) {
            if (action.time < offsetTime) {
                action.time = offsetTime
            }
        }
    })

    useEffect(() => {
        ySpring.set(targetPosition[1]);
    }, [ySpring, targetPosition]);

    useFrame(() => {
        if (group.current) {
            group.current.position.set(
                targetPosition[0],
                ySpring.get(),
                targetPosition[2]
            );
        }
    });

    return (
        <>
            {/* Éclairage simple */}
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[-5, 2, 2]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={20}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={5}
                shadow-camera-bottom={-5}
            />

            {/* Modèle 3D */}
            <group ref={group} {...props} dispose={null}>
                <group name="Scene">
                    <group name="Object_4" scale={0.002}>
                        <primitive object={nodes._rootJoint} />
                    </group>
                    <skinnedMesh
                        name="Object_7"
                        geometry={nodes.Object_7.geometry}
                        material={materials.Robot}
                        skeleton={nodes.Object_7.skeleton}
                        scale={0.002}
                    />
                </group>
            </group>
        </>
    );
}

useGLTF.preload('/background/robot.glb');