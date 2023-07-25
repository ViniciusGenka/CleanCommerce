import { injectable } from "inversify";
import DiscountCouponSchemaEntityMapper from "../mappers/discountCouponSchemaEntityMapper";
import { DiscountCoupon } from "../../../../domain/entities/discountCoupon";
import DiscountCouponRepository from "../../../../application/repositories/discountCouponRepository";
import { DiscountCouponSchema } from "../schemas/discountCouponSchema";
import { OrderDiscountCouponsSchema } from "../schemas/orderDiscountCouponsSchema";

@injectable()
export default class DiscountCouponRepositoryWithSequelizeAndMySql
    implements DiscountCouponRepository {
    async saveDiscountCoupon(discountCoupon: DiscountCoupon): Promise<DiscountCoupon> {
        const discountCouponSchema = DiscountCouponSchemaEntityMapper.entityToSchema(discountCoupon);
        const savedDiscountCoupon = await discountCouponSchema.save();
        return DiscountCouponSchemaEntityMapper.schemaToEntity(savedDiscountCoupon);
    }

    async addDiscountCouponToAnOrderByDiscountCode(discountCode: string, orderId: string): Promise<void> {
        const discountCouponId = (await DiscountCouponSchema.findOne({ where: { code: discountCode } })).id
        const orderDiscountCouponsSchema = OrderDiscountCouponsSchema.build({
            orderId: orderId,
            discountCouponId: discountCouponId
        });
        await orderDiscountCouponsSchema.save();
    }

    async findOneDiscountCouponByDiscountCode(discountCode: string): Promise<DiscountCoupon> {
        const discountCouponSchema = await DiscountCouponSchema.findOne({ where: { code: discountCode } });
        if (!discountCouponSchema) return null;
        return DiscountCouponSchemaEntityMapper.schemaToEntity(discountCouponSchema)
    }
}