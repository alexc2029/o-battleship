import "./styles.css";
import { GameController } from "./js/game";
import { setGameReset } from "./js/events";
import DisplayController from "./js/dom.js";

let firstPress = true;
DisplayController.init();
DisplayController.renderGameboards();
DisplayController.playButton.addEventListener("click", () => {
	if (firstPress) {
		firstPress = false;
		DisplayController.playButton.textContent = "Restart";
	}
	GameController();
	setGameReset();
});
