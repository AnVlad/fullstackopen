import express from 'express';
import patientsData from '../services/patients';
import { Patient } from '../types';
import toNewPatientEntry from '../utils/toNewPatient';
import patients from '../services/patients';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsData.getPatients());
});

patientsRouter.post('/', (req, res) => {
  const newPatient = toNewPatientEntry(req.body);

  const addedPatient: Patient = patients.addPatient(newPatient);

  res.status(202).send(addedPatient);
});

export default patientsRouter;
