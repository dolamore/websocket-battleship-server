import {AddShipData, Ship} from "../../types/types";
import {getCurrentPlayerId, getRoom, getRoomByUser, setPlayerShips} from "../../models/room";
import {activeClient} from "../../models/activeClient";
import {startGameMessage} from "../../models/messages/message";
import {turnMessage} from "../../models/messages/gameMessage";

export const handleAddShips = (addShipData: AddShipData) => {
    const shipData = JSON.parse(JSON.stringify(addShipData.ships)) as Ship[];
    const gameId = Number(addShipData.gameId);
    const indexPlayer = Number(addShipData.indexPlayer);
    const room = getRoomByUser(indexPlayer);

    shipData.forEach(ship => {
        ship.position = JSON.parse(JSON.stringify(ship.position));
    });

    setPlayerShips(gameId, indexPlayer, shipData);

    if (room && room.playersShips?.size === 2) {
        handleStartGame(gameId);
    }
}


export const handleStartGame = (indexRoom: number) => {
    const room = getRoom(indexRoom);
    const users = room.roomUsers;

    const currentPlayerId = getCurrentPlayerId(indexRoom);
    console.log(turnMessage({currentPlayer: currentPlayerId}));
    console.log(activeClient.keys());

    users.forEach(player => {
        const userId = player.index;
        const shipData = room.playersShips.get(userId);
        const ws = activeClient.get(userId);
        if (ws) {
            ws.send(startGameMessage(userId, shipData));
            ws.send(turnMessage({currentPlayer: `${currentPlayerId}`}));
        }
    })
}