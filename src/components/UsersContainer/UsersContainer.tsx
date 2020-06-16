import React from 'react';
import { UserType } from '../../interfaces/index';
import { red } from '@material-ui/core/colors';

// type Props = {
//   users: Array<UserType>;
// };

const UsersContainer: React.FC<any> = ({ users }) => {
  console.log(users);
  return (
    <>
      {users.map(() => (
        <div key={Math.random()} style={{ backgroundColor: '#red', height: 100, width: 100 }}>
          <p style={{ fontSize: 28, color: 'red' }}>{users.name}</p>
          <p>{users.surname}</p>
          <p>{users.desc}</p>
        </div>
      ))}
    </>
  );
};

export default UsersContainer;
