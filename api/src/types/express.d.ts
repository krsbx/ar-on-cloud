export {};

declare global {
  namespace Express {
    import type { Profile, User, Post, Comment } from '@prisma/client';

    interface Request {
      profile?: Profile;
      profiles?: Profile[] | { rows: Profile[]; count: number };
      user?: User;
      users?: User[] | { rows: User[]; count: number };
      post?: Post;
      posts?: Post[] | { rows: Post[]; count: number };
      comment?: Comment;
      comments?: Comment[] | { rows: Comment[]; count: number };
    }
  }
}
