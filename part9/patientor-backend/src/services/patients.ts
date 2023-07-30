import { v1 as uuid } from 'uuid';

import patientsData from '../data/dataPatients';

import {
  NewPatient,
  NonSensitivePatient,
  PatientEntry,
  type Patient,
} from '../types';

const id: string = uuid();

const patients: Patient[] = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  // to get the data without 'ssn'
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    id,
    name,
    occupation,
  }));
};

const getPatientsAllInformation = () => {
  return patients;
};

const addPatient = (object: NewPatient): Patient => {
  console.log(object);

  const newPatient: Patient = {
    ...object,
    id: id,
  };

  patients.push(newPatient);

  return newPatient;
};

const updatePatient = (object: PatientEntry, id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);

  if (patient === undefined) {
    throw new Error('wrong id');
  }

  if ('entries' in patient && patient.entries !== undefined) {
    patient.entries.push(object);
  } else {
    patient.entries = [object];
  }

  return patient;
};

export default {
  getPatients,
  addPatient,
  getPatientsAllInformation,
  updatePatient,
};
