import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        born
        id
        name
      }
      genres
      published
      id
      title
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query BooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      genres
      author {
        name
      }
      published
      title
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $genres: [String]!
    $published: Int!
  ) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      title
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      born
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const FAVORITE_GENRE = gql`
  query FavoriteGenre {
    me {
      favoriteGenre
    }
  }
`;
