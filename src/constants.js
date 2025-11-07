export const contractAddress = "0xDbbE8e5Da63130998f339d34920bda5b8CD81cB7";

export const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

export const contractABI = [
 {
  "inputs": [
   {
    "internalType": "string",
    "name": "_question",
    "type": "string"
   },
   {
    "internalType": "address",
    "name": "_arbitrator",
    "type": "address"
   },
   {
    "internalType": "uint256",
    "name": "_resolutionDate",
    "type": "uint256"
   }
  ],
  "name": "createMarket",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "_tokenAddress",
    "type": "address"
   },
   {
    "internalType": "string",
    "name": "_uri",
    "type": "string"
   }
  ],
  "stateMutability": "nonpayable",
  "type": "constructor"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "sender",
    "type": "address"
   },
   {
    "internalType": "uint256",
    "name": "balance",
    "type": "uint256"
   },
   {
    "internalType": "uint256",
    "name": "needed",
    "type": "uint256"
   },
   {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
   }
  ],
  "name": "ERC1155InsufficientBalance",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "approver",
    "type": "address"
   }
  ],
  "name": "ERC1155InvalidApprover",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "idsLength",
    "type": "uint256"
   },
   {
    "internalType": "uint256",
    "name": "valuesLength",
    "type": "uint256"
   }
  ],
  "name": "ERC1155InvalidArrayLength",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "operator",
    "type": "address"
   }
  ],
  "name": "ERC1155InvalidOperator",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "receiver",
    "type": "address"
   }
  ],
  "name": "ERC1155InvalidReceiver",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "sender",
    "type": "address"
   }
  ],
  "name": "ERC1155InvalidSender",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "operator",
    "type": "address"
   },
   {
    "internalType": "address",
    "name": "owner",
    "type": "address"
   }
  ],
  "name": "ERC1155MissingApprovalForAll",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "owner",
    "type": "address"
   }
  ],
  "name": "OwnableInvalidOwner",
  "type": "error"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "account",
    "type": "address"
   }
  ],
  "name": "OwnableUnauthorizedAccount",
  "type": "error"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "internalType": "address",
    "name": "account",
    "type": "address"
   },
   {
    "indexed": true,
    "internalType": "address",
    "name": "operator",
    "type": "address"
   },
   {
    "indexed": false,
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
   }
  ],
  "name": "ApprovalForAll",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
   },
   {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_marketId",
    "type": "uint256"
   },
   {
    "internalType": "bool",
    "name": "_outcome",
    "type": "bool"
   },
   {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
   }
  ],
  "name": "placeBet",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_marketId",
    "type": "uint256"
   },
   {
    "internalType": "bool",
    "name": "_winningOutcome",
    "type": "bool"
   }
  ],
  "name": "resolveMarket",
  "outputs": [],
"stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "from",
    "type": "address"
   },
   {
    "internalType": "address",
    "name": "to",
    "type": "address"
   },
   {
    "internalType": "uint256[]",
    "name": "ids",
    "type": "uint256[]"
   },
   {
    "internalType": "uint256[]",
    "name": "values",
    "type": "uint256[]"
   },
   {
    "internalType": "bytes",
    "name": "data",
    "type": "bytes"
   }
  ],
  "name": "safeBatchTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "from",
    "type": "address"
   },
   {
    "internalType": "address",
    "name": "to",
    "type": "address"
   },
   {
    "internalType": "uint256",
    "name": "id",
    "type": "uint256"
   },
   {
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
   },
   {
    "internalType": "bytes",
    "name": "data",
    "type": "bytes"
   }
  ],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "operator",
    "type": "address"
   },
   {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
   }
  ],
  "name": "setApprovalForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "internalType": "address",
    "name": "operator",
    "type": "address"
   },
   {
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
   },
   {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
   },
   {
    "indexed": false,
    "internalType": "uint256[]",
    "name": "ids",
    "type": "uint256[]"
   },
   {
    "indexed": false,
    "internalType": "uint256[]",
    "name": "values",
    "type": "uint256[]"
   }
  ],
  "name": "TransferBatch",
  "type": "event"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
   }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "internalType": "address",
    "name": "operator",
    "type": "address"
   },
   {
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
   },
   {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
   },
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "id",
    "type": "uint256"
   },
   {
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
   }
  ],
  "name": "TransferSingle",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": false,
    "internalType": "string",
    "name": "value",
    "type": "string"
   },
   {
    "indexed": true,
    "internalType": "uint256",
    "name": "id",
    "type": "uint256"
   }
  ],
  "name": "URI",
  "type": "event"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_marketId",
    "type": "uint256"
   }
  ],
  "name": "withdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "account",
    "type": "address"
   },
   {
    "internalType": "uint256",
    "name": "id",
    "type": "uint256"
   }
  ],
  "name": "balanceOf",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address[]",
    "name": "accounts",
    "type": "address[]"
   },
   {
    "internalType": "uint256[]",
    "name": "ids",
    "type": "uint256[]"
   }
  ],
  "name": "balanceOfBatch",
  "outputs": [
   {
    "internalType": "uint256[]",
    "name": "",
"type": "uint256[]"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "bettingToken",
  "outputs": [
   {
    "internalType": "contract IERC20",
    "name": "",
    "type": "address"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "getMarketCount",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_marketId",
    "type": "uint256"
   }
  ],
  "name": "getNoTokenId",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "pure",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_marketId",
    "type": "uint256"
   }
  ],
  "name": "getTotalWeightedNo",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "weightedTotal",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_marketId",
    "type": "uint256"
   }
  ],
  "name": "getTotalWeightedYes",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "weightedTotal",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_marketId",
    "type": "uint256"
   },
   {
    "internalType": "address",
    "name": "_user",
    "type": "address"
   }
  ],
  "name": "getUserBet",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "yesBetTotal",
    "type": "uint256"
   },
   {
    "internalType": "uint256",
    "name": "noBetTotal",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "_marketId",
    "type": "uint256"
   }
  ],
  "name": "getYesTokenId",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "pure",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "account",
    "type": "address"
   },
   {
    "internalType": "address",
    "name": "operator",
    "type": "address"
   }
  ],
  "name": "isApprovedForAll",
  "outputs": [
   {
    "internalType": "bool",
    "name": "",
    "type": "bool"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "name": "markets",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "id",
    "type": "uint256"
   },
   {
    "internalType": "string",
    "name": "question",
    "type": "string"
   },
   {
    "internalType": "address",
    "name": "arbitrator",
    "type": "address"
   },
   {
    "internalType": "uint256",
    "name": "resolutionDate",
    "type": "uint256"
   },
   {
    "internalType": "enum Outcome",
    "name": "outcome",
    "type": "uint8"
   },
   {
    "internalType": "uint256",
    "name": "yesPool",
    "type": "uint256"
   },
   {
    "internalType": "uint256",
    "name": "noPool",
    "type": "uint256"
   },
   {
    "internalType": "bool",
    "name": "isResolved",
    "type": "bool"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [],
  "name": "owner",
  "outputs": [
   {
    "internalType": "address",
    "name": "",
    "type": "address"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "bytes4",
    "name": "interfaceId",
    "type": "bytes4"
   }
  ],
  "name": "supportsInterface",
  "outputs": [
   {
    "internalType": "bool",
    "name": "",
    "type": "bool"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "name": "tokenIdToMarketId",
  "outputs": [
   {
    "internalType": "uint256",
"name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "name": "uri",
  "outputs": [
   {
    "internalType": "string",
    "name": "",
    "type": "string"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "address",
    "name": "",
    "type": "address"
   }
  ],
  "name": "userReputation",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 }
]		

// This is a minimal ABI for an ERC-20 token. We only need these functions.
export const tokenABI = [
  {
    "constant": true,
    "inputs": [
      { "name": "_owner", "type": "address" },
      { "name": "_spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "name": "remaining", "type": "uint256" }],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "_spender", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "name": "success", "type": "bool" }],
    "type": "function"
  }
];