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
  [RESOURCE_NAME.USERS]: User;
  [RESOURCE_NAME.PROFILES]: Profile;
  [RESOURCE_NAME.POSTS]: Post;
  [RESOURCE_NAME.COMMENTS]: Comment;
};

export type ResourceStructure<T extends ResourceKey> = {
  rows: {
    [id: number]: ResourceMap[T];
  };
  count: number;
};

export type Resources = {
  [RESOURCE_NAME.USERS]: ResourceStructure<'users'>;
  [RESOURCE_NAME.PROFILES]: ResourceStructure<'profiles'>;
  [RESOURCE_NAME.POSTS]: ResourceStructure<'posts'>;
  [RESOURCE_NAME.COMMENTS]: ResourceStructure<'comments'>;
};
