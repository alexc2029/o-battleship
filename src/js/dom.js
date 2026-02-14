export const DisplayController = (() => {
	const gameboardsContainer = document.querySelector(".gameboards-container");
	const renderGameboards = (() => {
		const gameboard1Container = document.createElement("div");
		gameboard1Container.classList.add("gameboard-container");
		const gameboard2Container = document.createElement("div");
		gameboard2Container.classList.add("gameboard-container");
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
		gameboard1Container.appendChild(gameboard1);
		gameboard2Container.appendChild(gameboard2);
		const label1 = document.createElement("div");
		label1.textContent = "Your board";
		label1.classList.add("board-label");
		const label2 = document.createElement("div");
		label2.textContent = "Opponent's board";
		label2.classList.add("board-label");
		gameboard1Container.appendChild(label1);
		gameboard2Container.appendChild(label2);
		gameboardsContainer.appendChild(gameboard1Container);
		gameboardsContainer.appendChild(gameboard2Container);
	})();
	const squaresPlayer = document.querySelectorAll(
		".gameboards-container > .gameboard-container:nth-child(1) > .gameboard > div",
	);
	const squaresComputer = document.querySelectorAll(
		".gameboards-container > .gameboard-container:nth-child(2) > .gameboard > div",
	);
	const getSquareIndex = (coordsArr) => {
		return (coordsArr[1] - 1) * 10 + (coordsArr[0] - 1);
	};
	const renderShips = (gameboard) => {
		for (let i = 1; i <= 10; i++) {
			for (let j = 1; j <= 10; j++) {
				if (gameboard.at([i, j]).ship)
					squaresPlayer[getSquareIndex([i, j])].classList.add("ship");
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
		getSquareIndex,
		squaresPlayer,
		squaresComputer,
	};
})();
