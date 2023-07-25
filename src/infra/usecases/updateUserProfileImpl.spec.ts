import "reflect-metadata";
import UserMapper from "../../application/mappers/userMapper"
import UserRepository from "../../application/repositories/userRepository"
import { UserStubFactory } from "../../tests/factories/userStubFactory"
import UpdateUserProfileImpl from "./updateUserProfileImpl";
import HashUserPasswordService from "../../application/services/hashUserPasswordService";
import UsernameValidator from "../../application/validators/usernameValidator";
import PasswordValidator from "../../application/validators/passwordValidator";
import EmailValidator from "../../application/validators/emailValidator";

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

function sutFactory(): UpdateUserProfileImpl {
    return new UpdateUserProfileImpl(
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

describe('Get all user orders use case unit testing', () => {
    it('should throw an error if an invalid username is provided, preventing the user from being updated', async () => {
        usernameValidatorStub.validate.mockImplementationOnce(() => { throw new Error() })
        const findOneUserByIdAndUpdateMethodFromUserRepository = jest.spyOn(userRepositoryStub, "findOneUserByIdAndUpdate")
        const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid update data
            {
                name: "invalid_username",
                email: "valid_email",
                password: "valid_password"
            },
            //valid user id
            "existing_user_id")).rejects.toThrow()
        expect(findOneUserByIdAndUpdateMethodFromUserRepository).not.toHaveBeenCalled()
        expect(executeMethodFromUserMapper).not.toHaveBeenCalled()
    });

    it('should throw an error if an invalid email is provided, preventing the user from being updated', async () => {
        emailValidatorStub.validate.mockImplementationOnce(() => { throw new Error() })
        const findOneUserByIdAndUpdateMethodFromUserRepository = jest.spyOn(userRepositoryStub, "findOneUserByIdAndUpdate")
        const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid update data
            {
                name: "valid_username",
                email: "invalid_email",
                password: "valid_password"
            },
            //valid user id
            "existing_user_id")).rejects.toThrow()
        expect(findOneUserByIdAndUpdateMethodFromUserRepository).not.toHaveBeenCalled()
        expect(executeMethodFromUserMapper).not.toHaveBeenCalled()
    });

    it('should throw an error if an invalid password is provided, preventing the user from being updated', async () => {
        passwordValidatorStub.validate.mockImplementationOnce(() => { throw new Error() })
        const findOneUserByIdAndUpdateMethodFromUserRepository = jest.spyOn(userRepositoryStub, "findOneUserByIdAndUpdate")
        const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid update data
            {
                name: "valid_username",
                email: "valid_email",
                password: "invalid_password"
            },
            //valid user id
            "existing_user_id")).rejects.toThrow()
        expect(findOneUserByIdAndUpdateMethodFromUserRepository).not.toHaveBeenCalled()
        expect(executeMethodFromUserMapper).not.toHaveBeenCalled()
    });

    it('should throw and error if an nonexisting user id is provided', async () => {
        userRepositoryStub.findOneUserByIdAndUpdate.mockResolvedValueOnce(null)
        const findOneUserByIdAndUpdateMethodFromUserRepository = jest.spyOn(userRepositoryStub, "findOneUserByIdAndUpdate")
        const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid update data
            {
                name: "string",
                email: "string",
                password: "string"
            },
            //invalid user id
            "nonexisting_user_id"
        )).rejects.toThrow()
        expect(findOneUserByIdAndUpdateMethodFromUserRepository).toHaveBeenCalledTimes(1)
        expect(executeMethodFromUserMapper).not.toHaveBeenCalled()
    });

    it('should hash the user password if an update to it requested', async () => {
        userRepositoryStub.findOneUserByIdAndUpdate.mockResolvedValueOnce(UserStubFactory.create())
        const executeMethodFromHashUserPasswordService = jest.spyOn(hashUserPasswordServiceStub, "execute")
        const findOneUserByIdAndUpdateMethodFromUserRepository = jest.spyOn(userRepositoryStub, "findOneUserByIdAndUpdate")
        const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid update data
            {
                password: "valid_password"
            },
            //valid user id
            "existing_user_id"
        )).resolves.not.toThrow()
        expect(executeMethodFromHashUserPasswordService).toHaveBeenCalledTimes(1)
        expect(findOneUserByIdAndUpdateMethodFromUserRepository).toHaveBeenCalledTimes(1)
        expect(executeMethodFromUserMapper).toHaveBeenCalledTimes(1)
    });

    it('should update the user profile data and return a mapped DTO if the update data is valid and an existing user id is provided', async () => {
        userRepositoryStub.findOneUserByIdAndUpdate.mockResolvedValueOnce(UserStubFactory.create())
        const findOneUserByIdAndUpdateMethodFromUserRepository = jest.spyOn(userRepositoryStub, "findOneUserByIdAndUpdate")
        const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid update data
            {
                name: "string",
                email: "string",
                password: "string"
            },
            //valid user id
            "existing_user_id"
        )).resolves.not.toThrow()
        expect(findOneUserByIdAndUpdateMethodFromUserRepository).toHaveBeenCalledTimes(1)
        expect(executeMethodFromUserMapper).toHaveBeenCalledTimes(1)
    });
});
