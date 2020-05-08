import {
	Table,
	Column,
	Model,
	DataType,
	BeforeValidate,
	BelongsToMany,
	// DefaultScope,
} from 'sequelize-typescript';
import slugify from 'slugify';

import Article from './Article';
import ArticleTag from './ArticleTag';

// @DefaultScope(() => ({
// 	attributes: ['id', 'title', 'text'],
// }))
@Table({
	tableName: 'tags',
})
class Tag extends Model<Tag> {
	@Column({
		type: DataType.STRING,
	})
	name!: string;

	@Column({
		type: DataType.STRING,
	})
	slug!: string;

	@BelongsToMany(() => Article, () => ArticleTag)
	articles!: Article[];

	@BeforeValidate
	static addSlug(tag: Tag): void {
		tag.slug = slugify(tag.name, {
			lower: true,
			replacement: '-',
		});
	}
}

export default Tag;
