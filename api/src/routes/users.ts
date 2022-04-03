import { Router } from 'express';
import * as user from '../middleware/users';
import profileRoute from './profile';
import postsRoutes from './posts';
import commentsRoutes from './comments';

const router = Router();

// POST /users/login
router.post('/login', user.loginMw);

// POST /users
router.post('/', user.authMw, user.createUserMw, user.returnUserMw);

// GET /users
router.get('/', user.authMw, user.getUsersMw, user.returnUsersMw);

// GET /users/:id
router.get('/:id', user.authMw, user.getUserMw, user.returnUserMw);

// PATCH /users/:id
router.patch(
  '/:id',
  user.authMw,
  user.getUserMw,
  user.updateUserMw,
  user.getUserMw,
  user.returnUserMw
);

// DELETE /users/:id
router.delete('/:id', user.authMw, user.getUserMw, user.deleteUserMw);

// ALL /users/:id/profile
router.use('/:id/profile', user.authMw, user.getUserMw, profileRoute);

// ALL /users/:id/posts
router.use('/:id/posts', user.authMw, user.getUserMw, postsRoutes);

// ALL /users/:id/comments
router.use('/:id/comments', user.authMw, user.getUserMw, commentsRoutes);

export default router;
