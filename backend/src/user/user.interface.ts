export interface IUser {
  userId: string;
  username: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  isVoted: boolean;
  role: string;
}

export interface CreateUser {
  username: string;
  password: string;
  role?: string;
}

export interface Query {
  field: string;
  operator: '=' | '<' | '>' | '!=' | 'like';
  value: string;
}
