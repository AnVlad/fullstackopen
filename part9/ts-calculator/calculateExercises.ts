interface exercisesInformation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  array: number[],
  target: number = 2
): exercisesInformation => {
  array.forEach((elem) => {
    if (isNaN(elem / 10)) {
      throw new Error('EEEEEEROR');
    }
  });

  const workedDays = [];
  const workedHours = array.reduce((prev, current) => {
    if (current) workedDays.push(current);
    return prev + current;
  }, 0);

  const averageHoursOnDays = workedHours / workedDays.length;

  let rating: number;
  let ratingDescription: string;

  if (averageHoursOnDays >= 2.5) {
    rating = 3;
    ratingDescription = 'Very well, keep going and everything will be fine';
  } else if (averageHoursOnDays > 1) {
    rating = 2;
    ratingDescription = 'Not bad, do not lose your motivation!';
  } else {
    rating = 1;
    ratingDescription = "You'd better find some time for exercises";
  }

  return {
    periodLength: array.length,
    trainingDays: workedDays.length,
    success: workedDays.length === 7,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageHoursOnDays,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));

// const givenParams: number[] = process.argv.slice(2).map((elem) => Number(elem));

// try {
//   console.log(calculateExercises(givenParams));
// } catch (error) {
//   console.error('Something went wrong');
// }

export default calculateExercises;
