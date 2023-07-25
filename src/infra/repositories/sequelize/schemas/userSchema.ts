import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { AddressSchema } from './addressSchema';
import { OrderSchema } from './orderSchema';
import { ProductReviewSchema } from './productReviewSchema';
import { ProductSchema } from './productSchema';
import { ProductQuestionSchema } from './productQuestionSchema';
import { ProductQuestionAnswerSchema } from './productQuestionAnswerSchema';
import { OrderItemChatMessageSchema } from './orderItemChatMessageSchema';
import { DiscountCouponSchema } from './discountCouponSchema';
import { PromotionSchema } from './promotionSchema';
import { RoleSchema } from './roleSchema';

interface UserSchemaAttributes {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

type UserSchemaCreationAttributes = Optional<UserSchemaAttributes, 'id'>;

export class UserSchema extends Model<
	UserSchemaAttributes,
	UserSchemaCreationAttributes
> {
	public id!: string;
	public name!: string;
	public email!: string;
	public roles?: RoleSchema[];
	public password!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

UserSchema.init(
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

		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		password: {
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
	{ sequelize, timestamps: true, modelName: 'user' }
);

UserSchema.hasMany(AddressSchema, {
	as: 'addresses',
});
AddressSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});

UserSchema.hasMany(ProductSchema, {
	as: 'products',
});
ProductSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});

UserSchema.hasMany(ProductReviewSchema, {
	as: 'productReviews',
});
ProductReviewSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});

UserSchema.hasMany(OrderSchema, {
	as: 'orders',
});
OrderSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});

UserSchema.hasMany(ProductQuestionSchema, {
	as: 'productQuestions',
});
ProductQuestionSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});

UserSchema.hasMany(ProductQuestionAnswerSchema, {
	as: 'productQuestionAnswers',
});
ProductQuestionAnswerSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});

UserSchema.hasMany(OrderItemChatMessageSchema, {
	as: 'messages',
});
OrderItemChatMessageSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});

UserSchema.hasMany(DiscountCouponSchema, {
	as: 'discountCoupons',
});
DiscountCouponSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});

UserSchema.hasMany(PromotionSchema, {
	as: 'promotions',
});
PromotionSchema.belongsTo(UserSchema, {
	foreignKey: 'userId',
	as: 'user',
});