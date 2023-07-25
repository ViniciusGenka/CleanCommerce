import { UserRoleAssociationDTO } from "../../domain/dtos/user/userRoleAssociationDTO";
import Role from "../../domain/entities/role";

export default interface RoleRepository {
    saveRole(role: Role): Promise<Role>;
    addRoleToUser(userRoleAssociation: UserRoleAssociationDTO): Promise<void>;
    findOneRoleById(roleId: string): Promise<Role>;
    findOneRoleByName(name: string): Promise<Role>;
    findRolesByPermissionId(permissionId: string): Promise<Role[]>;
}
