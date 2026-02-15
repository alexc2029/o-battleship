import { DisplayController } from "./dom";

//a bit of circular dependency going on

function waitOneSecond() {
	return new Promise((resolve) => setTimeout(resolve, 1000));
}

let isRunning = false;

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
			square.addEventListener("click", async () => {
				if (isRunning) return;
				isRunning = true;
				if (!checkOnEvery(checkParams))
					onClick(gameboard, [i, j], square);
				if (!checkOnEvery(checkParams)) {
					await waitOneSecond();
					afterOnClick();
				}
				checkOnEvery(checkParams);
				isRunning = false;
			});
		}
	}
}
