import { asyncMw } from 'express-asyncmw';
import repository from 'repository';
import { createOnlyAdminResponse } from 'utils/responses';

export const updateCommentMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.id !== req.comment.userId && !req.isAdmin) {
    const response = createOnlyAdminResponse();
    return res.status(response.code).json(response);
  }

  // If not an admin, then dont allow to update the postId
  if (req.post && !req.isAdmin) delete req.body.postId;

  const data = await repository.comment.resourceToModel(req.body);
  req.comment = await repository.comment.update(req.params.id, data);

  return next();
});
