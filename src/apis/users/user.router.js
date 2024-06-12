import express from 'express';
import UserController from './user.controller';

const route = express.Router();

// route.get('/', UserController.getAll);
// route.get('/:id', UserController.getDetail);
// route.post('/', UserController.postUser);
// route.put('/:id', UserController.putUser);
// route.put('/:id', UserController.delUser);

route.route('/')
    .get(UserController.getAll)
    .post( UserController.postUser);

route.route('/:id')
    .get(UserController.getDetail)
    .put(UserController.putUser)
    .delete(UserController.delUser);

export default route;