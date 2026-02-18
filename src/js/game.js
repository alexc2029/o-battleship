import { DisplayController } from "./dom.js";
import { Player } from "./player.js";
import { Computer } from "./computer.js";
import { addAttackListeners } from "./events.js";

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

export function GameController() {
	const players = [new Player(), new Computer()];

	populateBoard(players[0]);
	populateBoard(players[1]);
	import("./dom.js");
	DisplayController.renderShips(players[0].gameboard);
	DisplayController.resetHitAndMiss();
	function playerRound(gameboard, coordsArr, square) {
		processAttack(gameboard, coordsArr, square);
		DisplayController.announceComputerTurn();
	}
	function computerRound() {
		const computerAttackCoords = players[1].decideRandomAttack(
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
