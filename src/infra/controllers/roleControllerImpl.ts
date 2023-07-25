import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import RoleController from '../../application/controllers/roleController';
import { CreateRoleDTO } from '../../domain/dtos/role/createRoleDTO';
import { RolePermissionAssociationDTO } from '../../domain/dtos/role/rolePermissionAssociationDTO';
import AddRoles from '../../application/usecases/addRoles';
import { RoleDTO } from '../../domain/dtos/role/roleDTO';
import AddPermissionsToRoles from '../../application/usecases/addPermissionsToRoles';

@injectable()
export default class RoleControllerImpl implements RoleController {
    private addRolesUseCase: AddRoles;
    private addPermissionsToRolesUseCase: AddPermissionsToRoles;

    constructor(
        @inject(TYPES.AddRoles) addRolesUseCase: AddRoles,
        @inject(TYPES.AddPermissionsToRoles) addPermissionsToRolesUseCase: AddPermissionsToRoles
    ) {
        this.addRolesUseCase = addRolesUseCase;
        this.addPermissionsToRolesUseCase = addPermissionsToRolesUseCase;
    }

    addPermissionsToRoles = async (params: any, body: { rolePermissionAssociations: RolePermissionAssociationDTO[]; }): Promise<void> => {
        const permissionRoleAssociations = body.rolePermissionAssociations;
        await this.addPermissionsToRolesUseCase.execute(permissionRoleAssociations);
    }
    addRoles = async (params: any, body: { roles: CreateRoleDTO[]; }): Promise<RoleDTO[]> => {
        const roles = body.roles;
        return this.addRolesUseCase.execute(roles);
    }
}
