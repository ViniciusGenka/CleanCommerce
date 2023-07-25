import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { CategorySchema } from './categorySchema';
import { ProductSchema } from './productSchema';

interface ProductCategoriesSchemaAttributes {
    productId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProductCategoriesSchema extends Model<
    ProductCategoriesSchemaAttributes
> {
    public orderId!: string;
    public categoryId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

ProductCategoriesSchema.init(
    {
        productId: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false,
        },

        categoryId: {
            primaryKey: true,
            type: DataTypes.UUID,
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
    { sequelize, timestamps: true, modelName: 'product_categories' }
);

CategorySchema.belongsToMany(ProductSchema, {
    through: ProductCategoriesSchema,
    as: 'products'
});
ProductSchema.belongsToMany(CategorySchema, {
    through: ProductCategoriesSchema,
    as: 'categories'
});
