import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';

class Comment extends Model {
	public id!: number;
	public text!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'comments',
	},
);

export default Comment;
