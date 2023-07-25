import Role from '../../../../domain/entities/role';
import { RoleSchema } from '../schemas/roleSchema';

export class RoleSchemaEntityMapper {
    static schemaToEntity(roleSchema: RoleSchema): Role {
        return new Role(
            roleSchema.name,
            roleSchema.id,
        )
    }

    static entityToSchema(roleEntity: Role): RoleSchema {
        return RoleSchema.build({
            name: roleEntity.name,
        })
    }

    static schemasToEntities(roleSchemas: RoleSchema[]): Role[] {
        const roleEntities: Role[] = [];
        for (let i = 0; i < roleSchemas.length; i++) {
            const roleEntity = new Role(
                roleSchemas[i].name,
                roleSchemas[i].id,
            )
            roleEntities.push(roleEntity);
        }
        return roleEntities;
    }
}