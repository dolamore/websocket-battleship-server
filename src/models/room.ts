import {Player} from "./player";
import {getUser, User} from "./user";
import {Position, Ship} from "../types/types";

export interface Room {
    roomId: number,
    roomUsers: Player[],
    playersShips: Map<number, Ship[]>,
    playersReady: Map<number, boolean>,
    isTurn: boolean,
}

export const rooms: Room[] = [];
let roomIndexCounter = 0;

export const addRoom = (userId: number): Room => {
    const newRoom: Room = {
        roomId: roomIndexCounter++,
        roomUsers: [new Player(getUser(userId)?.username, userId)],
        playersShips: new Map(),
        playersReady: new Map(),
        isTurn: true,
    };
    rooms.push(newRoom);
    return newRoom;
}

export const addUserToRoom = (user: User, room: Room): Room => {
    room.roomUsers.push(new Player(user.username, user.userId));
    return room;
}

export const getRoom = (roomId: number): Room => {
    return <Room>rooms.find(room => room.roomId == roomId);
}


export const getRoomByUser = (userId: number): Room | undefined => {

    return rooms.find(room => room.roomUsers.some(player => player.index == userId));
}
export const hasUserInRoom = (room: Room, userId: number): boolean => {
    return room.roomUsers.some(player => player.index == userId);
}

export const setPlayerShips = (roomId: number, userId: number, ships: Ship[]): void => {
    const room = getRoom(roomId);
    ships.map(ship => {
        ship.hits = [];
    })

    room.playersShips.set(userId, ships);
}

export const changeTurnByRoomIndex = (roomIndex: number): void => {
    const room = getRoom(roomIndex);

    room.isTurn = !room.isTurn;
}

export const getCurrentPlayerId = (roomIndex: number): number => {
    const room = getRoom(roomIndex);

    return room.isTurn ? room.roomUsers[0].index : room.roomUsers[1].index;
}

export const getShipPositions = (ship: Ship): Position[] => {
    const positions: Position[] = [];

    for (let i = 0; i < ship.length; i++) {
        const pos = ship.direction
            ? {x: ship.position.x, y: ship.position.y + i} // вертикальный корабль
            : {x: ship.position.x + i, y: ship.position.y}; // горизонтальный корабль
        positions.push(pos);
    }

    return positions;
};

const handleAttack = (ship: Ship, target: Position): boolean => {
    const positions = getShipPositions(ship);

    const isHit = positions.some(pos => pos.x === target.x && pos.y === target.y);

    if (isHit) {
        ship.hits.push(target);
        return true;
    }

    return false;
};

export const isShipDestroyed = (ship: Ship): boolean => {
    const positions = getShipPositions(ship);
    return positions.every(pos =>
        ship.hits.some(hit => hit.x === pos.x && hit.y === pos.y)
    );
};

export const isGameOver = (ships: Ship[]): boolean => {
    return ships.every(ship => isShipDestroyed(ship));
};
