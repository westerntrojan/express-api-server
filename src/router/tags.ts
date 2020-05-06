import {Router, Request, Response, NextFunction} from 'express';

import {Tag} from '../models';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tags = await Tag.findAll();

		res.json({tags});
	} catch (err) {
		next(err);
	}
});

router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tag = await Tag.findOne({where: {slug: req.params.slug}, raw: true});

		res.json({tag});
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {name, articleId} = req.query;

		const tag = await Tag.create({name, articleId});

		res.json({tag});
	} catch (err) {
		next(err);
	}
});

export default router;
