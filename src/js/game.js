import DisplayController from "./dom.js";
import { Player } from "./player.js";
import { Computer } from "./computer.js";
import { addAttackListeners, setGameReset } from "./events.js";

function populateBoard(player) {
	player.gameboard.place([1, 1], 4);
	player.gameboard.place([2, 8], 3);
	player.gameboard.place([7, 8], 3);
	player.gameboard.place([9, 1], 2);
	player.gameboard.place([5, 4], 2);
	player.gameboard.place([9, 5], 2);
	player.gameboard.place([1, 2], 1);
	player.gameboard.place([9, 3], 1);
	player.gameboard.place([1, 6], 1);
	player.gameboard.place([10, 10], 1);
}

export function processAttack(gameboard, coordsArr, square) {
	gameboard.receiveAttack(coordsArr);
	if (gameboard.at(coordsArr).isHit())
		DisplayController.renderSquareHit(square);
	else DisplayController.renderSquareMiss(square);
}

export function isGameOver(players) {
	//returns winner
	if (players[0].lost()) return players[1];
	else if (players[1].lost()) return players[0];
	return false;
}

export function handleGameOver(players) {
	const winner = isGameOver(players);
	if (!winner) return false;
	DisplayController.announceWinner(winner.name);
	return winner;
}

function handleRandomize() {
	const players = [new Player(), new Computer()];

	players[0].gameboard.randomizeGameboard();
	players[1].gameboard.randomizeGameboard();

	DisplayController.wipeGameboards();
	DisplayController.renderGameboards();
	DisplayController.renderShips(players[0].gameboard);

	return players;
}

export function initGame() {
	DisplayController.init();
	DisplayController.announceWaitingForGameStart();
	let players = handleRandomize();
	function handleClick() {
		players = handleRandomize();
	}
	DisplayController.randomizeButton.addEventListener("click", handleClick);
	DisplayController.playButton.addEventListener("click", function handler(e) {
		DisplayController.randomizeButton.removeEventListener(
			"click",
			handleClick,
		);
		DisplayController.playButton.removeEventListener("click", handler);
		GameController(players);
	});
}

export function GameController(players) {
	DisplayController.switchToResetButton();
	DisplayController.toggleRandomizeVisibility();
	DisplayController.playButton.addEventListener(
		"click",
		function resetHandler(e) {
			setGameReset();
			DisplayController.playButton.removeEventListener(
				"click",
				resetHandler,
			);
			DisplayController.switchToPlayButton();
			initGame();
		},
	);
	function playerRound(gameboard, coordsArr, square) {
		processAttack(gameboard, coordsArr, square);
		DisplayController.announceComputerTurn();
	}
	function computerRound() {
		const computerAttackCoords = players[1].decideAttack(
			players[0].gameboard,
		);
		processAttack(
			players[0].gameboard,
			computerAttackCoords,
			DisplayController.squaresPlayer[
				DisplayController.getSquareIndex(computerAttackCoords)
			],
		);
		DisplayController.announcePlayerTurn(players[0].name);
	}
	DisplayController.announcePlayerTurn(players[0].name);
	addAttackListeners(
		players[1].gameboard,
		playerRound,
		computerRound,
		handleGameOver,
		players,
	);
}
