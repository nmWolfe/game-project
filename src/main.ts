import "./main.scss";

// Getting directional inputs
const directionUp = document.getElementById("arrow-up");
const directionRight = document.getElementById("arrow-right");
const directionDown = document.getElementById("arrow-down");
const directionLeft = document.getElementById("arrow-left");
if (!directionUp || !directionRight || !directionDown || !directionLeft) {
  throw new Error("Directional var error");
}

// Getting the game window
const gameGrid = document.querySelector(".game") as HTMLDivElement;
// Getting display inputs
const cornDisplay = document.querySelector(".corn-counter") as HTMLInputElement;

// Intro and Game rules
const rules = `<p class="intro">Welcome to the MAIZE. <br> That's a very clever play on words you say.<br> I agree. <br> Your task is to collect all the delicious corns</p>`;
// Creating SuperMazeBoy Icon and Corn icon
const playerIcon = `<img src="./src/assets/supermaizeboy.svg" alt="supermaizeboy" width="40px" height="100%"/>`;
const cornIcon = `<img src="./src/assets/corn.svg" alt="corn icon" width="50px" height="100%"/>`;
// Vars to mark P/C position in array - figure out how to change depending on level
let xPos: number = 0;
let yPos: number = 0;
// Var to keep count of collections
let cornCount: number = 0;

// gameGrid.innerHTML = rules;

// Construct a level based on a grid number input
const levelConstructor = (gridAmount: number) => {
  const cells = [];
  // Set the grid layout
  gameGrid.style.gridTemplateColumns = `repeat(${gridAmount}, 1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${gridAmount}, 1fr)`;
  for (let i = 0; i < gridAmount; i++) {
    const rows = [];
    for (let j = 0; j < gridAmount; j++) {
      // Create # div based on cellAmount and add cell class
      const cell = document.createElement("div") as HTMLDivElement;
      cell.classList.add("cell");
      // Add cells to page
      gameGrid.append(cell);
      // Capture cells in array
      rows.push(cell);
    }
    // Capture row array into cells array
    cells.push(rows);
  }
  return cells;
};
// Handle player movement
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
    newYPos < level[0].length &&
    level[newXPos][newYPos].id != "blocked"
  ) {
    // Clear previous position
    level[xPos][yPos].innerHTML = "";

    // Update with new position
    xPos = newXPos;
    yPos = newYPos;

    // Place P/C in new pos on grid
    level[xPos][yPos].innerHTML = playerIcon;

    handleCornCount(level);
  }
};
// Handle corn count / progression
const handleCornCount = (level: HTMLDivElement[][]) => {
  if (level[xPos][yPos].id === "corn") {
    cornCount += 1;
    cornDisplay.value = `${cornCount} :`;
    level[xPos][yPos].removeAttribute("id");
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

// Level One

const levelOne = levelConstructor(5);
levelOne[0][0].innerHTML = playerIcon;
handleKeyboardDirection(levelOne);
handleClickDirection(levelOne);

levelOne[1][0].id = "blocked";
levelOne[1][1].id = "blocked";
levelOne[1][2].id = "blocked";
levelOne[1][3].id = "blocked";
levelOne[3][1].id = "blocked";
levelOne[3][2].id = "blocked";
levelOne[3][3].id = "blocked";
levelOne[3][4].id = "blocked";

levelOne[0][4].id = "corn";
levelOne[2][0].id = "corn";
levelOne[4][4].id = "corn";
levelOne[0][4].innerHTML = cornIcon;
levelOne[2][0].innerHTML = cornIcon;
levelOne[4][4].innerHTML = cornIcon;
