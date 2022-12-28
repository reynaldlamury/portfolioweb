import React from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useFrame, useThree, extend } from '@react-three/fiber';

export const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = React.useRef();
  useFrame((state) => controls.current.update());

  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

extend({ OrbitControls });
export default CameraControls;
