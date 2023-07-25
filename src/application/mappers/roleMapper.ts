import Role from '../../domain/entities/role';
import { RoleDTO } from '../../domain/dtos/role/roleDTO';

export default class RoleMapper {
    static execute(roleEntity: Role): RoleDTO {
        return {
            id: roleEntity.id,
            name: roleEntity.name,
        };
    }
}
