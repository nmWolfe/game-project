// Getting directional inputs
export const directionUp = document.getElementById("arrow-up");
export const directionRight = document.getElementById("arrow-right");
export const directionDown = document.getElementById("arrow-down");
export const directionLeft = document.getElementById("arrow-left");

// Getting the game window
export const gameGrid = document.querySelector(".game") as HTMLDivElement;
if (!gameGrid) {
  throw new Error("Game var error");
}
// Getting the controls section
export const controlBox = document.querySelector(
  ".controls__section"
) as HTMLDivElement;
if (!controlBox) {
  throw new Error("Control box var error");
}
// Get the replay button
export const replayButton = document.querySelector(
  ".replay-button"
) as HTMLButtonElement;
if (!replayButton) {
  throw new Error("Replay button error");
}
// Getting display inputs
export const timeDisplay = document.querySelector(
  ".time-counter"
) as HTMLInputElement;
export const cornDisplay = document.querySelector(
  ".corn-counter"
) as HTMLInputElement;
if (!timeDisplay || !cornDisplay) {
  throw new Error("Display input error");
}
