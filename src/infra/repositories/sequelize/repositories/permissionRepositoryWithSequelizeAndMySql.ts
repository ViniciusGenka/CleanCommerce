import { injectable } from "inversify";
import PermissionRepository from "../../../../application/repositories/permissionRepository";
import { RolePermissionAssociationDTO } from "../../../../domain/dtos/role/rolePermissionAssociationDTO";
import Permission from "../../../../domain/entities/permission";
import { PermissionSchema } from "../schemas/permissionSchema";
import { PermissionSchemaEntityMapper } from "../mappers/permissionSchemaEntityMapper";
import { RolePermissionsSchema } from "../schemas/rolePermissionsSchema";

@injectable()
export default class PermissionRepositoryWithSequelizeAndMySql
    implements PermissionRepository {
    async findOnePermissionById(permissionId: string): Promise<Permission> {
        const permissionSchema = await PermissionSchema.findByPk(permissionId);
        if (!permissionSchema) return null;
        return PermissionSchemaEntityMapper.schemaToEntity(permissionSchema);
    }

    async findOnePermissionByName(name: string): Promise<Permission> {
        const permissionSchema = await PermissionSchema.findOne({ where: { name: name } });
        if (!permissionSchema) return null;
        return PermissionSchemaEntityMapper.schemaToEntity(permissionSchema);
    }
    async addPermissionToRole(rolePermissionAssociation: RolePermissionAssociationDTO): Promise<void> {
        const rolePermissionSchema = RolePermissionsSchema.build({
            roleId: rolePermissionAssociation.roleId,
            permissionId: rolePermissionAssociation.permissionId,
        })
        await rolePermissionSchema.save();
    }
}
