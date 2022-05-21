import express, { NextFunction, Request, Response } from 'express';
import {
  order_product,
  order_productsStore,
} from '../models/order_products_model';
//import jwt from 'jsonwebtoken';
// import db from '../database';

const store = new order_productsStore();

// handler functions here
export const index = async (_req: Request, res: Response) => {
  try{
    const product = await store.index();
  res.json(product);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (req: Request, res: Response) => {
  try{
    const product = await store.show(req.params.id);
  res.json(product);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const product: order_product = {
      id: req.body.id,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      price: req.body.price,
    };

    const newproduct = await store.create(req.body);
    res.json(newproduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const destroy = async (_req: Request, res: Response) => {
  try{
    const newuproduct = await store.delete(_req.params.id);
  res.json(newuproduct);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const update = async (req: Request, res: Response) => {
  try{
    const product: order_product = {
    id: parseInt(req.params.id),
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  const newproduct = await store.update(product);
  res.json(newproduct);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};
