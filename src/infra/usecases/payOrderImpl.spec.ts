import "reflect-metadata";
import OrderRepository from "../../application/repositories/orderRepository";
import { OrderStubFactory } from "../../tests/factories/orderStubFactory";
import PaymentService from "../../domain/services/paymentService";
import PayOrderImpl from "./payOrderImpl";

const orderRepositoryStub: jest.Mocked<OrderRepository> = {
    saveOrder: jest.fn(),
    findOneOrderById: jest.fn(),
    findOrdersByUserId: jest.fn(),
    findOneOrderByPaymentId: jest.fn(),
    updateOrderStatus: jest.fn()
}

const paymentServiceStub: jest.Mocked<PaymentService> = {
    authorizeCreditCardPayment: jest.fn(),
    captureCreditCardPayment: jest.fn(),
    createPixPayment: jest.fn(),
    processPaymentNotification: jest.fn()
}

function sutFactory(): PayOrderImpl {
    return new PayOrderImpl(
        orderRepositoryStub,
        paymentServiceStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('Get all user orders use case unit testing', () => {
    it('should throw and error if an nonexisting order id is provided', async () => {
        orderRepositoryStub.findOneOrderById.mockResolvedValueOnce(null)
        paymentServiceStub.authorizeCreditCardPayment.mockImplementationOnce(async () => {
            return { response: { id: 12345 } }
        })
        const findOneOrderByIdMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "findOneOrderById")
        const saveOrderMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "saveOrder")
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid user id
            "nonexisting_order_id",
            //valid payment data
            {
                method: 'credit_card',
                payment_method_id: 'any_payment_method_id',
                issuer_id: 'any_issuer_id',
                token: 'any_token',
                installments: 'any_installments',
                identificationNumber: 'any_identificationNumber',
                identificationType: 'any_identificationType',
                payer: {
                    email: 'any_email',
                    identification: {
                        type: 'any_type',
                        number: 'any_number'
                    }
                }
            }
        )).rejects.toThrow()
        expect(findOneOrderByIdMethodFromOrderRepositoryStub).toHaveBeenCalledTimes(1)
        expect(saveOrderMethodFromOrderRepositoryStub).not.toHaveBeenCalled()
    });

    it('should get all the orders of a user and return a mapped array of DTOs if an existing user id is provided', async () => {
        orderRepositoryStub.findOneOrderById.mockResolvedValueOnce(OrderStubFactory.create())
        paymentServiceStub.authorizeCreditCardPayment.mockImplementationOnce(async () => {
            return { response: { id: 12345 } }
        })
        const findOneOrderByIdMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "findOneOrderById")
        const saveOrderMethodFromOrderRepositoryStub = jest.spyOn(orderRepositoryStub, "saveOrder")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid user id
            "existing_order_id",
            //valid payment data
            {
                method: 'credit_card',
                payment_method_id: 'any_payment_method_id',
                issuer_id: 'any_issuer_id',
                token: 'any_token',
                installments: 'any_installments',
                identificationNumber: 'any_identificationNumber',
                identificationType: 'any_identificationType',
                payer: {
                    email: 'any_email',
                    identification: {
                        type: 'any_type',
                        number: 'any_number'
                    }
                }
            }
        )).resolves.not.toThrow()
        expect(findOneOrderByIdMethodFromOrderRepositoryStub).toHaveBeenCalledTimes(1)
        expect(saveOrderMethodFromOrderRepositoryStub).toHaveBeenCalledTimes(1)
    });
});
