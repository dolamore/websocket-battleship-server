import {AttackFeedbackData, TurnData} from "../../types/gameTypes";

export const attackFeedbackMessage = (attackFeedbackData: AttackFeedbackData) => {
    return JSON.stringify({
        type: "attack",
        data: JSON.stringify(
            attackFeedbackData),
        id: 0,
    });
}

export const turnMessage = (currentPlayerId: TurnData) => {
    return JSON.stringify({
        type: "turn",
        data: JSON.stringify(currentPlayerId),
        id: 0,
    });
}

export const finishGameMessage = (winner: number | string) => {
    return JSON.stringify({
        type: "finish",
        data: JSON.stringify({winPlayer: `${winner}`}),
        id: 0,
    });
}