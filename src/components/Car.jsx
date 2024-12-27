import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../store/gameStore';

const LANE_POSITIONS = [-4, 0, 4]; // Left, Middle, Right lane positions

export function Car({ onCollision }) {
  const car = useRef();
  const [, get] = useKeyboardControls();
  const { lane, moveLane, gameOver } = useGameStore();
  const lastKeyPress = useRef(0);
  const KEY_COOLDOWN = 150; // Milliseconds between key presses

  useFrame((state, delta) => {
    if (!car.current || gameOver) return;

    const now = Date.now();
    const { leftward, rightward } = get();

    if (now - lastKeyPress.current > KEY_COOLDOWN) {
      if (leftward) {
        moveLane('left');
        lastKeyPress.current = now;
      }
      if (rightward) {
        moveLane('right');
        lastKeyPress.current = now;
      }
    }

    // Smooth lane transition
    const targetX = LANE_POSITIONS[lane];
    car.current.position.x = THREE.MathUtils.lerp(
      car.current.position.x,
      targetX,
      delta * 10
    );

    // Check collisions
    const carBox = new THREE.Box3().setFromObject(car.current);
    const obstacles = state.scene.children.filter(child => 
      child.userData?.isObstacle
    );

    for (const obstacle of obstacles) {
      const obstacleBox = new THREE.Box3().setFromObject(obstacle);
      if (carBox.intersectsBox(obstacleBox)) {
        onCollision();
        break;
      }
    }
  });

  return (
    <group ref={car}>
      {/* Car Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.5, 0.5, 3]} />
        <meshStandardMaterial color="red" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.75, -0.5]} castShadow>
        <boxGeometry args={[1.3, 0.25, 1.5]} />
        <meshStandardMaterial color="black" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Front Bumper */}
      <mesh position={[0, 0.25, 1.7]} castShadow>
        <boxGeometry args={[1.4, 0.2, 0.4]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.5, 0.4, 1.9]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.5, 0.4, 1.9]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={1} />
      </mesh>

      {/* Rear Spoiler */}
      <mesh position={[0, 0.75, -1.7]} castShadow>
        <boxGeometry args={[1.5, 0.05, 0.3]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Wheels */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.7, 0.1, 1]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.7, 0.1, 1]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.7, 0.1, -1]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.7, 0.1, -1]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Side Mirrors */}
      <mesh position={[-0.9, 0.6, 0.2]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.9, 0.6, 0.2]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}
