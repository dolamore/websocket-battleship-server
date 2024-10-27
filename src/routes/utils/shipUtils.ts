import {AddShipData} from "../../types/types";
import {getRoom, getRoomByUser, setPlayerShips} from "../../models/room";
import {activeClient} from "../../models/activeClient";
import {startGameMessage} from "../../models/message";

export const handleAddShips = (addShipData: AddShipData) => {
    const shipData = JSON.parse(JSON.stringify(addShipData.ships));
    const gameId = Number(addShipData.gameId);
    const indexPlayer = Number(addShipData.indexPlayer);
    const room = getRoomByUser(indexPlayer);

    setPlayerShips(gameId, indexPlayer, shipData);

    if (room && room.playersShips?.size === 2) {
        handleStartGame(gameId);
    }
}


export const handleStartGame = (indexRoom: number) => {
    const room = getRoom(indexRoom);
    const users = room.roomUsers;

    users.forEach(player => {
        const userId = player.index;
        const shipData = room.playersShips?.get(userId);

        const ws = activeClient.get(userId);
        if (ws) {
            ws.send(startGameMessage(shipData));
        }
    })
}