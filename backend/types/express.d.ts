declare interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}
