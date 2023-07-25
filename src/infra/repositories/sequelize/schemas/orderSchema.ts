import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { AddressSchema } from './addressSchema';
import { OrderItemSchema } from './orderItemSchema';
import { UserSchema } from './userSchema';
import { PaymentStatus } from '../../../../domain/enums/paymentStatus';
import { DiscountCouponSchema } from './discountCouponSchema';

interface OrderSchemaAttributes {
	id: string;
	userId: string;
	destinationAddressId: string;
	paymentId: string | null;
	paymentStatus: PaymentStatus;
	shippingCost: number;
	shippingStatus: number;
	status: number;
	originalPrice: number;
	createdAt: Date;
	updatedAt: Date;
}

type OrderSchemaCreationAttributes = Optional<OrderSchemaAttributes, 'id'>;

export class OrderSchema extends Model<
	OrderSchemaAttributes,
	OrderSchemaCreationAttributes
> {
	public id!: string;
	public userId!: string;
	public user?: UserSchema;
	public destinationAddressId!: string;
	public destinationAddress?: AddressSchema;
	public discountCoupons?: DiscountCouponSchema[];
	public items?: OrderItemSchema[];
	public paymentId: string | null;
	public paymentStatus: PaymentStatus;
	public shippingCost!: number;
	public shippingStatus!: number;
	public status!: number;
	public originalPrice!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

OrderSchema.init(
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

		destinationAddressId: {
			type: DataTypes.UUID,
			allowNull: false,
		},

		paymentId: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		paymentStatus: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		shippingCost: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},

		shippingStatus: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		originalPrice: {
			type: DataTypes.FLOAT,
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
	{ sequelize, timestamps: true, modelName: 'order' }
);

OrderSchema.hasMany(OrderItemSchema, {
	as: 'items',
});
OrderItemSchema.belongsTo(OrderSchema, {
	foreignKey: 'orderId',
	as: 'order',
});
