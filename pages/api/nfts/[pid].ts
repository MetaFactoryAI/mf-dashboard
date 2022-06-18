// @ts-ignore
export default async function handler(req, res) {
  const { pid } = req.query;
  console.log(`https://mf-services.vercel.app/api/nftMetadata/${pid}`);
  const data = await fetch(`https://mf-services.vercel.app/api/nftMetadata/${pid}`);
  const result = await data.json();

  res.status(200).json(result);
}
