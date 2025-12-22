import { Player } from "./player.js";

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

function GameController() {
	let player = new Player();
	let computer = new Player();
	populateBoard(player);
	populateBoard(computer);
}
