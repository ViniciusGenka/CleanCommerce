import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface OrderItemChatMessageSchemaAttributes {
    id: string;
    chatId: string;
    userId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

type OrderItemChatMessageSchemaCreationAttributes = Optional<
    OrderItemChatMessageSchemaAttributes,
    'id'
>;

export class OrderItemChatMessageSchema extends Model<
    OrderItemChatMessageSchemaAttributes,
    OrderItemChatMessageSchemaCreationAttributes
> {
    public id!: string;
    public chatId!: string;
    public userId!: string;
    public text!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

OrderItemChatMessageSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        chatId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        userId: {
            type: DataTypes.UUID,
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
    { sequelize, timestamps: true, modelName: 'order_item_chat_message' }
);
