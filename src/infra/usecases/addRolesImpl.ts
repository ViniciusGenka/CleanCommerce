import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import AddRoles from '../../application/usecases/addRoles';
import RoleRepository from '../../application/repositories/roleRepository';
import { CreateRoleDTO } from '../../domain/dtos/role/createRoleDTO';
import { RoleDTO } from '../../domain/dtos/role/roleDTO';
import Role from '../../domain/entities/role';
import RoleMapper from '../../application/mappers/roleMapper';

@injectable()
export default class AddRolesImpl implements AddRoles {
    private roleRepository: RoleRepository;
    constructor(
        @inject(TYPES.RoleRepository) roleRepository: RoleRepository,
    ) {
        this.roleRepository = roleRepository;
    }

    async execute(
        roles: CreateRoleDTO[]
    ): Promise<RoleDTO[]> {
        const savedRoles: RoleDTO[] = [];
        for (let i = 0; i < roles.length; i++) {
            const roleEntity = new Role(roles[i].name);
            const savedRole = await this.roleRepository.saveRole(roleEntity);
            savedRoles.push(RoleMapper.execute(savedRole));
        }
        return savedRoles
    }
}