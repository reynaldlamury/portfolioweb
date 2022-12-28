import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
// import './PlaneShaderMaterial';
import { LinearEncoding } from 'three';
import tree from './images/christmas-tree.jpg';
import gsap from 'gsap';

export const Plane = () => {
  const [planeWidth, setPlaneWidth] = useState();
  const [planeHeight, setPlaneHeight] = useState();

  const meshRef = useRef();
  const geoRef = useRef();

  useEffect(() => {
    if (geoRef) {
      setPlaneWidth(geoRef.current.parameters.width);
      setPlaneHeight(geoRef.current.parameters.height);
    }
  }, []);

  const progress = { value: 0 };
  const direction = { value: 0 };
  const handleMouseDown = () => {
    direction.value = 0;
    gsap.to(progress, {
      value: 1,
      duration: 0.5,
    });
  };

  const handleMouseUp = () => {
    direction.value = 1;
    gsap.to(progress, {
      value: 0,
      duration: 0.5,
    });
  };

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      position={[0, 0, 0]}
    >
      <planeGeometry ref={geoRef} args={[1, 1, 10, 10]} />
      {planeWidth && (
        <MaterialShader
          progress={progress}
          direction={direction}
          planeWidth={planeWidth}
          planeHeight={planeHeight}
        />
      )}
    </mesh>
  );
};

const vertexShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float progress;
  uniform float direction;

  void main () {
    vec3 pos = position;

    // pos.z = 0.1*sin(pos.x * 10.);

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform vec3 uColor;
  varying vec2 vUv;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform vec4 uResolution;

  void main() {
    vec2 newuv = ( (vUv - vec2(0.5)) * uResolution.zw ) + vec2(0.5);

    float customTime = uTime*0.8;
    vec2 uv = (-1.0 + 2.0 * vUv) * 2.0;
    float fr = fract(uv.x * 0.5);
    vec3 col = 0.5 + 0.5 * cos(customTime + uv.xyx + fr + vec3(0, 2, 4));

    gl_FragColor = vec4(vUv.x, vUv.y, 0., 1.);
    gl_FragColor = vec4(col, 1.);

  }
`;

const MaterialShader = ({ progress, direction }) => {
  const shaderRef = useRef();

  const [img1] = useLoader(THREE.TextureLoader, [tree]);
  // texture.encoding = LinearEncoding;

  const data = React.useMemo(
    () => ({
      uniforms: {
        uTexture: { value: img1 },
        uColor: { value: new THREE.Color(0, 0, 0) },
        uTime: { value: 0 },
        progress,
        direction,
        uResolution: { value: new THREE.Vector4(0, 0, 0) },
      },
      fragmentShader,
      vertexShader,
      side: THREE.DoubleSide,
      // wireframe: true,
    }),
    []
  );

  // let imgWidth = texture.source.data.naturalWidth;
  // let imgHeight = texture.source.data.naturalHeight;

  // useEffect(() => {
  //   if (shaderRef) {
  //     let imgAspect = imgHeight / imgWidth;
  //     let a1;
  //     let a2;

  //     if ((planeHeight * 1000) / (planeWidth * 1000) > imgAspect) {
  //       a1 = ((planeWidth * 1000) / (planeHeight * 1000)) * imgAspect;
  //       a2 = 1;
  //     } else {
  //       a1 = 1;
  //       a2 = (planeHeight * 1000) / (planeWidth * 1000) / imgAspect;
  //     }

  //     shaderRef.current.uniforms.uResolution.value.x = planeWidth;
  //     shaderRef.current.uniforms.uResolution.value.y = planeHeight;
  //     shaderRef.current.uniforms.uResolution.value.w = a1;
  //     shaderRef.current.uniforms.uResolution.value.z = a2;
  //   }
  // }, []);

  useFrame(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += 0.05;
    }
  });

  return <shaderMaterial ref={shaderRef} {...data} />;
};
