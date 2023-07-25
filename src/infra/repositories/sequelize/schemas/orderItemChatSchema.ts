import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { OrderItemChatMessageSchema } from './orderItemChatMessageSchema';

interface OrderItemChatSchemaAttributes {
    id: string;
    orderItemId: string;
    buyerId: string;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
}

type OrderItemChatSchemaCreationAttributes = Optional<
    OrderItemChatSchemaAttributes,
    'id'
>;

export class OrderItemChatSchema extends Model<
    OrderItemChatSchemaAttributes,
    OrderItemChatSchemaCreationAttributes
> {
    public id!: string;
    public orderItemId!: string;
    public buyerId!: string;
    public sellerId!: string;
    public messages?: OrderItemChatMessageSchema[];
    public createdAt!: Date;
    public updatedAt!: Date;
}

OrderItemChatSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        orderItemId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        buyerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        sellerId: {
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
    { sequelize, timestamps: true, modelName: 'order_item_chat' }
);

OrderItemChatSchema.hasMany(OrderItemChatMessageSchema, {
    as: 'messages',
});
OrderItemChatMessageSchema.belongsTo(OrderItemChatSchema, {
    foreignKey: 'orderItemChatId',
    as: 'orderItemChat',
});