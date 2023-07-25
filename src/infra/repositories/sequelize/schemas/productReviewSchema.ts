import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface ProductReviewSchemaAttributes {
	id: string;
	productId: string;
	rating: number;
	text: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

type ProductReviewSchemaCreationAttributes = Optional<
	ProductReviewSchemaAttributes,
	'id'
>;

export class ProductReviewSchema extends Model<
	ProductReviewSchemaAttributes,
	ProductReviewSchemaCreationAttributes
> {
	public id!: string;
	public productId!: string;
	public rating!: number;
	public text!: string;
	public userId!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

ProductReviewSchema.init(
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

		productId: {
			type: DataTypes.UUID,
			allowNull: false,
		},

		rating: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},

		text: {
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
	{ sequelize, timestamps: true, modelName: 'product_review' }
);
