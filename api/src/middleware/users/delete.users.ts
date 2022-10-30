import { asyncMw } from 'express-asyncmw';
import repository from 'repository';
import { createOnlyAdminResponse } from 'utils/responses';

export const deleteUserMw = asyncMw(async (req, res) => {
  if (req.userAuth.id !== +req.params.id && !req.isAdmin) {
    const response = createOnlyAdminResponse();
    return res.status(response.code).json(response);
  }

  await repository.user.delete(req.params.id);

  return res.status(204).json({
    message: 'User deleted',
  });
});
