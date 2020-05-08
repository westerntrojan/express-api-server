import {Router, Request, Response, NextFunction} from 'express';

import Article from '../models/Article';
import Tag from '../models/Tag';
import Comment from '../models/Comment';

const router = Router();

router.get('/articles', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const articles = await Article.findAll({include: ['tags']});

		res.json({articles});
	} catch (err) {
		next(err);
	}
});

router.get('/articles/:slug', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const article = await Article.scope('full').findOne({where: {slug: req.params.slug}});

		res.json({article});
	} catch (err) {
		next(err);
	}
});

router.post('/articles', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const article = await Article.create(req.body);

		if (req.body.tags) {
			await Promise.all(
				req.body.tags.map(async (slug: string) => {
					const tag = await Tag.findOne({where: {slug}});

					if (tag) {
						await article.$add('tag', tag);
					}
				}),
			);
		}

		res.json({article});
	} catch (err) {
		next(err);
	}
});

router.post('/comments', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const article = await Article.findByPk(String(req.body.articleId));

		if (article) {
			const comment = await article.$create('comment', {
				text: String(req.body.text),
			});

			return res.json({comment});
		}

		res.json({article});
	} catch (err) {
		next(err);
	}
});

router.get('/tags', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tags = await Tag.findAll();

		res.json({tags});
	} catch (err) {
		next(err);
	}
});

router.post('/tags', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tag = await Tag.create(req.body);

		res.json({tag});
	} catch (err) {
		next(err);
	}
});

export default router;
