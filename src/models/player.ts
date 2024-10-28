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