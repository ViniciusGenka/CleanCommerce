import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import RoleRepository from '../../application/repositories/roleRepository';
import PermissionRepository from '../../application/repositories/permissionRepository';
import { RolePermissionAssociationDTO } from '../../domain/dtos/role/rolePermissionAssociationDTO';
import AddPermissionsToRoles from '../../application/usecases/addPermissionsToRoles';

@injectable()
export default class AddPermissionsToRolesImpl implements AddPermissionsToRoles {
    private permissionRepository: PermissionRepository;
    private roleRepository: RoleRepository;

    constructor(
        @inject(TYPES.PermissionRepository) permissionRepository: PermissionRepository,
        @inject(TYPES.RoleRepository) roleRepository: RoleRepository
    ) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    async execute(
        rolePermissionAssociations: RolePermissionAssociationDTO[]
    ): Promise<void> {
        for (let i = 0; i < rolePermissionAssociations.length; i++) {
            const permissionNotFound = !(await this.permissionRepository.findOnePermissionById(rolePermissionAssociations[i].permissionId));
            if (permissionNotFound) throw new EntityNotFoundError("Permission not found");
            const roleNotFound = !(await this.roleRepository.findOneRoleById(rolePermissionAssociations[i].roleId));
            if (roleNotFound) throw new EntityNotFoundError("Role not found");
            await this.permissionRepository.addPermissionToRole(rolePermissionAssociations[i]);
        }
    }
}