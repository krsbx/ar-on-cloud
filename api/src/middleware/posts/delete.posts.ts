import asyncMw from 'express-asyncmw';
import repository from 'repository';
import { createOnlyAdminResponse } from 'utils/responses';

export const deletePostMw = asyncMw(async (req, res) => {
  if (req.userAuth.id !== req.post.userId && !req.isAdmin) {
    const response = createOnlyAdminResponse();
    return res.status(response.code).json(response);
  }

  await repository.post.delete(req.params.id);

  return res.status(204).json({
    message: 'Post deleted',
  });
});
