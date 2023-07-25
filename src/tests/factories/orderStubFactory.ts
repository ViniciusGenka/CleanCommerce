import Order from "../../domain/entities/order";

export class OrderStubFactory {
    static create(): jest.Mocked<Order> {
        const orderObject: jest.Mocked<Order> = {
            createdAt: "any_date" as any,
            destinationAddress: "any_date" as any,
            id: "any_date" as any,
            items: "any_date" as any,
            shippingCost: "any_date" as any,
            shippingStatus: "any_date" as any,
            status: "any_date" as any,
            totalPrice: "any_date" as any,
            user: "any_date" as any,
            payment: {
                id: "any_date" as any,
                status: "any_date" as any
            },
            discount: {
                totalValue: 0,
                coupons: []
            },
            calculateTotalPrice: jest.fn(() => "any_return" as any),
            calculateDiscountTotalValue: jest.fn(() => "any_return" as any),
        }
        return orderObject
    }
}