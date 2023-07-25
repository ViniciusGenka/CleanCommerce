import User from "../../domain/entities/user";

export class UserStubFactory {
    static create(): jest.Mocked<User> {
        const orderObject: jest.Mocked<User> = {
            email: "any@email.com" as any,
            id: "any_id" as any,
            name: "any_name" as any,
            password: "any_password" as any,
        }
        return orderObject
    }
}