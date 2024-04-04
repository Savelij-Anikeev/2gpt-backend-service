import {RawData, Server, WebSocket} from "ws";
import openaiService from "./services/openai-service";

const WebSocketServer: Server = new Server({ noServer: true});

WebSocketServer.on('connection', (socket: WebSocket) => {
    socket.on('message', async (message: RawData) => {
        const msg = message.toString();
        const res = await openaiService.startStream(msg);
        socket.send(res);
    })
})

export default WebSocketServer;