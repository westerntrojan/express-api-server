import {Table, Column, ForeignKey, Model} from 'sequelize-typescript';

import Article from './Article';
import Tag from './Tag';

@Table({
	tableName: 'article_tags',
})
class ArticleTag extends Model<ArticleTag> {
	@ForeignKey(() => Article)
	@Column
	articleId!: number;

	@ForeignKey(() => Tag)
	@Column
	tagId!: number;
}

export default ArticleTag;
