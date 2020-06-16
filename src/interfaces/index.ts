export type Comment = {
  postId: number;
  body: string;
  id: number;
};

export type CreationUserType = {
  name: string;
  surname: string;
  desc: string;
};

export type PostsType = {
  id: number;
  title: string;
  body: string;
  comments: Array<Comment>;
};

export type UserType = {
  id: number;
  name: string;
  surname: string;
  desc: string;
};
