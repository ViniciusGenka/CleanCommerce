import { Promotion } from "./promotion";

export default class Category {
    public id: string | null;
    public name: string;
    public promotions: Promotion[];

    constructor(
        name: string,
        id?: string,
        promotions?: Promotion[]
    ) {
        this.id = id ? id : null;
        this.name = name;
        this.promotions = promotions ? promotions : [];
    }
}
