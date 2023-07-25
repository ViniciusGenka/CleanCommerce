import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface ProductQuestionAnswerSchemaAttributes {
    id: string;
    questionId: string;
    text: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

type ProductQuestionAnswerSchemaCreationAttributes = Optional<
    ProductQuestionAnswerSchemaAttributes,
    'id'
>;

export class ProductQuestionAnswerSchema extends Model<
    ProductQuestionAnswerSchemaAttributes,
    ProductQuestionAnswerSchemaCreationAttributes
> {
    public id!: string;
    public questionId!: string;
    public text!: string;
    public userId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

ProductQuestionAnswerSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        questionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        text: {
            type: DataTypes.STRING,
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
    { sequelize, timestamps: true, modelName: 'product_question_answer' }
);
