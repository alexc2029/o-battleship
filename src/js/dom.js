const display = {};
let gameboardsContainer, gameInfo;
const init = () => {
	gameboardsContainer = document.querySelector(".gameboards-container");
	gameInfo = document.querySelector(".game-status");
};
const renderGameboards = () => {
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
	initPostRenderGameboards();
};
const wipeGameboards = () => {
	gameboardsContainer.innerHTML = "";
};
const initPostRenderGameboards = () => {
	display.squaresPlayer = document.querySelectorAll(
		".gameboards-container > .gameboard-container:nth-child(1) > .gameboard > div",
	);
	display.squaresComputer = document.querySelectorAll(
		".gameboards-container > .gameboard-container:nth-child(2) > .gameboard > div",
	);
};

const getSquareIndex = (coordsArr) => {
	return (coordsArr[1] - 1) * 10 + (coordsArr[0] - 1);
};
const renderShips = (gameboard) => {
	for (let i = 1; i <= 10; i++) {
		for (let j = 1; j <= 10; j++) {
			if (gameboard.at([i, j]).ship)
				display.squaresPlayer[getSquareIndex([i, j])].classList.add(
					"ship",
				);
		}
	}
};
const renderSquareHit = (square) => {
	square.classList.add("hit");
};
const renderSquareMiss = (square) => {
	square.classList.add("missed");
};
const announceWinner = (playerName) => {
	gameInfo.textContent = `${playerName} wins!`;
};
const announcePlayerTurn = (playerName) => {
	gameInfo.textContent = `${playerName}'s turn.`;
};
const announceComputerTurn = () => {
	gameInfo.textContent = `Computer's turn.`;
};

display.init = init;
display.renderGameboards = renderGameboards;
display.wipeGameboards = wipeGameboards;
display.renderShips = renderShips;
display.renderSquareHit = renderSquareHit;
display.renderSquareMiss = renderSquareMiss;
display.getSquareIndex = getSquareIndex;
display.announceWinner = announceWinner;
display.announcePlayerTurn = announcePlayerTurn;
display.announceComputerTurn = announceComputerTurn;

export default display;
