import { Router } from 'express';
import * as profile from 'middleware/profiles';
import * as user from 'middleware/users';

const router = Router();

// POST /profiles
router.post('/', user.authMw, user.isAdminMw, profile.createProfileMw, profile.returnProfileMw);

// GET /profiles
router.get('/', user.authMw, user.isAdminMw, profile.getProfilesMw, profile.returnProfilesMw);

// GET /profiles/:id
router.get('/:id', user.authMw, user.isAdminMw, profile.getProfileMw, profile.returnProfileMw);

// PATCH /profiles
router.patch('/', user.authMw, user.isAdminMw, profile.updateProfileMw, profile.returnProfileMw);

// DELETE /profiles
router.delete('/', user.authMw, user.isAdminMw, profile.deleteProfileMw);

export default router;
