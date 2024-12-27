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

  return (
    <div className="h-screen w-screen">
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
              {Array.from({ length: 5 }).map((_, i) => (
                <Obstacle
                  key={i}
                  position={[
                    Math.random() * 8 - 4,
                    0,
                    -(i * 20) - 20,
                  ]}
                  onPass={increaseScore}
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