const typeDefs = `
  type Query {
    dummy: Int,
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Books],
    allAuthors: [Author],
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]!
    ): Books,

    addAuthor(
      name: String!,
      born: Int!
    ): Author,

    editAuthor(name: String, setBornTo: Int): Author,

    createUser(
      username: String!,
      favoriteGenre: String!
    ): User

    login(
      username: String!,
      password: String!
    ): Token
  }

  type Author {
    name: String,
    id: ID,
    born: Int,
    bookCount: Int
  }

  type Books {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String]
  }

  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Books
  }
`;

module.exports = typeDefs;
