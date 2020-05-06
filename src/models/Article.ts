import {Model, DataTypes} from 'sequelize';
import slugify from 'slugify';

import sequelize from '../db';
import Comment from './Comment';

class Article extends Model {
	public id!: number;
	public title!: string;
	public text!: string;
	public slug!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Article.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		title: {
			type: new DataTypes.STRING(255),
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		slug: {
			type: new DataTypes.STRING(255),
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'articles',
	},
);

Article.beforeValidate((article: Article) => {
	article.slug = slugify(article.title, {
		lower: true,
		replacement: '-',
	});
});

// one to many
Article.hasMany(Comment, {
	sourceKey: 'id',
	foreignKey: 'articleId',
	as: 'comments',
	onDelete: 'cascade',
});

export default Article;
