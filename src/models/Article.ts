import {Model, DataTypes} from 'sequelize';
import slugify from 'slugify';

import {
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyHasAssociationMixin,
	Association,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyRemoveAssociationMixin,
} from 'sequelize';

import sequelize from '../db';
import Comment from './Comment';
import User from './User';
import Category from './Category';
import Tag from './Tag';

class Article extends Model {
	public id!: number;
	public title!: string;
	public text!: string;
	public slug!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// for comments
	public getComments!: HasManyGetAssociationsMixin<Comment>;
	public createComment!: HasManyCreateAssociationMixin<Comment>;
	public countComments!: HasManyCountAssociationsMixin;

	// for tags
	public getTags!: HasManyGetAssociationsMixin<Tag>;
	public addTag!: HasManyAddAssociationMixin<Tag, number>;
	public hasTag!: HasManyHasAssociationMixin<Tag, number>;
	public removeTag!: HasManyRemoveAssociationMixin<Article, Tag>;
	public setTags!: HasManyAddAssociationMixin<Article, Tag>;
	public removeTags!: HasManyRemoveAssociationMixin<Article, Tag>;

	public readonly comments?: Comment[];

	public static associations: {
		comments: Association<Article, Comment>;
	};
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

User.hasMany(Article, {
	sourceKey: 'id',
	foreignKey: 'userId',
	as: 'articles',
	onDelete: 'cascade',
});

Category.hasMany(Article, {
	sourceKey: 'id',
	foreignKey: 'categoryId',
	as: 'articles',
	onDelete: 'cascade',
});

// many to many
Article.belongsToMany(Tag, {
	through: 'article_tag',
	as: 'tags',
	foreignKey: 'articleId',
	otherKey: 'tagId',
	onDelete: 'cascade',
});
Tag.belongsToMany(Article, {
	through: 'article_tag',
	as: 'articles',
	foreignKey: 'tagId',
	otherKey: 'articleId',
	onDelete: 'cascade',
});

export default Article;
