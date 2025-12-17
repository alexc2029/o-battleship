import { Ship } from "./ship";

describe("ship tests", () => {
	let ship;
	beforeEach(() => {
		ship = new Ship(4);
	});
	test("Single hit doesn't sink ship of length 4", () => {
		ship.hit();
		expect(ship.isSunk()).toBe(false);
	});
	test("4 hits do sink ship of length 4", () => {
		for (let i = 0; i < 4; i++) ship.hit();
		expect(ship.isSunk()).toBe(true);
	});
});
