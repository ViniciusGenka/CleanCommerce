import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD,
	{
		dialect: 'mysql',
		logging: false,
	}
);
sequelize.sync({ alter: true })