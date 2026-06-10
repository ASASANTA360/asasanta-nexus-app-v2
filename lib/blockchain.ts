import { ethers } from "ethers";


export async function getProvider() {

  if (!(window as any).ethereum) {
    throw new Error(
      "No Web3 wallet detected"
    );
  }

  return new ethers.BrowserProvider(
    (window as any).ethereum
  );
}


export async function getSigner() {

  const provider = await getProvider();

  return provider.getSigner();
}


export async function getWalletAddress() {

  const signer = await getSigner();

  return signer.getAddress();
}