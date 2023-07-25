import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { OrderItemSchema } from './orderItemSchema';
import { OrderSchema } from './orderSchema';
import { ProductSchema } from './productSchema';

interface AddressSchemaAttributes {
	id: string;
	userId: string;
	contactFullName: string;
	contactPhoneNumber: string;
	postalCode: string;
	state: string;
	city: string;
	complement: string;
	neighborhood: string;
	street: string;
	streetNumber: number;
	createdAt: Date;
	updatedAt: Date;
}

type AddressSchemaCreationAttributes = Optional<AddressSchemaAttributes, 'id'>;

export class AddressSchema extends Model<
	AddressSchemaAttributes,
	AddressSchemaCreationAttributes
> {
	public id: string;
	public userId: string;
	public contactFullName: string;
	public contactPhoneNumber: string;
	public postalCode: string;
	public state: string;
	public city: string;
	public complement: string;
	public neighborhood: string;
	public street: string;
	public streetNumber: number;
	public createdAt: Date;
	public updatedAt: Date;
}

AddressSchema.init(
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

		contactFullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		contactPhoneNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		postalCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		state: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		complement: {
			type: DataTypes.STRING,
		},

		neighborhood: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		streetNumber: {
			type: DataTypes.INTEGER,
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
	{ sequelize, timestamps: true, modelName: 'address' }
);

AddressSchema.hasMany(ProductSchema, {
	as: 'product',
});
ProductSchema.belongsTo(AddressSchema, {
	foreignKey: 'stockAddressId',
	as: 'stockAddress',
});

AddressSchema.hasMany(OrderSchema, {
	as: 'order',
});
OrderSchema.belongsTo(AddressSchema, {
	foreignKey: 'destinationAddressId',
	as: 'destinationAddress',
});

AddressSchema.hasMany(OrderItemSchema, {
	as: 'orderItem',
});
OrderItemSchema.belongsTo(AddressSchema, {
	foreignKey: 'stockAddressId',
	as: 'stockAddress',
});
