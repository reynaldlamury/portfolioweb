import React, { Suspense } from 'react';
import './App.css';
import CameraControls from './CameraControls.jsx';
import { Canvas } from '@react-three/fiber';
import { Plane } from './Geometries';

const Scene = () => {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{
        fov: 70,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.001,
        far: 1000,
        position: [0, 0, 2],
      }}
      style={{
        display: 'block',
        zIndex: '10',
      }}
    >
      <CameraControls />
      <Suspense fallback={null}>
        <Plane />
      </Suspense>
    </Canvas>
  );
};

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Scene />
    </div>
  );
}

export default App;
