import { NextFunction, Request, Response } from 'express';

export const QueryAPIMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { query } = req;
  Object.keys(query).forEach((key) => {
    if (['undefined', 'null', ''].includes(query[key] as string)) {
      delete query[key];
    }
  });
  next();
};
