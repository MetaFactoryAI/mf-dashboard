import { utils } from "web3";
import MerkleTree from "./merkleTree";
// import balances from "../public/10_totals.json";

const loadTree = (balances) => {
  const elements = [];
  let balance;
  let leaf;

  Object.keys(balances).forEach((address) => {
    balance = utils.toWei(balances[address]);

    leaf = utils.soliditySha3(address, balance);
    elements.push(leaf);
  });

  return new MerkleTree(elements);
};

export default loadTree;
