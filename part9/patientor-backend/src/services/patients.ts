import { v1 as uuid } from 'uuid';

import patientsData from '../../dataPatients';

import { NewPatient, type Patient } from '../types';

const id: string = uuid();

const patients: Patient[] = patientsData;

const getPatients = (): Omit<Patient, 'ssr'>[] => {
  // to get the data without 'ssr'
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    id,
    name,
    occupation,
  }));
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

export default { getPatients, addPatient };
