import express from 'express';
import pollsController from './polls.controller';
import verifyMiddleware from '../../middleware/verify.middleware';
import verifyPollMiddleware from '../../middleware/verifyPoll.middleware';

const route = express.Router()

route.route('/')
    .get(verifyMiddleware.verifyAuth, pollsController.getAll)
    .post(verifyMiddleware.verifyAuth, pollsController.createPoll);

route.route('/:id') //id poll
    .get(verifyMiddleware.verifyAuth, verifyPollMiddleware.verifyPollExist, pollsController.getDetail)
    .post(verifyMiddleware.verifyAuth, verifyPollMiddleware.verifyPollExist, pollsController.createOpt) //1 or many options
    .delete(verifyMiddleware.verifyAuth, verifyPollMiddleware.verifyPollExist, verifyPollMiddleware.verifyPollCreator, pollsController.deletePoll);

route.route('/opt/:id') //id opt
    .put(verifyMiddleware.verifyAuth, pollsController.updateOpt)
    .delete(verifyMiddleware.verifyAuth, pollsController.deleteOpt);

route.route('/:id/:optId') //id poll
    .post(verifyMiddleware.verifyAuth, verifyPollMiddleware.verifyPollExist, pollsController.vote)
    .delete(verifyMiddleware.verifyAuth, verifyPollMiddleware.verifyPollExist, pollsController.unVote);
   
export default route
