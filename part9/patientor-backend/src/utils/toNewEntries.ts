import {
  Diagnosis,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDate = (date: unknown): string => {
  if (typeof date === 'string' && Date.parse(date)) {
    return date;
  }

  throw new Error('wrong date');
};

const parseDescription = (description: unknown): string => {
  if (typeof description === 'string') {
    return description;
  }

  throw new Error('wrong description');
};

const parseSpecialist = (specialist: unknown): string => {
  if (typeof specialist === 'string') {
    return specialist;
  }

  throw new Error('wrong specialist');
};

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (typeof discharge !== 'object' || discharge === null) {
    throw new Error('wrong discharge');
  }

  if ('date' in discharge && 'criteria' in discharge) {
    if (typeof discharge.criteria === 'string') {
      const date: string = parseDate(discharge.date);
      return { criteria: discharge.criteria, date: date };
    }
    throw new Error('date or criteria in discharge is not string');
  }

  throw new Error('missing date or criteria in discharge');
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (typeof sickLeave !== 'object' || sickLeave === null) {
    throw new Error('wrong sickLeave');
  }

  if ('startDate' in sickLeave && 'endDate' in sickLeave) {
    if (
      typeof sickLeave.startDate === 'string' &&
      typeof sickLeave.endDate === 'string'
    ) {
      return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
    }

    throw new Error('startDate or endDate in sickLeave is not string');
  }

  throw new Error('missing sickLeave');
};

const parseEmployerName = (employerName: unknown): string => {
  if (typeof employerName === 'string') return employerName;

  throw new Error('employerName is not string');
};

const newId = (): string => {
  const id = Date.now();
  return id.toString();
};

const toNewEntries = (
  entries: unknown
): HospitalEntry | OccupationalHealthcareEntry => {
  if (!entries || typeof entries !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in entries && entries.type === 'Hospital') {
    if (
      'date' in entries &&
      'description' in entries &&
      'diagnosisCodes' in entries &&
      'discharge' in entries &&
      'specialist' in entries
    ) {
      const newEntries: HospitalEntry = {
        date: parseDate(entries.date),
        description: parseDescription(entries.description),
        diagnosisCodes: parseDiagnosisCodes(entries.diagnosisCodes),
        specialist: parseSpecialist(entries.specialist),
        type: 'Hospital',
        discharge: parseDischarge(entries.discharge),
        id: newId(),
      };
      return newEntries;
    }
  }

  if ('type' in entries && entries.type === 'OccupationalHealthcare') {
    if (
      'date' in entries &&
      'description' in entries &&
      'diagnosisCodes' in entries &&
      'sickLeave' in entries &&
      'specialist' in entries &&
      'employerName' in entries
    ) {
      const newEntries: OccupationalHealthcareEntry = {
        date: parseDate(entries.date),
        description: parseDescription(entries.description),
        diagnosisCodes: parseDiagnosisCodes(entries.diagnosisCodes),
        specialist: parseSpecialist(entries.specialist),
        type: 'OccupationalHealthcare',
        sickLeave: parseSickLeave(entries.sickLeave),
        id: newId(),
        employerName: parseEmployerName(entries.employerName),
      };
      return newEntries;
    }
  }

  throw new Error('wrong type of entry');
};

export default toNewEntries;
