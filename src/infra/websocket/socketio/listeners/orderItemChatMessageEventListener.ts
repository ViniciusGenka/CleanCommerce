import { Server, Socket } from "socket.io";
import SendMessageInOrderItemChat from "../../../../application/usecases/sendMessageInOrderItemChat";

export class OrderItemChatMessageEventListener {
    private io: Server;
    private sendMessageInOrderItemChatUseCase: SendMessageInOrderItemChat;
    constructor(io: Server, sendMessageInOrderItemChatUseCase: SendMessageInOrderItemChat) {
        this.io = io;
        this.sendMessageInOrderItemChatUseCase = sendMessageInOrderItemChatUseCase;
    }
    public execute(socket: Socket) {
        socket.on('send-message', async (orderItemId: string, message: string, userId: string) => {
            try {
                await this.sendMessageInOrderItemChatUseCase.execute(orderItemId, message, userId);
            } catch (error: any) {
                const statusCode = error.statusCode || 500;
                const message = error.message || 'Internal Server Error';
                this.io.emit('receive-message', {
                    error: {
                        statusCode: statusCode,
                        message: message,
                    }
                });
            }
        });
    }
}