export interface IParty {
  partyId: number;
  name: string;
  score: number;
  createAt: Date;
  updateAt: Date;
}

export interface ICreateParty {
  name: string;
}

export interface IUpdateParty {
  name: string;
}
