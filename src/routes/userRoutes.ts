import {RawData, WebSocket} from "ws";
import {RegData, RoomData, WsMessage} from "../types/types";
import {getClient} from "../models/activeClient";
import {handleReg, handleRoomCreation, handleRoomJoin} from "./utils";

export const handleMessage = (ws: WebSocket, data: RawData) => {
    const message = JSON.parse(data.toString()) as WsMessage;

    if (message.type === 'reg') {
        const regData = JSON.parse(message.data.toString()) as RegData;
        handleReg(ws, regData.name, regData.password);
    }

    if (message.type === "create_room") {
        const user = getClient(ws);
        handleRoomCreation(ws, user);
    }

    if (message.type === "add_user_to_room") {
        const roomData = JSON.parse(message.data.toString()) as RoomData;
        handleRoomJoin(ws, roomData.indexRoom);
    }
}