import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import AddRolesToUsers from '../../application/usecases/addRolesToUsers';
import RoleRepository from '../../application/repositories/roleRepository';
import UserRepository from '../../application/repositories/userRepository';
import { UserRoleAssociationDTO } from '../../domain/dtos/user/userRoleAssociationDTO';

@injectable()
export default class AddRolesToUsersImpl implements AddRolesToUsers {
    private roleRepository: RoleRepository;
    private userRepository: UserRepository;

    constructor(
        @inject(TYPES.RoleRepository) roleRepository: RoleRepository,
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    async execute(
        userRoleAssociations: UserRoleAssociationDTO[]
    ): Promise<void> {
        for (let i = 0; i < userRoleAssociations.length; i++) {
            const userNotFound = !(await this.userRepository.findOneUserById(userRoleAssociations[i].userId));
            if (userNotFound) throw new EntityNotFoundError("User not found");
            const roleNotFound = !(await this.roleRepository.findOneRoleById(userRoleAssociations[i].roleId));
            if (roleNotFound) throw new EntityNotFoundError("Role not found");
            await this.roleRepository.addRoleToUser(userRoleAssociations[i]);
        }
    }
}