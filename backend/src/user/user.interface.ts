export interface IUser {
  userId: string;
  username: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  voted: boolean;
  role: string;
}

export interface CreateUser {
  username: string;
  password: string;
  role?: string;
}
