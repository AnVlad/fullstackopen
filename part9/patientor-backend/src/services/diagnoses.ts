import diagnosesData from '../data/dataDiagnosis';

import type { Diagnosis } from '../types';

const diagnosis: Diagnosis[] = diagnosesData;

const getDiagnoses = () => {
  return diagnosis;
};

export default { getDiagnoses };
