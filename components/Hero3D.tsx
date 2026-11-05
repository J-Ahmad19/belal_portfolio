"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const FLOORS = 7;
const GAP = 0.88;
const GRID = [-1.35, 0, 1.35];

function Frame() {
  const g = useRef<THREE.Group>(null!);

  useFrame((state, dt) => {
    // Smooth architectural auto-rotation
    g.current.rotation.y += dt * 0.2;
    // Responsive subtle mouse tilt
    g.current.rotation.x = THREE.MathUtils.lerp(
      g.current.rotation.x,
      state.pointer.y * 0.22,
      0.05
    );
    g.current.rotation.z = THREE.MathUtils.lerp(
      g.current.rotation.z,
      -state.pointer.x * 0.12,
      0.05
    );
  });

  const h = FLOORS * GAP;

  return (
    <group ref={g} position={[0, -h / 2 + 0.3, 0]}>
      {/* Floor Slabs */}
      {Array.from({ length: FLOORS }).map((_, f) => (
        <mesh key={f} position={[0, f * GAP, 0]}>
          <boxGeometry args={[3.3, 0.07, 3.3]} />
          <meshStandardMaterial
            color={f === FLOORS - 1 ? "#F5D000" : "#FFE202"}
            roughness={0.3}
            metalness={0.15}
            transparent={f === FLOORS - 1}
            opacity={f === FLOORS - 1 ? 0.65 : 1}
          />
        </mesh>
      ))}

      {/* Structural Columns */}
      {GRID.flatMap((x) =>
        GRID.map((z) => (
          <mesh key={`${x}${z}`} position={[x, h / 2 - 0.44 + 0.44, z]}>
            <boxGeometry args={[0.11, h + 0.88, 0.11]} />
            <meshStandardMaterial
              color="#171717"
              roughness={0.45}
              metalness={0.25}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [5.8, 3.2, 5.8], fov: 36 }}
      dpr={[1, 2]}
      aria-hidden
      gl={{ alpha: true, antialias: true }}
      className="pointer-events-auto h-full w-full"
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[6, 10, 5]} intensity={1.6} />
      <directionalLight position={[-5, 4, -4]} intensity={0.7} color="#FFFBEA" />
      <pointLight position={[0, -3, 3]} intensity={0.4} />
      <Frame />
    </Canvas>
  );
}
