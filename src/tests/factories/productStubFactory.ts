import Product from "../../domain/entities/product"
import { AddressStubFactory } from "./addressStubFactory"
import { ProductReviewStubFactory } from "./productReviewStubFactory"

export class ProductStubFactory {
    static create(): jest.Mocked<Product> {

        const productObject: jest.Mocked<Product> = {
            id: "any_id",
            userId: "any_user_id",
            title: "any_title",
            description: "any_description",
            price: 1,
            reviews: [ProductReviewStubFactory.create()],
            stockQuantity: 5,
            stockAddress: AddressStubFactory.create(),
            variation: null,
            haveEnoughStock: jest.fn((quantityToBuy: number) => true),
            decrementStockQuantity: jest.fn((quantityToDecrement: number) => { })
        }
        return productObject
    }
}