import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../store/gameStore';

const COLORS = ['#4a90e2', '#50c878', '#ffd700', '#9b59b6', '#e74c3c'];
const LANE_POSITIONS = [-3, 0, 3]; // Left, Middle, Right lane positions

export function Obstacle({ position, onPass, laneIndex }) {
  const obstacle = useRef();
  const passed = useRef(false);
  const color = useRef(COLORS[Math.floor(Math.random() * COLORS.length)]);
  const { speed, gameOver } = useGameStore();
  const initialZ = position[2];

  useFrame((state, delta) => {
    if (!obstacle.current || gameOver) return;
    
    obstacle.current.position.z += speed * delta;

    if (obstacle.current.position.z > 5 && !passed.current) {
      passed.current = true;
      onPass();
    }

    if (obstacle.current.position.z > 10) {
      obstacle.current.position.z = initialZ;
      passed.current = false;
      color.current = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
  });

  return (
    <group ref={obstacle} position={position} userData={{ isObstacle: true }}>
      {/* Car body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial color={color.current} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Car roof */}
      <mesh position={[0, 0.7, -0.2]} castShadow>
        <boxGeometry args={[0.8, 0.4, 1]} />
        <meshStandardMaterial color={color.current} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Wheels */}
      <mesh position={[-0.6, 0.2, 0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.6, 0.2, 0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.6, 0.2, -0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.6, 0.2, -0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}