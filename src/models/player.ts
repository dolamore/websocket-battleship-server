export interface Player {
    name: string | undefined;
    index: number;
}

export class Player implements Player {
    constructor(username: string | undefined, userId: number) {
        this.name = username;
        this.index = userId;
    }
}

export const players: Player[] = [];

export const addPlayer = (name: string): Player => {
    const newPlayer: Player = {
        name,
        index: players.length,
    };
    players.push(newPlayer);
    return newPlayer;
}