import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Users() {
  const users = useSelector((data) => data.allUsers);
  console.log(users);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <Link to={`${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Users;
