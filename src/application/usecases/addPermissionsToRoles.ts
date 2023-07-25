import { RolePermissionAssociationDTO } from "../../domain/dtos/role/rolePermissionAssociationDTO";

export default interface AddPermissionsToRoles {
    execute(rolePermissionAssociations: RolePermissionAssociationDTO[]): Promise<void>;
}
