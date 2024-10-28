import {AttackData, AttackFeedbackData} from "../../types/gameTypes";
import {changeTurnByRoomIndex, getCurrentPlayerId, getRoom} from "../../models/room";
import {activeClient} from "../../models/activeClient";
import {attackFeedbackMessage, turnMessage} from "../../models/messages/gameMessage";

export const handleAttack = (attackData: AttackData) => {
    const gameId = Number(attackData.gameId);
    const x = Number(attackData.x);
    const y = Number(attackData.y);
    const indexPlayer = Number(attackData.indexPlayer);
    let status = "miss"

    const room = getRoom(gameId);

    const opponent = room.roomUsers.find(player => player.index !== indexPlayer);

    // @ts-ignore
    const opponentShips = room.playersShips.get(opponent.index);

    // @ts-ignore
    opponentShips.forEach(ship => {
        if (ship.position.x === x && ship.position.y === y) {
            status = "hit";
        }
    });

    if (status === "miss") {
        changeTurnByRoomIndex(gameId);
    }

    const currentPlayerId = getCurrentPlayerId(gameId);

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
            ws.send(turnMessage({currentPlayer: `${currentPlayerId}`}));
        }
    });
}