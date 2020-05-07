import {Router} from 'express';

import articlesRouter from './articles';
import tagsRouter from './tags';
import usersRouter from './users';
import commentsRouter from './comments';
import categoriesRouter from './categories';

const router = Router();

router.use('/articles', articlesRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);
router.use('/comments', commentsRouter);
router.use('/categories', categoriesRouter);

export default router;
