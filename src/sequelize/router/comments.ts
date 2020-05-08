import {Router, Request, Response, NextFunction} from 'express';

import {Comment, Article} from '../models';

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
	const article = await Article.findByPk(String(req.body.articleId));

	if (article) {
		const comment = await article.createComment({
			text: String(req.body.text),
		});

		return res.json({comment});
	}

	res.json({article});
});

router.get('/article/:articleId', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const article = await Article.findByPk(String(req.params.articleId));

		if (article) {
			const count = await article.countComments();

			return res.json({count});
		}

		res.json({article});
	} catch (err) {
		next(err);
	}
});

export default router;
