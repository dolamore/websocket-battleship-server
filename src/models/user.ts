export interface User {
    username: string;
    password: string;
}

export const users: User[] = [];

export const addUser = (username: string, password: string): User => {
    const newUser: User = {
        username,
        password,
    };
    users.push(newUser);
    return newUser;
};

export const checkUser = (username: string): boolean => {
    return !users.some(user => user.username === username);
}
