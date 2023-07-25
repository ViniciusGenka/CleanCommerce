import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { AddressSchema } from './addressSchema';
import { ProductReviewSchema } from './productReviewSchema';
import { CategorySchema } from './categorySchema';
import { ProductQuestionSchema } from './productQuestionSchema';
import { PromotionSchema } from './promotionSchema';

interface ProductSchemaAttributes {
	id: string;
	userId: string;
	stockAddressId: string;
	title: string;
	description: string;
	price: number;
	stockQuantity: number;
	variationLabel: string;
	variationValue: string;
	variationGroupId: string;
	createdAt: Date;
	updatedAt: Date;
}

type ProductSchemaCreationAttributes = Optional<ProductSchemaAttributes, 'id'>;

export class ProductSchema extends Model<
	ProductSchemaAttributes,
	ProductSchemaCreationAttributes
> {
	public id!: string;
	public userId!: string;
	public reviews?: ProductReviewSchema[];
	public stockAddressId!: string;
	public stockAddress?: AddressSchema;
	public categories?: CategorySchema[];
	public questions?: ProductQuestionSchema[];
	public promotions?: PromotionSchema[];
	public title!: string;
	public description!: string;
	public price!: number;
	public stockQuantity!: number;
	public variationLabel: string;
	public variationValue: string;
	public variationGroupId: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

ProductSchema.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},

		userId: {
			type: DataTypes.UUID,
			allowNull: false,
		},

		stockAddressId: {
			type: DataTypes.UUID,
			allowNull: false,
		},

		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},

		stockQuantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		variationLabel: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		variationValue: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		variationGroupId: {
			type: DataTypes.STRING,
			allowNull: true,
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
	{ sequelize, timestamps: true, modelName: 'product' }
);

ProductSchema.hasMany(ProductReviewSchema, {
	as: 'reviews',
});
ProductReviewSchema.belongsTo(ProductSchema, {
	foreignKey: 'productId',
	as: 'product',
});

ProductSchema.hasMany(ProductQuestionSchema, {
	as: 'questions',
});
ProductQuestionSchema.belongsTo(ProductSchema, {
	foreignKey: 'productId',
	as: 'product',
});
