import { OrderItemDTO } from "../../domain/dtos/order/orderItemDTO";

export default interface GetSellerOrderItems {
    execute(
        sellerId: string
    ): Promise<OrderItemDTO[]>;
}
