const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const { initialBlogs, initialUser, blogsInDb } = require('./test_helper');
const User = require('../models/user');

let token = '';

beforeEach(async () => {
  await User.deleteMany({});
  let user = new User(initialUser);
  await user.save();

  const respondedData = await api.post('/api/login').send({
    username: initialUser.username,
    password: initialUser.password,
  });

  token = respondedData.body.token;

  await Blog.deleteMany({});

  let blogObject = initialBlogs[0];
  await api
    .post('/api/blogs')
    .set('Accept', 'application/json')
    .set('authorization', `bearer ${token}`)
    .send(blogObject);

  blogObject = initialBlogs[1];
  await api
    .post('/api/blogs')
    .set('Accept', 'application/json')
    .set('authorization', `bearer ${token}`)
    .send(blogObject);
});

describe('initial blogs are saved', () => {
  test('list returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe('verifying the existence of property', () => {
  test('verify unique identifier id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });

  test('verifying existence of likes property', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].likes);
  });
});

describe('posting new blogs', () => {
  test('successfully created a new blog', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };
    await api
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsAtBd = await blogsInDb();
    expect(blogsAtBd).toHaveLength(initialBlogs.length + 1);
    const content = blogsAtBd.map((blog) => blog.title);
    expect(content).toContain('Go To Statement Considered Harmful');
  });
});

describe('verifying when the property is not provided', () => {
  test('verify if likes property is missing', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    await api
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtBd = await blogsInDb();
    expect(blogsAtBd[blogsAtBd.length - 1].likes).toBe(0);
  });

  test('verify if url is missing return 400', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('verify status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    await api
      .post('/api/blogs')

      .send(newBlog)
      .expect(401);
  });
});

describe('deleting blogs', () => {
  test('the blog is successfully deleted', async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Accept', 'application/json')
      .set('authorization', `bearer ${token}`)
      .expect(204);

    const blogsAfterDeleting = await blogsInDb();

    expect(blogsAfterDeleting).toHaveLength(blogs.length - 1);
  });
});

describe('updating blogs', () => {
  test('update the likes on the blog', async () => {
    const blogs = await blogsInDb();
    const blogToUpdate = blogs[1];
    const updatedBlog = { ...blogToUpdate, likes: 123 };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog);

    const updatedBlogs = await blogsInDb();

    expect(updatedBlogs[1].likes).toBe(123);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
