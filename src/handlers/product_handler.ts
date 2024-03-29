import express, { NextFunction, Request, Response } from 'express';
import { product, productsStore } from '../models/product_model';
//import jwt from 'jsonwebtoken';
// import db from '../database';

const store = new productsStore();

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
    const product: product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };
    const newproduct = await store.create(product);
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
    const product: product = {
    id: parseInt(req.params.id),
    name: req.body.name,
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
