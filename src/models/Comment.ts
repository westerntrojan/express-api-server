import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';

import Article from './Article';

@Table({
	tableName: 'comments',
})
class Comment extends Model<Comment> {
	@Column({
		type: DataType.TEXT,
	})
	text!: string;

	@ForeignKey(() => Article)
	@Column
	articleId!: number;

	@BelongsTo(() => Article)
	article!: Article;
}

export default Comment;
