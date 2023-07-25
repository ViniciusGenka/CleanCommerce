import SendMessageInOrderItemChat from '../../application/usecases/sendMessageInOrderItemChat';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import UserRepository from '../../application/repositories/userRepository';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import OrderRepository from '../../application/repositories/orderRepository';
import UnauthorizedError from '../../application/errors/unauthorizedError';
import WebSocketEventService from '../../application/services/webSocketEventService';

@injectable()
export default class SendMessageInOrderItemChatImpl implements SendMessageInOrderItemChat {
    private orderRepository: OrderRepository;
    private userRepository: UserRepository;
    private webSocketEventService: WebSocketEventService;
    constructor(
        @inject(TYPES.OrderRepository) orderRepository: OrderRepository,
        @inject(TYPES.UserRepository) userRepository: UserRepository,
        @inject(TYPES.WebSocketEventService) webSocketEventService: WebSocketEventService
    ) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.webSocketEventService = webSocketEventService;
    }

    async execute(
        orderItemChatId: string,
        message: string,
        userId: string
    ): Promise<void> {
        const chat = await this.orderRepository.findOneOrderItemChatById(orderItemChatId);
        if (!chat) throw new EntityNotFoundError("Chat not found")
        const user = await this.userRepository.findOneUserById(userId)
        if (!user) throw new EntityNotFoundError("User not found")
        if (userId !== chat.buyerId && userId !== chat.sellerId) throw new UnauthorizedError("Only the buyer or seller is allowed to send a message in this chat");
        const orderItemChatMessage = await this.orderRepository.saveOrderItemChatMessage(orderItemChatId, message, userId);
        this.webSocketEventService.emitEvent('receive-message', orderItemChatMessage);
    }
}
