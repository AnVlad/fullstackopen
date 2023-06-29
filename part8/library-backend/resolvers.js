const Author = require('./models/author');
const User = require('./models/user');
const Book = require('./models/book');
const { GraphQLError } = require('graphql');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const jwt = require('jsonwebtoken');

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
        const books = await Book.find({
          genres: { $in: [args.genre] },
        }).populate('author');

        return books;
      }
      return Book.find({}).populate('author');
    },

    allAuthors: async () => {
      return Author.find({});
    },

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

      const author = await Author.findById(args.author);

      if (author._id) {
        if (author.bookCount) {
          author.bookCount = author.bookCount + 1;
          await author.save();
        } else {
          const books = await Book.find({ author: author._id });
          author.bookCount = books.length + 1;
          console.log(
            'books.length',
            books.length,
            'author.bookCount',
            author.bookCount
          );
          await author.save();
        }
      }

      book.populate('author');

      pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') });

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

      const author = new Author({ ...args, bookCount: 0 });

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

  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator('BOOK_ADDED') },
  },
};

module.exports = resolvers;
