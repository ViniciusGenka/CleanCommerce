export default interface SendMessageInOrderItemChat {
    execute(
        orderItemChatId: string,
        message: string,
        userId: string
    ): Promise<void>;
}
