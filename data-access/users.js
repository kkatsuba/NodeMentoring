import { users } from '../models';

const userSelectFields = ['id', 'firstName', 'lastName', 'email'];

const getAllUsers = () => users.findAll({ attributes: userSelectFields });

export {
    getAllUsers
};