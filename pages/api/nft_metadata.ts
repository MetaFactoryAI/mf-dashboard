export default async function handler(req, res) {
  const a = await fetch("https://mf-services.vercel.app/api/nftMetadata");
  fetch("https://mf-services.vercel.app/api/nftMetadata", {
    mode: "cors",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result = await a.json();

  res.status(200).json(result);
}
