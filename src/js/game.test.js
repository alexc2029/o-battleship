import { DisplayController } from "./dom";
import { processAttack } from "./game";
import { isGameOver } from "./game";
import { handleGameOver } from "./game";

jest.mock("./dom", () => {
	return {
		DisplayController: {
			renderSquareHit: jest.fn(),
			renderSquareMiss: jest.fn(),
			announceWinner: jest.fn(),
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
	describe("isGameOver tests", () => {
		let mockPlayer1, mockPlayer2;
		let mockPlayers;
		beforeEach(() => {
			mockPlayer1 = { name: "player1", lost: jest.fn() };
			mockPlayer2 = { name: "player2", lost: jest.fn() };
			mockPlayers = [mockPlayer1, mockPlayer2];
		});
		test("player1 has won", () => {
			mockPlayer1.lost.mockReturnValue(false);
			mockPlayer2.lost.mockReturnValue(true);
			expect(isGameOver(mockPlayers)).toBe(mockPlayer1);
		});
		test("player2 has won", () => {
			mockPlayer1.lost.mockReturnValue(true);
			mockPlayer2.lost.mockReturnValue(false);
			expect(isGameOver(mockPlayers)).toBe(mockPlayer2);
		});
		test("nobody has lost", () => {
			mockPlayer1.lost.mockReturnValue(false);
			mockPlayer2.lost.mockReturnValue(false);
			expect(isGameOver(mockPlayers)).toBe(false);
		});
	});
	describe("handleGameOver tests", () => {
		let mockPlayer1, mockPlayer2;
		let mockPlayers;
		beforeEach(() => {
			mockPlayer1 = { name: "player1", lost: jest.fn() };
			mockPlayer2 = { name: "player2", lost: jest.fn() };
			mockPlayers = [mockPlayer1, mockPlayer2];
		});
		test("returns false if nobody has lost", () => {
			mockPlayer1.lost.mockReturnValue(false);
			mockPlayer2.lost.mockReturnValue(false);
			expect(handleGameOver(mockPlayers)).toBe(false);
			expect(DisplayController.announceWinner).toHaveBeenCalledTimes(0);
		});
		test("player1 has won", () => {
			mockPlayer1.lost.mockReturnValue(false);
			mockPlayer2.lost.mockReturnValue(true);
			expect(handleGameOver(mockPlayers)).toBe(mockPlayer1);
			expect(DisplayController.announceWinner).toHaveBeenCalled();
		});
		test("player2 has won", () => {
			mockPlayer1.lost.mockReturnValue(true);
			mockPlayer2.lost.mockReturnValue(false);
			expect(handleGameOver(mockPlayers)).toBe(mockPlayer2);
			expect(DisplayController.announceWinner).toHaveBeenCalled();
		});
	});
});
