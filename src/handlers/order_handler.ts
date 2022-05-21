import express, { NextFunction, Request, Response } from 'express';
import { order, ordersStore } from '../models/order_model';
//import jwt from 'jsonwebtoken';
// import db from '../database';

const store = new ordersStore();

// handler functions here
export const index = async (_req: Request, res: Response) => {
  try{
    const order = await store.index();
  res.json(order);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (req: Request, res: Response) => {
  try{
    const order = await store.show(req.params.id);
  res.json(order);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const getOrderByUserId = async (req: Request, res: Response) => {
  try{
const order = await store.getOrderByUserId(req.params.user_id);
  res.json(order);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const destroy = async (_req: Request, res: Response) => {
  try{
    const neworder = await store.delete(_req.params.id);
  res.json(neworder);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const order: order = {
      id: req.body.id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const neworder = await store.create(order);
    res.json(neworder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const update = async (req: Request, res: Response) => {
  try{
    const order: order = {
    id: parseInt(req.params.id),
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    user_id: req.body.user_id,
    status: req.body.status,
  };

  const neworder = await store.update(order);
  res.json(neworder);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};
