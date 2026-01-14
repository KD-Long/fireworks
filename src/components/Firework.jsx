import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';



import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'


const Firework = ({ count, position, uSize, sizeMulti }) => {

    let { size, gl } = useThree()

    let fireWorksMaterialRef = useRef()

    const FireWorksMaterial = shaderMaterial({
        uTime: 0,
        uSize: uSize,
        uResolution: new THREE.Vector2(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio())
    },
        vertexShader,
        fragmentShader
    )
    //this exent allows it to be used a a component below
    // Note: When using "extend" which register custom components with the JSX reconciler, 
    // use lowercase names for those components, regardless of how they are initially defined.
    extend({ FireWorksMaterial: FireWorksMaterial })


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

    useFrame((state, delta) => {
        // console.log(fireWorksMaterialRef.current.uSize)

        // update leval values to shader material (does not know how re render on state change)
        if (fireWorksMaterialRef.current) {
            fireWorksMaterialRef.current.uSize = uSize * sizeMulti
        }
        //update resolution of points to match resolution of canvas
        // if we dont do this pixels will look far to big relative to everything else when screen dimensions change
        if (fireWorksMaterialRef.current.uResolution) {
            fireWorksMaterialRef.current.uResolution.set(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio())
        }
        // console.log(gl.getPixelRatio())
    })

    return (<>
        <points
            // ref={particlesRef}
            geometry={firework}
            position={position}
        // frustumCulled={false}
        >
            {/* <pointsMaterial  /> */}
            {/* <FireWorksMaterial ref={FireWorksMaterialRef} blending={THREE.AdditiveBlending} depthWrite={false} /> */}
            <fireWorksMaterial ref={fireWorksMaterialRef} />
        </points>
    </>

    )
}

export default Firework