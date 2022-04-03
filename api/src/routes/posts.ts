import { Router } from 'express';
import * as user from '../middleware/users';
import * as post from '../middleware/posts';
import commentsRoutes from './comments';

const router = Router();

// POST /posts
router.post('/', user.authMw, user.isAdminMw, post.createPostMw, post.returnPostMw);

// GET /posts
router.get('/', post.getPostsMw, post.returnPostsMw);

// GET /posts/:id
router.get('/:id', post.getPostMw, post.returnPostMw);

// PATCH /posts/:id
router.patch(
  ':/id',
  user.authMw,
  user.isAdminMw,
  post.getPostMw,
  post.updatePostMw,
  post.getPostMw,
  post.returnPostMw
);

// DELETE /posts/:id
router.delete('/:id', user.authMw, user.isAdminMw, post.getPostMw, post.deletePostMw);

// ALL /posts/:id/comments
router.use('/:id/comments', user.authMw, post.getPostMw, commentsRoutes);

export default router;
