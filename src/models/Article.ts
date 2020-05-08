import {
	Table,
	Column,
	Model,
	DataType,
	HasMany,
	BelongsToMany,
	Scopes,
	BeforeValidate,
	AllowNull,
	Index,
} from 'sequelize-typescript';
import slugify from 'slugify';

import Comment from './Comment';
import Tag from './Tag';
import ArticleTag from './ArticleTag';

@Scopes(() => ({
	full: {
		order: [['createdAt', 'DESC']],
		include: [
			{
				model: Comment,
				order: [['createdAt', 'DESC']],
			},
			{
				model: Tag,
				through: {attributes: []},
			},
		],
	},
}))
@Table({
	timestamps: true,
	tableName: 'articles',
})
class Article extends Model<Article> {
	@AllowNull(false)
	@Column({
		type: DataType.STRING,
	})
	title!: string;

	@AllowNull(false)
	@Column({
		type: DataType.TEXT,
	})
	text!: string;

	@Index
	@AllowNull(false)
	@Column({
		type: DataType.STRING,
	})
	slug!: string;

	@BeforeValidate
	static addSlug(article: Article): void {
		article.slug = slugify(article.title, {
			lower: true,
			replacement: '-',
		});
	}

	@HasMany(() => Comment, 'articleId')
	comments!: Comment[];

	@BelongsToMany(() => Tag, () => ArticleTag)
	tags!: Tag[];
}

export default Article;
