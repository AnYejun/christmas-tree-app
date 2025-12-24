import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Diverse star colors
const starColorPalette = [
    '#ffd700', // Gold
    '#ff6b6b', // Coral Red
    '#74b9ff', // Sky Blue
    '#fd79a8', // Pink
    '#ffffff', // White
    '#a29bfe', // Lavender
    '#00cec9', // Teal
    '#fab1a0', // Peach
    '#55efc4', // Mint
    '#fdcb6e', // Yellow
];

export default function TreeStar({ brightness, starColor = 0 }) {
    const starRef = useRef();
    const raysRef = useRef();

    const colorIndex = Math.floor(starColor) % starColorPalette.length;
    const mainColor = starColorPalette[colorIndex];
    const glowColor = new THREE.Color(mainColor).multiplyScalar(1.3);

    useFrame((state) => {
        if (starRef.current) {
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.15;
            starRef.current.scale.setScalar(pulse);
            starRef.current.rotation.y += 0.012;
        }
        if (raysRef.current) {
            raysRef.current.rotation.z += 0.006;
            const glow = 0.4 + Math.sin(state.clock.elapsedTime * 1.8) * 0.3;
            raysRef.current.material.opacity = glow * brightness;
        }
    });

    return (
        <group position={[0, 2.8, 0]}>
            {/* Main star */}
            <group ref={starRef}>
                <mesh rotation={[0, 0, 0]}>
                    <octahedronGeometry args={[0.22, 0]} />
                    <meshBasicMaterial color={mainColor} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <octahedronGeometry args={[0.16, 0]} />
                    <meshBasicMaterial color={glowColor} />
                </mesh>
            </group>

            {/* Rotating rays */}
            <mesh ref={raysRef}>
                <ringGeometry args={[0.3, 0.6, 8]} />
                <meshBasicMaterial
                    color={mainColor}
                    transparent
                    opacity={0.5}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Lights */}
            <pointLight color={mainColor} intensity={brightness * 5} distance={6} />
            <pointLight color="#ffffff" intensity={brightness * 0.6} distance={3} />
        </group>
    );
}
