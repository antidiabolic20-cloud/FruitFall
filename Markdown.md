# Project Specification: Gravity Fruit Match Game

## 1. Core Game Concept
Build a web-based, 2D grid puzzle game using standard web technologies (HTML, CSS, JavaScript/React). Do NOT use a canvas-based game engine. 
* **Mechanic:** The player taps one fruit, then taps another. If they are identical, they disappear.
* **Physics (Gravity):** When fruits disappear, any fruits sitting above them in their respective columns fall straight down to fill the empty spaces.
* **Win Condition:** The level is won when the total number of fruits on the board is reduced to exactly zero.
* **Progression:** A visually winding, "Candy Crush-style" level map where players click nodes to enter levels.

## 2. File Structure & Tech Stack
Generate the project using standard web files (or standard React components if using a framework):
* `index.html` / `App.jsx`: Contains the UI layout for both the Level Map View and the Game Board View.
* `style.css`: Handles the grid layouts, the winding map path, and all CSS transitions/animations.
* `gameLogic.js`: Manages the 2D array state, matching logic, and gravity calculations.

## 3. Data Structure & State Management
The board must be represented as a 2D array (Grid Data).
* **Grid Data:** An array of columns, or a standard row/col matrix. Example: `0` represents an empty space, while integers `1-5` represent different fruit types (🍎, 🍇, 🍌, 🍊, 🍐).
* **Selection State:** Track the coordinates `[row, col]` of the first clicked fruit.

## 4. The Gravity Algorithm (Crucial Logic)
When a match is confirmed, the engine must update the array and simulate gravity. Instruct the code generator to use the following logic:
1. Identify the coordinates of the two matched fruits.
2. Set their values in the 2D array to `0` (empty).
3. **Gravity Shift:** Loop through each column. For every column, extract all non-zero values (the remaining fruits).
4. Pad the top of that column with `0`s so the length remains the same, pushing all non-zero values to the bottom.
5. Update the DOM/React state with this new array to trigger the CSS falling animations.

## 5. CSS Styling and Animations
Do not use an external animation library. Rely purely on CSS properties:
* **The Grid:** Use `display: grid` with dynamic row/column templates based on the current level's dimensions.
* **Falling Animation (Gravity):** Apply `transition: transform 0.3s ease-in-out, top 0.3s ease-in-out;` to the fruit elements. When their array index changes, their absolute or grid positioning should smoothly animate them moving downward.
* **Match Dissolve:** When matched, immediately apply a CSS class containing `@keyframes pop`:
  * `0% { transform: scale(1); opacity: 1; }`
  * `50% { transform: scale(1.2); opacity: 0.8; }`
  * `100% { transform: scale(0); opacity: 0; }`

## 6. The Winding Level Map View
Before the game starts, display an overworld map:
* **Layout:** A scrolling container with a colorful background.
* **The Path:** Use an SVG `<path>` with `stroke-dasharray` to draw a winding line down the screen.
* **Nodes:** Place clickable circular level buttons along this path using CSS `position: absolute` with specific `top` and `left` percentages.
* **Progression Tracking:** Read `localStorage.getItem('highestLevel')`. Ensure levels greater than this value have a disabled state (grayed out with a padlock icon), and levels below or equal to it are glowing and clickable.

## 7. Action Item for IDE
Please generate the complete HTML, CSS, and JS/React code required to create this game. Start by generating the `gameLogic.js` file to ensure the gravity array manipulation is perfectly intact, then build the visual Grid and Map around it.