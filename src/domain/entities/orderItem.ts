import Address from './address';
import OrderItemChat from './orderItemChat';

export default class OrderItem {
	public estimatedShippingTime: number;
	public orderId: string;
	public id: string | null;
	public price: number;
	public quantity: number;
	public stockAddress: Address;
	public title: string;
	public chat: OrderItemChat;

	constructor(
		chat: OrderItemChat,
		estimatedShippingTime: number,
		price: number,
		quantity: number,
		stockAddress: Address,
		title: string,
		id: string = null,
		orderId: string = null,
	) {
		this.chat = chat;
		this.estimatedShippingTime = estimatedShippingTime;
		this.id = id;
		this.orderId = orderId;
		this.price = price;
		this.quantity = quantity;
		this.stockAddress = stockAddress;
		this.title = title;
	}

	calculateItemPrice(): number {
		return this.price * this.quantity;
	}
}
