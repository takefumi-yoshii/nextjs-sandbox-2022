import { DefaultBodyType, MockedRequest, RestHandler } from "msw";

export type MockHandlerFactoryArgs<T> = {
  status?: number;
  delay?: number;
  stub?: Partial<T>;
  mock?: jest.Mock;
};

export type MockHandlerFactory<T extends DefaultBodyType> = (
  args?: MockHandlerFactoryArgs<T>
) => RestHandler<MockedRequest<T>>;
