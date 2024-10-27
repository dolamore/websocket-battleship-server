import {Player} from "./player";
import {getUser, User} from "./user";
import {ShipData} from "../types/types";

export interface Room {
    roomId: number,
    roomUsers: Player[],
    playersShips: Map<number, ShipData>,
    playersReady: Map<number, boolean>,
}

export const rooms: Room[] = [];
let roomIndexCounter = 0;

export const addRoom = (userId: number): Room => {
    const newRoom: Room = {
        roomId: roomIndexCounter++,
        roomUsers: [new Player(getUser(userId)?.username, userId)],
        playersShips: new Map(),
        playersReady: new Map(),
    };
    rooms.push(newRoom);
    return newRoom;
}

export const addUserToRoom = (user: User, room: Room): Room => {
    room.roomUsers.push(new Player(user.username, user.userId));
    return room;
}

export const getRoom = (roomId: number): Room => {
    return <Room>rooms.find(room => room.roomId === roomId);
}


export const getRoomByUser = (userId: number): Room | undefined => {

    return rooms.find(room => room.roomUsers.some(player => player.index == userId));
}
export const hasUserInRoom = (room: Room, userId: number): boolean => {
    return room.roomUsers.some(player => player.index == userId);
}

export const setPlayerShips = (roomId: number, userId: number, ships: ShipData): void => {
    const room = getRoom(roomId);

    room.playersShips.set(userId, ships);
}

export const setPlayerReady = (roomId: number, userId: number): void => {
    const room = getRoom(roomId);

    room.playersReady.set(userId, true);
}

export const arePlayersReady = (roomId: number): boolean => {
    const room = getRoom(roomId);

    if (!room.playersReady) {
        return false;
    }

    return room.playersReady.size === 2 && Array.from(room.playersReady.values()).every(value => value);
}