// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AsasantaTrust {

    struct TrustProof {
        string userId;
        uint256 trustScore;
        string decision;
        uint256 timestamp;
    }

    mapping(string => TrustProof) public proofs;

    event TrustProofStored(
        string userId,
        uint256 trustScore,
        string decision,
        uint256 timestamp
    );


    function submitTrustProof(
        string memory userId,
        uint256 trustScore,
        string memory decision
    ) public {

        proofs[userId] = TrustProof({
            userId: userId,
            trustScore: trustScore,
            decision: decision,
            timestamp: block.timestamp
        });


        emit TrustProofStored(
            userId,
            trustScore,
            decision,
            block.timestamp
        );
    }


    function getTrustProof(
        string memory userId
    )
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        TrustProof memory proof = proofs[userId];

        return (
            proof.userId,
            proof.trustScore,
            proof.decision,
            proof.timestamp
        );
    }
}