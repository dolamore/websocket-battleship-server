import {WebSocket} from "ws";
import {addUser, checkUser, getUser} from "../models/user";
import {activeClient, addClient, getClient} from "../models/activeClient";
import {
    errorRegMessage,
    gameCreationMessage,
    updateRoomMessage,
    successfulRegMessage, updateWinnersMessage,
} from "../models/message";
import {addRoom, addUserToRoom, getRoom} from "../models/room";

export const handleReg = (ws: WebSocket, name: string, password: string) => {

    if (checkUser(name)) {
        const newUser = addUser(name, password);

        addClient(newUser.userId, ws);

        ws.send(successfulRegMessage(name));

        updateRoomList();
        updateWinnersList();

        return newUser;
    } else {
        ws.send(errorRegMessage());
    }
}

export const handleRoomCreation = (ws: WebSocket, userId: number) => {
    addRoom(userId);

    updateRoomList();
}

export const handleDisconnect = (ws: WebSocket) => {
    activeClient.forEach((value, key) => {
        if (value === ws) {
            activeClient.delete(key);
        }
    });
}

export const handleRoomJoin = (ws: WebSocket, indexRoom: number) => {
    const userId = getClient(ws);

    addUserToRoom(getUser(userId), getRoom(indexRoom));

    updateRoomList();
}


//TODO: Implement this function
export const handleGameCreation = (ws: WebSocket, userId: number) => {
    const room = addRoom(userId);

    ws.send(gameCreationMessage(room.roomId));
}

const updateRoomList = () => {
    activeClient.forEach((ws: WebSocket) => {
        ws.send(updateRoomMessage());
    })
}

const updateWinnersList = () => {
    activeClient.forEach((ws: WebSocket) => {
        ws.send(updateWinnersMessage());
    })
}