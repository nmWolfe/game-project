import "../scss/main.scss";
import { levelOne, levelTwo, levelThree, levelFour } from "./levels";

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
if (!gameGrid) {
  throw new Error("Game var error");
}
const replayButton = document.querySelector(
  ".replay-button"
) as HTMLButtonElement;
if (!replayButton) {
  throw new Error("Replay button error");
}
// Getting display inputs
const timeDisplay = document.querySelector(".time-counter") as HTMLInputElement;
const cornDisplay = document.querySelector(".corn-counter") as HTMLInputElement;
if (!timeDisplay || !cornDisplay) {
  throw new Error("Display input error");
}
// Intro and Game rules
const rules = `<p class="intro">Welcome to the MAIZE. <br> "That's a very clever play on words" I hear you say.<br>
Well,  I agree. <br>
But this isn't about me, it's about you! <br>
You are a Corn person who loves gathering corn.
<br> Your task is to collect all the delicious corns before the timer runs out. <br>
If the timer runs out, goodbye my sweet friend, I'll see you in the theatres. <br>
Press enter to continue.
(you can also click on the d-pad)
</p>`;
// Creating SuperMazeBoy Icon and Corn icon
export const playerIcon = `<img src="./src/assets/supermaizeboy.svg" alt="supermaizeboy" width="40%" height="90%"/>`;
export const cornIcon = `<img src="./src/assets/corn.svg" alt="corn icon" width="40%" height="90%"/>`;
// Vars to mark P/C position in array
let xPos: number = 0;
let yPos: number = 0;
// Var to keep count of collections
let cornCount: number = 0;
export let currentLevel: number = 1;
// Booleans
let rulesDisplayed: boolean = false;
let levelOneBool = false;
let levelTwoBool = false;
let levelThreeBool = false;
let levelFourBool = false;
// Event listener funcs - Function type => and return nothing
let keyBoardEventListener: (event: KeyboardEvent) => void;
let clickEventListener: (event: MouseEvent) => void;

// Handle keyboard directions
export const handleKeyboardDirection = (level: HTMLDivElement[][]) => {
  keyBoardEventListener = (event: KeyboardEvent) => {
    if (event.key == "ArrowUp" || event.key == "w") {
      handleMove(-1, 0, level);
    } else if (event.key == "ArrowRight" || event.key == "d") {
      handleMove(0, 1, level);
    } else if (event.key == "ArrowDown" || event.key == "s") {
      handleMove(1, 0, level);
    } else if (event.key == "ArrowLeft" || event.key == "a") {
      handleMove(0, -1, level);
    }
  };
  document.addEventListener("keydown", keyBoardEventListener);
};
// Handle click directions
export const handleClickDirection = (level: HTMLDivElement[][]) => {
  clickEventListener = (event: MouseEvent) => {
    if (event.target == directionUp) {
      handleMove(-1, 0, level);
    } else if (event.target == directionRight) {
      handleMove(0, 1, level);
    } else if (event.target == directionDown) {
      handleMove(1, 0, level);
    } else if (event.target == directionLeft) {
      handleMove(0, -1, level);
    }
  };
  directionUp.addEventListener("click", clickEventListener);
  directionRight.addEventListener("click", clickEventListener);
  directionDown.addEventListener("click", clickEventListener);
  directionLeft.addEventListener("click", clickEventListener);
};
// Construct a level based on a grid number input
export const levelConstructor = (gridAmount: number) => {
  const cells: HTMLDivElement[][] = [];
  // Set the grid layout
  gameGrid.style.gridTemplateColumns = `repeat(${gridAmount}, 1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${gridAmount}, 1fr)`;
  for (let i = 0; i < gridAmount; i++) {
    const rows: HTMLDivElement[] = [];
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
// Display rules on page load
const handleRules = () => {
  if (!rulesDisplayed) {
    gameGrid.innerHTML = rules;
    rulesDisplayed = true;

    document.addEventListener("click", handleClickStart);
    document.addEventListener("keydown", handleEnterStart);
  }
};
// Handle game start
const handleEnterStart = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    clearGameWindow();
    document.removeEventListener("keydown", handleEnterStart);
    handleLevel();
  }
};
const handleClickStart = (event: Event) => {
  if (
    event.target == directionUp ||
    event.target == directionRight ||
    event.target == directionDown ||
    event.target == directionLeft
  ) {
    clearGameWindow();
    document.removeEventListener("click", handleClickStart);
    handleLevel();
  }
};
// Handle player movement
const handleMove = (
  xDirection: number,
  yDirection: number,
  level: HTMLDivElement[][]
) => {
  let newXPos: number = xPos + xDirection;
  let newYPos: number = yPos + yDirection;
  console.log(newXPos);
  console.log(newYPos);

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
    handleLevel();
  }
};
// Handle timer
const handleTimer = (timeCount: number) => {
  const timer = setInterval(function () {
    timeDisplay.value = `00: ${String(timeCount)}`;
    timeCount--;
    if (timeCount < 0) {
      clearInterval(timer);
      handleTimeOut();
    } else if (levelTwoBool || levelThreeBool || levelFourBool) {
      clearInterval(timer);
      return;
    }
  }, 1000);
};
// Handle timeout
const handleTimeOut = () => {
  gameGrid.style.removeProperty("grid-template-columns");
  gameGrid.style.removeProperty("grid-template-rows");
  gameGrid.innerHTML = `
  <p class="reset">Well, that's a shame. You tried, but failed. These 
  things happen in life, kid. Keep your chin up, turn that CORNer, and try again. </p>
  `;
  const interval = setInterval(() => {
    resetGame();
    clearInterval(interval);
  }, 2000);
};
// Reset if timer runs out
const resetGame = () => {
  gameGrid.appendChild(replayButton);
  cornCount = 0;

  replayButton.addEventListener("click", () => {
    xPos = 0;
    yPos = 0;
    document.removeEventListener("keydown", keyBoardEventListener);
    document.removeEventListener("click", clickEventListener);
    levelOneBool = false;
    levelTwoBool = false;
    levelThreeBool = false;
    levelFourBool = false;
    handleLevel();
  });
};
// Clear the game grid
const clearGameWindow = () => {
  gameGrid.innerHTML = "";
};
// Handle corn count
const handleCornCount = (level: HTMLDivElement[][]) => {
  if (level[xPos][yPos].id === "corn") {
    cornCount += 1;
    cornDisplay.value = `${cornCount} :`;
    level[xPos][yPos].removeAttribute("id");
  }
};
// Handle Level
const handleLevel = () => {
  if (!levelOneBool) {
    xPos = 0;
    yPos = 0;
    clearGameWindow();
    document.removeEventListener("keydown", keyBoardEventListener);
    document.removeEventListener("click", clickEventListener);
    levelOneBool = true;
    handleTimer(10);
    levelOne();
  }
  if (cornCount >= 3 && !levelTwoBool) {
    xPos = 0;
    yPos = 0;
    clearGameWindow();
    currentLevel = 2;
    document.removeEventListener("keydown", keyBoardEventListener);
    document.removeEventListener("click", clickEventListener);
    levelTwoBool = true;
    handleTimer(30);
    levelTwo();
  }
  if (cornCount >= 13 && !levelThreeBool) {
    xPos = 0;
    yPos = 0;
    clearGameWindow();
    currentLevel = 3;
    document.removeEventListener("keydown", keyBoardEventListener);
    document.removeEventListener("click", clickEventListener);
    levelThreeBool = true;
    handleTimer(30);
    levelThree();
  }
  if (cornCount >= 18 && !levelFourBool) {
    xPos = 0;
    yPos = 0;
    clearGameWindow();
    currentLevel + 1;
    document.removeEventListener("keydown", keyBoardEventListener);
    document.removeEventListener("click", clickEventListener);
    levelFourBool = true;
    levelFour();
  }
};

handleRules();
