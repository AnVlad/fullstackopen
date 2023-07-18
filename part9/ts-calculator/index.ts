import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './calculateExercises';

const app = express();
const PORT = 4000;

interface errorInformation {
  error: string;
}

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    const calculated = calculateBmi(Number(height), Number(weight));

    res.send({ height, weight, bmi: calculated });
  } catch (error: unknown) {
    let message: string = 'Something went wrong';

    if (error instanceof Error) {
      message = error.message;
    }

    const errorInformation: errorInformation = {
      error: message,
    };

    res.send(errorInformation);
  }
});

app.get('/exercises', (req, res) => {
  const paramError: Error = new Error('malformatted parameters');

  try {
    const daily_exercises: number[] = req.body.daily_exercises;
    const target: number = req.body.target;

    if (!daily_exercises || !target) throw new Error('parameters missing');

    if (!(typeof target === 'number')) throw paramError;

    daily_exercises.forEach((elem) => {
      if (!(typeof elem === 'number')) throw paramError;
    });

    const calculatedInformation = calculateExercises(daily_exercises, target);

    res.send(calculatedInformation);
  } catch (error: unknown) {
    let message: string = 'Something went wrong';

    if (error instanceof Error) {
      message = error.message;
    }

    const errorInformation: errorInformation = {
      error: message,
    };
    res.send(errorInformation);
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
