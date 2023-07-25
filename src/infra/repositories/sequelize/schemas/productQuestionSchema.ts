import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { ProductQuestionAnswerSchema } from './productQuestionAnswerSchema';

interface ProductQuestionSchemaAttributes {
    id: string;
    productId: string;
    text: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

type ProductQuestionSchemaCreationAttributes = Optional<
    ProductQuestionSchemaAttributes,
    'id'
>;

export class ProductQuestionSchema extends Model<
    ProductQuestionSchemaAttributes,
    ProductQuestionSchemaCreationAttributes
> {
    public id!: string;
    public productId!: string;
    public answer?: ProductQuestionAnswerSchema;
    public text!: string;
    public userId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

ProductQuestionSchema.init(
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

        productId: {
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
    { sequelize, timestamps: true, modelName: 'product_question' }
);

ProductQuestionSchema.hasOne(ProductQuestionAnswerSchema, {
    as: 'answer',
});
ProductQuestionAnswerSchema.belongsTo(ProductQuestionSchema, {
    foreignKey: 'questionId',
    as: 'question',
});