import {WebSocket} from 'ws';

export const activeClient = new Map<number, WebSocket>();

export const addClient = (userId: number, ws: WebSocket) => {
    activeClient.set(userId, ws);
}

export const getClient = (ws: WebSocket) => {
    let userId = 0;
    activeClient.forEach((value, key) => {
        if (value === ws) {
            userId = key;
        }
    });
    return userId;
}