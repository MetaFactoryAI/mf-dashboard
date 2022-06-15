// @ts-ignore
export default async function handler(req, res) {
  const { id } = req.query;
  const data = await fetch(`https://mf-services.vercel.app/api/nftMetadata/${id}`);
  const result = await data.json();

  res.status(200).json(result);
}
