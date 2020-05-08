import {Model, DataTypes} from 'sequelize';
import slugify from 'slugify';

import sequelize from '../db';

class Category extends Model {
	public id!: number;
	public name!: string;
	public slug!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Category.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: new DataTypes.STRING(255),
			allowNull: false,
		},
		slug: {
			type: new DataTypes.STRING(255),
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'categories',
	},
);

Category.beforeValidate((article: Category) => {
	article.slug = slugify(article.name, {
		lower: true,
		replacement: '-',
	});
});

export default Category;
