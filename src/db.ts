import {Sequelize} from 'sequelize-typescript';
import {Logger} from 'winston';

import {getLogger} from './utils/logger';

const logger = getLogger(module);

const sequelize = new Sequelize({
	database: 'postgres',
	dialect: 'postgres',
	username: 'postgres',
	password: 'postgres',
	host: 'localhost',
	logging: (msg: string): Logger => logger.debug(msg),
	models: [__dirname + '/models'], // or [Player, Team]
});

sequelize
	// .sync({force: true})
	.sync()
	.then(() => logger.info('PostgreSQL [sync]'))
	.catch((err: Error) => logger.error(err.message));

export default sequelize;
