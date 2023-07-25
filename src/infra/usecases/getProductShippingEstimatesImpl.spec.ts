import "reflect-metadata";
import ProductRepository from "../../application/repositories/productRepository"
import { ProductStubFactory } from "../../tests/factories/productStubFactory"
import GetProductShippingEstimatesImpl from "./getProductShippingEstimatesImpl";
import CalculateRouteShippingCostService from "../../domain/services/calculateRouteShippingCostService";
import CalculateRouteShippingTimeService from "../../domain/services/calculateRouteShippingTimeService";
import PostalCodeValidator from "../../application/validators/postalCodeValidator";

const productRepositoryStub: jest.Mocked<ProductRepository> = {
    saveProduct: jest.fn(),
    saveProductReview: jest.fn(),
    findOneProductById: jest.fn(),
    findOneProductByIdAndUpdate: jest.fn(),
    findProductReviewsByProductId: jest.fn(),
    findProductsByVariationGroupId: jest.fn()
}

const calculateRouteShippingCostServiceStub: jest.Mocked<CalculateRouteShippingCostService> = {
    execute: jest.fn()
}

const calculateRouteShippingTimeServiceStub: jest.Mocked<CalculateRouteShippingTimeService> = {
    execute: jest.fn()
}

const postalCodeValidatorStub: jest.Mocked<PostalCodeValidator> = {
    validate: jest.fn()
}

function sutFactory(): GetProductShippingEstimatesImpl {
    return new GetProductShippingEstimatesImpl(
        calculateRouteShippingCostServiceStub,
        calculateRouteShippingTimeServiceStub,
        postalCodeValidatorStub,
        productRepositoryStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('Add product review use case unit testing', () => {
    it('should throw an error if an invalid destination postal code is provided, preventing the shipping estimates from being calculated', async () => {
        postalCodeValidatorStub.validate.mockImplementationOnce(() => { throw new Error() })
        productRepositoryStub.findOneProductById.mockResolvedValueOnce(ProductStubFactory.create())
        const executeMethodFromCalculateRouteShippingCostService = jest.spyOn(calculateRouteShippingCostServiceStub, "execute")
        const executeMethodFromCalculateRouteShippingTimeService = jest.spyOn(calculateRouteShippingTimeServiceStub, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid postal code
            "00000000",
            //valid product id
            "existing_product_id",
        )).rejects.toThrow()
        expect(executeMethodFromCalculateRouteShippingCostService).not.toHaveBeenCalled()
        expect(executeMethodFromCalculateRouteShippingTimeService).not.toHaveBeenCalled()
    })

    it('should throw an error if a non-existing product id is provided, preventing the shipping estimates from being calculated', async () => {
        productRepositoryStub.findOneProductById.mockResolvedValueOnce(null)
        const executeMethodFromCalculateRouteShippingCostService = jest.spyOn(calculateRouteShippingCostServiceStub, "execute")
        const executeMethodFromCalculateRouteShippingTimeService = jest.spyOn(calculateRouteShippingTimeServiceStub, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid postal code
            "12345-678",
            //invalid product id
            "nonexisting_product_id",
        )).rejects.toThrow()
        expect(executeMethodFromCalculateRouteShippingCostService).not.toHaveBeenCalled()
        expect(executeMethodFromCalculateRouteShippingTimeService).not.toHaveBeenCalled()
    })

    it('should get the product details and return a mapped DTO if an existing product id is provided', async () => {
        productRepositoryStub.findOneProductById.mockResolvedValueOnce(ProductStubFactory.create())
        const executeMethodFromCalculateRouteShippingCostService = jest.spyOn(calculateRouteShippingCostServiceStub, "execute")
        const executeMethodFromCalculateRouteShippingTimeService = jest.spyOn(calculateRouteShippingTimeServiceStub, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid postal code
            "12345-678",
            //valid product id
            "existing_product_id",
        )).resolves.not.toThrow()
        expect(executeMethodFromCalculateRouteShippingCostService).toHaveBeenCalledTimes(1)
        expect(executeMethodFromCalculateRouteShippingTimeService).toHaveBeenCalledTimes(1)
    })
});