import {addRoom, addUserToRoom, getRoom, hasUserInRoom} from "../../models/room";
import {activeClient, getClient} from "../../models/activeClient";
import {WebSocket} from "ws";
import {gameCreationMessage, updateRoomMessage} from "../../models/message";
import {getUser} from "../../models/user";

export const handleRoomCreation = (userId: number) => {
    addRoom(userId);

    updateRoomList();
}

export const handleRoomJoin = (ws: WebSocket, indexRoom: number) => {
    const userId = getClient(ws);
    const user = getUser(userId);
    const room = getRoom(indexRoom)

    if (hasUserInRoom(room, userId)) {
        return;
    }

    addUserToRoom(user, room);

    updateRoomList();

    handleGameCreation(indexRoom);
}

export const updateRoomList = () => {
    activeClient.forEach((ws: WebSocket) => {
        ws.send(updateRoomMessage());
    })
}

export const handleGameCreation = (indexRoom: number) => {
    const room = getRoom(indexRoom);
    const users = room.roomUsers;

    users.forEach(player => {
        const userId = player.index;

        const ws = activeClient.get(userId);
        if (ws) {
            ws.send(gameCreationMessage(indexRoom, userId));
        }
    })
}