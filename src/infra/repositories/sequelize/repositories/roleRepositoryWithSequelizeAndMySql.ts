import { RoleSchemaEntityMapper } from './../mappers/roleSchemaEntityMapper';
import { injectable } from "inversify";
import RoleRepository from "../../../../application/repositories/roleRepository";
import Role from "../../../../domain/entities/role";
import { UserRolesSchema } from "../schemas/userRolesSchema";
import { RolePermissionsSchema } from '../schemas/rolePermissionsSchema';
import { RoleSchema } from '../schemas/roleSchema';
import { UserRoleAssociationDTO } from '../../../../domain/dtos/user/userRoleAssociationDTO';

@injectable()
export default class RoleRepositoryWithSequelizeAndMySql
    implements RoleRepository {
    async saveRole(role: Role): Promise<Role> {
        const roleSchema = RoleSchemaEntityMapper.entityToSchema(role);
        const savedRoleSchema = await roleSchema.save();
        return RoleSchemaEntityMapper.schemaToEntity(savedRoleSchema);
    }

    async addRoleToUser(userRoleAssociation: UserRoleAssociationDTO): Promise<void> {
        const userRoleSchema = UserRolesSchema.build({
            roleId: userRoleAssociation.roleId,
            userId: userRoleAssociation.userId
        });
        await userRoleSchema.save();
    }

    async findOneRoleById(roleId: string): Promise<Role> {
        const roleSchema = await RoleSchema.findByPk(roleId);
        if (!roleSchema) return null;
        return RoleSchemaEntityMapper.schemaToEntity(roleSchema);
    }

    async findOneRoleByName(name: string): Promise<Role> {
        const roleSchema = await RoleSchema.findOne({ where: { name: name } });
        return RoleSchemaEntityMapper.schemaToEntity(roleSchema);
    }

    async findRolesByPermissionId(permissionId: string): Promise<Role[]> {
        const rolePermissionSchemas = await RolePermissionsSchema.findAll({ where: { permissionId: permissionId } });
        const roleIds = rolePermissionSchemas.map((rolePermission) => rolePermission.roleId)
        const roleSchemas = await RoleSchema.findAll({ where: { id: roleIds } });
        return RoleSchemaEntityMapper.schemasToEntities(roleSchemas);
    }
}
