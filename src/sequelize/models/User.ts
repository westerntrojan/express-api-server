import {Model, DataTypes} from 'sequelize';
import slugify from 'slugify';

import sequelize from '../db';

class User extends Model {
	public id!: number;
	public name!: string;
	public slug!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
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
		tableName: 'users',
	},
);

User.beforeValidate((user: User) => {
	user.slug = slugify(user.name, {
		lower: true,
		replacement: '-',
	});
});

export default User;
