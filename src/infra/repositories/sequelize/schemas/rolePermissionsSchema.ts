import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { RoleSchema } from './roleSchema';
import { PermissionSchema } from './permissionSchema';

interface RolePermissionsSchemaAttributes {
    permissionId: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class RolePermissionsSchema extends Model<
    RolePermissionsSchemaAttributes
> {
    public permissionId!: string;
    public roleId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

RolePermissionsSchema.init(
    {
        permissionId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },

        roleId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    { sequelize, timestamps: true, modelName: 'role_permissions' }
);

PermissionSchema.belongsToMany(RoleSchema, {
    through: RolePermissionsSchema,
    as: 'roles',
});
RoleSchema.belongsToMany(PermissionSchema, {
    through: RolePermissionsSchema,
    as: 'permissions',
});