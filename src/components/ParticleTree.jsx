import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Tree color themes - unified colors per tree type
const treeColorThemes = [
    { name: 'forest', base: [0.15, 0.5, 0.2], accent: [0.1, 0.6, 0.25], ornaments: ['#ff4444', '#ffd700', '#ffffff'] },
    { name: 'pink', base: [0.95, 0.45, 0.65], accent: [1.0, 0.55, 0.7], ornaments: ['#ffffff', '#ffd700', '#ff69b4'] },
    { name: 'blue', base: [0.3, 0.5, 0.85], accent: [0.4, 0.6, 0.9], ornaments: ['#ffffff', '#c0c0c0', '#87ceeb'] },
    { name: 'purple', base: [0.6, 0.35, 0.75], accent: [0.7, 0.45, 0.85], ornaments: ['#ffd700', '#ffffff', '#dda0dd'] },
    { name: 'mint', base: [0.35, 0.75, 0.65], accent: [0.45, 0.85, 0.7], ornaments: ['#ffffff', '#ffd700', '#98fb98'] },
    { name: 'orange', base: [0.95, 0.55, 0.25], accent: [1.0, 0.65, 0.35], ornaments: ['#ffffff', '#ffd700', '#ff6347'] },
    { name: 'red', base: [0.85, 0.2, 0.25], accent: [0.95, 0.3, 0.3], ornaments: ['#ffd700', '#ffffff', '#ff4500'] },
    { name: 'white', base: [0.9, 0.92, 0.95], accent: [0.95, 0.97, 1.0], ornaments: ['#ffd700', '#c0c0c0', '#87ceeb'] },
    { name: 'gold', base: [0.85, 0.7, 0.3], accent: [0.95, 0.8, 0.4], ornaments: ['#ffffff', '#ff4444', '#ffd700'] },
    { name: 'lavender', base: [0.7, 0.6, 0.85], accent: [0.8, 0.7, 0.95], ornaments: ['#ffffff', '#ffd700', '#dda0dd'] },
];

export default function ParticleTree({ params }) {
    const treeRef = useRef();
    const ornamentRef = useRef();
    const garlandRef = useRef();
    const snowRef = useRef();

    const { color, speed, density, starBrightness } = params;

    // Select theme based on color quiz answer
    const themeIndex = Math.floor(color / 36) % treeColorThemes.length;
    const theme = treeColorThemes[themeIndex];

    // Unified color tree - taller shape (height multiplier 1.3)
    const treeParticles = useMemo(() => {
        const count = 900;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const baseColor = new THREE.Color(theme.base[0], theme.base[1], theme.base[2]);
        const accentColor = new THREE.Color(theme.accent[0], theme.accent[1], theme.accent[2]);

        for (let i = 0; i < count; i++) {
            const t = Math.random();
            // Taller tree - multiply height by 1.3
            const y = t * 4.5 - 1.5;

            // Slimmer, taller cone shape
            const coneRadius = 1.5 * (1 - t * 0.94);
            const layerOffset = Math.sin(t * 18) * 0.05;
            const actualRadius = (coneRadius + layerOffset) * (0.5 + Math.random() * 0.5);

            const angle = Math.random() * Math.PI * 2;
            positions[i * 3] = Math.cos(angle) * actualRadius;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(angle) * actualRadius;

            // Unified color with slight variation
            const mixRatio = Math.random() * 0.4;
            const treeColor = baseColor.clone().lerp(accentColor, mixRatio);
            const brightness = 0.85 + Math.random() * 0.3;
            colors[i * 3] = treeColor.r * brightness;
            colors[i * 3 + 1] = treeColor.g * brightness;
            colors[i * 3 + 2] = treeColor.b * brightness;
        }

        return { positions, colors, count };
    }, [theme]);

    // Theme-matched ornaments
    const ornaments = useMemo(() => {
        const count = Math.floor(40 + density * 0.2);
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const ornamentColors = theme.ornaments.map(c => new THREE.Color(c));

        for (let i = 0; i < count; i++) {
            const t = 0.08 + Math.random() * 0.85;
            const y = t * 4.5 - 1.5;
            const coneRadius = 1.5 * (1 - t * 0.94);
            const angle = Math.random() * Math.PI * 2;
            const r = coneRadius * (0.7 + Math.random() * 0.25);

            positions[i * 3] = Math.cos(angle) * r;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(angle) * r;

            const ornamentColor = ornamentColors[Math.floor(Math.random() * ornamentColors.length)];
            colors[i * 3] = ornamentColor.r;
            colors[i * 3 + 1] = ornamentColor.g;
            colors[i * 3 + 2] = ornamentColor.b;

            sizes[i] = 0.07 + Math.random() * 0.06;
        }

        return { positions, colors, sizes, count };
    }, [density, theme]);

    // Spiral garland - theme matched
    const garland = useMemo(() => {
        const count = 120;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const garlandColor = new THREE.Color(theme.ornaments[0]);
        const garlandColor2 = new THREE.Color(theme.ornaments[1]);

        for (let i = 0; i < count; i++) {
            const t = i / count;
            const y = t * 4.5 - 1.5;

            const spirals = 5;
            const angle = t * Math.PI * 2 * spirals;
            const coneRadius = 1.5 * (1 - t * 0.94) * 1.08;

            positions[i * 3] = Math.cos(angle) * coneRadius;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(angle) * coneRadius;

            const lightColor = i % 2 === 0 ? garlandColor : garlandColor2;
            colors[i * 3] = lightColor.r;
            colors[i * 3 + 1] = lightColor.g;
            colors[i * 3 + 2] = lightColor.b;
        }

        return { positions, colors, count };
    }, [theme]);

    // Snow
    const snow = useMemo(() => {
        const count = Math.floor(80 + starBrightness * 120);
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 5;
            positions[i * 3] = Math.cos(angle) * r;
            positions[i * 3 + 1] = Math.random() * 8 - 2;
            positions[i * 3 + 2] = Math.sin(angle) * r;
        }

        return { positions, count };
    }, [starBrightness]);

    // Animations
    useFrame((state, delta) => {
        const rotSpeed = speed * 0.1;
        if (treeRef.current) treeRef.current.rotation.y += delta * rotSpeed;
        if (ornamentRef.current) ornamentRef.current.rotation.y += delta * rotSpeed;
        if (garlandRef.current) garlandRef.current.rotation.y += delta * rotSpeed;

        if (snowRef.current) {
            const positions = snowRef.current.geometry.attributes.position.array;
            for (let i = 0; i < snow.count; i++) {
                positions[i * 3 + 1] -= delta * 0.35;
                if (positions[i * 3 + 1] < -2) positions[i * 3 + 1] = 6;
            }
            snowRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group position={[0, -0.2, 0]}>
            {/* Tree body */}
            <points ref={treeRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={treeParticles.count} array={treeParticles.positions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={treeParticles.count} array={treeParticles.colors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.042} vertexColors transparent opacity={0.92} sizeAttenuation />
            </points>

            {/* Ornaments */}
            <points ref={ornamentRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={ornaments.count} array={ornaments.positions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={ornaments.count} array={ornaments.colors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.09} vertexColors transparent opacity={1} sizeAttenuation blending={THREE.AdditiveBlending} />
            </points>

            {/* Spiral garland */}
            <points ref={garlandRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={garland.count} array={garland.positions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={garland.count} array={garland.colors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} />
            </points>

            {/* Snow */}
            <points ref={snowRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={snow.count} array={snow.positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.022} color="#ffffff" transparent opacity={0.65} sizeAttenuation blending={THREE.AdditiveBlending} />
            </points>
        </group>
    );
}
