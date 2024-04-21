import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = (await connectDB).db('board');
  let result = await db
    .collection('comment')
    .find({ parent: new ObjectId(req.query.id) })
    .toArray();
  res.status(200).json(result);
};

export default handler;
