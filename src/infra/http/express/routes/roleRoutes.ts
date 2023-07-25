import ExpressAdapter from '../../../adapters/expressAdapter';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configs/inversify.types';
import RoleController from '../../../../application/controllers/roleController';

@injectable()
export default class RoleRoutes {
    public router: Router;
    private roleController: RoleController;

    constructor(@inject(TYPES.RoleController) roleController: RoleController) {
        this.roleController = roleController;
        this.router = Router();
        this.config();
    }

    private config(): void {
        this.router.post(
            '/permissions',
            ExpressAdapter.execute(this.roleController.addPermissionsToRoles)
        );
        this.router.post(
            '/',
            ExpressAdapter.execute(this.roleController.addRoles)
        );
    }
}
