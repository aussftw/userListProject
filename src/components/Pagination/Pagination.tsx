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

  return (
    <div className={}>
      {pageNumbers.map((number) => {
        <Button key={number} onClick={() => Router.push(`/?page=${number + 1}`)}>
          {number}
        </Button>;
      })}
    </div>
  );
};

export default Pagination;
