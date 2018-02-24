import { Users } from '../models/index';

const userExcludeFields = { password: 0, login: 0 };

const getUserById = (req, res, next) => {
  req.model = Users;
  req.exludingFields = userExcludeFields;
  next();
};

const saveNewUser = (req, res, next) => {
  req.model = new Users(req.body);
  next();
};

const deleteUserById = (req, res, next) => {
  req.model = Users;
  next();
};

export default {
  getUserById,
  saveNewUser,
  deleteUserById
};
