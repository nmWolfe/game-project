import "./scss/main.scss";
import { gameGrid } from "./ts/selectors";
import { rules } from "./ts/variables";
import { handleEnterStart, handleClickStart } from "./ts/events";

export let rulesDisplayed: boolean = false;
// Creating SuperMazeBoy Icon and Corn icon
export const playerIcon = `<img src="../assets/logo.svg" alt="super maize boy" width="40%" height="90%"/>`;
export const cornIcon = `<img src="../assets/corn.svg" alt="corn icon" width="40%" height="90%"/>`;

// Display rules on page load
const handleRules = () => {
  if (!rulesDisplayed) {
    gameGrid.innerHTML = rules;
    rulesDisplayed = true;

    document.addEventListener("click", handleClickStart);
    document.addEventListener("keydown", handleEnterStart);
  }
};

handleRules();
