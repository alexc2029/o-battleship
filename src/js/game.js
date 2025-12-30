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

(function GameController() {
	const players = [new Player(), new Computer()];
	let activePlayer = players[0];
	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	populateBoard(players[0]);
	populateBoard(players[1]);
	import("./dom.js");
	DisplayController.renderShips(players[0].gameboard);

	function playerRound(gameboard, coordsArr, square) {
		if (activePlayer === players[1]) return;
		processAttack(gameboard, coordsArr, square);
	}

	addAttackListeners(players[1].gameboard, playerRound);
})();
