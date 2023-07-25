import "reflect-metadata";
import UserMapper from "../../application/mappers/userMapper"
import UserRepository from "../../application/repositories/userRepository"
import { UserStubFactory } from "../../tests/factories/userStubFactory"
import GetUserProfileImpl from "./getUserProfileImpl"

const userRepositoryStub: jest.Mocked<UserRepository> = {
    saveUser: jest.fn(),
    findOneUserById: jest.fn(),
    findOneUserByEmail: jest.fn(),
    findOneUserByIdAndUpdate: jest.fn(),
    emailAlreadyInUse: jest.fn()
}

function sutFactory(): GetUserProfileImpl {
    return new GetUserProfileImpl(
        userRepositoryStub
    )
}

afterEach(() => {
    jest.resetAllMocks()
})

describe('Get all user orders use case unit testing', () => {
    it('should throw and error if an nonexisting user id is provided', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(null)
        const findOneUserByIdMethodFromUserRepository = jest.spyOn(userRepositoryStub, "findOneUserById")
        const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //invalid user id
            "nonexisting_user_id"
        )).rejects.toThrow()
        expect(findOneUserByIdMethodFromUserRepository).toHaveBeenCalledTimes(1)
        expect(executeMethodFromUserMapper).not.toHaveBeenCalled()
    });

    it('should get the user profile data and return a mapped DTO if an existing user id is provided', async () => {
        userRepositoryStub.findOneUserById.mockResolvedValueOnce(UserStubFactory.create())
        const findOneUserByIdMethodFromUserRepository = jest.spyOn(userRepositoryStub, "findOneUserById")
        const executeMethodFromUserMapper = jest.spyOn(UserMapper, "execute")
        const sut = sutFactory()
        await expect(sut.execute(
            //valid user id
            "existing_user_id"
        )).resolves.not.toThrow()
        expect(findOneUserByIdMethodFromUserRepository).toHaveBeenCalledTimes(1)
        expect(executeMethodFromUserMapper).toHaveBeenCalledTimes(1)
    });
});
