import { Permissions } from './../../../../domain/enums/permissions';
import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../../../../application/errors/forbiddenError';
import Role from '../../../../domain/entities/role';
import { container } from '../../../configs/inversify.config';
import RoleRepository from '../../../../application/repositories/roleRepository';
import { TYPES } from '../../../configs/inversify.types';
import PermissionRepository from '../../../../application/repositories/permissionRepository';

export const requiredPermission = (permissionName: Permissions): { (request: Request, response: Response, next: NextFunction): Promise<void> } => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const roleRepository = container.get<RoleRepository>(TYPES.RoleRepository);
            const permissionRepository = container.get<PermissionRepository>(TYPES.PermissionRepository);
            const permission = await permissionRepository.findOnePermissionByName(permissionName)
            const permissionRoles = await roleRepository.findRolesByPermissionId(permission.id)
            const permissionRoleNames = permissionRoles.map(role => role.name);
            const userRoleNames = res.locals.roles.map((role: Role) => role.name)
            console.log(userRoleNames)
            const missingAllRoles = !(permissionRoleNames.some(role => userRoleNames.includes(role)));
            console.log(`teste: ${permissionRoleNames}`)
            if (missingAllRoles) throw new ForbiddenError(`User must have one of the following roles: ${permissionRoleNames}`);
            next();
        } catch (err) {
            next(err);
        }
    }
}