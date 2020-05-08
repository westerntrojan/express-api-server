import {Model, DataTypes} from 'sequelize';
import slugify from 'slugify';

import sequelize from '../db';

class Tag extends Model {
	public id!: number;
	public name!: string;
	public slug!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Tag.init(
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
		tableName: 'tags',
	},
);

Tag.beforeValidate((tag: Tag) => {
	tag.slug = slugify(tag.name, {
		lower: true,
		replacement: '-',
	});
});

export default Tag;
