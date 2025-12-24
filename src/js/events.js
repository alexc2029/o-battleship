import { DisplayController } from "./dom";

export function addAttackListeners(gameboard) {
	const squares = DisplayController.squaresComputer;
	for (let i = 1; i <= 10; i++) {
		for (let j = 1; j <= 10; j++) {
			const square = squares[(j - 1) * 10 + (i - 1)];
			square.addEventListener("click", () => {
				gameboard.receiveAttack([i, j]);
				if (gameboard.at([i, j]).isHit())
					DisplayController.renderSquareHit(square);
				else DisplayController.renderSquareMiss(square);
			});
		}
	}
}
