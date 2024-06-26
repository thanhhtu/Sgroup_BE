import express from 'express';
import usersController from './users.controller';

const route = express.Router();

route.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);

route.route('/:id')
    .get(usersController.getDetailUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

export default route;