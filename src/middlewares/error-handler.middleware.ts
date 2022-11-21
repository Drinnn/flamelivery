import { NextFunction, Request, Response } from 'express';

export async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  return res
    .status(500)
    .json({ message: `Internal server error: ${err.message}` });
}

export default errorHandler;
