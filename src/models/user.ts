export interface User {
    username: string;
    password: string;
    userId: number;
    wins: number;
}

export const users: User[] = [];
let userIndexCounter = 0;

export const addUser = (username: string, password: string): User => {
    const newUser: User = {
        username,
        password,
        userId: userIndexCounter++,
        wins: 0,
    };
    users.push(newUser);
    return newUser;
};

export const checkUser = (username: string): boolean => {
    return !users.some(user => user.username === username);
}

export const getUser = (userId: number): User => {
    return <User>users.find(user => user.userId === userId);
}
