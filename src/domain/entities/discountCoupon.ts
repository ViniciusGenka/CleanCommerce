import { injectable } from "inversify";

@injectable()
export class DiscountCoupon {
    public id: string | null;
    public code: string;
    public discountValue: number;
    public expirationDate: Date;
    public title: string;
    public userId: string;
    public createdAt: Date;

    constructor(code: string, discountValue: number, expirationDate: Date, title: string, userId: string, id?: string) {
        this.code = code;
        this.discountValue = discountValue;
        this.expirationDate = expirationDate;
        this.title = title;
        this.userId = userId;
        this.createdAt = new Date();
        this.id = id ? id : null;
    }

    isValid(): boolean {
        const currentDate = new Date();
        return this.expirationDate > currentDate;
    }
}