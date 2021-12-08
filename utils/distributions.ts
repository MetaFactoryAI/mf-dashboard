/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import { ethers } from "ethers";

function normaliseBuyerData(data: any) {
  return Object.keys(data).reduce((result: any, key: any) => {
    const newResult = result;
    const element = data[key];

    if (result[element.address]) {
      const originalAmount = ethers.utils.parseEther(newResult[element.address].toString());
      const newAmount = ethers.utils.parseEther(element.amount.toString());
      const cumulatedAmount = originalAmount.add(newAmount);
      newResult[element.address] = ethers.utils.formatEther(cumulatedAmount);

      return newResult;
    }

    newResult[element.address] = element.amount;
    return newResult;
  }, {});
}

function normaliseDesignerData(data: any) {
  return Object.keys(data).reduce((result: any, key: any) => {
    try {
      const newResult = result;
      const order = data[key];

      Object.keys(order).forEach((address) => {
        const amount = order[address];

        if (result[address]) {
          const originalAmount = ethers.utils.parseEther(newResult[address].toString());
          const newAmount = ethers.utils.parseEther(amount.toString());
          const cumulatedAmount = originalAmount.add(newAmount);

          newResult[address] = ethers.utils.formatEther(cumulatedAmount);
        } else {
          newResult[address] = amount;
        }
      });

      return newResult;
    } catch (error) {
      return result;
    }
  }, {});
}

async function fetchDistributions() {
  console.log("Fetching members data...");

  const dateFormatter = new Intl.DateTimeFormat("en-us", {
    month: "short",
    year: "numeric",
  });

  const data: any = {};
  let currentDate = new Date(2020, 1, 1);

  // fetch and map json data per each month from a github repo
  do {
    const currentDir = dateFormatter.format(currentDate).replace(/\s/g, "").toLowerCase();
    const baseUrl = `https://raw.githubusercontent.com/MetaFactoryAI/robot-distributions/master/${currentDir}`;

    // eslint-disable-next-line no-await-in-loop
    const buyerRewardsByOrderData = await fetch(`${baseUrl}/buyerRewardsByOrder.json`).then(
      handleResponse,
    );

    // eslint-disable-next-line no-await-in-loop
    const designerRewardsByOrderData = await fetch(`${baseUrl}/designerRewardsByOrder.json`).then(
      handleResponse,
    );

    if (buyerRewardsByOrderData || designerRewardsByOrderData) {
      data[currentDir] = {};

      if (buyerRewardsByOrderData)
        data[currentDir].buyerRewardsByOrder = normaliseBuyerData(buyerRewardsByOrderData);

      if (designerRewardsByOrderData)
        data[currentDir].designerRewardsByOrder = normaliseDesignerData(designerRewardsByOrderData);
    }

    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
  } while (currentDate <= new Date());

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

function handleResponse(response: { text: () => Promise<string>; ok: boolean }) {
  return response.text().then((text) => {
    const data = response.ok && text && JSON.parse(text);

    return data;
  });
}
