import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import { Express } from "express"
import { Request } from "express-serve-static-core";
import {Server, WebSocket } from "ws";
import mongoose from "mongoose";
import createApp from "./createApp";

import openaiWS from "./websockets/openaiWS";


const app: Express = createApp();
const PORT: number = 5000;


// database
mongoose.connect('mongodb://db_container:27017')
    .then(() => console.log('connected to database'))
    .catch(e => console.log(e))

// listening
const server = app.listen(PORT, (): void => {
    console.log(`just started at ${PORT}`);
})

// sockets
server.on('upgrade', (request, socket, head) => {
    openaiWS.handleUpgrade(request, socket, head, (socket) => {
        openaiWS.emit('connection', socket, request);
    })
})