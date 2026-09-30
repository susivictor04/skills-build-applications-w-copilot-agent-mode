import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/octofit.js';

const apiRouter = Router();

function createCollectionRouter(model: Model<any>) {
  const collectionRouter = Router();

  collectionRouter.get('/', async (_request, response, next) => {
    try {
      const records = await model.find().lean();
      response.json(records);
    } catch (error) {
      next(error);
    }
  });

  collectionRouter.post('/', async (request, response, next) => {
    try {
      const record = await model.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });

  return collectionRouter;
}

apiRouter.use('/users', createCollectionRouter(User));
apiRouter.use('/teams', createCollectionRouter(Team));
apiRouter.use('/activities', createCollectionRouter(Activity));
apiRouter.use('/leaderboard', createCollectionRouter(Leaderboard));
apiRouter.use('/workouts', createCollectionRouter(Workout));

export default apiRouter;