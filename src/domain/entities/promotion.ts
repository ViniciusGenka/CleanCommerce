import { injectable } from "inversify";

@injectable()
export class Promotion {
    public id: string | null;
    public discountValue: number;
    public minimumPurchaseQuantity: number;
    public expirationDate: Date;
    public name: string;
    public userId: string;
    public createdAt: Date;

    constructor(discountValue: number, expirationDate: Date, name: string, userId: string, id?: string, minimumPurchaseQuantity?: number) {
        this.discountValue = discountValue;
        this.expirationDate = expirationDate;
        this.minimumPurchaseQuantity = minimumPurchaseQuantity ? minimumPurchaseQuantity : 1;
        this.name = name;
        this.userId = userId;
        this.createdAt = new Date();
        this.id = id ? id : null;
    }

    isValid(): boolean {
        const currentDate = new Date();
        return this.expirationDate > currentDate;
    }
}