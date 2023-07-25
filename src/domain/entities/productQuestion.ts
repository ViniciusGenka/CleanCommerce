import ProductQuestionAnswer from "./productQuestionAnswer";

export default class ProductQuestion {
    public id: string | null;
    public answer: ProductQuestionAnswer;
    public productId: string;
    public text: string;
    public userId: string;
    public createdAt: Date;

    constructor(
        productId: string,
        text: string,
        userId: string,
        id: string = null,
        answer: ProductQuestionAnswer = null
    ) {
        this.id = id ? id : null;
        this.productId = productId;
        this.text = text;
        this.userId = userId;
        this.answer = answer;
        this.createdAt = new Date();
    }
}
