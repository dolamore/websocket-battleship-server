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

export interface AddShipData {
    ships: Ships[],
    gameId: number,
    indexPlayer: number,

}

export interface ShipData {
    ships: Ships[],
    currentPlayerIndex: number,
}

export interface Ships {
    position: Position[],
    direction: boolean,
    length: number,
    type: Sizes
}

export interface Position {
    x: number,
    y: number,
}

enum Sizes {
    "small", "medium", "large", "huge"
}