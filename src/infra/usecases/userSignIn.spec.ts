import "reflect-metadata";
import UserRepository from "../../application/repositories/userRepository";
import UserSignInImpl from "./userSignInImpl";
import GenerateAccessTokenService from "../../application/services/generateAccessTokenService";
import CompareUserPasswordsService from "../../application/services/compareUserPasswordsService";
import EntityNotFoundError from "../../domain/errors/entityNotFoundError";
import { UserStubFactory } from "../../tests/factories/userStubFactory";

const userRepositoryStub: jest.Mocked<UserRepository> = {
	saveUser: jest.fn(),
	findOneUserById: jest.fn(),
	findOneUserByEmail: jest.fn(),
	findOneUserByIdAndUpdate: jest.fn(),
	emailAlreadyInUse: jest.fn()
}

const compareUserPasswordsServiceStub: jest.Mocked<CompareUserPasswordsService> = {
	execute: jest.fn()
}

const generateAccessTokenServiceStub: jest.Mocked<GenerateAccessTokenService> = {
	execute: jest.fn()
}

function sutFactory(): UserSignInImpl {
	return new UserSignInImpl(
		compareUserPasswordsServiceStub,
		generateAccessTokenServiceStub,
		userRepositoryStub
	)
}

afterEach(() => {
	jest.resetAllMocks()
})

describe('User sign in use case unit testing', () => {
	it('should throw an error if a non-existing email is provided, preventing the access token from being generated', async () => {
		userRepositoryStub.findOneUserByEmail.mockImplementationOnce(() => { throw new EntityNotFoundError('User not found') })
		const executeMethodFromGenerateAccessTokenService = jest.spyOn(generateAccessTokenServiceStub, "execute")
		const sut = sutFactory()
		await expect(sut.execute({
			email: 'non_existing@email.com',
			password: 'any_password',
		})).rejects.toThrow()
		expect(executeMethodFromGenerateAccessTokenService).not.toHaveBeenCalled()
	});

	it('should throw and error if a wrong password is provided, preventing the access token from being generated', async () => {
		userRepositoryStub.findOneUserByEmail.mockReturnValueOnce(Promise.resolve(UserStubFactory.create()))
		compareUserPasswordsServiceStub.execute.mockReturnValueOnce(Promise.resolve(false))
		const executeMethodFromGenerateAccessTokenService = jest.spyOn(generateAccessTokenServiceStub, "execute")
		const sut = sutFactory()
		await expect(sut.execute({
			email: 'existing@email.com',
			password: 'wrong_password',
		})).rejects.toThrow()
		expect(executeMethodFromGenerateAccessTokenService).not.toHaveBeenCalled()
	});

	it('should generate an access token if the provided sign in data is correct', async () => {
		userRepositoryStub.findOneUserByEmail.mockReturnValueOnce(Promise.resolve(UserStubFactory.create()))
		compareUserPasswordsServiceStub.execute.mockReturnValueOnce(Promise.resolve(true))
		const executeMethodFromGenerateAccessTokenService = jest.spyOn(generateAccessTokenServiceStub, "execute")
		const sut = sutFactory()
		await expect(sut.execute({
			email: 'existing@email.com',
			password: 'correct_password',
		})).resolves.not.toThrow()
		expect(executeMethodFromGenerateAccessTokenService).toHaveBeenCalledTimes(1)
	});
});
