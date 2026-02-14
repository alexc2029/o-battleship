import { Gameboard } from "./gameboard";

export class Player {
	name;
	gameboard;
	constructor(name = "Player") {
		this.name = name;
		this.gameboard = new Gameboard();
	}
	lost() {
		if (this.gameboard.allSunk()) return true;
		return false;
	}
}
