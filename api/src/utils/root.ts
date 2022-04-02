import express, { Express } from 'express';
import usersRoutes from '../routes/users';
import { queryParserMw } from '../middleware/queryParser';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.get('*', queryParserMw);
  app.use('/users', usersRoutes);
};
