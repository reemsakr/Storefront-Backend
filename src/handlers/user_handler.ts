import express, { NextFunction, Request, Response } from 'express';
import { user, usersStore } from '../models/user_model';

import jwt from 'jsonwebtoken';
import db from '../database';

const store = new usersStore();

// handler functions here
export const index = async (_req: Request, res: Response) => {
  const user = await store.index();
  res.json(user);
};

export const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);

  res.json(user);
};

export const create = async (req: Request, res: Response) => {
  try {
    const user: user = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password_digest: req.body.password_digest,
      username: req.body.username,
    };
    const newuser = await store.create(req.body);

    res.json(newuser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.body.username;
    const password = req.body.password_digest;

    const user = await store.authentication(username, password);
    const token = jwt.sign(
      { user },
      process.env.TOKEN_SECRET as unknown as string
    );
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'the username and passowrd does not match , please try again',
      });
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'user authenticated successfuly',
    });
  } catch (err) {
    return next(err);
  }
};

export const destroy = async (_req: Request, res: Response) => {
  const newuser = await store.delete(_req.params.id);
  res.json(newuser);
};

export const update = async (req: Request, res: Response) => {
  const user: user = {
    id: parseInt(req.params.id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password_digest: req.body.password_digest,
    username: req.body.username,
  };

  const newuser = await store.update(user);
  res.json(newuser);
};
