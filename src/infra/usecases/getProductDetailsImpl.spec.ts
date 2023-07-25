import "reflect-metadata";
import ProductRepository from "../../application/repositories/productRepository"
import { ProductStubFactory } from "../../tests/factories/productStubFactory"
import { ProductReviewStubFactory } from "../../tests/factories/productReviewStubFactory";
import GetProductDetailsImpl from "./getProductDetailsImpl";
import ProductMapper from "../../application/mappers/productMapper";

const productRepositoryStub: jest.Mocked<ProductRepository> = {
    saveProduct: jest.fn(),
    saveProductReview: jest.fn(),
    findOneProductById: jest.fn(),
    findOneProductByIdAndUpdate: jest.fn(),
    findProductReviewsByProductId: jest.fn(),
    findProductsByVariationGroupId: jest.fn()
}

function sutFactory(): GetProductDetailsImpl {
    return new GetProductDetailsImpl(
        productRepositoryStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('Add product review use case unit testing', () => {
    it('should throw an error if a non-existing product id is provided, preventing the product details from being returned', async () => {
        productRepositoryStub.findOneProductById.mockResolvedValueOnce(null)
        productRepositoryStub.findProductReviewsByProductId.mockResolvedValueOnce([ProductReviewStubFactory.create()])
        productRepositoryStub.findProductsByVariationGroupId.mockResolvedValueOnce([])
        const executeMethodFromProductMapper = jest.spyOn(ProductMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid product id
            "nonexisting_product_id",
        )).rejects.toThrow()
        expect(executeMethodFromProductMapper).not.toHaveBeenCalled()
    })

    it('should get the product details and return a mapped DTO if an existing product id is provided', async () => {
        productRepositoryStub.findOneProductById.mockResolvedValueOnce(ProductStubFactory.create())
        productRepositoryStub.findProductReviewsByProductId.mockResolvedValueOnce([ProductReviewStubFactory.create()])
        productRepositoryStub.findProductsByVariationGroupId.mockResolvedValueOnce([])
        const executeMethodFromProductMapper = jest.spyOn(ProductMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid product id
            "existing_product_id",
        )).resolves.not.toThrow()
        expect(executeMethodFromProductMapper).toHaveBeenCalledTimes(1)
    })
});