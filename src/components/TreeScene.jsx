import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import ParticleTree from './ParticleTree';
import TreeStar from './TreeStar';

function ScreenshotHandler({ onGlReady }) {
    const { gl } = useThree();
    if (onGlReady) onGlReady(gl);
    return null;
}

export default function TreeScene({ initialParams, onGlReady }) {
    const params = {
        color: initialParams.color,
        speed: initialParams.speed,
        radius: initialParams.radius,
        density: initialParams.density,
        starBrightness: initialParams.starBrightness,
        treeHeight: initialParams.treeHeight,
        starColor: initialParams.starColor || 0,
    };

    return (
        <Canvas
            camera={{ position: [0, 0.8, 10], fov: 50 }}
            gl={{ preserveDrawingBuffer: true, antialias: true }}
            style={{ background: 'transparent', touchAction: 'none' }}
        >
            <ScreenshotHandler onGlReady={onGlReady} />
            <ambientLight intensity={0.1} color="#e8e8ff" />

            <ParticleTree params={params} />
            <TreeStar
                brightness={params.starBrightness}
                treeHeight={params.treeHeight}
                starColor={params.starColor}
            />

            <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.15} luminanceSmoothing={0.9} radius={0.7} />
            </EffectComposer>

            <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={4}
                maxDistance={10}
                target={[0, 0.5, 0]}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.8}
                touches={{ ONE: 0, TWO: 2 }}
            />
        </Canvas>
    );
}
