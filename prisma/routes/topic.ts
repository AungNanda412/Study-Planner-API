import  express  from 'express';
import { auth } from '../../middlewares/auth';
import { showTopic } from '../../controllers/topicController';



export const topicRouter = express.Router();

topicRouter.get("/topics",auth, showTopic)

