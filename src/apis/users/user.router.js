import express from 'express';
import UserController from './user.controller';

const route = express.Router();

route.route('/')
    .get(UserController.getAll)
    .post( UserController.postUser);

route.route('/:id')
    .get(UserController.getDetail)
    .put(UserController.putUser)
    .delete(UserController.delUser);

export default route;