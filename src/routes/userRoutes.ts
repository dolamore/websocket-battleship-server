import {RawData, WebSocket} from "ws";
import {AddShipData, RegData, RoomData, WsMessage} from "../types/types";
import {activeClient, getClient} from "../models/activeClient";
import {handleAddShips} from "./utils/shipUtils";
import {handleRoomCreation, handleRoomJoin} from "./utils/roomUtils";
import {handleReg} from "./utils/playerUtils";
import {AttackData} from "../types/gameTypes";
import {handleAttack} from "./utils/gameUtils";

export const handleMessage = (ws: WebSocket, data: RawData) => {
    const message = JSON.parse(data.toString()) as WsMessage;

    if (message.type === 'reg') {
        const regData = JSON.parse(message.data.toString()) as RegData;
        handleReg(ws, regData.name, regData.password);
    }

    if (message.type === "create_room") {
        const user = getClient(ws);
        handleRoomCreation(user);
    }

    if (message.type === "add_user_to_room") {
        const roomData = JSON.parse(message.data.toString()) as RoomData;
        handleRoomJoin(ws, roomData.indexRoom);
    }

    if (message.type === "add_ships") {
        const addShipData = JSON.parse(message.data.toString()) as AddShipData;

        handleAddShips(addShipData);
    }

    if (message.type === "attack") {
        const attackData = JSON.parse(message.data.toString()) as AttackData;

        const indexPlayer = Number(attackData.indexPlayer);

        if (activeClient.get(indexPlayer) === ws) {
            handleAttack(attackData);
        }

    }

}