import express, { NextFunction, Request, Response } from 'express';
import Error from '../interfaces/error.interface';
import jwt from 'jsonwebtoken';
import db from '../database';
const handleUnauthorizedError = (res: Response) => {
  return res.status(401).json({
    message: 'login failed:please try again',
  });
};
const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');

    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(
          token,
          process.env.TOKEN_SECRET as unknown as string
        );
        if (decode) {
          next();
        } else {
          handleUnauthorizedError(res);
        }
      } else {
        handleUnauthorizedError(res);
      }
    } else {
      handleUnauthorizedError(res);
    }
  } catch (error) {
    handleUnauthorizedError(res);
  }
};

export default validateTokenMiddleware;
