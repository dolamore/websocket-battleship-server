import {WebSocket} from "ws";
import {addUser, checkUser} from "../../models/user";
import {activeClient, addClient} from "../../models/activeClient";
import {errorRegMessage, successfulRegMessage, updateWinnersMessage} from "../../models/message";
import {updateRoomList} from "./roomUtils";

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

const updateWinnersList = () => {
    activeClient.forEach((ws: WebSocket) => {
        ws.send(updateWinnersMessage());
    })
}

export const handleDisconnect = (ws: WebSocket) => {
    activeClient.forEach((value, key) => {
        if (value === ws) {
            activeClient.delete(key);
        }
    });
}