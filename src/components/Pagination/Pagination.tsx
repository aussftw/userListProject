import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from '@material-ui/core';

type Props = {
  postsPerPage: number;
  totalPosts: number;
};

const Pagination: React.FC<Props> = (props) => {
  const pageNumbers: Array<number> = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(props.postsPerPage, 'pagi');
  console.log(props.totalPosts, 'total');

  return (
    <div
      style={{ marginTop: 200, marginBottom: 200, justifyContent: 'center', display: 'flex', backgroundColor: 'red' }}
    >
      {pageNumbers.map((number: number, index: number) => (
        <button
          style={{ color: '#000', fontSize: 30 }}
          key={number}
          onClick={() => Router.push(`/?page=${number + 1}`)}
        >
          {console.log(number)}
          {index}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
