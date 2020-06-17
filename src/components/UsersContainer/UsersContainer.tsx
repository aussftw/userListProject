import React from 'react';
import { UserType } from '../../interfaces/index';
import { red } from '@material-ui/core/colors';

// type Props = {
//   users: Array<UserType>;
// };

const UsersContainer: React.FC<any> = ({ users }) => {
  console.log(users, 'props');
  return (
    <div>
      {users.map((user: UserType) => (
        <div key={Math.random()} style={{ backgroundColor: '#red', height: 100, width: 100 }}>
          <p style={{ fontSize: 28, color: 'red' }}>{user.name}</p>
          <p>{user.surname}</p>
          <p>{user.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersContainer;
