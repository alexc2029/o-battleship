import "./styles.css";
import { GameController } from "./js/game";
const playButton = document.querySelector(".play-button");
let firstPress = true;
playButton.addEventListener("click", () => {
	if (firstPress) {
		firstPress = false;
		playButton.textContent = "Restart";
	}
	GameController();
});
