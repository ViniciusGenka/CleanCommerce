import Permission from '../../../../domain/entities/permission';
import { PermissionSchema } from '../schemas/permissionSchema';

export class PermissionSchemaEntityMapper {
    static schemaToEntity(permissionSchema: PermissionSchema): Permission {
        return new Permission(
            permissionSchema.name,
            permissionSchema.id,
        )
    }

    static schemasToEntities(permissionSchemas: PermissionSchema[]): Permission[] {
        const permissionEntities: Permission[] = [];
        for (let i = 0; i < permissionSchemas.length; i++) {
            const permissionEntity = new Permission(
                permissionSchemas[i].name,
                permissionSchemas[i].id,
            )
            permissionEntities.push(permissionEntity);
        }
        return permissionEntities;
    }
}