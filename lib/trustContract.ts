import { ethers } from "ethers";
import { getSigner } from "./blockchain";


// Temporary address (za mu canza zuwa real Pharos contract)
export const TRUST_CONTRACT_ADDRESS =
  "0x0000000000000000000000000000000000000000";


export const TRUST_CONTRACT_ABI = [

  "function submitTrustProof(string userId, uint256 trustScore, string decision) public returns (bool)",

  "function getTrustProof(string userId) public view returns (uint256, string)"

];


export async function getTrustContract() {

  const signer = await getSigner();

  return new ethers.Contract(
    TRUST_CONTRACT_ADDRESS,
    TRUST_CONTRACT_ABI,
    signer
  );
}

export async function submitTrustProof(
  userId: string,
  trustScore: number,
  decision: string
) {

  const contract = await getTrustContract();

  const tx = await contract.submitTrustProof(
    userId,
    trustScore,
    decision
  );

  console.log(
    "Transaction submitted:",
    tx.hash
  );

  await tx.wait();

  return tx.hash;
}