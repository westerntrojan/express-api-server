import {Router, Request, Response, NextFunction} from 'express';

import {Category} from '../models';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categories = await Category.findAll({
			include: ['articles'],
		});

		res.json({categories});
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const category = await Category.create(req.body);

		res.json({category});
	} catch (err) {
		next(err);
	}
});

export default router;
