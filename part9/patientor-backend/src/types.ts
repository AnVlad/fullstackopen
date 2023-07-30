export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface OccupationalHealthcareEntry {
  id: string;
  date: string;
  type: 'OccupationalHealthcare';
  specialist: string;
  employerName: string;
  diagnosisCodes: string[];
  description: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry {
  id: string;
  date: string;
  type: 'Hospital';
  specialist: string;
  diagnosisCodes: string[];
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

export type PatientEntry = HospitalEntry | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth: string;
  entries?: Array<PatientEntry>;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;
