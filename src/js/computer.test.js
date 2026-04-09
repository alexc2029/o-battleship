import { Computer } from "./computer";
import { Gameboard } from "./gameboard";
import { isShipVertical } from "./computer";

describe("Computer tests", () => {
	describe("Computer attack tests", () => {
		let stubRandomAttack, playerGameboard, computer;
		beforeEach(() => {
			stubRandomAttack = jest.fn();
			playerGameboard = new Gameboard();
			computer = new Computer();
		});
		afterEach(() => {
			jest.restoreAllMocks();
		});
		describe("horizontal", () => {
			test("eventually attacks second square for a 2 length ship", () => {
				playerGameboard.place([3, 3], 2);
				stubRandomAttack.mockReturnValue([3, 3]);
				const attacks = [];
				for (let i = 0; i <= 4; i++) {
					const coords = computer.decideAttack(
						playerGameboard,
						stubRandomAttack,
					);
					playerGameboard.receiveAttack(coords);
					attacks.push(coords);
				}
				expect(attacks).toContainEqual([4, 3]);
			});
			test("eventually attacks all squares for the middle of a 3 length ship", () => {
				playerGameboard.place([3, 3], 3);
				stubRandomAttack.mockReturnValue([4, 3]);
				const attacks = [];
				for (let i = 0; i <= 4; i++) {
					const coords = computer.decideAttack(
						playerGameboard,
						stubRandomAttack,
					);
					playerGameboard.receiveAttack(coords);
					attacks.push(coords);
				}
				expect(attacks).toContainEqual([4, 3]);
				expect(attacks).toContainEqual([5, 3]);
			});
			test("eventually attacks all squares for the middle of a 4 length ship", () => {
				playerGameboard.place([3, 3], 4);
				stubRandomAttack.mockReturnValue([4, 3]);
				const attacks = [];
				for (let i = 0; i <= 8; i++) {
					const coords = computer.decideAttack(
						playerGameboard,
						stubRandomAttack,
					);
					playerGameboard.receiveAttack(coords);
					attacks.push(coords);
				}
				expect(attacks).toContainEqual([4, 3]);
				expect(attacks).toContainEqual([5, 3]);
				expect(attacks).toContainEqual([6, 3]);
			});
		});
	});
	describe("isShipVertical tests", () => {
		test("false for horizontal", () => {
			expect(isShipVertical([3, 3], [4, 3])).toBe(false);
		});
		test("true for vertical", () => {
			expect(isShipVertical([3, 3], [3, 4])).toBe(true);
		});
	});
});
