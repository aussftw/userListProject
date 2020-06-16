import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserType } from '../interfaces/index';
import { Card, Typography, CardHeader, CardContent, CardActions, Divider, IconButton } from '@material-ui/core';
import { getUsers, deletePost, editPost } from '../redux/actions/index';
import { AppStateType } from '../redux/store';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import styled from 'styled-components';

const IndexPage: React.FC = () => {
  const dispatch = useDispatch();
  const users: [] = useSelector((state: AppStateType) => state.app.users);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage, setPostsPerPage] = useState<number>(5);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const indexOfLastPost: number = currentPage * postPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postPerPage;
  const currentPost = users.slice(indexOfFirstPost, indexOfLastPost);

  console.log(currentPost);

  return (
    <PostsWrapper>
      {users.length ? (
        [...users].reverse().map((user: UserType) => (
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
                <Link href="/user/[user.id]" as={`/user/${user.id}`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
                <Divider orientation="vertical" variant="fullWidth" style={{ height: '40px', width: '2px' }} />
                <IconButton>
                  <DeleteIcon onClick={() => dispatch(deletePost(user.id))} />
                </IconButton>
              </CardActions>
            </Card>
          </Post>
        ))
      ) : (
        <Typography>There are no available users, but you can create one.</Typography>
      )}
    </PostsWrapper>
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
`;
