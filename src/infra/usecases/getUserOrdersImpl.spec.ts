import "reflect-metadata";
import OrderRepository from "../../application/repositories/orderRepository";
import { OrderStubFactory } from "../../tests/factories/orderStubFactory";
import OrderMapper from "../../application/mappers/orderMapper";
import UserRepository from "../../application/repositories/userRepository";
import GetUserOrdersImpl from "./getUserOrdersImpl";
import { UserStubFactory } from "../../tests/factories/userStubFactory";

const orderRepositoryStub: jest.Mocked<OrderRepository> = {
    saveOrder: jest.fn(),
    findOneOrderById: jest.fn(),
    findOrdersByUserId: jest.fn(),
    findOneOrderByPaymentId: jest.fn(),
    updateOrderStatus: jest.fn()
}

const userRepositoryStub: jest.Mocked<UserRepository> = {
    saveUser: jest.fn(),
    findOneUserById: jest.fn(),
    findOneUserByEmail: jest.fn(),
    findOneUserByIdAndUpdate: jest.fn(),
    emailAlreadyInUse: jest.fn()
}

function sutFactory(): GetUserOrdersImpl {
    return new GetUserOrdersImpl(
        orderRepositoryStub,
        userRepositoryStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('Get all user orders use case unit testing', () => {
    it('should throw and error if an nonexisting user id is provided', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(null)
        orderRepositoryStub.findOrdersByUserId.mockResolvedValueOnce([])
        const findOrdersByUserIdMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "findOrdersByUserId")
        const executeMethodFromOrderMapper = jest.spyOn(OrderMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid user id
            "nonexisting_user_id"
        )).rejects.toThrow()
        expect(findOrdersByUserIdMethodFromOrderRepositoryStub).not.toHaveBeenCalled()
        expect(executeMethodFromOrderMapper).not.toHaveBeenCalled()
    });

    it('should get all the orders of a user and return a mapped array of DTOs if an existing user id is provided', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        orderRepositoryStub.findOrdersByUserId.mockResolvedValueOnce([OrderStubFactory.create()])
        const findOrdersByUserIdMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "findOrdersByUserId")
        const executeMethodFromOrderMapper = jest.spyOn(OrderMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid user id
            "existing_user_id"
        )).resolves.not.toThrow()
        expect(findOrdersByUserIdMethodFromOrderRepositoryStub).toHaveBeenCalledTimes(1)
        expect(executeMethodFromOrderMapper).toHaveBeenCalledTimes(1)
    });
});
