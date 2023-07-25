export default class OrderItemChatMessage {
    public id: string | null;
    public userId: string;
    public chatId: string;
    public text: string;

    constructor(
        chatId: string,
        text: string,
        userId: string,
        id?: string
    ) {
        this.chatId = chatId;
        this.id = id ? id : null;
        this.userId = userId;
        this.text = text;
    }
}
