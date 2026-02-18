import "./styles.css";
import { GameController } from "./js/game";
import { setGameReset } from "./js/events";
const playButton = document.querySelector(".play-button");
let firstPress = true;
playButton.addEventListener("click", () => {
	if (firstPress) {
		firstPress = false;
		playButton.textContent = "Restart";
	}
	GameController();
	setGameReset();
});
