import { RawData, Server, WebSocket } from "ws";
import openaiService from "../services/ai/openai-service";
import url from "url";


const WebSocketServer: Server = new Server({ noServer: true, path: "/openai/"});

WebSocketServer.on('connection', (socket: WebSocket, request: Request) => {
    socket.on('message', async (message: RawData) => {
        const msg = message.toString();
        const model = url.parse(request.url, true).query.model as string;

        try {
            const res = await openaiService.startStream(msg, model);
            socket.send(res);
        } catch (err) {
            socket.send(`Error: ${err}`);
        }
    })
})

export default WebSocketServer;