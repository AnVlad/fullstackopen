import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateNewBlogs from './CreateNewBlogs';

test('test new blog form', async () => {
  const handleSubmitFunction = jest.fn();
  const user = userEvent.setup();

  const container = render(
    <CreateNewBlogs createBlog={handleSubmitFunction} />
  ).container;

  const titleInput = container.querySelector('.title');
  const authorInput = container.querySelector('.author');
  const urlInput = container.querySelector('.url');
  const submitButton = container.querySelector('.submit-button');

  await user.type(titleInput, 'Testing a form');
  await user.type(authorInput, 'Author Seb');
  await user.type(urlInput, 'test.com');
  await user.click(submitButton);

  expect(handleSubmitFunction.mock.calls).toHaveLength(1);
  expect(handleSubmitFunction.mock.calls[0][0].title).toBe('Testing a form');
  expect(handleSubmitFunction.mock.calls[0][0].author).toBe('Author Seb');
  expect(handleSubmitFunction.mock.calls[0][0].url).toBe('test.com');
});
