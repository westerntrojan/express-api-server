import {Router, Request, Response, NextFunction} from 'express';
import {Op} from 'sequelize';
import slugify from 'slugify';

import {Article, Comment, Tag} from '../models';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const articles = await Article.findAll({
			attributes: ['id', 'title', 'text', 'slug', 'createdAt'],
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: Tag,
					as: 'tags',
					attributes: ['name', 'slug'],
					through: {attributes: []},
				},
				{
					model: Comment,
					as: 'comments',
					attributes: ['id', 'text', 'articleId', 'createdAt'],
					order: [['createdAt', 'DESC']],
				},
			],
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
			order: [['createdAt', 'DESC']],
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
		});

		if (article) {
			const comments = await article.getComments();
			const tags = await article.getTags();

			return res.json({...article.toJSON(), tags, comments});
		}

		res.json({article});
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const article = await Article.create(req.body);

		if (req.body.tag) {
			const tag = await Tag.findOne({where: {slug: req.body.tag}});

			if (tag) {
				await article.addTag(tag);
			}
		}

		res.json({article});
	} catch (err) {
		next(err);
	}
});

router.put('/:articleId', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const slug = slugify(String(req.body.title), {
			lower: true,
			replacement: '-',
		});

		await Article.update(
			{...req.body, slug},
			{
				where: {
					id: req.params.articleId,
				},
			},
		);

		const article = await Article.findByPk(String(req.params.articleId));

		if (req.body.tag) {
			const tag = await Tag.findOne({where: {slug: req.body.tag}});

			if (article && tag) {
				await article.addTag(tag);
			}
		}

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
