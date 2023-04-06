declare interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

export interface RequestUser extends Request {
  user: {
    hashedPassword?: string;
    id: string | number;
  }; // or any other type
  body: {
    password: string;
  };
}
