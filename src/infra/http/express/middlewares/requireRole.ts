import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../../../../application/errors/forbiddenError';
import Role from '../../../../domain/entities/role';

export const requireOneOfTheRoles = (roles: string[]): { (request: Request, response: Response, next: NextFunction): Promise<void> } => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userRoleNames = res.locals.roles.map((role: Role) => role.name)
            const missingAllRoles = !(roles.some(role => userRoleNames.includes(role)));
            if (missingAllRoles) throw new ForbiddenError(`User must have one of the following roles: ${roles}`);
            next();
        } catch (err) {
            next(err);
        }
    }
}