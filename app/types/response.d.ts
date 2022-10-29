export type UserLogin = {
  id: number;
  token: string;
};

export type User = {
  Login: UserLogin;
};

export type Resource<T extends CloudAR.Resource.ResourceKey> = {
  code: number;
  status: string;
  data: CloudAR.Resource.ResourceMap[T];
};

export type Resources<T extends CloudAR.Resource.ResourceKey> = {
  code: number;
  status: string;
  data: CloudAR.Resource.ResourceMap[T][];
  page: ResourceInfo;
};
