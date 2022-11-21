import { NextFunction, Request, response, Response } from 'express';

export async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({ message: 'Internal server error' });
}

export default errorHandler;
