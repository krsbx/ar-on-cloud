import { RESOURCE_NAME } from '../constant';
import { UserRole } from './global';

export type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  userId: number;
};

export type User = {
  id: number;
  email: string;
  username: string;
  profile?: Profile;
  comments?: Comment[];
  posts?: Post[];
  role: UserRole;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  user?: User;
  userId: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: number;
  content: string;
  user?: User;
  userId: number;
  Post?: Post;
  postId: number;
  createdAt: string;
  updatedAt: string;
};

export type ResourceKey = typeof RESOURCE_NAME[keyof typeof RESOURCE_NAME];

export type ResourceMap = {
  [RESOURCE_NAME.USER]: User;
  [RESOURCE_NAME.PROFILE]: Profile;
  [RESOURCE_NAME.POST]: Post;
  [RESOURCE_NAME.COMMENT]: Comment;
};

export type ResourceStructure<T extends ResourceKey> = {
  rows: {
    [id: number]: ResourceMap[T];
  };
  count: number;
};

export type Resources = {
  [RESOURCE_NAME.USER]: ResourceStructure<'user'>;
  [RESOURCE_NAME.PROFILE]: ResourceStructure<'profile'>;
  [RESOURCE_NAME.POST]: ResourceStructure<'post'>;
  [RESOURCE_NAME.COMMENT]: ResourceStructure<'comment'>;
};
