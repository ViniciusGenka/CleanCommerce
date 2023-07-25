import "reflect-metadata";
import HashUserPasswordService from "../../application/services/hashUserPasswordService";
import EmailValidator from "../../application/validators/emailValidator";
import PasswordValidator from "../../application/validators/passwordValidator";
import UsernameValidator from "../../application/validators/usernameValidator";
import UserRepository from "../../application/repositories/userRepository";
import UserSignUpImpl from "./userSignUpImpl";
import UserMapper from "../../application/mappers/userMapper";
import { UserStubFactory } from "../../tests/factories/userStubFactory";

const userRepositoryStub: jest.Mocked<UserRepository> = {
	saveUser: jest.fn(),
	findOneUserById: jest.fn(),
	findOneUserByEmail: jest.fn(),
	findOneUserByIdAndUpdate: jest.fn(),
	emailAlreadyInUse: jest.fn()
}


const emailValidatorStub: jest.Mocked<EmailValidator> = {
	validate: jest.fn()
}

const passwordValidatorStub: jest.Mocked<PasswordValidator> = {
	validate: jest.fn()
}

const usernameValidatorStub: jest.Mocked<UsernameValidator> = {
	validate: jest.fn()
}

const hashUserPasswordServiceStub: jest.Mocked<HashUserPasswordService> = {
	execute: jest.fn()
}

function sutFactory(): UserSignUpImpl {
	return new UserSignUpImpl(
		emailValidatorStub,
		hashUserPasswordServiceStub,
		passwordValidatorStub,
		usernameValidatorStub,
		userRepositoryStub
	)
}

afterEach(() => {
	jest.resetAllMocks()
})

describe('User sign up use case unit testing', () => {
	it('should throw and error if an email in use is provided, preventing the user from being saved', async () => {
		userRepositoryStub.emailAlreadyInUse.mockReturnValueOnce(Promise.resolve(true))
		const saveUserMethodFromUserRepository = jest.spyOn(userRepositoryStub, "saveUser")
		const sut = sutFactory()
		await expect(sut.execute({
			email: 'unavailable@email.com',
			name: "valid_username",
			password: 'valid_password',
		})).rejects.toThrow()
		expect(saveUserMethodFromUserRepository).not.toHaveBeenCalled()
	});

	it('should throw an error if an invalid email is provided, preventing the user from being saved', async () => {
		userRepositoryStub.emailAlreadyInUse.mockReturnValueOnce(Promise.resolve(false))
		emailValidatorStub.validate.mockImplementationOnce(() => { throw new Error() })
		const saveUserMethodFromUserRepository = jest.spyOn(userRepositoryStub, "saveUser")
		const sut = sutFactory()
		await expect(sut.execute({
			email: 'invalid@email.com',
			name: "valid_username",
			password: 'valid_password',
		})).rejects.toThrow()
		expect(saveUserMethodFromUserRepository).not.toHaveBeenCalled()
	});

	it('should throw an error if an invalid password is provided, preventing the user from being saved', async () => {
		userRepositoryStub.emailAlreadyInUse.mockReturnValueOnce(Promise.resolve(false))
		passwordValidatorStub.validate.mockImplementationOnce(() => { throw new Error() })
		const saveUserMethodFromUserRepository = jest.spyOn(userRepositoryStub, "saveUser")
		const sut = sutFactory()
		await expect(sut.execute({
			email: 'valid_and_available@email.com',
			name: "valid_username",
			password: 'invalid_password',
		})).rejects.toThrow()
		expect(saveUserMethodFromUserRepository).not.toHaveBeenCalled()
	});

	it('should throw an error if an invalid username is provided, preventing the user from being saved', async () => {
		userRepositoryStub.emailAlreadyInUse.mockReturnValueOnce(Promise.resolve(false))
		usernameValidatorStub.validate.mockImplementationOnce(() => { throw new Error() })
		const saveUserMethodFromUserRepository = jest.spyOn(userRepositoryStub, "saveUser")
		const sut = sutFactory()
		await expect(sut.execute({
			email: 'valid_and_available@email.com',
			name: "invalid_username",
			password: 'valid_password',
		})).rejects.toThrow()
		expect(saveUserMethodFromUserRepository).not.toHaveBeenCalled()
	});

	it('should save the user and map the return data to a DTO if the provided sign up data is valid', async () => {
		userRepositoryStub.emailAlreadyInUse.mockReturnValueOnce(Promise.resolve(false))
		userRepositoryStub.saveUser.mockReturnValueOnce(Promise.resolve(UserStubFactory.create()))
		const saveUserMethodFromUserRepository = jest.spyOn(userRepositoryStub, "saveUser");
		const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
		const sut = sutFactory()
		await sut.execute({
			email: 'valid_and_available@email.com',
			name: "valid_username",
			password: 'valid_password',
		})
		expect(saveUserMethodFromUserRepository).toHaveBeenCalledTimes(1)
		expect(executeMethodFromUserMapper).toHaveBeenCalledTimes(1)
	});
});
