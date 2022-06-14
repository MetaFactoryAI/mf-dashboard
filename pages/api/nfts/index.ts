// @ts-ignore
export default async function handler(req, res) {
  const data = await fetch("https://mf-services.vercel.app/api/nftMetadata");
  const result = await data.json();

  res.status(200).json(result);
}
