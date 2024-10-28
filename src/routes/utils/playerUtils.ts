import {WebSocket} from "ws";
import {addUser, checkPassword, checkUser, User, users} from "../../models/user";
import {activeClient, addClient} from "../../models/activeClient";
import {errorRegMessage, successfulRegMessage, updateWinnersMessage} from "../../models/message";
import {updateRoomList} from "./roomUtils";

export const handleReg = (ws: WebSocket, name: string, password: string) => {

    if (checkUser(name)) {
        const newUser = addUser(name, password);

        return enterMainPage(ws, newUser);
    } else {
        if (checkPassword(name, password)) {
            const existingUser = users.find(user => user.username === name);

            // @ts-ignore
            return enterMainPage(ws, existingUser);
            ;
        } else {
            ws.send(errorRegMessage());
        }
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

export const enterMainPage = (ws: WebSocket, user: User): User => {
    addClient(user.userId, ws);

    ws.send(successfulRegMessage(user.username));

    updateRoomList();
    updateWinnersList();

    return user;
}