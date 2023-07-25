import "reflect-metadata"
import ProductRepository from "../../application/repositories/productRepository"
import UserRepository from "../../application/repositories/userRepository"
import AddressRepository from "../../application/repositories/addressRepository"
import AddProductsImpl from "./addProductsImpl"
import ProductMapper from "../../application/mappers/productMapper"
import { UserStubFactory } from "../../tests/factories/userStubFactory"
import { AddressStubFactory } from "../../tests/factories/addressStubFactory"

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

function sutFactory(): AddProductsImpl {
    return new AddProductsImpl(
        addressRepositoryStub,
        productRepositoryStub,
        userRepositoryStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('User sign up use case unit testing', () => {
    it('should throw an error if a non-existing user id is provided, preventing the product from being saved', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(null)
        const saveProductMethodFromProductRepositoryStub = jest.spyOn(productRepositoryStub, "saveProduct")
        const executeMethodFromProductMapper = jest.spyOn(ProductMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            [
                //valid product details
                {
                    title: "Blusa de moletom",
                    description: "valid_description",
                    price: 1,
                    stockQuantity: 1,
                    stockAddressId: "existing_stock_address_id"
                }
            ],
            //invalid user id
            "nonexisting_user_id"
        )).rejects.toThrow()
        expect(saveProductMethodFromProductRepositoryStub).not.toHaveBeenCalled()
        expect(executeMethodFromProductMapper).not.toHaveBeenCalled()
    });

    it('should throw an error if a non-existing stock address id is provided, preventing the product from being saved', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        addressRepositoryStub.findOneAddressById.mockResolvedValueOnce(null)
        const saveProductMethodFromProductRepositoryStub = jest.spyOn(productRepositoryStub, "saveProduct")
        const executeMethodFromProductMapper = jest.spyOn(ProductMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            [
                //invalid product details
                {
                    title: "Blusa de moletom",
                    description: "valid_description",
                    price: 1,
                    stockQuantity: 1,
                    stockAddressId: "nonexisting_stock_address_id"
                }
            ],
            //valid user id
            "existing_user_id"
        )).rejects.toThrow()
        expect(saveProductMethodFromProductRepositoryStub).not.toHaveBeenCalled()
        expect(executeMethodFromProductMapper).not.toHaveBeenCalled()
    });

    it('should throw an error if a non-existing stock address id of a product variation is provided, preventing the product from being saved', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        addressRepositoryStub.findOneAddressById.mockResolvedValueOnce(AddressStubFactory.create()).mockResolvedValueOnce(null)
        const saveProductMethodFromProductRepositoryStub = jest.spyOn(productRepositoryStub, "saveProduct")
        const executeMethodFromProductMapper = jest.spyOn(ProductMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            [
                {
                    //valid parent-product details
                    title: "Blusa de moletom azul",
                    description: "valid_description",
                    price: 1,
                    stockQuantity: 1,
                    stockAddressId: "existing_stock_address_id",
                    variation: {
                        details: {
                            label: "Cor",
                            value: "Azul"
                        },
                        products: [
                            {
                                //invalid product variation details
                                title: "Blusa de moletom verde",
                                description: "valid_description",
                                price: 1,
                                stockQuantity: 1,
                                stockAddressId: "nonexisting_stock_address_id",
                                variation: {
                                    details: {
                                        label: "Cor",
                                        value: "Verde"
                                    },
                                }
                            }
                        ]
                    }
                }
            ],
            //valid user id
            "existing_user_id"
        )).rejects.toThrow()
        //should have saved only the parent-product, but not the variation
        expect(saveProductMethodFromProductRepositoryStub).toHaveBeenCalledTimes(1)
        expect(executeMethodFromProductMapper).not.toHaveBeenCalled()
    });

    it('should save the products and map the return data to a DTO if all the provided products data is valid', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        addressRepositoryStub.findOneAddressById.mockResolvedValue(AddressStubFactory.create())
        const saveProductMethodFromProductRepositoryStub = jest.spyOn(productRepositoryStub, "saveProduct")
        const executeMethodFromProductMapper = jest.spyOn(ProductMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            [
                {
                    //valid parent-product details
                    title: "Blusa de moletom azul",
                    description: "valid_description",
                    price: 1,
                    stockQuantity: 1,
                    stockAddressId: "existing_stock_address_id",
                    variation: {
                        details: {
                            label: "Cor",
                            value: "Azul"
                        },
                        products: [
                            {
                                //valid product variation details
                                title: "Blusa de moletom verde",
                                description: "valid_description",
                                price: 1,
                                stockQuantity: 1,
                                stockAddressId: "existing_stock_address_id",
                                variation: {
                                    details: {
                                        label: "Cor",
                                        value: "Verde"
                                    },
                                }
                            }
                        ]
                    }
                }
            ],
            //valid user id
            "existing_user_id"
        )).rejects.toThrow()
        //should have saved both the parent-product and the variation
        expect(saveProductMethodFromProductRepositoryStub).toHaveBeenCalledTimes(2)
        expect(executeMethodFromProductMapper).toHaveBeenCalledTimes(1)
    });
});

