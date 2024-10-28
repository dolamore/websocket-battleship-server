import {Position} from "./types";

export interface AttackData {
    gameId: number | string,
    x: number,
    y: number,
    indexPlayer: number | string,
}

export interface AttackFeedbackData {
    position: Position,
    currentPlayer: number | string,
    status: "miss" | "shot" | "killed",
}

export interface randomAttackData {
    gameId: number,
    indexPlayer: number | string,
}

export interface TurnData {
    currentPlayer: number | string,
}