import { DisplayController } from "./dom";

//a bit of circular dependency going on

export function addAttackListeners(
	gameboard,
	onClick,
	afterOnClick,
	checkOnEvery,
	checkParams,
) {
	const squares = DisplayController.squaresComputer;
	for (let i = 1; i <= 10; i++) {
		for (let j = 1; j <= 10; j++) {
			const square = squares[(j - 1) * 10 + (i - 1)];
			square.addEventListener("click", () => {
				if (!checkOnEvery(checkParams))
					onClick(gameboard, [i, j], square);
				if (!checkOnEvery(checkParams)) afterOnClick();
				checkOnEvery(checkParams);
			});
		}
	}
}
