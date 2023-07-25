import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { UserSchema } from './userSchema';
import { RoleSchema } from './roleSchema';

interface UserRolesSchemaAttributes {
    userId: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserRolesSchema extends Model<
    UserRolesSchemaAttributes
> {
    public userId!: string;
    public roleId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

UserRolesSchema.init(
    {
        userId: {
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
    { sequelize, timestamps: true, modelName: 'user_roles' }
);

UserSchema.belongsToMany(RoleSchema, {
    through: UserRolesSchema,
    as: 'roles',
});
RoleSchema.belongsToMany(UserSchema, {
    through: UserRolesSchema,
    as: 'users',
});