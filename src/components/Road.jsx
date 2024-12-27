import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../store/gameStore';

export function Road() {
  const road = useRef();
  const { speed, gameOver } = useGameStore();

  useFrame((state, delta) => {
    if (!road.current || gameOver) return;
    road.current.position.z += speed * delta;
    if (road.current.position.z > 20) road.current.position.z = 0;
  });

  return (
    <>
      {/* Main road */}
      <mesh 
        ref={road} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 1000]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Lane markings */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-2, -0.09, 0]}
      >
        <planeGeometry args={[0.25, 1000]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2, -0.09, 0]}
      >
        <planeGeometry args={[0.25, 1000]} />
        <meshStandardMaterial color="#fff" />
      </mesh>

      {/* Side barriers */}
      <mesh position={[-6.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1000]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      <mesh position={[6.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1000]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Environment */}
      {Array.from({ length: 20 }).map((_, i) => (
        <group key={i} position={[i % 2 === 0 ? -9 : 9, 0, -i * 50]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0, 1.5, 4]} />
            <meshStandardMaterial color="#2d5a27" />
          </mesh>
          <mesh position={[0, 4, 0]}>
            <sphereGeometry args={[2]} />
            <meshStandardMaterial color="#2d5a27" />
          </mesh>
        </group>
      ))}
    </>
  );
}