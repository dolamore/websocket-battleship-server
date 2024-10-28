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
    ships: Ship[],
    gameId: number,
    indexPlayer: number,

}

export interface ShipData {
    ships: Ship[],
    currentPlayerIndex: number,
}

export interface Ship {
    position: Position,
    direction: boolean,
    length: number,
    type: string,
    hits: Position[];
}

export interface Position {
    x: number,
    y: number,
}