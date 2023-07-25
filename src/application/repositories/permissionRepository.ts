import { RolePermissionAssociationDTO } from "../../domain/dtos/role/rolePermissionAssociationDTO";
import Permission from "../../domain/entities/permission";

export default interface PermissionRepository {
    findOnePermissionById(permissionId: string): Promise<Permission>
    findOnePermissionByName(name: string): Promise<Permission>;
    addPermissionToRole(rolePermissionAssociation: RolePermissionAssociationDTO): Promise<void>;
}
