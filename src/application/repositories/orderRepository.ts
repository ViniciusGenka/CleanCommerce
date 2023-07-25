import Order from '../../domain/entities/order';
import OrderItem from '../../domain/entities/orderItem';
import OrderItemChat from '../../domain/entities/orderItemChat';
import OrderItemChatMessage from '../../domain/entities/orderItemChatMessage';
import { OrderStatus } from '../../domain/enums/orderStatus';

export default interface OrderRepository {
	saveOrder(order: Order): Promise<Order>;
	findOneOrderById(orderId: string): Promise<Order | null>;
	findOrdersByUserId(userId: string): Promise<Order[]>;
	findOneOrderByPaymentId(paymentId: string): Promise<Order | null>;
	updateOrderStatus(orderId: string, orderStatus: OrderStatus): Promise<Order>;
	findOneOrderItemChatByOrderItemId(orderItemId: string): Promise<OrderItemChat>;
	findOneOrderItemById(orderItemId: string): Promise<OrderItem>;
	saveOrderItemChatMessage(orderItemChatId: string, text: string, userId: string): Promise<OrderItemChatMessage>;
	findOneOrderItemChatById(orderItemChatId: string): Promise<OrderItemChat>;
}
