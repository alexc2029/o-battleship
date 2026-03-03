import "./styles.css";
import { GameController } from "./js/game";
import { setGameReset } from "./js/events";
import DisplayController from "./js/dom.js";

const playButton = document.querySelector(".play-button");
let firstPress = true;
DisplayController.init();
DisplayController.renderGameboards();
playButton.addEventListener("click", () => {
	if (firstPress) {
		firstPress = false;
		playButton.textContent = "Restart";
	}
	GameController();
	setGameReset();
});
