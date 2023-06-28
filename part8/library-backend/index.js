require('dotenv').config();

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const { GraphQLError } = require('graphql');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

console.log('connecting to ', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

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

`;

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const book = await Book.find({ author: author._id }).populate('author');

        return book;
      }
      if (args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre] } });

        return books;
      }
      return Book.find({}).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser.username) {
        throw new GraphQLError('you have to login before adding new books', {
          extensions: {
            code: 'BAD_AUTHORIZATION',
          },
        });
      }

      if (args.title.length <= 5) {
        throw new GraphQLError('Title must be longer than 5 charter', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const book = new Book({ ...args });

      book.populate('author');

      return book.save();
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser.username) {
        throw new GraphQLError('you have to login before adding new books', {
          extensions: {
            code: 'BAD_AUTHORIZATION',
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      return author.save();
    },

    addAuthor: async (root, args) => {
      if (args.name.length < 2) {
        throw new GraphQLError('Name must be longer than 1 charter', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const author = new Author({ ...args });

      return author.save();
    },

    createUser: async (root, args) => {
      const user = new User({ ...args });
      return user.save();
    },

    login: async (root, args) => {
      //to simplify the password is hardcoded
      if (args.password !== 'Secret') {
        throw new GraphQLError('Incorrect password', {
          extensions: {
            code: 'WRONG_CREDENTIALS',
          },
        });
      }

      const user = await User.findOne({ username: args.username });

      if (user === null || !user.username) {
        throw new GraphQLError('Incorrect username', {
          extensions: {
            code: 'WRONG_CREDENTIALS',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
      };
    },
  },

  Author: {
    bookCount: async (root, args) => {
      const author = await Author.findOne({ name: root.name });
      const books = await Book.find({ author: author._id });
      return books.length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith('Bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
