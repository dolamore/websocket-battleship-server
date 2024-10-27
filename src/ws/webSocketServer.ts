import * as http from 'http';
import {WebSocketServer, WebSocket} from 'ws';
import {handleMessage} from "../routes/userRoutes";

export function setupWebSocketServer() {
    const wsHttpServer = http.createServer();
    const wss = new WebSocketServer({server: wsHttpServer});

    wsHttpServer.listen(3000, () => {
        console.log('WebSocket server is running on port 3000');
    });

    wss.on('connection', (ws: WebSocket) => {
        console.log('New player connected');

        ws.on('message', (data) => {
            console.log(`Received message: ${data}`);

            handleMessage(ws, data)


            // if (clientMessage.type === 'move') {
            //     console.log(`Player move: ${clientMessage.data}`);
            //
            //     wss.clients.forEach((client) => {
            //         if (client.readyState === WebSocket.OPEN) {
            //             client.send(JSON.stringify({type: 'move', data: clientMessage.data}));
            //         }
            //     });
            //     }
            // });

            ws.on('close', () => {
                console.log('Player disconnected');
            });
        });
    });
}
