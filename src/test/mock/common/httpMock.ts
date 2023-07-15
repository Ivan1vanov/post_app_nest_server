import { Request, Response } from 'express';

export const responseMock = {
  cookie: jest.fn().mockReturnThis(),
} as unknown as jest.Mocked<Response>;
export const requestMock = {
  cookies: {},
} as unknown as jest.Mocked<Request>;
