import express, { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cors from 'cors';
import authsRoutes from '../routes/auths';
import usersRoutes from '../routes/users';
import profilesRoutes from '../routes/profiles';
import postsRoutes from '../routes/posts';
import commentsRoutes from '../routes/comments';
import { queryParserMw } from '../middleware/queryParser';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cors());

  app.get('*', queryParserMw);
  app.use('/auth', authsRoutes);
  app.use('/users', usersRoutes);
  app.use('/profiles', profilesRoutes);
  app.use('/posts', postsRoutes);
  app.use('/comments', commentsRoutes);
};
