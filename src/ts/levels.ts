import { handleClickDirection, handleKeyboardDirection } from "./events";
import { levelConstructor, currentLevel } from "./functions";
import { cornIcon, playerIcon } from "./variables";
// Levels
export const levelOne = () => {
  if (currentLevel < 2) {
    const levelOneMatrix = levelConstructor(5);
    levelOneMatrix[0][0].innerHTML = playerIcon;
    handleKeyboardDirection(levelOneMatrix);
    handleClickDirection(levelOneMatrix);

    levelOneMatrix[1][0].id = "blocked";
    levelOneMatrix[1][1].id = "blocked";
    levelOneMatrix[1][2].id = "blocked";
    levelOneMatrix[1][3].id = "blocked";
    levelOneMatrix[3][1].id = "blocked";
    levelOneMatrix[3][2].id = "blocked";
    levelOneMatrix[3][3].id = "blocked";
    levelOneMatrix[3][4].id = "blocked";

    levelOneMatrix[0][4].id = "corn";
    levelOneMatrix[2][0].id = "corn";
    levelOneMatrix[4][4].id = "corn";
    levelOneMatrix[0][4].innerHTML = cornIcon;
    levelOneMatrix[2][0].innerHTML = cornIcon;
    levelOneMatrix[4][4].innerHTML = cornIcon;
  }
};
export const levelTwo = () => {
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
export const levelThree = () => {
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
export const levelFour = () => {
  const levelFour = levelConstructor(8);
  levelFour[0][0].innerHTML = playerIcon;
  handleKeyboardDirection(levelFour);
  handleClickDirection(levelFour);

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
