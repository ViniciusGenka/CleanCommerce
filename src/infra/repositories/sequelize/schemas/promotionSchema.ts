import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface PromotionSchemaAttributes {
    id: string;
    discountValue: number;
    expirationDate: Date;
    minimumPurchaseQuantity: number;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

type PromotionSchemaCreationAttributes = Optional<
    PromotionSchemaAttributes,
    'id'
>;

export class PromotionSchema extends Model<
    PromotionSchemaAttributes,
    PromotionSchemaCreationAttributes
> {
    public id!: string;
    public discountValue!: number;
    public expirationDate!: Date;
    public minimumPurchaseQuantity!: number;
    public name!: string;
    public userId!: string;
    public createdAt!: Date;
}

PromotionSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        discountValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        minimumPurchaseQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        expirationDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        userId: {
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
    { sequelize, timestamps: true, modelName: 'promotion' }
);
