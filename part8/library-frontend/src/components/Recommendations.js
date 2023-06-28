import React from 'react';
import BooksTable from './BooksTable';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries';

function Recommendations({ list }) {
  const getFavoriteGenre = useQuery(FAVORITE_GENRE);

  const getAllBooks = useQuery(ALL_BOOKS);

  if (!getFavoriteGenre.data || !getAllBooks.data) return <div>loading...</div>;

  const usersFavoriteGenre = getFavoriteGenre.data.me.favoriteGenre;
  const allBooks = getAllBooks.data.allBooks;

  return (
    <>
      <div>Recommendations</div>
      <p>books in your favorite genre</p>
      <BooksTable
        list={allBooks.filter((book) =>
          book.genres.includes(usersFavoriteGenre)
        )}
      />
    </>
  );
}

export default Recommendations;
