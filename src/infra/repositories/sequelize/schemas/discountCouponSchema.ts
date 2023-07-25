import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface DiscountCouponSchemaAttributes {
    id: string;
    code: string;
    discountValue: number;
    expirationDate: Date;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

type DiscountCouponSchemaCreationAttributes = Optional<
    DiscountCouponSchemaAttributes,
    'id'
>;

export class DiscountCouponSchema extends Model<
    DiscountCouponSchemaAttributes,
    DiscountCouponSchemaCreationAttributes
> {
    public id!: string;
    public code!: string;
    public discountValue!: number;
    public expirationDate!: Date;
    public title!: string;
    public userId!: string;
    public createdAt!: Date;
}

DiscountCouponSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        discountValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING,
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
    { sequelize, timestamps: true, modelName: 'discount_coupon' }
);