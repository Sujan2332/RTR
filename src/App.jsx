import { Canvas } from '@react-three/fiber';
import { KeyboardControls, OrbitControls, Sky } from '@react-three/drei';
import { Car } from './components/Car';
import { Road } from './components/Road';
import { Obstacle } from './components/Obstacle';
import { GameUI } from './components/GameUI';
import { useGameStore } from './store/gameStore';
import { useCallback } from 'react';

function App() {
  const { increaseScore, setGameOver, isPlaying } = useGameStore();

  const handleCollision = useCallback(() => {
    setGameOver(true);
  }, [setGameOver]);

  // Fixed positions for obstacles in each lane
  const obstaclePositions = [
    [-3, 0, -20],  // Left lane
    [0, 0, -40],   // Middle lane
    [3, 0, -60],   // Right lane
    [-3, 0, -80],  // Left lane
    [0, 0, -100],  // Middle lane
  ];

  return (
    <div className="h-screen w-screen">
      <style>
        {
          `
          *{
          font-style: italic}
          `
        }
      </style>
      <KeyboardControls
        map={[
          { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        ]}
      >
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          {isPlaying && (
            <>
            
              <Car onCollision={handleCollision} />
              <Road />
              {obstaclePositions.map((position, i) => (
                <Obstacle
                  key={i}
                  position={position}
                  onPass={increaseScore}
                  laneIndex={i % 3}
                />
              ))}
              <fog attach="fog" args={['#87ceeb', 30, 100]} />
            </>
          )}
          <OrbitControls enabled={false} />
        </Canvas>
      </KeyboardControls>
      <GameUI />
    </div>
  );
}

export default App;

// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { PerspectiveCamera } from '@react-three/drei';
// import Player from './components/SubwaySurfers/Player';
// import Platform from './components/SubwaySurfers/Platform';
// import Obstacle from './components/SubwaySurfers/Obstacle';

// function CameraFollow({ playerRef }) {
//   const cameraRef = useRef();

//   useFrame(() => {
//     if (playerRef.current) {
//       cameraRef.current.position.z = playerRef.current.position.z + 5;
//       cameraRef.current.position.y = playerRef.current.position.y + 2;
//       cameraRef.current.lookAt(playerRef.current.position);
//     }
//   });

//   return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 5]} />;
// }

// function App() {
//   const playerRef = useRef();

//   // Array of obstacle positions
//   const obstaclePositions = [
//     [1, 0.5, -10],
//     [-1, 0.5, -20],
//     [2, 0.5, -30],
//     [-2, 0.5, -40],
//     [1, 0.5, -50],
//     [0, 0.5, -60],
//     [-1, 0.5, -70],
//   ];

//   return (
//     <Canvas style={{ height: '100vh', background: '#a0d0ff' }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <CameraFollow playerRef={playerRef} />
//       <Platform />
//       <Player ref={playerRef} />
//       {obstaclePositions.map((pos, index) => (
//         <Obstacle key={index} position={pos} />
//       ))}
//     </Canvas>
//   );
// }

// export default App;
