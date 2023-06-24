import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) return <div>loading</div>;

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((author) => (
            <tr key={author.id}>
              <td>{author.title}</td>
              <td>{author.author}</td>
              <td>{author.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;