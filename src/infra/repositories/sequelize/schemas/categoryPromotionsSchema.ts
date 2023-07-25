import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { PromotionSchema } from './promotionSchema';
import { CategorySchema } from './categorySchema';

interface CategoryPromotionsSchemaAttributes {
    promotionId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class CategoryPromotionsSchema extends Model<
    CategoryPromotionsSchemaAttributes
> {
    public categoryId!: string;
    public promotionId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

CategoryPromotionsSchema.init(
    {
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },

        promotionId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
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
    { sequelize, timestamps: true, modelName: 'category_promotions' }
);

CategorySchema.belongsToMany(PromotionSchema, {
    through: CategoryPromotionsSchema,
    as: 'promotions',
});
PromotionSchema.belongsToMany(CategorySchema, {
    through: CategoryPromotionsSchema,
    as: 'categories',
});