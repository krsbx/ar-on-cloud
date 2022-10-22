import { RESOURCE_NAME, USER_ROLE } from 'utils/constant/global';

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

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
  [RESOURCE_NAME.USERS]: ResourceStructure<typeof RESOURCE_NAME.USERS>;
  [RESOURCE_NAME.PROFILES]: ResourceStructure<typeof RESOURCE_NAME.PROFILES>;
  [RESOURCE_NAME.POSTS]: ResourceStructure<typeof RESOURCE_NAME.POSTS>;
  [RESOURCE_NAME.COMMENTS]: ResourceStructure<typeof RESOURCE_NAME.COMMENTS>;
};
