import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { UserSchema } from './userSchema';

interface RoleSchemaAttributes {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

type RoleSchemaCreationAttributes = Optional<RoleSchemaAttributes, 'id'>;

export class RoleSchema extends Model<
    RoleSchemaAttributes,
    RoleSchemaCreationAttributes
> {
    public id!: string;
    public name!: string;
    public users?: UserSchema[];
    public createdAt!: Date;
    public updatedAt!: Date;
}

RoleSchema.init(
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
    { sequelize, timestamps: true, modelName: 'role' }
);