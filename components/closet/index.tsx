import type { NextPage } from "next";
import React from "react";
import ClaimWearables from "./ClaimWearables";

const Closet: NextPage = () => <>{true && <ClaimWearables />}</>;

export default Closet;
