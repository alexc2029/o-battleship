import { Computer } from "./computer";
import { Gameboard } from "./gameboard";

describe("Computer tests", () => {
	let stubRandomAttack, playerGameboard, computer;
	beforeEach(() => {
		stubRandomAttack = jest.fn();
		playerGameboard = new Gameboard();
		computer = new Computer();
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	test("eventually attacks second square for a 2 length ship", () => {
		playerGameboard.place([3, 3], 2);
		stubRandomAttack.mockReturnValue([3, 3]);
		const attacks = [];
		for (let i = 0; i <= 4; i++) {
			attacks.push(
				computer.decideAttack(playerGameboard, stubRandomAttack),
			);
		}
		expect(attacks).toContainEqual([4, 3]);
	});
	test("eventually attacks all squares for the middle of a 3 length ship", () => {
		playerGameboard.place([3, 3], 3);
		stubRandomAttack.mockReturnValue([4, 3]);
		const attacks = [];
		for (let i = 0; i <= 4; i++) {
			attacks.push(
				computer.decideAttack(playerGameboard, stubRandomAttack),
			);
		}
		expect(attacks).toContainEqual([4, 3]);
		expect(attacks).toContainEqual([5, 3]);
	});
});
