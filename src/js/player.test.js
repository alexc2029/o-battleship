import { Player } from "./player.js";

describe("player tests", () => {
	let player;
	beforeEach(() => {
		player = new Player();
	});
	test("player has gameboard instance", () => {
		expect(player.gameboard).not.toBeUndefined();
	});
});
