import http from 'http'
import { Server } from 'socket.io'
import { OrderItemChatMessageEventListener } from './listeners/orderItemChatMessageEventListener';
import { container } from '../../configs/inversify.config';
import { TYPES } from '../../configs/inversify.types';
import SendMessageInOrderItemChat from '../../../application/usecases/sendMessageInOrderItemChat';

class WebSocketServer {
    private httpServer: http.Server;
    public io: Server
    constructor(httpServer: http.Server) {
        this.httpServer = httpServer;
    }

    public start(): void {
        this.io = new Server(this.httpServer);
        this.io.on('connection', (socket) => {
            console.log(`${socket.id} connected.`);
            const orderItemChatMessageEventListener = new OrderItemChatMessageEventListener(this.io, container.get<SendMessageInOrderItemChat>(TYPES.SendMessageInOrderItemChat))
            orderItemChatMessageEventListener.execute(socket);
        });
    }
}

export default WebSocketServer;