import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { PromotionSchema } from './promotionSchema';

interface CategorySchemaAttributes {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

type CategorySchemaCreationAttributes = Optional<CategorySchemaAttributes, 'id'>;

export class CategorySchema extends Model<
    CategorySchemaAttributes,
    CategorySchemaCreationAttributes
> {
    public id!: string;
    public name!: string;
    public promotions?: PromotionSchema[];
    public createdAt!: Date;
    public updatedAt!: Date;
}

CategorySchema.init(
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
    { sequelize, timestamps: true, modelName: 'category' }
);

