import express from 'express';
import { Users } from '../models';
import { insertModelMiddleware } from '../middlewares/insert-model';
const usersRoute = new express.Router();

const userExcludeFields = { password: 0, login: 0, _id: 0 };

usersRoute.get('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end('id is required');
    return;
  }

  Users
    .findOne({ id }, userExcludeFields)
    .then(user => res.json(user))
    .catch(err => {
      console.log(err);
      res.status(400).end(`Failed load users with id ${id}`);
    });
});

usersRoute.post('/', (req, res, next) => {
  const user = new Users(req.body);
  const error = user.validateSync();
  if (error) {
    res.status(400).send(error);
  }

  req.model = user;
  next();
}, insertModelMiddleware);

usersRoute.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end('id is required');
    return;
  }

  Users
    .findOne({ id })
    .remove()
    .exec()
    .then(() => {
      res.json({
        status: 'success'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).end(`Failed to delete users with id ${id}`);
    });
});


export default usersRoute;
