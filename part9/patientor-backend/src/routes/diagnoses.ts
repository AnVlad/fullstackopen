import express from 'express';
import diagnosesData from '../services/diagnoses';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnosesData.getDiagnoses());
});

export default diagnosesRouter;
