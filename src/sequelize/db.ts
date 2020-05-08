import {Sequelize} from 'sequelize';
import {Logger} from 'winston';

import {getLogger} from './utils/logger';

const logger = getLogger(module);

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres',
	logging: (msg: string): Logger => logger.debug(msg),
});

sequelize
	.sync({force: true})
	// .sync()
	.then(() => logger.info('PostgreSQL [sync]'))
	.catch((err: Error) => logger.error(err.message));

sequelize
	.authenticate()
	.then(() => logger.info('PostgreSQL [auth]'))
	.catch((err: Error) => logger.error(err.message));

export default sequelize;
