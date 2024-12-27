# *3D Car Game*

## *A 3D car game built with React and Three.js that lets you control a car on a road, dodge obstacles, and increase your score by avoiding collisions. The game is designed for mobile users with swipe controls and offers an immersive 3D environment.*

## *Features*

- ***3D Graphics**: Utilizes Three.js for creating 3D environments and objects like roads, cars, and obstacles.*
- ***Swipe Controls**: Allows users to control the car's movement using swipe gestures.*
- ***Collision Detection**: Game ends upon collision with obstacles, triggering a game over screen.*
- ***Score System**: Increases score when obstacles are successfully passed.*
- ***Responsive Design**: Mobile-friendly controls and UI.*

## *Game Flow*

*1. The game starts with the car on a road and obstacles positioned at random intervals.*
*2. Users can move the car left or right to avoid obstacles using swipe gestures or keyboard arrows.*
*3. The game ends when the car collides with an obstacle.*
*4. A UI shows the current score, and users can restart the game after the game over.*

## *Installation*

*To run the game locally, follow these steps:*

### *1. Clone the repository:*

```
git clone https://github.com/yourusername/3d-car-game.git
```

### *2. Install dependencies:*
Navigate to the project directory and install the required dependencies:

```
cd 3d-car-game
npm install
```

### *3. Run the app:*
*Start the development server:*

```
npm start
Visit http://localhost:5173 in your browser to play the game.
```

## *Technologies Used*

***React:** Frontend framework for building the user interface.*

***Three.js:** 3D JavaScript library for rendering 3D graphics.*

***@react-three/fiber:** React renderer for Three.js.*

***@react-three/drei:** A set of useful utilities and components for React Three Fiber.*

***React-Use:** Custom hooks for state management and events (such as swipe gestures).*

## *Components*

***Canvas:** The main Three.js rendering area that houses all 3D objects.*
***Car:** A 3D model of the car that the player controls.*
***Road:** A 3D model of the road that the car moves on.*
***Obstacle:** 3D obstacles that the player must avoid.*
***GameUI:** User interface displaying the score and game status.*
***useGameStore:** A custom hook for managing the game's state, such as score and game over status.*
***useSwipe:** A custom hook for handling swipe gestures to move the car.*

## *Swipe Controls*

***Swipe Left:** Move the car to the left lane.*
***Swipe Right:** Move the car to the right lane.*
*Alternatively, use the Arrow Left and Arrow Right keys on your keyboard to move the car.*

## *Future Improvements*

*Add more obstacles with varying speeds.*
*Introduce power-ups to make the game more interesting.*
*Optimize the game for better performance on mobile devices.*
*Add multiplayer support for competitive play.*

## *License*
### *This project is licensed under the MIT License - see the LICENSE file for details.*

## *Acknowledgments*
*Three.js for the amazing 3D graphics.*
*React for the smooth user interface.*
*React Three Fiber for simplifying the integration of Three.js with React.*
*React Drei for useful utilities and helpers for 3D rendering.*
