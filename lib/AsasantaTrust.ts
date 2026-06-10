import { ethers } from "ethers";

import contractData from
"../artifacts/contracts/casper/AsasantaTrust.sol/AsasantaTrust.json";


const CONTRACT_ADDRESS =
"0xF706c18fe5537dfD47988023Ab114D8865C9Eff8";


async function getContract() {

  if (!(window as any).ethereum) {
    throw new Error(
      "Please install MetaMask"
    );
  }


  const provider =
    new ethers.BrowserProvider(
      (window as any).ethereum
    );


  const signer =
    await provider.getSigner();


  return new ethers.Contract(
    CONTRACT_ADDRESS,
    contractData.abi,
    signer
  );
}


// Submit trust proof to blockchain

export async function submitTrustProof(
  userId: string,
  trustScore: number,
  decision: string
) {

  const contract =
    await getContract();


  const tx =
    await contract.submitTrustProof(
      userId,
      trustScore,
      decision
    );


  await tx.wait();


  return tx.hash;
}


// Read trust proof from blockchain

export async function getTrustProof(
  userId: string
) {

  const contract =
    await getContract();


  const result =
    await contract.getTrustProof(
      userId
    );


  return {
    userId: result[0],
    trustScore: Number(result[1]),
    decision: result[2],
    timestamp: Number(result[3]),
  };
}