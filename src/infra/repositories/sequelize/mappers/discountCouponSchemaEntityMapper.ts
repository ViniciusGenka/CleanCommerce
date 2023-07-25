import { DiscountCoupon } from "../../../../domain/entities/discountCoupon";
import { DiscountCouponSchema } from "../schemas/discountCouponSchema";

export default class DiscountCouponSchemaEntityMapper {
    static schemaToEntity(discountCouponSchema: DiscountCouponSchema): DiscountCoupon {
        return new DiscountCoupon(
            discountCouponSchema.code,
            discountCouponSchema.discountValue,
            discountCouponSchema.expirationDate,
            discountCouponSchema.title,
            discountCouponSchema.id
        );
    }

    static entityToSchema(discountCouponEntity: DiscountCoupon): DiscountCouponSchema {
        return DiscountCouponSchema.build({
            id: discountCouponEntity.id,
            code: discountCouponEntity.code,
            title: discountCouponEntity.title,
            discountValue: discountCouponEntity.discountValue,
            expirationDate: discountCouponEntity.expirationDate,
            createdAt: discountCouponEntity.createdAt
        });
    }

    static entitiesToSchemas(discountCouponEntities: DiscountCoupon[]): DiscountCouponSchema[] {
        let discountCouponSchemas: DiscountCouponSchema[] = [];
        for (let i = 0; i < discountCouponEntities.length; i++) {
            const discountCouponSchema = DiscountCouponSchema.build({
                id: discountCouponEntities[i].id,
                code: discountCouponEntities[i].code,
                title: discountCouponEntities[i].title,
                discountValue: discountCouponEntities[i].discountValue,
                expirationDate: discountCouponEntities[i].expirationDate,
                createdAt: discountCouponEntities[i].createdAt
            });
            discountCouponSchemas.push(discountCouponSchema);
        }
        return discountCouponSchemas;
    }

    static schemasToEntities(discountCouponSchemas: DiscountCouponSchema[]): DiscountCoupon[] {
        let discountCouponEntities: DiscountCoupon[] = [];
        for (let i = 0; i < discountCouponSchemas.length; i++) {
            const discountCouponEntity = new DiscountCoupon(
                discountCouponSchemas[i].code,
                discountCouponSchemas[i].discountValue,
                discountCouponSchemas[i].expirationDate,
                discountCouponSchemas[i].title,
                discountCouponSchemas[i].id
            );
            discountCouponEntities.push(discountCouponEntity);
        }
        return discountCouponEntities
    }
}