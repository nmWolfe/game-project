import "./scss/main.scss";
import { gameGrid } from "./ts/selectors";
import { rules } from "./ts/variables";
import { handleEnterStart, handleClickStart } from "./ts/events";

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
