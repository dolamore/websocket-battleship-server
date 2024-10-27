import {Room, rooms} from "./room";
import {users} from "./user";

export const successfulRegMessage = (name: string) => {
    return JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
            name: `${name}`,
            index: 0,
            error: false,
            errorText: ""
        }),
        id: 0,
    });
}

export const errorRegMessage = () => {
    return JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
            name: "",
            index: 0,
            error: true,
            errorText: "User already exists"
        }),
        id: 0,
    });
}

export const gameCreationMessage = (idGame: number) => {
    return JSON.stringify({
        type: "create_game",
        data: JSON.stringify({
            idGame: 0,
            idPlayer: 0,
        }),
        id: 0,
    });
}

export const updateRoomMessage = () => {
    const filteredRooms = rooms
        .filter(room => room.roomUsers.length === 1)
        .map(room => ({
            roomId: room.roomId,
            roomUsers: room.roomUsers.map(player => ({
                name: player.name,
                id: player.index,
            })),
        }));


    return JSON.stringify({
        type: "update_room",
        data: JSON.stringify(filteredRooms),
        id: 0,
    });
}

export const updateWinnersMessage = () => {
    const winners = users.map(user => ({
        name: user.username,
        wins: user.wins,
    }));

    return JSON.stringify({
        type: "update_winners",
        data: JSON.stringify(winners),
        id: 0,
    });
}