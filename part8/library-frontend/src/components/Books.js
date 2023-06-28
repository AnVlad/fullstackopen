import { useQuery } from '@apollo/client';
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries';
import { useState } from 'react';
import BooksTable from './BooksTable';

const Books = () => {
  const [genre, setGenre] = useState('');

  const resultOfAllBooks = useQuery(ALL_BOOKS);

  const resultBooksByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  if (resultOfAllBooks.loading || resultBooksByGenre.loading) {
    return <div>loading</div>;
  }

  const books = resultOfAllBooks.data.allBooks;
  const listOfBooks = resultBooksByGenre.data.allBooks;

  const arrayOfGenres = [];
  books.forEach((book) => arrayOfGenres.push(...book.genres));
  const uniqueGenres = new Set(arrayOfGenres);

  return (
    <div>
      <h2>books</h2>

      <BooksTable list={listOfBooks} />

      {[...uniqueGenres].map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  );
};

export default Books;
