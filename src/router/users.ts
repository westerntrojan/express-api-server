import {Router, Request, Response, NextFunction} from 'express';

import {User} from '../models';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await User.findAll();

		res.json({users});
	} catch (err) {
		next(err);
	}
});

router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.findOne({where: {slug: req.params.slug}, raw: true});

		res.json({user});
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {name} = req.query;

		const user = await User.create({name});

		res.json({user});
	} catch (err) {
		next(err);
	}
});

export default router;