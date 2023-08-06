import "./main.scss";

const directionLeft = document.querySelector("#arrow-left");
const directionRight = document.querySelector("#arrow-right");
const directionUp = document.querySelector("#arrow-up");
const directionDown = document.querySelector("#arrow-down");

if (!directionDown || !directionLeft || !directionUp || !directionRight) {
  throw new Error("Directional var error");
}
