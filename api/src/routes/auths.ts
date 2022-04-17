import { Router } from 'express';
import * as user from '../middleware/users';

const router = Router();

// POST /auths/login
router.post('/login', user.loginMw);

// POST /auths/register
router.post('/register', user.createUserMw);

export default router;
