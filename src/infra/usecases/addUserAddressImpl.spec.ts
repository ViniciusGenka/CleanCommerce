import "reflect-metadata";
import AddressRepository from "../../application/repositories/addressRepository";
import AddUserAddressImpl from "./addUserAddressImpl";
import UserRepository from "../../application/repositories/userRepository";
import AddressMapper from "../../application/mappers/addressMapper";
import { UserStubFactory } from "../../tests/factories/userStubFactory";
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

function sutFactory(): AddUserAddressImpl {
	return new AddUserAddressImpl(
		addressRepositoryStub,
		userRepositoryStub
	)
}

afterEach(() => {
	jest.resetAllMocks()
})

describe('Add address use case unit testing', () => {
	it('should throw an error if a non-existing user id is provided, preventing the addresses from being saved', async () => {
		userRepositoryStub.findOneUserById.mockResolvedValueOnce(null)
		const saveAddressMethodFromAddressRepository = jest.spyOn(addressRepositoryStub, "saveAddress");
		const executeMethodFromAddressMapper = jest.spyOn(AddressMapper, "execute");
		const sut = sutFactory()
		const addressData = {
			contactFullName: "any full name",
			contactPhoneNumber: "00000000000",
			postalCode: "00000000",
			state: "any_state",
			city: "any_city",
			neighborhood: "any_neighborhood",
			street: "any_street",
			streetNumber: 0,
			complement: "any_complement",
		}
		await expect(sut.execute(
			//valid address data
			addressData,
			//invalid user id
			"nonexisting_user_id"
		)).rejects.toThrow()
		expect(saveAddressMethodFromAddressRepository).not.toHaveBeenCalled()
		expect(executeMethodFromAddressMapper).not.toHaveBeenCalled()
	});

	it('should save the address and map the return data to a DTO if the provided address data is valid', async () => {
		userRepositoryStub.findOneUserById.mockReturnValueOnce(Promise.resolve(UserStubFactory.create()))
		addressRepositoryStub.saveAddress.mockReturnValueOnce(Promise.resolve(AddressStubFactory.create()))
		const saveAddressMethodFromAddressRepository = jest.spyOn(addressRepositoryStub, "saveAddress");
		const executeMethodFromAddressMapper = jest.spyOn(AddressMapper, "execute");
		const sut = sutFactory()
		const addressData = {
			contactFullName: "any full name",
			contactPhoneNumber: "00000000000",
			postalCode: "00000000",
			state: "any_state",
			city: "any_city",
			neighborhood: "any_neighborhood",
			street: "any_street",
			streetNumber: 0,
			complement: "any_complement",
		}
		await sut.execute(
			//valid address data
			addressData,
			//valid user id
			"existing_user_id"
		)
		expect(saveAddressMethodFromAddressRepository).toHaveBeenCalledTimes(1)
		expect(executeMethodFromAddressMapper).toHaveBeenCalledTimes(1)
	});
});
