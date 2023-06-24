import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import SetYears from './SetYears';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) return <div>loading</div>;

  const allAuthors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {allAuthors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetYears />
    </div>
  );
};

export default Authors;
