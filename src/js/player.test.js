import { Player } from "./player.js";

describe("player constructor tests", () => {
	let player;
	beforeEach(() => {
		player = new Player();
	});
	test("player has gameboard instance", () => {
		expect(player.gameboard).not.toBeUndefined();
	});
});

describe("player.lost tests", () => {
	let mockGameboard, mockPlayer;
	beforeEach(() => {
		mockGameboard = { allSunk: jest.fn() };
		mockPlayer = new Player();
		mockPlayer.gameboard = mockGameboard;
	});
	test("returns true if all ships are sunk", () => {
		mockPlayer.gameboard.allSunk.mockReturnValue(true);
		expect(mockPlayer.lost()).toBe(true);
	});
	test("returns false if not all ships are sunk", () => {
		mockPlayer.gameboard.allSunk.mockReturnValue(false);
		expect(mockPlayer.lost()).toBe(false);
	});
});
