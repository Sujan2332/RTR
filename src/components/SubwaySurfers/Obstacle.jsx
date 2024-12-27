import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

function Obstacle({ position, onCollision }) {
  const obstacleRef = useRef();

  useFrame(() => {
    if (!obstacleRef.current) return;

    // Move obstacle toward the player
    obstacleRef.current.position.z += 0.2;

    // Check for collision
    if (obstacleRef.current.position.z > 0) {
      onCollision(obstacleRef);
    }

    // Reset position if it moves past the player
    if (obstacleRef.current.position.z > 5) {
      obstacleRef.current.position.z = -50 - Math.random() * 50;
      obstacleRef.current.position.x = (Math.random() - 0.5) * 4;
    }
  });

  return (
    <mesh ref={obstacleRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default Obstacle;
