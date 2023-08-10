import "../scss/main.scss";

// Getting directional inputs
const directionUp = document.getElementById("arrow-up");
const directionRight = document.getElementById("arrow-right");
const directionDown = document.getElementById("arrow-down");
const directionLeft = document.getElementById("arrow-left");
if (!directionUp || !directionRight || !directionDown || !directionLeft) {
  throw new Error("Directional var error");
}

// Getting the game window
const gameWindow = document.querySelector(".game__window") as HTMLDivElement;
const gameGrid = document.querySelector(".game") as HTMLDivElement;
if (!gameWindow || !gameGrid) {
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
const playerIcon = `<img src="./src/assets/supermaizeboy.svg" alt="supermaizeboy" width="40%" height="90%"/>`;
const cornIcon = `<img src="./src/assets/corn.svg" alt="corn icon" width="40%" height="90%"/>`;
// Vars to mark P/C position in array - figure out how to change depending on level
// Just initialize them, but don't assign value - do that in level func.
let xPos: number = 0;
let yPos: number = 0;
// Var to keep count of collections
let cornCount: number = 0;
let rulesDisplayed: boolean = false;
let currentLevel: number = 1;
// Vars to mark level completion
let levelOneBool = false;
let levelTwoBool = false;
let levelThreeBool = false;
let levelFourBool = false;

// Handle keyboard directions
const handleKeyboardDirection = (level: HTMLDivElement[][]) => {
  document.addEventListener("keydown", (event: KeyboardEvent) => {
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
// Construct a level based on a grid number input
const levelConstructor = (gridAmount: number) => {
  const cells = [];
  xPos = 0;
  yPos = 0;
  gameWindow.removeChild(gameGrid);
  gameWindow.appendChild(gameGrid);
  console.log(gameWindow);
  console.log(gameGrid);
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
    clearGameWindow();
    levelOneBool = true;
    handleTimer(10);
    levelOne();
  }
  if (cornCount >= 3 && !levelTwoBool) {
    clearGameWindow();
    currentLevel + 1;
    levelTwoBool = true;
    handleTimer(30);
    levelTwo();
  }
  if (cornCount >= 11 && !levelThreeBool) {
    clearGameWindow();
    currentLevel + 1;
    levelThreeBool = true;
    handleTimer(30);
    levelThree();
  }
  if (cornCount >= 16 && !levelFourBool) {
    clearGameWindow();
    currentLevel + 1;
    levelFourBool = true;
    levelFour();
  }
};

// Levels
const levelOne = () => {
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
};
const levelTwo = () => {
  console.log("I am level 2");

  const levelTwo = levelConstructor(6);
  levelTwo[0][0].innerHTML = playerIcon;
  handleKeyboardDirection(levelTwo);
  handleClickDirection(levelTwo);

  levelTwo[0][1].id = "blocked";
  levelTwo[1][1].id = "blocked";
  levelTwo[2][1].id = "blocked";
  levelTwo[4][0].id = "blocked";
  levelTwo[4][1].id = "blocked";
  levelTwo[2][2].id = "blocked";
  levelTwo[2][3].id = "blocked";
  levelTwo[4][2].id = "blocked";
  levelTwo[2][4].id = "blocked";
  levelTwo[4][4].id = "blocked";
  levelTwo[4][5].id = "blocked";

  levelTwo[5][0].id = "corn";
  levelTwo[5][5].id = "corn";
  levelTwo[0][2].id = "corn";
  levelTwo[0][3].id = "corn";
  levelTwo[0][4].id = "corn";
  levelTwo[0][5].id = "corn";
  levelTwo[1][2].id = "corn";
  levelTwo[1][3].id = "corn";
  levelTwo[1][4].id = "corn";
  levelTwo[1][5].id = "corn";

  levelTwo[5][0].innerHTML = cornIcon;
  levelTwo[5][5].innerHTML = cornIcon;
  levelTwo[0][2].innerHTML = cornIcon;
  levelTwo[0][3].innerHTML = cornIcon;
  levelTwo[0][4].innerHTML = cornIcon;
  levelTwo[0][5].innerHTML = cornIcon;
  levelTwo[1][2].innerHTML = cornIcon;
  levelTwo[1][3].innerHTML = cornIcon;
  levelTwo[1][4].innerHTML = cornIcon;
  levelTwo[1][5].innerHTML = cornIcon;
};
const levelThree = () => {
  console.log("I am level 3");
  const levelThree = levelConstructor(7);
  levelThree[0][0].innerHTML = playerIcon;
  handleKeyboardDirection(levelThree);
  handleClickDirection(levelThree);
  // handleTimer(30);

  levelThree[0][4].id = "blocked";
  levelThree[1][0].id = "blocked";
  levelThree[1][1].id = "blocked";
  levelThree[1][2].id = "blocked";
  levelThree[1][4].id = "blocked";
  levelThree[1][6].id = "blocked";
  levelThree[2][2].id = "blocked";
  levelThree[3][2].id = "blocked";
  levelThree[3][1].id = "blocked";
  levelThree[3][4].id = "blocked";
  levelThree[3][5].id = "blocked";
  levelThree[4][5].id = "blocked";
  levelThree[4][6].id = "blocked";
  levelThree[5][1].id = "blocked";
  levelThree[5][2].id = "blocked";
  levelThree[5][3].id = "blocked";
  levelThree[5][5].id = "blocked";
  levelThree[6][3].id = "blocked";

  levelThree[0][6].id = "corn";
  levelThree[2][1].id = "corn";
  levelThree[3][6].id = "corn";
  levelThree[5][6].id = "corn";
  levelThree[6][2].id = "corn";

  levelThree[0][6].innerHTML = cornIcon;
  levelThree[2][1].innerHTML = cornIcon;
  levelThree[3][6].innerHTML = cornIcon;
  levelThree[5][6].innerHTML = cornIcon;
  levelThree[6][2].innerHTML = cornIcon;
};
const levelFour = () => {
  console.log("I am level 4");
  const levelFour = levelConstructor(8);
  levelFour[0][0].innerHTML = playerIcon;
  handleKeyboardDirection(levelFour);
  handleClickDirection(levelFour);
  handleTimer(30);

  levelFour[0][1].id = "blocked";
  levelFour[1][1].id = "blocked";
  levelFour[1][3].id = "blocked";
  levelFour[1][4].id = "blocked";
  levelFour[1][5].id = "blocked";
  levelFour[1][6].id = "blocked";
  levelFour[2][6].id = "blocked";
  levelFour[3][1].id = "blocked";
  levelFour[3][3].id = "blocked";
  levelFour[3][4].id = "blocked";
  levelFour[4][1].id = "blocked";
  levelFour[4][3].id = "blocked";
  levelFour[4][5].id = "blocked";
  levelFour[4][7].id = "blocked";
  levelFour[5][1].id = "blocked";
  levelFour[5][3].id = "blocked";
  levelFour[6][3].id = "blocked";
  levelFour[6][5].id = "blocked";
  levelFour[6][6].id = "blocked";
  levelFour[7][1].id = "blocked";
  levelFour[7][5].id = "blocked";

  levelFour[0][2].id = "corn";
  levelFour[0][7].id = "corn";
  levelFour[2][5].id = "corn";
  levelFour[3][7].id = "corn";
  levelFour[4][0].id = "corn";
  levelFour[4][4].id = "corn";
  levelFour[7][0].id = "corn";
  levelFour[7][3].id = "corn";
  levelFour[7][6].id = "corn";

  levelFour[0][2].innerHTML = cornIcon;
  levelFour[0][7].innerHTML = cornIcon;
  levelFour[2][5].innerHTML = cornIcon;
  levelFour[3][7].innerHTML = cornIcon;
  levelFour[4][0].innerHTML = cornIcon;
  levelFour[4][4].innerHTML = cornIcon;
  levelFour[7][0].innerHTML = cornIcon;
  levelFour[7][3].innerHTML = cornIcon;
  levelFour[7][6].innerHTML = cornIcon;
};

handleRules();
