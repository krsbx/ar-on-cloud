import { Router } from 'express';
import * as profile from 'middleware/profile';

const router = Router();

// POST /users/:id/profile
router.post('/', profile.createProfileMw, profile.returnProfileMw);

// GET /users/:id/profile
router.get('/', profile.getProfileMw, profile.returnProfileMw);

// PATCH /users/:id/profile
router.patch(
  '/',
  profile.getProfileMw,
  profile.updateProfileMw,
  profile.getProfileMw,
  profile.returnProfileMw
);

// DELETE /users/:id/profile
router.delete('/', profile.getProfileMw, profile.deleteProfileMw);

export default router;
