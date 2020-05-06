import {Router, Request, Response, NextFunction} from 'express';
import {Op} from 'sequelize';
import slugify from 'slugify';

import {Article} from '../models';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const articles = await Article.findAll({
			include: ['comments'],
			order: [['createdAt', 'DESC']],
		});

		res.json({articles});
	} catch (err) {
		next(err);
	}
});

router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {s} = req.query;

		const articles = await Article.findAll({
			where: {
				[Op.or]: [
					{
						title: {
							[Op.like]: `%${s}%`,
						},
					},
					{
						text: {
							[Op.like]: `%${s}%`,
						},
					},
				],
			},
		});

		res.json({articles});
	} catch (err) {
		next(err);
	}
});

router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const article = await Article.findOne({
			where: {slug: req.params.slug},
			include: ['comments'],
		});

		res.json({article});
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {title, text} = req.query;

		const article = await Article.create({title, text});

		res.json({article});
	} catch (err) {
		next(err);
	}
});

router.put('/:articleId', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {title, text} = req.query;

		const slug = slugify(String(title), {
			lower: true,
			replacement: '-',
		});

		const article = await Article.update(
			{title, text, slug},
			{
				where: {
					id: req.params.articleId,
				},
			},
		);

		res.json({article});
	} catch (err) {
		next(err);
	}
});

router.delete('/:articleId', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const article = await Article.destroy({
			where: {
				id: req.params.articleId,
			},
		});

		res.json({article});
	} catch (err) {
		next(err);
	}
});

export default router;
