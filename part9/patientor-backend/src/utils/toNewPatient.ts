import { Gender, NewPatient } from '../types';

const parseName = (name: unknown): string => {
  if (!name || !(typeof name === 'string')) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (
    !dateOfBirth ||
    typeof dateOfBirth !== 'string' ||
    !Date.parse(dateOfBirth)
  ) {
    throw new Error(`Incorrect or missing date: ${dateOfBirth}`);
  }

  return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || typeof occupation !== 'string') {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || typeof gender !== 'string' || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const isGender = (gender: string): gender is Gender => {
  return ['male', 'female', 'other'].includes(gender);
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'occupation' in object &&
    'gender' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;
