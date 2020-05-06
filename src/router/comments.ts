import {Router, Request, Response, NextFunction} from 'express';

import {Comment} from '../models';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const comments = await Comment.findAll();

		res.json({comments});
	} catch (err) {
		next(err);
	}
});

router.get('/:commentId', async (req: Request, res: Response) => {
	const comment = await Comment.findByPk(req.params.commentId);

	res.json({comment});
});

router.post('/', async (req: Request, res: Response) => {
	const {articleId, text} = req.query;

	const comment = await Comment.create({articleId, text});

	res.json({comment});
});

export default router;
