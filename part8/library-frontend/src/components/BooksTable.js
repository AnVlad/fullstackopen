import React from 'react';

function BooksTable({ list }) {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {list.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BooksTable;
