import "reflect-metadata";
import OrderRepository from "../../application/repositories/orderRepository";
import GetOrderDetailsImpl from "./getOrderDetailsImpl";
import { OrderStubFactory } from "../../tests/factories/orderStubFactory";
import OrderMapper from "../../application/mappers/orderMapper";

const orderRepositoryStub: jest.Mocked<OrderRepository> = {
    saveOrder: jest.fn(),
    findOneOrderById: jest.fn(),
    findOrdersByUserId: jest.fn(),
    findOneOrderByPaymentId: jest.fn(),
    updateOrderStatus: jest.fn()
}

function sutFactory(): GetOrderDetailsImpl {
    return new GetOrderDetailsImpl(
        orderRepositoryStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('Get order details use case unit testing', () => {
    it('should throw and error if an nonexisting order id is provided', async () => {
        orderRepositoryStub.findOneOrderById.mockReturnValueOnce(null)
        const sut = sutFactory()
        await expect(sut.execute("nonexisting_order_id")).rejects.toThrowError("Order not found")
    });

    it('should call execute() method from OrderMapper if an existing order id is provided', async () => {
        orderRepositoryStub.findOneOrderById.mockReturnValueOnce(Promise.resolve(OrderStubFactory.create()))
        const executeMethodFromOrderMapper = jest.spyOn(OrderMapper, "execute")
        const sut = sutFactory()
        await sut.execute("existing_order_id")
        expect(executeMethodFromOrderMapper).toHaveBeenCalledTimes(1)
    });
});
