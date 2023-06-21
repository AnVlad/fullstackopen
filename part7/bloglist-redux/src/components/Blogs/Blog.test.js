import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('rendering blog', () => {
  let container;
  const blog = {
    id: '6470b328e8583f99b55c64a1',
    title: 'Storac',
    author: 'Stringson',
    url: 'http:w23ldsa.com',
    likes: 23,
    user: '6470b328e8583f99b55c649a',
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test("renders blog's title and author", () => {
    const title = screen.getByText('Storac');
    const author = screen.getByText('Stringson');

    expect(title).toBeDefined();
    expect(author).toBeDefined();
  });

  test('does not renders URL or number of likes by default, display: none', () => {
    const div = container.querySelector('.details');
    expect(div).toHaveStyle('display: none');
  });

  test('renders URL and number of likes after clicking the button', async () => {
    const user = userEvent.setup();
    const button = container.querySelector('.show-details-button');
    await user.click(button);

    const div = container.querySelector('.details');
    expect(div).not.toHaveStyle('display: none');
  });

  test('the like button is clicked twice', async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    container = render(
      <Blog blog={blog} handleUpdateLikes={mockHandler} />
    ).container;

    const button = container.querySelector('.like-button');
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
