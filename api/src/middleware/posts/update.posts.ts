import { asyncMw } from 'express-asyncmw';
import repository from 'repository';
import { createOnlyAdminResponse } from 'utils/responses';

export const updatePostMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.id !== req.post.userId && !req.isAdmin) {
    const response = createOnlyAdminResponse();
    return res.status(response.code).json(response);
  }

  const data = await repository.post.resourceToModel(req.body);
  await repository.post.update(req.params.id, data);

  return next();
});
