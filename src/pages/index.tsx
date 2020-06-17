import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserType } from '../interfaces/index';
import { Card, Typography, CardHeader, CardContent, CardActions, Divider, IconButton } from '@material-ui/core';
import { getUsers, deleteUser } from '../redux/actions/index';
import { AppStateType } from '../redux/store';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import UsersContainer from '../components/UsersContainer/UsersContainer';

const IndexPage: React.FC = () => {
  const dispatch = useDispatch();
  const users: [] = useSelector((state: AppStateType) => state.app.users);
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log(users.length, 'QU');
  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentUsers: Array<UserType> = users.slice(indexOfFirstPost, indexOfLastPost);
  const totalUsers: number = users.length;
  const pageNumbers: Array<number> = [];

  return (
    <>
      <UsersWrapper>
        {users.length > 0 ? (
          [...users].reverse().map((user: UserType) => (
            <User key={user.id}>
              <Card>
                <CardHeader
                  title={
                    typeof user.name === 'undefined' || user.name === ''
                      ? 'Oopps, looks like someone forgot about title.'
                      : user.name.length > 50
                      ? user.name.slice(0, 50) + '...'
                      : `${user.name}  ${user.surname}`
                  }
                  style={{ backgroundColor: '#77a0a9', minHeight: '98px' }}
                />
                <CardContent style={{ minHeight: '170px' }}>
                  <Typography>
                    {typeof user.desc === 'undefined' || user.desc === '' ? 'Oopps, empty post, you see!' : user.desc}
                  </Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Link href="/users/[userId]" as={`/users/${user.id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <Divider orientation="vertical" variant="fullWidth" style={{ height: '40px', width: '2px' }} />
                  <IconButton onClick={() => dispatch(deleteUser(user.id))}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </User>
          ))
        ) : (
          <Typography>There are no available users, but you can create one.</Typography>
        )}
      </UsersWrapper>

      {/* <div
        style={{
          marginTop: 200,
          marginBottom: 200,
          justifyContent: 'center',
          display: 'flex',
          backgroundColor: 'red',
        }}
      >
        {pageNumbers.length < 0 ? (
          <p>loading</p>
        ) : (
          pageNumbers.map((number: number, index: number) => (
            <button
              style={{ color: '#000', fontSize: 30 }}
              key={number}
              onClick={() => Router.push(`/?page=${number + 1}`)}
            >
              {console.log(number)}
              {index}
            </button>
          ))
        )}
      </div> */}
    </>
  );
};

export default IndexPage;

const User = styled.div`
  padding-right: 1rem;
  width: 32.7%;
  margin-bottom: 2rem;
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  @media (max-width: 992px) {
    width: 50%;
    padding-right: 10px;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
  }
`;

const UsersWrapper = styled.div`
  display: flex;
  flex-flow: row wrap !important;
  justify-content: flex-start;
  margin: 5rem 1rem;
  cursor: pointer;
  // flex-direction: column;
`;
