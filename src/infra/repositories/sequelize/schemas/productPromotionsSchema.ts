import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { PromotionSchema } from './promotionSchema';
import { ProductSchema } from './productSchema';

interface ProductPromotionsSchemaAttributes {
    promotionId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProductPromotionsSchema extends Model<
    ProductPromotionsSchemaAttributes
> {
    public productId!: string;
    public promotionId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

ProductPromotionsSchema.init(
    {
        productId: {
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
    { sequelize, timestamps: true, modelName: 'product_promotions' }
);

ProductSchema.belongsToMany(PromotionSchema, {
    through: ProductPromotionsSchema,
    as: 'promotions',
});
PromotionSchema.belongsToMany(ProductSchema, {
    through: ProductPromotionsSchema,
    as: 'products',
});