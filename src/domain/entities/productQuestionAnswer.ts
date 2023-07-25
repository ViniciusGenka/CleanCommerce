export default class ProductQuestionAnswer {
    public id: string | null;
    public questionId: string;
    public text: string;
    public userId: string;
    public createdAt: Date;

    constructor(
        questionId: string,
        text: string,
        userId: string,
        id?: string
    ) {
        this.id = id ? id : null;
        this.questionId = questionId;
        this.text = text;
        this.userId = userId;
        this.createdAt = new Date();
    }
}
