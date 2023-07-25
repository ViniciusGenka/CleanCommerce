import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { RoleSchema } from './roleSchema';

interface PermissionSchemaAttributes {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

type PermissionSchemaCreationAttributes = Optional<PermissionSchemaAttributes, 'id'>;

export class PermissionSchema extends Model<
    PermissionSchemaAttributes,
    PermissionSchemaCreationAttributes
> {
    public id!: string;
    public name!: string;
    public roles?: RoleSchema[];
    public createdAt!: Date;
    public updatedAt!: Date;
}

PermissionSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
    { sequelize, timestamps: true, modelName: 'permission' }
);