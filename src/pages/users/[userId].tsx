import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getSingleUser } from '../../redux/actions/index';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import UserDetails from '../../components/UserDetails/UserDetails';

const User: React.FC = () => {
  const dispatch = useDispatch();
  const userLoading = useSelector((state: AppStateType) => state.app.userLoading);

  const router = useRouter();
  const userId = typeof router.query.userId === 'string' && router.query.userId;

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUser(userId));
    }
  }, [userId]);

  return (
    <>
      {userLoading ? (
        <Wrapper>
          <Typography style={{ fontSize: 24, fontWeight: 'bold' }}>Loading...</Typography>
        </Wrapper>
      ) : (
        <Wrapper>
          <UserDetails />
        </Wrapper>
      )}
    </>
  );
};

export default User;

const Wrapper = styled.div`
  margin: 7rem auto;
  @media (min-width: 998px) {
    margin: 10rem auto;
  }
`;
