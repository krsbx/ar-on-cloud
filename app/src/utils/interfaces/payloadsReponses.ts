export type UserRegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type UserLoginPayload = {
  email: string;
  password: string;
  always: boolean;
};

export type UserLoginResponse = {
  id: number;
  token: string;
};
