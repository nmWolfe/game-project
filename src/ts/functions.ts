import { gameGrid, timeDisplay, resetGame } from "./main";
import { LevelBooleans } from "./objects";

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
    timeDisplay.value = `00: ${String(timeCount)}`;
    timeCount--;
    if (timeCount < 0) {
      clearInterval(timer);
      handleTimeOut();
    } else if (
      LevelBooleans.levelTwo ||
      LevelBooleans.levelThree ||
      LevelBooleans.levelFour
    ) {
      clearInterval(timer);
      return;
    }
  }, 1000);
};
// Handle timeout
export const handleTimeOut = () => {
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
