import "./main.scss";

const directionUp = document.getElementById("arrow-up");
const directionRight = document.getElementById("arrow-right");
const directionDown = document.getElementById("arrow-down");
const directionLeft = document.getElementById("arrow-left");
if (!directionUp || !directionRight || !directionDown || !directionLeft) {
  throw new Error("Directional var error");
}

// Getting the game window to display grid / cells
const gameGrid = document.querySelector(".game") as HTMLDivElement;
// Assigning SuperMazeBoy Icon
const superMaizeMan = `<img src="./src/assets/supermaizeboy.png" alt="supermaizeboy" width="20px"/>`;
// Vars to mark P/C position in array
let xPos: number = 0;
let yPos: number = 0;

// Construct a level based on a grid number input
const levelConstructor = (gridAmount: number) => {
  const cells = [];
  for (let i = 0; i < gridAmount; i++) {
    const rows = [];
    for (let j = 0; j < gridAmount; j++) {
      // Set the grid layout
      gameGrid.style.gridTemplateColumns = `repeat(${gridAmount}, 1fr)`;
      gameGrid.style.gridTemplateRows = `repeat(${gridAmount}, 1fr)`;
      // Create # div based on cellAmount and add cell class
      const cell = document.createElement("div") as HTMLDivElement;
      cell.classList.add("cell");
      // Add cells to page
      gameGrid.append(cell);
      // Capture cells in array
      rows.push(cell);
    }
    cells.push(rows);
  }
  return cells;
};
// Handle player movement - need to revisit with blocked walls
const handleMove = (
  xDirection: number,
  yDirection: number,
  level: HTMLDivElement[][]
) => {
  const newXPos: number = xPos + xDirection;
  const newYPos: number = yPos + yDirection;
  // Check walls / blockers
  if (
    newXPos >= 0 &&
    newXPos < level.length &&
    newYPos >= 0 &&
    newYPos < level[0].length
  ) {
    // Clear position - come back and work on transition
    level[xPos][yPos].innerHTML = "";

    // Update with new position
    xPos = newXPos;
    yPos = newYPos;

    // Place P/C in new pos on grid
    level[xPos][yPos].innerHTML = superMaizeMan;
  }
};

// Handle keyboard directions
const handleKeyboardDirection = (level: HTMLDivElement[][]) => {
  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" || event.key == "w") {
      handleMove(-1, 0, level);
    } else if (event.key == "ArrowRight" || event.key == "d") {
      handleMove(0, 1, level);
    } else if (event.key == "ArrowDown" || event.key == "s") {
      handleMove(1, 0, level);
    } else if (event.key == "ArrowLeft" || event.key == "a") {
      handleMove(0, -1, level);
    }
  });
};
// Handle click directions
const handleClickDirection = (level: HTMLDivElement[][]) => {
  directionUp.addEventListener("click", () => handleMove(-1, 0, level));
  directionRight.addEventListener("click", () => handleMove(0, 1, level));
  directionDown.addEventListener("click", () => handleMove(1, 0, level));
  directionLeft.addEventListener("click", () => handleMove(0, -1, level));
};

const levelOne = levelConstructor(10);
levelOne[0][0].innerHTML = superMaizeMan;
handleKeyboardDirection(levelOne);
handleClickDirection(levelOne);
