import "reflect-metadata"
import OrderMapper from "../../application/mappers/orderMapper"
import AddressRepository from "../../application/repositories/addressRepository"
import OrderRepository from "../../application/repositories/orderRepository"
import ProductRepository from "../../application/repositories/productRepository"
import UserRepository from "../../application/repositories/userRepository"
import EmailService from "../../application/services/emailService"
import CalculateOrderShippingCostService from "../../domain/services/calculateOrderShippingCostService"
import CalculateRouteShippingTimeService from "../../domain/services/calculateRouteShippingTimeService"
import { AddressStubFactory } from "../../tests/factories/addressStubFactory"
import { ProductStubFactory } from "../../tests/factories/productStubFactory"
import { UserStubFactory } from "../../tests/factories/userStubFactory"
import PlaceOrderImpl from "./placeOrderImpl"
import { OrderStubFactory } from "../../tests/factories/orderStubFactory"

const orderRepositoryStub: jest.Mocked<OrderRepository> = {
    saveOrder: jest.fn(),
    findOneOrderById: jest.fn(),
    findOrdersByUserId: jest.fn(),
    findOneOrderByPaymentId: jest.fn(),
    updateOrderStatus: jest.fn()
}

const productRepositoryStub: jest.Mocked<ProductRepository> = {
    saveProduct: jest.fn(),
    saveProductReview: jest.fn(),
    findOneProductById: jest.fn(),
    findOneProductByIdAndUpdate: jest.fn(),
    findProductReviewsByProductId: jest.fn(),
    findProductsByVariationGroupId: jest.fn()
}

const userRepositoryStub: jest.Mocked<UserRepository> = {
    saveUser: jest.fn(),
    findOneUserById: jest.fn(),
    findOneUserByEmail: jest.fn(),
    findOneUserByIdAndUpdate: jest.fn(),
    emailAlreadyInUse: jest.fn()
}

const addressRepositoryStub: jest.Mocked<AddressRepository> = {
    saveAddress: jest.fn(),
    findOneAddressById: jest.fn(),
    findAddressesByUserId: jest.fn()
}

const calculateOrderShippingCostServiceStub: jest.Mocked<CalculateOrderShippingCostService> = {
    execute: jest.fn()
}

const calculateRouteShippingTimeServiceStub: jest.Mocked<CalculateRouteShippingTimeService> = {
    execute: jest.fn()
}

const emailServiceStub: jest.Mocked<EmailService> = {
    sendEmail: jest.fn(),
}

function sutFactory(): PlaceOrderImpl {
    return new PlaceOrderImpl(
        addressRepositoryStub,
        calculateOrderShippingCostServiceStub,
        calculateRouteShippingTimeServiceStub,
        emailServiceStub,
        orderRepositoryStub,
        productRepositoryStub,
        userRepositoryStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('User sign up use case unit testing', () => {
    it('should throw an error if a non-existing user id is provided, preventing the order from being saved', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(null)
        addressRepositoryStub.findOneAddressById.mockResolvedValueOnce(AddressStubFactory.create())
        const saveOrderMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "saveOrder")
        const executeMethodFromOrderMapper = jest.spyOn(OrderMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid destination address
            "existing_address_id",
            [
                //valid order details
                {
                    productId: "existing_product_id",
                    quantity: 1
                }
            ],
            //invalid user id
            "nonexisting_user_id"
        )).rejects.toThrow()
        expect(saveOrderMethodFromOrderRepositoryStub).not.toHaveBeenCalled()
        expect(executeMethodFromOrderMapper).not.toHaveBeenCalled()
    });

    it('should throw an error if a non-existing destination address id is provided, preventing the order from being saved', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        addressRepositoryStub.findOneAddressById.mockResolvedValueOnce(null)
        const saveOrderMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "saveOrder")
        const executeMethodFromOrderMapper = jest.spyOn(OrderMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            "nonexisting_address_id",
            [
                //valid order details
                {
                    productId: "existing_product_id",
                    quantity: 1
                }
            ],
            "existing_user_id"
        )).rejects.toThrow()
        expect(saveOrderMethodFromOrderRepositoryStub).not.toHaveBeenCalled()
        expect(executeMethodFromOrderMapper).not.toHaveBeenCalled()
    });

    it('should throw an error if a non-existing product id is provided, preventing the order from being saved', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        addressRepositoryStub.findOneAddressById.mockResolvedValueOnce(AddressStubFactory.create())
        productRepositoryStub.findOneProductById.mockResolvedValueOnce(null)
        const saveOrderMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "saveOrder")
        const executeMethodFromOrderMapper = jest.spyOn(OrderMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid destination address
            "existing_address_id",
            [
                //invalid order details
                {
                    productId: "nonexisting_product_id",
                    quantity: 1
                }
            ],
            //valid user id
            "existing_user_id"
        )).rejects.toThrow()
        expect(saveOrderMethodFromOrderRepositoryStub).not.toHaveBeenCalled()
        expect(executeMethodFromOrderMapper).not.toHaveBeenCalled()
    });

    it('should throw an error if a unavailable quantity to buy a product is requested, preventing the order from being saved', async () => {
        const productEntityStub = ProductStubFactory.create()
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        addressRepositoryStub.findOneAddressById.mockResolvedValueOnce(AddressStubFactory.create())
        productRepositoryStub.findOneProductById.mockResolvedValueOnce(productEntityStub)
        productEntityStub.haveEnoughStock.mockReturnValueOnce(false)
        const saveOrderMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "saveOrder")
        const executeMethodFromOrderMapper = jest.spyOn(OrderMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid destination address
            "existing_address_id",
            [
                //invalid order details
                {
                    productId: "existing_product_id",
                    quantity: 999999999999999
                }
            ],
            //valid user id
            "existing_user_id"
        )).rejects.toThrow()
        expect(saveOrderMethodFromOrderRepositoryStub).not.toHaveBeenCalled()
        expect(executeMethodFromOrderMapper).not.toHaveBeenCalled()
    });

    it('should save the order, map the return data to a DTO and send an email to the buyer if all the provided order data is valid', async () => {
        const productEntityStub = ProductStubFactory.create()
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        addressRepositoryStub.findOneAddressById.mockResolvedValueOnce(AddressStubFactory.create())
        productRepositoryStub.findOneProductById.mockResolvedValueOnce(productEntityStub)
        productEntityStub.haveEnoughStock.mockReturnValueOnce(true)
        orderRepositoryStub.saveOrder.mockResolvedValueOnce(OrderStubFactory.create())
        const saveOrderMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "saveOrder")
        const executeMethodFromOrderMapper = jest.spyOn(OrderMapper, "execute")
        const sendEmailFromEmailServiceStub = jest.spyOn(emailServiceStub, "sendEmail")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid destination address
            "existing_address_id",
            [
                //valid order details
                {
                    productId: "existing_product_id",
                    quantity: 1
                }
            ],
            //valid user id
            "existing_user_id"
        )).resolves.not.toThrow()
        expect(saveOrderMethodFromOrderRepositoryStub).toHaveBeenCalledTimes(1)
        expect(sendEmailFromEmailServiceStub).toHaveBeenCalledTimes(1)
        expect(executeMethodFromOrderMapper).toHaveBeenCalledTimes(1)
    });
});