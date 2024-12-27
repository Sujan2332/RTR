import { create } from 'zustand';

export const useGameStore = create((set) => ({
  score: 0,
  gameOver: false,
  isPlaying: false,
  highScore: 0,
  speed: 10,
  lane: 1,
  obstacles: [],

  increaseScore: () => set((state) => ({ 
    score: state.score + 1,
    speed: state.speed + 0.5
  })),
  
  setGameOver: (value) => set((state) => ({ 
    gameOver: value,
    highScore: state.score > state.highScore ? state.score : state.highScore 
  })),
  
  setIsPlaying: (value) => set({ isPlaying: value }),

  resetGame: () => {
    set({
      score: 0,
      gameOver: false,
      isPlaying: false, // Set to false initially to reset fully
      speed: 10,
      lane: 1,
      obstacles: [] // Clear obstacles
    });

    // Delay start to ensure a full reset of the game state
    setTimeout(() => set({ isPlaying: true }), 50);
  },

  moveLane: (direction) => set((state) => {
    if (direction === 'left' && state.lane > 0) {
      return { lane: state.lane - 1 };
    }
    if (direction === 'right' && state.lane < 2) {
      return { lane: state.lane + 1 };
    }
    return state;
  }),

  addObstacle: (obstacle) => set((state) => ({
    obstacles: [...state.obstacles, obstacle]
  })),

  clearObstacles: () => set(() => ({
    obstacles: []
  })),
}));
