import {AttackData, AttackFeedbackData} from "../../types/gameTypes";
import {getRoom} from "../../models/room";
import {activeClient} from "../../models/activeClient";
import {attackFeedbackMessage, turnMessage} from "../../models/messages/gameMessage";

export const handleAttack = (attackData: AttackData) => {
    const gameId = Number(attackData.gameId);
    const x = Number(attackData.x);
    const y = Number(attackData.y);
    const indexPlayer = Number(attackData.indexPlayer);
    const status = "miss"

    const room = getRoom(gameId);

    room.roomUsers.forEach(player => {
        const userId = player.index;
        const ws = activeClient.get(userId);

        if (ws) {
            const attackFeedback: AttackFeedbackData = {
                position: {
                    x: x,
                    y: y,
                },
                currentPlayer: indexPlayer,
                status: status,
            };
            console.log(attackFeedback);

            ws.send(attackFeedbackMessage(attackFeedback));
            ws.send(turnMessage({currentPlayer: indexPlayer}));
        }
    });
}