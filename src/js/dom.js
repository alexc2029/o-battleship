export const DisplayController = (() => {
	const gameboardsContainer = document.querySelector(".gameboards-container");
	const renderGameboards = (() => {
		const gameboard1 = document.createElement("div");
		gameboard1.classList.add("gameboard");
		const gameboard2 = document.createElement("div");
		gameboard2.classList.add("gameboard");
		for (let i = 1; i <= 10; i++) {
			for (let j = 1; j <= 10; j++) {
				const square1 = document.createElement("div");
				const square2 = document.createElement("div");
				gameboard1.appendChild(square1);
				gameboard2.appendChild(square2);
			}
		}
		gameboardsContainer.appendChild(gameboard1);
		gameboardsContainer.appendChild(gameboard2);
	})();
	const squaresPlayer = document.querySelectorAll(
		".gameboards-container > .gameboard:nth-child(1) > div",
	);
	const squaresComputer = document.querySelectorAll(
		".gameboards-container > .gameboard:nth-child(2) > div",
	);
	const renderShips = (gameboard) => {
		for (let i = 1; i <= 10; i++) {
			for (let j = 1; j <= 10; j++) {
				if (gameboard.at([i, j]).ship)
					squaresPlayer[(j - 1) * 10 + (i - 1)].classList.add("ship");
			}
		}
	};
	const renderSquareHit = (square) => {
		square.classList.add("hit");
	};
	const renderSquareMiss = (square) => {
		square.classList.add("missed");
	};
	return {
		renderShips,
		renderSquareHit,
		renderSquareMiss,
		squaresPlayer,
		squaresComputer,
	};
})();
