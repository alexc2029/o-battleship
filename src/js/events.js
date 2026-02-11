import { DisplayController } from "./dom";

//a bit of circular dependency going on

export function addAttackListeners(gameboard, onClick, afterOnClick) {
	const squares = DisplayController.squaresComputer;
	for (let i = 1; i <= 10; i++) {
		for (let j = 1; j <= 10; j++) {
			const square = squares[(j - 1) * 10 + (i - 1)];
			square.addEventListener("click", () => {
				onClick(gameboard, [i, j], square);
				afterOnClick();
			});
		}
	}
}
