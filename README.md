<img width="100%" alt="Screenshot 2023-08-18 at 11 54 27" src="https://github.com/nmWolfe/super-maize-man/assets/125403716/87494a82-ed9a-4ea6-a03b-6e4ed4d24c1c">

# Super-Maize Man - A web-based maze game!

[Super Maize-Man](https://nmwolfe.github.io/super-maize-man/)

This project was a whole _**field**_ of fun. It involved creating a web-based game that can handle user input, and provide some sort of challenge for the Maize-loving human who decides to play it.
It was designed with mobile-in-mind, so there is the option to click your way through with on-screen buttons, or alternatively use directional inputs on your desktop computer.

## Features

1. Directional Inputs

   - The game takes directional input from the usual direction keys, and also WSAD.
   - The game has a directional keypad that will hide when a bigger (desktop) screen size is detected.

2. Mobile-first Design

   - This game was developed with a mobile-first mindset, meaning it will look particularly good on a handheld device.
   - Includes optional landscape mode.

3. Desktop Mode

   - When the game is played on a Desktop, or screen wider than 1200px, it will hide the mobile-keypad, and accept keyboard inputs only.

4. Timer based challenges

   - Adding this timer proved challenging, however, it makes the game play more polished, and complete.

5. Collectable items
   - This was an essential part to progression, and allows for expansion in the future.

## Challenges

There were a few..

1 - Getting directional inputs from both clicks, and keyboard, and then implementing both/one or the other.

- My solution was to separate them, and return the subsequent 'moves' to a function that would handle the changes.
- Later I made the decision to remove the keypad, if a keyboard input was detected, as it was causing unexpected errors in my display window.

```typescript
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
```

2 - Handling the movement on a grid-based system

- This proved to be my favorite bug, as it allowed me to really get a grasp of matrixes, and how to ~~traverse~~ access them intuitively.
- Subsequently this became my favorite function in the whole program.

```typescript
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
```

3 - Displaying the level, after one was completed.

- This proved a tiresome bug. My issue was with my timer, as on each new level, I could not refresh the timer, and get it to begin running again.
- Eventually I added checks to decide if a level was 'completed' or not. This got the timer to run as expected, allowing me to execute a 'replay' function if the timer did run out.

```typescript
export const handleTimer = (timeCount: number) => {
  const timer = setInterval(function () {
    timeDisplay.value = `00: ${String(timeCount)}`;
    timeCount--;
    if (timeCount < 0) {
      clearInterval(timer);
      handleTimeOut(displayLose);
    } else if (currentLevel == 2 && !timerBooleans.levelOne) {
      timerBooleans.levelOne = true;
      clearInterval(timer);
    } else if (currentLevel == 3 && !timerBooleans.levelTwo) {
      timerBooleans.levelTwo = true;
      clearTimeout(timer);
    } else if (currentLevel == 4 && !timerBooleans.levelThree) {
      timerBooleans.levelThree = true;
      clearTimeout(timer);
    } else if (cornCount >= 27) {
      clearTimeout(timer);
    }
  }, 1000);
};
```

## Elements I am proud of

There is a lot I am proud of with this game. Particularly the design, to feel Retro, and fun.

Here, on mobile, you can see the initial page-load, and get a feel for how the game looks.

<img width="381" alt="Screenshot 2023-08-18 at 11 59 38" src="https://github.com/nmWolfe/super-maize-man/assets/125403716/6f8d8d29-60b7-4f55-ad28-189c814b117e">

Turning your phone, or handheld sideways will display as this:

<img width="838" alt="Screenshot 2023-08-18 at 11 59 56" src="https://github.com/nmWolfe/super-maize-man/assets/125403716/43e5b076-76a6-4305-bbd2-9120cd0c9b60">

And finally, on a desktop, it will remove the D-pad, and have a 'sleeker' look.

<img width="878" alt="Screenshot 2023-08-18 at 11 58 56" src="https://github.com/nmWolfe/super-maize-man/assets/125403716/6863122f-28fe-47a1-a77f-d39c03e76311">

## So, how can I play this game?

The game is hosted on Github Pages, and if you click [here](https://nmwolfe.github.io/super-maize-man/) it will take you to the page.

Alternatively, you can clone the repo and play it locally through your dev server. Enjoy!

## Final Thoughts

Overall this was project became a labour of love. In my initial design, I had not realized the complexity of this style of game. If given the opportunity to start over <sup>(internal cry)</sup> I would use Canvas, so I can wipe a page, and start fresh, instead of adding and removing, and this lead to poor performance.

Additionally, if I were to continue working on this project, I would add more levels, increasing the complexity of each MAIZE.
