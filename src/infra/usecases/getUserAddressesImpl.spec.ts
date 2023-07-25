import "reflect-metadata";
import AddressRepository from "../../application/repositories/addressRepository";
import UserRepository from "../../application/repositories/userRepository";
import AddressMapper from "../../application/mappers/addressMapper";
import { UserStubFactory } from "../../tests/factories/userStubFactory";
import GetUserAddressesImpl from "./getUserAddressesImpl";
import { AddressStubFactory } from "../../tests/factories/addressStubFactory";

const addressRepositoryStub: jest.Mocked<AddressRepository> = {
    saveAddress: jest.fn(),
    findOneAddressById: jest.fn(),
    findAddressesByUserId: jest.fn()
}

const userRepositoryStub: jest.Mocked<UserRepository> = {
    saveUser: jest.fn(),
    findOneUserById: jest.fn(),
    findOneUserByEmail: jest.fn(),
    findOneUserByIdAndUpdate: jest.fn(),
    emailAlreadyInUse: jest.fn()
}

function sutFactory(): GetUserAddressesImpl {
    return new GetUserAddressesImpl(
        addressRepositoryStub,
        userRepositoryStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('Add address use case unit testing', () => {
    it('should throw an error if a non-existing user id is provided, preventing the addresses from being returned', async () => {
        userRepositoryStub.findOneUserById.mockImplementationOnce(null)
        addressRepositoryStub.findAddressesByUserId.mockResolvedValueOnce(null)
        const executeMethodFromAddressMapper = jest.spyOn(AddressMapper, "execute");
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid user id
            "nonexisting_user_id"
        )).rejects.toThrow()
        expect(executeMethodFromAddressMapper).not.toHaveBeenCalled()
    });

    it('should get all the addresses of a user and return a mapped array of DTOs if an existing product id is provided', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        addressRepositoryStub.findAddressesByUserId.mockResolvedValueOnce([AddressStubFactory.create()])
        const findAddressesByUserIdMethodFromAddressRepository = jest.spyOn(addressRepositoryStub, "findAddressesByUserId");
        const executeMethodFromAddressMapper = jest.spyOn(AddressMapper, "execute");
        const sut = sutFactory()
        await sut.execute(
            //valid user id
            "existing_user_id"
        )
        expect(findAddressesByUserIdMethodFromAddressRepository).toHaveBeenCalledTimes(1)
        expect(executeMethodFromAddressMapper).toHaveBeenCalledTimes(1)
    });
});
