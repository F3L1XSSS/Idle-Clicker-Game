import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
// Импортируйте другие 3D компоненты, которые вы хотите использовать

const CanvasContainer = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 2 }} >
      <Suspense fallback={null}>
        <OrbitControls />
        <Stars />
        {/* Здесь будут ваши 3D компоненты, такие как модели, свет и т.д. */}
      </Suspense>
    </Canvas>
  );
};

export default CanvasContainer;