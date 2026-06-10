"use client";

import { useState } from "react";
import { PHAROS_NETWORK } from "@/lib/pharos";

export default function PharosWallet() {

  const [wallet, setWallet] = useState<string | null>(null);

  async function switchToPharos() {
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: PHAROS_NETWORK.chainId,
          },
        ],
      });

    } catch (error: any) {

      if (error.code === 4902) {

        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [PHAROS_NETWORK],
        });

      } else {
        console.error(
          "Network switch failed:",
          error
        );
      }
    }
  }


  async function connectWallet() {
    try {

      if (!(window as any).ethereum) {
        alert("Please install a Web3 wallet");
        return;
      }

      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      await switchToPharos();

      setWallet(accounts[0]);

    } catch (error) {
      console.error(
        "Wallet connection failed:",
        error
      );
    }
  }


  function disconnectWallet() {
    setWallet(null);
  }


  return (
    <div className="bg-[#050816] border border-white/10 rounded-3xl p-8">

      <h2 className="text-3xl font-black mb-6">
        Pharos Wallet
      </h2>

      {wallet ? (

        <div>

          <p className="text-green-400 mb-4">
            Connected
          </p>

          <p className="break-all text-gray-300">
            {wallet}
          </p>

          <button
            onClick={disconnectWallet}
            className="mt-6 px-6 py-3 rounded-xl bg-red-500 font-bold"
          >
            Disconnect
          </button>

        </div>

      ) : (

        <button
          onClick={connectWallet}
          className="px-8 py-4 rounded-2xl bg-purple-600 font-bold"
        >
          Connect Wallet
        </button>

      )}

    </div>
  );
}