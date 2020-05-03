import express, {Application, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import router from './router';
import {getLogger} from './utils/logger';

dotenv.config();
const logger = getLogger(module);
const isProd = process.env.NODE_ENV === 'production';

const app: Application = express();

// middleware
if (isProd) {
	app.use(morgan('combined'));
} else {
	app.use(morgan('dev'));
}

// router
app.use('/', router);

// 404
app.use((req: Request, res: Response) => {
	res.status(404).json({error: 'Sorry cant find that !'});
});

// 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(err.message);
	res.status(500).json({error: {msg: 'Error. Try again'}});
});

export default app;
