import { LevelBooleans } from "./objects";
import {
  gameGrid,
  timeDisplay,
  cornDisplay,
  replayButton,
  directionUp,
  directionDown,
  directionLeft,
  directionRight,
} from "./selectors";
import { keyBoardEventListener, clickEventListener } from "./events";
import { levelOne, levelTwo, levelThree, levelFour } from "./levels";
import { playerIcon, displayWin, displayLose } from "./variables";

// Clear the game window
export const clearGameWindow = () => {
  gameGrid.innerHTML = "";
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
// Handle timer
export const handleTimer = (timeCount: number) => {
  const timer = setInterval(function () {
    console.log("Starting timer");

    timeDisplay.value = `00: ${String(timeCount)}`;
    timeCount--;
    if (timeCount < 0) {
      clearInterval(timer);
      handleTimeOut(displayLose);
    } else {
      clearInterval(timer);
    }
  }, 1000);
};
// Handle timeout
export const handleTimeOut = (outcome: string) => {
  gameGrid.style.removeProperty("grid-template-columns");
  gameGrid.style.removeProperty("grid-template-rows");
  gameGrid.innerHTML = outcome;
  cornDisplay.value = "PoP";
  const interval = setInterval(() => {
    resetGame();
    clearInterval(interval);
  }, 2000);
};
// Reset if timer runs out
export const resetGame = () => {
  gameGrid.appendChild(replayButton);
  cornCount = 0;
  replayButton.addEventListener("click", handleReplay);
};
// Handle replay for win/loss
const handleReplay = () => {
  xPos = 0;
  yPos = 0;
  document.removeEventListener("keydown", keyBoardEventListener);
  document.removeEventListener("click", clickEventListener);
  LevelBooleans.levelOne = false;
  LevelBooleans.levelTwo = false;
  LevelBooleans.levelThree = false;
  LevelBooleans.levelFour = false;
  handleLevel();
};
// Handle corn count
let cornCount: number = 0;
export const handleCornCount = (level: HTMLDivElement[][]) => {
  if (level[xPos][yPos].id === "corn") {
    cornCount += 1;
    cornDisplay.value = `${cornCount} :`;
    level[xPos][yPos].removeAttribute("id");
  }
};
// Handle player movement
let xPos: number = 0;
let yPos: number = 0;
export const handleMove = (
  xDirection: number,
  yDirection: number,
  level: HTMLDivElement[][]
) => {
  let newXPos: number = xPos + xDirection;
  let newYPos: number = yPos + yDirection;

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
// Handle Level
export let currentLevel: number = 1;
export const handleLevel = () => {
  if (!LevelBooleans.levelOne) {
    xPos = 0;
    yPos = 0;
    clearGameWindow();
    document.removeEventListener("keydown", keyBoardEventListener);
    handleRemoveEventClick();
    LevelBooleans.levelOne = true;
    handleTimer(10);
    levelOne();
  }
  if (cornCount >= 3 && !LevelBooleans.levelTwo) {
    xPos = 0;
    yPos = 0;
    clearGameWindow();
    currentLevel = 2;
    document.removeEventListener("keydown", keyBoardEventListener);
    handleRemoveEventClick();
    LevelBooleans.levelTwo = true;
    handleTimer(15);
    levelTwo();
  }
  if (cornCount >= 13 && !LevelBooleans.levelThree) {
    xPos = 0;
    yPos = 0;
    clearGameWindow();
    currentLevel = 3;
    document.removeEventListener("keydown", keyBoardEventListener);
    handleRemoveEventClick();
    LevelBooleans.levelThree = true;
    handleTimer(20);
    levelThree();
  }
  if (cornCount >= 18 && !LevelBooleans.levelFour) {
    xPos = 0;
    yPos = 0;
    clearGameWindow();
    currentLevel = 4;
    document.removeEventListener("keydown", keyBoardEventListener);
    handleRemoveEventClick();
    LevelBooleans.levelFour = true;
    handleTimer(25);
    levelFour();
  }
  if (cornCount >= 27) {
    currentLevel = 1;
    cornDisplay.value = "WIN";
    handleTimeOut(displayWin);
  }
};
// Remove event listeners on click
const handleRemoveEventClick = () => {
  if (!directionUp || !directionRight || !directionDown || !directionLeft) {
    throw new Error("Directional var error");
  }
  directionUp.removeEventListener("click", clickEventListener);
  directionRight.removeEventListener("click", clickEventListener);
  directionDown.removeEventListener("click", clickEventListener);
  directionLeft.removeEventListener("click", clickEventListener);
};
