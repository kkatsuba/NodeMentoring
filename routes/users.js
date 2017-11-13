import express from 'express';
import * as data from '../data-access/users';

const usersRoute = new express.Router();

usersRoute.get('/', (req, res) => {
    data.getAllUsers().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(400).end('Failed load users');
    });
});


export default usersRoute;