import { errorHandling } from 'config/error';
import cors from 'cors';
import express, { Express } from 'express';
import { queryParserMw } from 'middleware/queryParser';
import authsRoutes from 'routes/auths';
import commentsRoutes from 'routes/comments';
import postsRoutes from 'routes/posts';
import profilesRoutes from 'routes/profiles';
import usersRoutes from 'routes/users';

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
  // Error Response Handling
  app.use(errorHandling);
};
