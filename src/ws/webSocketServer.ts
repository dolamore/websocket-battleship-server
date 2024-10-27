import * as http from 'http';
import {WebSocketServer, WebSocket} from 'ws';
import {handleMessage} from "../routes/userRoutes";
import {handleDisconnect} from "../routes/utils";

export function setupWebSocketServer() {
    const wsHttpServer = http.createServer();
    const wss = new WebSocketServer({server: wsHttpServer});

    wsHttpServer.listen(3000, () => {
        console.log('WebSocket server is running on port 3000');
    });

    wss.on('connection', (ws: WebSocket) => {

        ws.on('message', (data) => {
            handleMessage(ws, data)
        });

        ws.on('close', () => {
            handleDisconnect(ws);
            console.log('Player disconnected');
        });
    });
}
