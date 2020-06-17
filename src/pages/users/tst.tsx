import Pagination from '../../components/Pagination/Pagination';
import UsersContainer from '../../components/UsersContainer/UsersContainer';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import { AppStateType } from '../../redux/store';

import { getUsers, deleteUser, editUser, createUser } from '../../redux/actions/index';
import { UserType } from '../../interfaces/index';

const New: React.FC = () => {
  const dispatch = useDispatch();
  const users: [] = useSelector((state: AppStateType) => state.app.users);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentUsers: Array<UserType> = users.slice(indexOfFirstPost, indexOfLastPost);
  const totalUsers: number = users.length;
  const pageNumbers: Array<number> = [];

  console.log(currentUsers, '<<<< CURRENT');

  for (let i = 1; i <= Math.ceil(totalUsers / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <UsersContainer users={currentUsers} />
      <Pagination postsPerPage={postsPerPage} totalPosts={totalUsers} />

      {/* {pageNumbers.map((number) => {
        {
          console.log(number, 'button number');
        }

        <button key={number} onClick={() => Router.push(`/?page=${number + 1}`)}>
          {number}
        </button>;
      })} */}
    </div>
  );
};

export default New;
