import {rooms} from "./room";
import {users} from "./user";
import {Ship} from "../types/types";

export const successfulRegMessage = (name: string) => {
    return JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
            name: `${name}`,
            index: users.length - 1,
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
            errorText: "User already exists and the password is incorrect"
        }),
        id: 0,
    });
}

export const gameCreationMessage = (idGame: number, userId: number) => {
    return JSON.stringify({
        type: "create_game",
        data: JSON.stringify({
            idGame: `${idGame}`,
            idPlayer: `${userId}`,
        }),
        id: 0,
    });
}

export const updateRoomMessage = () => {
    const filteredRooms = rooms
        .filter(room => room.roomUsers.length === 1);

    const roomJSON = JSON.stringify({
        type: "update_room",
        data: JSON.stringify(
            filteredRooms.map(room => ({
                roomId: room.roomId,
                roomUsers: room.roomUsers.map(player => ({
                    name: player.name,
                    id: player.index,
                })),
            })),
        ),
        id: 0,
    });

    console.log(roomJSON);


    return roomJSON;
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

export const startGameMessage = (userId: number, shipsData: Ship[] | undefined) => {
    return JSON.stringify({
        type: "start_game",
        data: JSON.stringify({
            ships: shipsData?.map(ship => ({
                position: {
                    x: ship.position.x,
                    y: ship.position.y,
                },
                direction: ship.direction,
                length: ship.length,
                type: ship.type,
            })),
            currentPlayerIndex: userId,
        }),
        id: 0,
    });
}
