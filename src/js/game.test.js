import { DisplayController } from "./dom";
import { processAttack } from "./game";
import { playerLost } from "./game";

jest.mock("./dom", () => {
	return {
		DisplayController: {
			renderSquareHit: jest.fn(),
			renderSquareMiss: jest.fn(),
		},
	};
});

describe("game tests", () => {
	describe("processAttack tests", () => {
		let mockGameboard,
			mockSquare,
			mockDomSquare = null,
			mockCoords = [0, 0];
		beforeEach(() => {
			mockSquare = { isHit: jest.fn() };
			mockGameboard = {
				receiveAttack: jest.fn(),
				at: jest.fn().mockReturnValue(mockSquare),
			};
		});
		test("processAttack calls Gameboard.receiveAttack", () => {
			processAttack(mockGameboard, mockCoords, mockDomSquare);
			expect(mockGameboard.receiveAttack).toHaveBeenCalled();
		});
		test("processAttack calls renderSquareHit on hit", () => {
			mockSquare.isHit.mockReturnValue(true);
			processAttack(mockGameboard, mockCoords, mockDomSquare);
			expect(DisplayController.renderSquareHit).toHaveBeenCalled();
		});
		test("processAttack calls renderSquareMiss on miss", () => {
			mockSquare.isHit.mockReturnValue(false);
			processAttack(mockGameboard, mockCoords, mockDomSquare);
			expect(DisplayController.renderSquareMiss).toHaveBeenCalled();
		});
	});
	describe("playerLost tests", () => {
		let mockGameboard, mockPlayer;
		beforeEach(() => {
			mockGameboard = { allSunk: jest.fn() };
			mockPlayer = { gameboard: mockGameboard };
		});
		test("returns true if all ships are sunk", () => {
			mockPlayer.gameboard.allSunk.mockReturnValue(true);
			expect(playerLost(mockPlayer)).toBe(true);
		});
		test("returns false if not all ships are sunk", () => {
			mockPlayer.gameboard.allSunk.mockReturnValue(false);
			expect(playerLost(mockPlayer)).toBe(false);
		});
	});
});
