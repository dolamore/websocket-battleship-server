export interface WsMessage {
    type: string;
    data: RegData;
    id: number;
}

export interface RegData {
    name: string;
    password: string;
}

export interface RoomData {
    indexRoom: number;
}