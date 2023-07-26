import Part from './Part';
import { CourseParts } from '../courseParts';

const Content = ({ courseParts }: { courseParts: CourseParts[] }) => {
  return (
    <>
      {courseParts.map((coursePart) => {
        return <Part key={coursePart.name} coursePart={coursePart} />;
      })}
    </>
  );
};

export default Content;
