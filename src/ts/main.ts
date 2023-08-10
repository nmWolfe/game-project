import "../scss/main.scss";
import { gameGrid } from "./selectors";
import { rules } from "./variables";
import { handleEnterStart, handleClickStart } from "./events";

export let rulesDisplayed: boolean = false;

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
