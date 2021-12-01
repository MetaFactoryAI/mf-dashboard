import fs from "fs";
import path from "path";

function fetchDistributions() {
  console.log("Fetching members data...");
  const currentDir = "april2021";
  const data = fetch(
    `https://raw.githubusercontent.com/MetaFactoryAI/robot-distributions/master/${currentDir}/airdrop.json`,
  ).then(handleResponse);

  return data;
}

const DISTRIBUTIONS_CACHE_PATH = ".distributions";

export default async function getDistributions() {
  let cachedData;

  try {
    console.log("Reading cache");
    cachedData = JSON.parse(
      fs.readFileSync(path.join(__dirname, DISTRIBUTIONS_CACHE_PATH), "utf8"),
    );
  } catch (error) {
    console.log("Member cache not initialized");
  }

  if (!cachedData) {
    const data = await fetchDistributions();

    try {
      fs.writeFileSync(
        path.join(__dirname, DISTRIBUTIONS_CACHE_PATH),
        JSON.stringify(data),
        "utf8",
      );
      console.log("Wrote to distributions cache");
    } catch (error) {
      console.log("ERROR WRITING DISTRIBUTIONS CACHE TO FILE");
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
}

// helper functions

function handleResponse(response: {
  text: () => Promise<string>;
  ok: unknown;
  statusText: unknown;
}) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      throw new Error(`Fetch error: ${error}`);
    }
    return data;
  });
}
