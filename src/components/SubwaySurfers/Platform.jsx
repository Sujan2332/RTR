import React from 'react';

function Platform() {
  return (
    <mesh position={[0, -0.5, -50]}>
      <boxGeometry args={[10, 1, 100]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

export default Platform;
