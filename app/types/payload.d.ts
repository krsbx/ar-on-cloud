export type UserRegister = {
  username: string;
  email: string;
  password: string;
};

export type UserLogin = Omit<UserRegister, 'username'> & {
  always: boolean;
};

export type User = {
  Register: UserRegister;
  Login: UserLogin;
};
