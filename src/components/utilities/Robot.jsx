import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export function Robot(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/background/robot.glb')
    const { actions } = useAnimations(animations, group)

    const offsetTime = 0.3222 // temps en secondes à "sauter" au début

    useEffect(() => {
        const action = actions["Take 001.002"]
        if (action) {
            action.reset()
            action.setLoop(THREE.LoopRepeat)
            action.timeScale = 0.75
            action.play()
            action.time = 0
        }
    }, [actions])

    useFrame(() => {
        const action = actions["Take 001.002"]
        if (action) {
            // Décalage temporel pour éviter freeze au début
            if (action.time < offsetTime) {
                action.time = offsetTime
            }
        }
    })

    return (
        <group ref={group} {...props} dispose={null}>
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
            <group name="Scene">
                <group name="Mech_Drone" scale={0.002}>
                    <group name="Object_4">
                        <group name="droid" rotation={[-Math.PI / 2, 0, 0]} />
                        <group name="Object_6" rotation={[-Math.PI / 2, 0, 0]} />
                        <skinnedMesh
                            name="Object_7"
                            geometry={nodes.Object_7.geometry}
                            material={materials['Robot.003']}
                            skeleton={nodes.Object_7.skeleton}
                        />
                        <primitive object={nodes._rootJoint} />
                    </group>
                </group>
            </group>
        </group>
    )
}
