import {Player} from "./player";
import {getUser, User} from "./user";

export interface Room {
    roomId: number,
    roomUsers: Player[],
}

export const rooms: Room[] = [];
let roomIndexCounter = 0;

export const addRoom = (userId: number): Room => {
    const newRoom: Room = {
        roomId: roomIndexCounter++,
        roomUsers: [new Player(getUser(userId)?.username, userId)],
    };
    rooms.push(newRoom);
    return newRoom;
}

export const addUserToRoom = (user: User, room: Room): Room => {
    room.roomUsers.push(new Player(user.username, user.userId));
    return room;
}

export const getRoom = (roomId: number): Room=> {
    return <Room>rooms.find(room => room.roomId === roomId);
}