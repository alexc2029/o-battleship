import shuffleIcon from "../../assets/shuffle.svg";

const display = {};
let gameboardsContainer, gameInfo;
const init = () => {
	gameboardsContainer = document.querySelector(".gameboards-container");
	gameInfo = document.querySelector(".game-status");
	display.playButton = document.querySelector(".play-button");
	display.randomizeButton = document.createElement("div");
	display.randomizeButton.classList.add("randomize-button");
	display.randomizeButton.innerHTML = `Randomize <img src='${shuffleIcon}' />`;
};
const renderGameboards = () => {
	const gameboard1Container = document.createElement("div");
	gameboard1Container.classList.add("gameboard-container");
	const gameboard2Container = document.createElement("div");
	gameboard2Container.classList.add("gameboard-container");
	const gameboard1 = document.createElement("div");
	gameboard1.classList.add("gameboard");
	const gameboard2 = document.createElement("div");
	gameboard2.classList.add("gameboard", "opacity");
	for (let i = 1; i <= 10; i++) {
		for (let j = 1; j <= 10; j++) {
			const square1 = document.createElement("div");
			square1.classList.add("player-square");
			const square2 = document.createElement("div");
			square2.classList.add("computer-square");
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
	gameboard1Container.appendChild(display.randomizeButton);
	gameboard2Container.appendChild(label2);
	gameboardsContainer.appendChild(gameboard1Container);
	gameboardsContainer.appendChild(gameboard2Container);
	initPostRenderGameboards();
};
const toggleGameboardOpacities = () => {
	const gameboards = document.querySelectorAll(".gameboard");
	for (const gameboard of gameboards) {
		gameboard.classList.toggle("opacity");
	}
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
const switchToResetButton = () => {
	display.playButton.textContent = "Reset";
	display.playButton.classList.toggle("reset");
};
const switchToPlayButton = () => {
	display.playButton.textContent = "Play";
	display.playButton.classList.toggle("reset");
};
const announceWaitingForGameStart = () => {
	gameInfo.textContent = "Waiting for game start.";
};
const toggleRandomizeVisibility = () => {
	const visibility = display.randomizeButton.style.visibility;
	if (visibility == "hidden")
		display.randomizeButton.style.visibility = "visible";
	else display.randomizeButton.style.visibility = "hidden";
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
display.switchToResetButton = switchToResetButton;
display.switchToPlayButton = switchToPlayButton;
display.announceWaitingForGameStart = announceWaitingForGameStart;
display.toggleRandomizeVisibility = toggleRandomizeVisibility;
display.toggleGameboardOpacities = toggleGameboardOpacities;

export default display;
