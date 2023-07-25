import "reflect-metadata";
import ProductReviewMapper from "../../application/mappers/productReviewMapper"
import ProductRepository from "../../application/repositories/productRepository"
import UserRepository from "../../application/repositories/userRepository"
import ProductReviewValidator from "../../application/validators/productReviewValidator"
import { ProductStubFactory } from "../../tests/factories/productStubFactory"
import { UserStubFactory } from "../../tests/factories/userStubFactory"
import AddProductReviewImpl from "./addProductReviewImpl"
import { ProductReviewStubFactory } from "../../tests/factories/productReviewStubFactory";

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


const productReviewValidatorStub: jest.Mocked<ProductReviewValidator> = {
	validate: jest.fn(),
}

function sutFactory(): AddProductReviewImpl {
	return new AddProductReviewImpl(
		productRepositoryStub,
		productReviewValidatorStub,
		userRepositoryStub
	)
}

afterEach(() => {
	jest.resetAllMocks()
})

describe('Add product review use case unit testing', () => {
	it('should throw and error if an invalid review data is provided, preventing the review from being saved', async () => {
		productReviewValidatorStub.validate.mockImplementationOnce(() => { throw new Error() })
		productRepositoryStub.findOneProductById.mockReturnValueOnce(Promise.resolve(ProductStubFactory.create()))
		userRepositoryStub.findOneUserById.mockReturnValueOnce(Promise.resolve(UserStubFactory.create()))
		const saveProductReviewMethodFromProductRepository = jest.spyOn(productRepositoryStub, "saveProductReview")
		const sut = sutFactory()
		await expect(sut.execute(
			//valid product id
			"existing_product_id",
			{
				//invalid review data
				rating: -1,
				text: "invalid_text"
			},
			//valid product id
			"existing_user_id"
		)).rejects.toThrow()
		expect(saveProductReviewMethodFromProductRepository).not.toHaveBeenCalled();
	});

	it('should throw and error if an nonexisting user id is provided', async () => {
		productRepositoryStub.findOneProductById.mockReturnValueOnce(Promise.resolve(ProductStubFactory.create()))
		userRepositoryStub.findOneUserById.mockReturnValueOnce(Promise.resolve(null))
		const saveProductReviewMethodFromProductRepository = jest.spyOn(productRepositoryStub, "saveProductReview")
		const sut = sutFactory()
		await expect(sut.execute(
			//valid product id
			"existing_product_id",
			{
				//valid review data
				rating: 1,
				text: "valid_review"
			},
			//invalid product id
			"nonexisting_user_id"
		)).rejects.toThrow()
		expect(saveProductReviewMethodFromProductRepository).not.toHaveBeenCalled();
	});

	it('should throw and error if an nonexisting product id is provided', async () => {
		productRepositoryStub.findOneProductById.mockReturnValueOnce(Promise.resolve(null))
		userRepositoryStub.findOneUserById.mockReturnValueOnce(Promise.resolve(UserStubFactory.create()))
		const saveProductReviewMethodFromProductRepository = jest.spyOn(productRepositoryStub, "saveProductReview")
		const sut = sutFactory()
		await expect(sut.execute(
			//invalid product id
			"nonexisting_product_id",
			{
				//valid review data
				rating: 1,
				text: "valid_review"
			},
			//valid user id
			"existing_user_id"
		)).rejects.toThrow()
		expect(saveProductReviewMethodFromProductRepository).not.toHaveBeenCalled();
	});

	it('should call saveProductReview() method from ProductRepository and execute() method from ProductReviewMapper if review data is valid', async () => {
		jest.clearAllMocks();
		productRepositoryStub.findOneProductById.mockResolvedValueOnce(ProductStubFactory.create())
		userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
		productRepositoryStub.saveProductReview.mockResolvedValueOnce(ProductReviewStubFactory.create())
		const saveProductReviewMethodFromProductRepository = jest.spyOn(productRepositoryStub, "saveProductReview")
		const executeMethodFromProductReviewMapper = jest.spyOn(ProductReviewMapper, "execute")
		const sut = sutFactory()
		await expect(sut.execute(
			//valid product id
			"existing_product_id",
			{
				//valid review data
				rating: 1,
				text: "valid_review"
			},
			//valid user id
			"existing_user_id"
		)).resolves.not.toThrow()
		expect(saveProductReviewMethodFromProductRepository).toHaveBeenCalledTimes(1)
		expect(executeMethodFromProductReviewMapper).toHaveBeenCalledTimes(1)
	})

});