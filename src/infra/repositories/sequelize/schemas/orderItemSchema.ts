import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { AddressSchema } from './addressSchema';
import { OrderItemChatSchema } from './orderItemChatSchema';

interface OrderItemSchemaAttributes {
	id: string;
	orderId: string;
	stockAddressId: string;
	estimatedShippingTime: number;
	price: number;
	quantity: number;
	title: string;
	createdAt: Date;
	updatedAt: Date;
}

type OrderItemSchemaCreationAttributes = Optional<
	OrderItemSchemaAttributes,
	'id'
>;

export class OrderItemSchema extends Model<
	OrderItemSchemaAttributes,
	OrderItemSchemaCreationAttributes
> {
	public id!: string;
	public orderId!: string;
	public stockAddressId!: string;
	public stockAddress?: AddressSchema;
	public chat?: OrderItemChatSchema;
	public estimatedShippingTime!: number;
	public price!: number;
	public quantity!: number;
	public title!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

OrderItemSchema.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},

		orderId: {
			type: DataTypes.UUID,
			allowNull: false,
		},

		stockAddressId: {
			type: DataTypes.UUID,
			allowNull: false,
		},

		estimatedShippingTime: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},

		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		title: {
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
	{ sequelize, timestamps: true, modelName: 'order_item' }
);

OrderItemSchema.hasOne(OrderItemChatSchema, {
	as: 'chat',
});
OrderItemChatSchema.belongsTo(OrderItemSchema, {
	foreignKey: 'orderItemId',
	as: 'orderItem',
});