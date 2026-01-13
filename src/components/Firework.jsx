import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';


import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'


const Firework = ({ count, position }) => {

    let myShaderMaterialRef = useRef()

    const MyShaderMaterial = shaderMaterial({
        uTime: 0,
    },
        vertexShader,
        fragmentShader
    )
    //this exent allows it to be used a a component below
    // Note: When using "extend" which register custom components with the JSX reconciler, 
    // use lowercase names for those components, regardless of how they are initially defined.
    extend({ MyShaderMaterial: MyShaderMaterial })


    const firework = useMemo(() => {

        //Geo

        const positionsArray = new Float32Array(count * 3)// number of verticies * 3

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            // sets each verticy to a random xyz coordinate ranging from - 0.5 and 0.5 
            positionsArray[i3] = Math.random() - 0.5     // x
            positionsArray[i3 + 1] = Math.random() - 0.5 // y
            positionsArray[i3 + 2] = Math.random() - 0.5 // z

        }

        const geo = new THREE.BufferGeometry()
        geo.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3))
        return geo
    }, [count])

    return (<>
        <points
            // ref={particlesRef}
            geometry={firework}
            position={position}
        // frustumCulled={false}
        >
            {/* <pointsMaterial  /> */}
            {/* <myShaderMaterial ref={myShaderMaterialRef} blending={THREE.AdditiveBlending} depthWrite={false} /> */}
            <myShaderMaterial />
        </points>
    </>

    )
}

export default Firework