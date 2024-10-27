import {RawData, WebSocket} from "ws";
import {addUser, checkUser} from "../models/user";
import {errorRegMessage, successfulRegMessage} from "../models/message";

export const handleMessage = (ws: WebSocket, data: RawData) => {
    const message = JSON.parse(data.toString()) as WsMessage;

    if (message.type === 'reg') {
        const regData = JSON.parse(message.data.toString()) as RegData;
        handleReg(ws, regData.name, regData.password);
    }
}

const handleReg = (ws: WebSocket, name: string, password: string) => {

    if (checkUser(name)) {
        addUser(name, password);

        ws.send(successfulRegMessage(name));
    } else {
        ws.send(errorRegMessage());
    }

}