import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { OrderSchema } from './orderSchema';
import { DiscountCouponSchema } from './discountCouponSchema';

interface OrderDiscountCouponsSchemaAttributes {
    discountCouponId: string;
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class OrderDiscountCouponsSchema extends Model<
    OrderDiscountCouponsSchemaAttributes
> {
    public orderId!: string;
    public discountCouponId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

OrderDiscountCouponsSchema.init(
    {
        orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },

        discountCouponId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
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
    { sequelize, timestamps: true, modelName: 'order_discount_coupons' }
);

OrderSchema.belongsToMany(DiscountCouponSchema, {
    through: OrderDiscountCouponsSchema,
    as: 'discountCoupons',
});
DiscountCouponSchema.belongsToMany(OrderSchema, {
    through: OrderDiscountCouponsSchema,
    as: 'orders',
});