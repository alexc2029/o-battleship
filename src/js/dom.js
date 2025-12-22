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
})();
