import { Router } from 'express';
import * as user from '../middleware/user';

const router = Router();

router.post('/login', user.loginMw);
router.post('/', user.authMw, user.createUserMw, user.returnUserMw);
router.get('/', user.authMw, user.getUsersMw, user.returnUsersMw);
router.get('/:id', user.authMw, user.getUserMw, user.returnUserMw);
router.patch(
  '/:id',
  user.authMw,
  user.getUserMw,
  user.updateUserMw,
  user.getUserMw,
  user.returnUserMw
);
router.delete('/:id', user.authMw, user.getUserMw, user.deleteUserMw);

export default router;
