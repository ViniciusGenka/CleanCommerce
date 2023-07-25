import { CreateRoleDTO } from '../../domain/dtos/role/createRoleDTO';
import { RoleDTO } from '../../domain/dtos/role/roleDTO';
import { RolePermissionAssociationDTO } from '../../domain/dtos/role/rolePermissionAssociationDTO';

export default interface RoleController {
    addPermissionsToRoles(params: any, body: { rolePermissionAssociations: RolePermissionAssociationDTO[] }): Promise<void>;
    addRoles(params: any, body: { roles: CreateRoleDTO[] }): Promise<RoleDTO[]>;
}
