import {AttackData, AttackFeedbackData} from "../../types/gameTypes";
import {
    changeTurnByRoomIndex,
    getCurrentPlayerId,
    getRoom,
    getShipPositions,
    isGameOver,
    isShipDestroyed
} from "../../models/room";
import {activeClient} from "../../models/activeClient";
import {attackFeedbackMessage, finishGameMessage, turnMessage} from "../../models/messages/gameMessage";
import {addWinPoint} from "../../models/user";
import {updateWinnersList} from "./playerUtils";

export const handleAttack = (attackData: AttackData) => {
    const gameId = Number(attackData.gameId);
    const x = Number(attackData.x);
    const y = Number(attackData.y);
    const indexPlayer = Number(attackData.indexPlayer);
    let status: "miss" | "shot" | "killed" = "miss";

    const room = getRoom(gameId);
    const opponent = room.roomUsers.find(player => player.index !== indexPlayer);

    // @ts-ignore
    const opponentShips = room.playersShips.get(opponent.index);

    // @ts-ignore
    opponentShips.forEach(ship => {
        const shipPositions = getShipPositions(ship);

        if (shipPositions.some(pos => pos.x === x && pos.y === y)) {
            ship.hits.push({x, y});
            status = "shot";

            if (isShipDestroyed(ship)) {
                status = "killed";
            }
        }
    });

    if (status === "miss") {
        changeTurnByRoomIndex(gameId);
    }

    const currentPlayerId = getCurrentPlayerId(gameId);

    // @ts-ignore
    if (isGameOver(opponentShips)) {
        addWinPoint(currentPlayerId);
        room.roomUsers.forEach(player => {
            const userId = player.index;
            const ws = activeClient.get(userId);

            if (ws) {
                ws.send(finishGameMessage(currentPlayerId));
                updateWinnersList();
            }
        });
    }

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