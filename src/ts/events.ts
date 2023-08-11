import {
  directionUp,
  directionDown,
  directionLeft,
  directionRight,
  controlBox,
} from "./selectors";
import { clearGameWindow, handleMove, handleLevel } from "./functions";

// Event listener funcs - Function type => and return nothing
export let keyBoardEventListener: (event: KeyboardEvent) => void;
export let clickEventListener: (event: MouseEvent) => void;
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
  if (!directionUp || !directionRight || !directionDown || !directionLeft) {
    throw new Error("Directional var error");
  }
  directionUp.addEventListener("click", clickEventListener);
  directionRight.addEventListener("click", clickEventListener);
  directionDown.addEventListener("click", clickEventListener);
  directionLeft.addEventListener("click", clickEventListener);
};
// Handle game start
export const handleEnterStart = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    clearGameWindow();
    controlBox.style.display = "none";
    document.removeEventListener("keydown", handleEnterStart);
    handleLevel();
  }
};
export const handleClickStart = (event: Event) => {
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
