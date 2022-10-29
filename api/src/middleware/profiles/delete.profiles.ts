import asyncMw from 'express-asyncmw';
import repository from 'repository';

export const deleteProfileMw = asyncMw(async (req, res) => {
  await repository.profile.delete(req.params.id);

  return res.status(204).json({
    message: 'Profile deleted',
  });
});
