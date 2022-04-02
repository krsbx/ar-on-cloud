import express, { Express } from 'express';
import usersRoutes from '../routes/users';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.use('/users', usersRoutes);
};
