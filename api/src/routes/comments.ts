import { Router } from 'express';
import * as comments from 'middleware/comments';
import * as user from 'middleware/users';

const router = Router();

// POST /comments
router.post('/', user.authMw, comments.createCommentMw, comments.returnCommentMw);

// GET /comments
router.get('/', user.authMw, user.isAdminMw, comments.getCommentsMw, comments.returnCommentsMw);

// GET /comments/:id
router.get('/:id', comments.getCommentMw, comments.returnCommentMw);

// PATCH /comments/:id
router.patch(
  '/:id',
  user.authMw,
  comments.getCommentMw,
  comments.updateCommentMw,
  comments.getCommentMw,
  comments.returnCommentMw
);

// DELETE /comments/:id
router.delete('/:id', user.authMw, comments.getCommentMw, comments.deleteCommentMw);

export default router;
