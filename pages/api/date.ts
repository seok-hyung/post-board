const handler = (req: any, res: any) => {
  // if(req.method === 'POST'){

  // }
  const date = new Date();
  return res.status(200).json(date);
};
export default handler;
