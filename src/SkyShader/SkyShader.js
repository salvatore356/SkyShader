import { useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';


function SkyPlane() {
  
  const mesh = useRef();
  
  const uniforms = {
    iTime: {
      value: 0.0,
    },
    iResolution: {
      value : new THREE.Vector2(window.innerWidth, window.innerHeight)
    }
  };

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.iTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={2}>
      <planeGeometry args={[17.778, 10]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
  
}

export default function SkyShader() {
  

  return (
    <Canvas
      dpr={window.devicePixelRatio} 
      camera={{ position: [0.0, 0.0, 10.0] }}
    >
      <SkyPlane />
      <OrbitControls />
    </Canvas>
  );
}