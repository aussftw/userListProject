import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserType } from '../interfaces/index';
import { Card, Typography, CardHeader, CardContent, CardActions, Divider, IconButton } from '@material-ui/core';
import { getUsers, deleteUser } from '../redux/actions/index';
import { AppStateType } from '../redux/store';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import styled from 'styled-components';

const IndexPage: React.FC = () => {
  const dispatch = useDispatch();
  const users: [] = useSelector((state: AppStateType) => state.app.users);
  const usersLoading: boolean = useSelector((state: AppStateType) => state.app.usersLoading);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <UsersWrapper>
        {!usersLoading ? (
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
                    {typeof user.desc === 'undefined' || user.desc === '' ? 'Description not aveliable!' : user.desc}
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
          <LoaderWrapper>
            <Typography style={{ fontSize: 24, fontWeight: 'bold' }}>Loading...</Typography>
          </LoaderWrapper>
        )}
      </UsersWrapper>
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
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 5rem auto;
`;
