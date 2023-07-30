import express from 'express';
import patientsData from '../services/patients';
import { Patient, PatientEntry } from '../types';
import toNewPatientEntry from '../utils/toNewPatient';
import patients from '../services/patients';
import toNewEntries from '../utils/toNewEntries';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsData.getPatients());
});

patientsRouter.post('/', (req, res) => {
  const newPatient = toNewPatientEntry(req.body);

  const addedPatient: Patient = patients.addPatient(newPatient);

  res.status(202).send(addedPatient);
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patientsList = patients.getPatientsAllInformation();

  const patient: Patient | undefined = patientsList.find(
    (patient) => patient.id === id
  );

  if (patient === undefined) res.status(400).end();

  if (patient?.entries && patient?.entries.length > 0) {
    patient.entries.forEach((entry) => {
      if (
        entry.type !== 'Hospital' &&
        entry.type !== 'OccupationalHealthcare'
      ) {
        res.status(400).end();
      }
    });
  }

  res.status(200).send(patient);
});

patientsRouter.post('/:id/entries', (req, res) => {
  let errorMessage = 'Something went wrong.';

  try {
    const id = req.params.id;
    const entries = toNewEntries(req.body);

    const newEntries: PatientEntry = toNewEntries(entries);

    const updatedPatient = patients.updatePatient(newEntries, id);

    res.status(200).send(updatedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage = ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
