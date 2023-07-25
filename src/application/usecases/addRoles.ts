import { CreateRoleDTO } from '../../domain/dtos/role/createRoleDTO';
import { RoleDTO } from '../../domain/dtos/role/roleDTO';

export default interface AddRoles {
    execute(
        roles: CreateRoleDTO[]
    ): Promise<RoleDTO[]>;
}
