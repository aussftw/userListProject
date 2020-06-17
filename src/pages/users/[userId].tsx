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
  const singleUser = useSelector((state: AppStateType) => state.app.singleUser);

  const router = useRouter();
  const userId = typeof router.query.userId === 'string' && router.query.userId;

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUser(userId));
    }
  }, [userId]);

  return (
    <>
      {singleUser ? (
        <Wrapper>
          <UserDetails />
        </Wrapper>
      ) : (
        <Wrapper>
          <Typography> Nothing here</Typography>
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
