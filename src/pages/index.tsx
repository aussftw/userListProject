import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserType } from '../interfaces/index';
import { Card, Typography, CardHeader, CardContent, CardActions, Divider, IconButton, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { getUsers, deleteUser, editUser } from '../redux/actions/index';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentUsers: Array<UserType> = users.slice(indexOfFirstPost, indexOfLastPost);
  const totalUsers: number = users.length;
  const pageNumbers: Array<number> = [];

  console.log(currentUsers);

  for (let i = 1; i <= Math.ceil(totalUsers / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // console.log(indexOfFirstPost, '1stpsot');
  // console.log(indexOfLastPost, 'last');
  // console.log(currentPost, 'current');
  // console.log(totalUsers, 'totalusers');
  console.log(pageNumbers, 'pageNu');

  return (
    <>
      <PostsWrapper>
        {users.length > 0 ? (
          [...currentUsers].reverse().map((user: UserType) => (
            <Post key={user.id}>
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
            </Post>
          ))
        ) : (
          <Typography>There are no available users, but you can create one.</Typography>
        )}

        {/* 
      {users.length > 0 ? <UsersContainer users={currentUsers} /> : <p>LOADING</p>} */}
      </PostsWrapper>

      {pageNumbers.map((number) => {
        <PaginationContaoner>
          <Button key={number} onClick={() => Router.push(`/?page=${number + 1}`)} variant="contained" color="primary">
            {number}
          </Button>
        </PaginationContaoner>;
      })}
    </>
  );
};

export default IndexPage;

const Post = styled.div`
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

const PostsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap !important;
  justify-content: flex-start;
  margin: 5rem 1rem;
  cursor: pointer;
  flex-direction: column;
`;

const PaginationContaoner = styled.div`
  display: 'flex';
  height: 10rem;
  background-color: 'grey';
  width: 300px;
`;
