import { asyncMw } from 'express-asyncmw';
import repository from 'repository';
import { createOnlyAdminResponse } from 'utils/responses';

export const deleteCommentMw = asyncMw(async (req, res) => {
  if (req.userAuth.id !== req.comment.userId && !req.isAdmin) {
    const response = createOnlyAdminResponse();
    return res.status(response.code).json(response);
  }

  await repository.comment.delete(req.params.id);

  return res.status(204).json({
    message: 'Comment deleted',
  });
});
