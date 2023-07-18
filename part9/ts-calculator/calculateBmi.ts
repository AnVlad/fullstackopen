const calculateBmi = (height: number, weight: number): string => {
  try {
    const result = weight / (height / 100) ** 2;

    if (result > 18.5 && result < 24.9) {
      return 'Normal (healthy weight)';
    }

    if (isNaN(height) || isNaN(weight)) throw new Error();

    return 'idk';
  } catch (error) {
    throw new Error('malformatted parameters');
  }
};

export default calculateBmi;
