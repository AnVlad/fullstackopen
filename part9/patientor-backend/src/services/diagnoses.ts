import diagnosesData from '../../dataDiagnosis';

import type { Diagnosis } from '../types';

const diagnosis: Diagnosis[] = diagnosesData;

const getDiagnoses = () => {
  return diagnosis;
};

export default { getDiagnoses };
