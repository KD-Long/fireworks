import React, { useRef } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import { shaderMaterial, useTexture, OrbitControls, Environment, Icosahedron, GizmoHelper, GizmoViewport } from '@react-three/drei';
import * as THREE from 'three'


import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import Firework from './Firework';

const Experience = () => {

    // leav controls
    let { sizeMulti } = useControls({
        sizeMulti: { value: 1.0, min: 0.1, max: 10.0, step: 0.1 },
        // value: { value: 0.5, min: 0.0, max: 1.0, step: 0.001 },

    });

    useFrame((state, delta) => {

        const elapsedTime = state.clock.elapsedTime

        // sphereRef.current.rotation.x = - elapsedTime * 0.1
        // sphereRef.current.rotation.y += delta * 0.5 * rotation

        // update utime
        // sphereRef.current.material.uniforms.uTime.value = elapsedTime

        // update color shader with color picker from useControls
        // sphereRef.current.material.uniforms.uColor.value= new THREE.Color(holoColor)

        // state.camera.lookAt(0, 0, 0);
    })

    return (<>
        <OrbitControls makeDefault />

        <Perf position="top-left" />

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
        </GizmoHelper>

        {/* Sets background */}
        <color args={['#1d1f2a']} attach='background' />
        {/* <Environment
            // background lighting env map
            preset="city"
            background={true} // this uses the HDR as background as well as env map for lighting
            backgroundBlurriness={0.5}
        /> */}



        {/* fireworks */}

        <Firework count={111} position={[0, 0, 0]} uSize={0.15} sizeMulti={sizeMulti} />




        {/* <meshref={sphereRef} position={[0, 0, 0]}> */}
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        {/* <planeGeometry args={[4, 4]} />*/}
        {/* <icosahedronGeometry /> */}
        {/* <sphereGeometry args={[2, 32, 32]} /> */}
        {/* <meshBasicMaterial args={[{ wireframe: false }]} /> */}
        {/* <myShaderMaterial transparent side={THREE.DoubleSide} /> */}
        {/* </mesh> */}





    </>
    )
}

export default Experience