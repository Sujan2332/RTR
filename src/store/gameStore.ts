import { create } from 'zustand';

interface GameState {
  score: number;
  gameOver: boolean;
  isPlaying: boolean;
  highScore: number;
  speed: number;
  lane: number; // 0 = left, 1 = middle, 2 = right
  obstacles: Array<{ position: number; lane: number }>; // Define obstacle type as needed
  increaseScore: () => void;
  setGameOver: (value: boolean) => void;
  setIsPlaying: (value: boolean) => void;
  resetGame: () => void;
  moveLane: (direction: 'left' | 'right') => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  gameOver: false,
  isPlaying: false,
  highScore: 0,
  speed: 10,
  lane: 1, // Start in middle lane
  obstacles: [], // Initialize obstacles array

  increaseScore: () => set((state) => ({ 
    score: state.score + 1,
    speed: state.speed + 0.5
  })),

  setGameOver: (value) => set((state) => ({ 
    gameOver: value,
    highScore: state.score > state.highScore ? state.score : state.highScore 
  })),

  setIsPlaying: (value) => set({ isPlaying: value }),

  resetGame: () => set({ 
    score: 0, 
    gameOver: false, 
    isPlaying: true, 
    speed: 10,
    lane: 1,
    obstacles: [] // Clear obstacles to remove any remaining from the previous game
  }),

  moveLane: (direction) => set((state) => {
    if (direction === 'left' && state.lane > 0) {
      return { lane: state.lane - 1 };
    }
    if (direction === 'right' && state.lane < 2) {
      return { lane: state.lane + 1 };
    }
    return state;
  }),
}));
