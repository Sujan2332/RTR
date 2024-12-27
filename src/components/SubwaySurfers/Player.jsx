import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

function Player() {
  const playerRef = useRef();
  const [keys, setKeys] = useState({ left: false, right: false });

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: true }));
    if (event.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: true }));
  };

  const handleKeyUp = (event) => {
    if (event.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: false }));
    if (event.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: false }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (keys.left && playerRef.current.position.x > -2) playerRef.current.position.x -= 0.1;
    if (keys.right && playerRef.current.position.x < 2) playerRef.current.position.x += 0.1;

    playerRef.current.position.z -= 0.2; // Move forward continuously
  });

  return (
    <mesh ref={playerRef} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default Player;
