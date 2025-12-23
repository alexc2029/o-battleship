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
	const updateGameboard = (gameboard, squares) => {
		for (let i = 1; i <= 10; i++) {
			for (let j = 1; j <= 10; j++) {
				if (gameboard.at([i, j]).ship)
					squares[(j - 1) * 10 + (i - 1)].classList.add("ship");
			}
		}
	};
	const updateGameboards = (gameboard1, gameboard2) => {
		const squares1 = document.querySelectorAll(
			".gameboards-container > .gameboard:nth-child(1) > div",
		);
		const squares2 = document.querySelectorAll(
			".gameboards-container > .gameboard:nth-child(2) > div",
		);
		console.log(squares1);
		console.log(squares2);
		updateGameboard(gameboard1, squares1);
		updateGameboard(gameboard2, squares2);
	};
	return { updateGameboards };
})();
