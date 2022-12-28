import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import glsl from 'babel-plugin-glsl/macro';

const uniform = {
  uColor: new THREE.Color(1.0, 0.0, 0.0),
  uTexture: new THREE.Texture(),
  uTime: 0,
  distanceFromCenter: 0,
};

const vertexShader = glsl`
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;

  void main() {

    vec3 pos = position;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = glsl`
  precision mediump float;
  uniform vec3 uColor;
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    float customTime = uTime*0.8;
    vec2 uv = (-1.0 + 2.0 * vUv) * 2.0;
    vec3 col = 0.5 + 0.5 * cos(customTime + uv.xyx + uv.x + vec3(0, 2, 4));


    gl_FragColor = vec4(col, 1.);
  }
`;

const PlaneShaderMaterial = shaderMaterial(
  // Uniform
  uniform,
  // vertex shader
  vertexShader,
  // fragment shader
  fragmentShader
);

extend({ PlaneShaderMaterial });
