---
sidebar_position: 5
title: 'Quickstart'
---

# Quickstart

Most things may look similiar but some things (especially) signing transactions works differently.
The following code serves as a quickstart example on how to interact with the Habitat rollup.

```js
import ethers from 'ethers';
import repl from 'repl';

const ROLLUP_ABI = [
  'event BlockBeacon()',
  'event ClaimUsername(address indexed account, bytes32 indexed shortString)',
  'event ClaimedStakingReward(address indexed account, address indexed token, uint256 indexed epoch, uint256 amount)',
  'event CommunityCreated(address indexed governanceToken, bytes32 indexed communityId)',
  'event CustomBlockBeacon()',
  'event DelegatedAmount(address indexed account, address indexed delegatee, address indexed token, uint256 value)',
  'event DelegateeVotedOnProposal(address indexed account, bytes32 indexed proposalId, uint8 signalStrength, uint256 shares)',
  'event Deposit(address owner, address token, uint256 value, uint256 tokenType)',
  'event MetadataUpdated(uint256 indexed topic, bytes metadata)',
  'event ModuleRegistered(address indexed contractAddress, bytes metadata)',
  'event NewSolution()',
  'event ProposalCreated(address indexed vault, bytes32 indexed proposalId, uint256 startDate)',
  'event ProposalProcessed(bytes32 indexed proposalId, uint256 indexed votingStatus)',
  'event RollupUpgrade(address target)',
  'event TokenTransfer(address indexed token, address indexed from, address indexed to, uint256 value, uint256 epoch)',
  'event VaultCreated(bytes32 indexed communityId, address indexed condition, address indexed vaultAddress)',
  'event VirtualERC20Created(address indexed account, address indexed token)',
  'event VotedOnProposal(address indexed account, bytes32 indexed proposalId, uint8 signalStrength, uint256 shares)',
  'event Withdraw(address owner, address token, uint256 value)',
  'function EPOCH_GENESIS() pure returns (uint256)',
  'function INSPECTION_PERIOD() view returns (uint16)',
  'function INSPECTION_PERIOD_MULTIPLIER() view returns (uint256)',
  'function MAX_BLOCK_SIZE() view returns (uint24)',
  'function ROLLUP_MANAGER() pure returns (address)',
  'function SECONDS_PER_EPOCH() pure returns (uint256)',
  'function STAKING_POOL_FEE_DIVISOR() pure returns (uint256)',
  'function blockMeta(uint256 height) view returns (uint256 ret)',
  'function canFinalizeBlock(uint256 blockNumber) view returns (bool)',
  'function challenge()',
  'function communityOfVault(address vault) returns (bytes32)',
  'function deposit(address token, uint256 amountOrId, address receiver)',
  'function dispute(uint256 blockNumber, uint256 bitmask)',
  'function executionPermit(address vault, bytes32 proposalId) view returns (bytes32 ret)',
  'function finalizeSolution()',
  'function finalizedHeight() view returns (uint256 ret)',
  'function getActiveDelegatedVotingStake(address token, address account) returns (uint256)',
  'function getActiveVotingStake(address token, address account) returns (uint256)',
  'function getBalance(address tkn, address account) returns (uint256)',
  'function getCurrentEpoch() returns (uint256)',
  'function getERC20Exit(address target, address owner) view returns (uint256)',
  'function getERC721Exit(address target, uint256 tokenId) view returns (address)',
  'function getErc721Owner(address tkn, uint256 b) returns (address)',
  'function getHistoricTub(address token, address account, uint256 epoch) returns (uint256)',
  'function getHistoricTvl(address token, uint256 epoch) returns (uint256)',
  'function getLastClaimedEpoch(address token, address account) returns (uint256)',
  'function getProposalStatus(bytes32 a) returns (uint256)',
  'function getTotalMemberCount(bytes32 communityId) returns (uint256)',
  'function getTotalValueLocked(address token) returns (uint256)',
  'function getTotalVotingShares(bytes32 proposalId) returns (uint256)',
  'function getUnlockedBalance(address token, address account) returns (uint256 ret)',
  'function pendingHeight() view returns (uint256 ret)',
  'function registerModule(uint256 _type, address contractAddress, bytes32 codeHash, bytes)',
  'function submitBlock()',
  'function submitSolution()',
  'function tokenOfCommunity(bytes32 a) returns (address)',
  'function txNonces(address a) returns (uint256)',
  'function upgradeRollup(address newImplementation)',
  'function withdraw(address owner, address token, uint256 tokenId)'
];

const TYPED_DATA = {
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
    ],
    // Transactions that can be replayed need nonces.
    // Other transaction types revert if replayed.
    TransferToken: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'token', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    ClaimUsername: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'shortString', type: 'bytes32' },
    ],
    CreateCommunity: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'governanceToken', type: 'address' },
      { name: 'metadata', type: 'bytes' },
    ],
    CreateVault: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'communityId', type: 'bytes32' },
      { name: 'condition', type: 'address' },
      { name: 'metadata', type: 'bytes' },
    ],
    CreateProposal: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'startDate', 'type': 'uint256' },
      { name: 'vault', type: 'address' },
      { name: 'internalActions', type: 'bytes' },
      { name: 'externalActions', type: 'bytes' },
      { name: 'metadata', type: 'bytes' },
    ],
    VoteOnProposal: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'proposalId', type: 'bytes32' },
      { name: 'shares', type: 'uint256' },
      { name: 'delegatedFor', type: 'address' },
      { name: 'signalStrength', type: 'uint8' },
    ],
    ProcessProposal: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'proposalId', type: 'bytes32' },
      { name: 'internalActions', type: 'bytes' },
      { name: 'externalActions', type: 'bytes' },
    ],
    TributeForOperator: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'operator', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    DelegateAmount: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'delegatee', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    ClaimStakingReward: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'token', 'type': 'address' },
      { name: 'sinceEpoch', 'type': 'uint256' },
    ],
    ModifyRollupStorage: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'data', 'type': 'bytes' },
    ],
    CreateVirtualERC20: [
      { name: 'nonce', 'type': 'uint256' },
      { name: 'factoryAddress', 'type': 'address' },
      { name: 'args', 'type': 'bytes' },
    ],
  },
  domain: {
    name: 'Habitat V1',
  },
  primaryTypes: [
    'TransferToken',
    'ClaimUsername',
    'CreateCommunity',
    'CreateVault',
    'CreateProposal',
    'VoteOnProposal',
    'ProcessProposal',
    'TributeForOperator',
    'DelegateAmount',
    'ClaimStakingReward',
    'ModifyRollupStorage',
    'CreateVirtualERC20',
  ],
};

async function sendTransaction ({ primaryType, message, rollup, signer }) {
  const signerAddress = await signer.getAddress();

  message.nonce = (await rollup.callStatic.txNonces(signerAddress)).toHexString();

  const callResult = await rollup.provider.send('eth_call', [{ from: signerAddress, primaryType, message }]);
  const errorSig = '0x08c379a0';

  if (callResult.startsWith(errorSig)) {
    const errMsg = ethers.utils.defaultAbiCoder.decode(['string'], callResult.replace(errorSig, '0x'));
    throw new Error(`calling contract: ${errMsg}`);
  }
  console.log({ callResult });

  // if working with json-rpc wallets
  //const tx = Object.assign({ message, primaryType }, TYPED_DATA);
  //const sig = await signer.provider.send('eth_signTypedData_v4', [signerAddress, JSON.stringify(tx)]);
  // else for testing
  const sig = await signer._signTypedData(TYPED_DATA.domain, { primaryType: TYPED_DATA.types[primaryType] }, message);

  const { r, s, v } = ethers.utils.splitSignature(sig);
  const operatorMessage = await ethers.utils.fetchJson(EVOLUTION_ENDPOINT, JSON.stringify({ primaryType, message, r, s, v }));
  if (operatorMessage.error) {
    throw new Error(operatorMessage.error.message);
  }
  const txHash = operatorMessage.result;
  const receipt = await rollup.provider.getTransactionReceipt(txHash);

  console.log({ receipt });
  if (receipt.status === 0) {
    throw new Error('transaction reverted');
  }

  // convenience
  receipt.events = [];
  for (const obj of receipt.logs) {
    try {
      receipt.events.push(Object.assign({ transactionHash: obj.transactionHash }, rollup.interface.parseLog(obj)));
    } catch (e) {
      console.warn(e);
    }
  }

  return receipt;
}

const ROLLUP_ADDRESS = '0x96e471b5945373de238963b4e032d3574be4d195';
const ROLLUP_RPC = 'https://mainnet-habitat-l2.fly.dev/';
const EVOLUTION_ENDPOINT = 'https://habitat-evolution.fly.dev/submitTransaction/';
const rollupProvider = new ethers.providers.JsonRpcProvider(ROLLUP_RPC, 'any');
const rollup = new ethers.Contract(ROLLUP_ADDRESS, ROLLUP_ABI, rollupProvider);
const signer = (new ethers.Wallet.createRandom()).connect(ethers.getDefaultProvider('mainnet'));

repl.start().context.rollup = rollup;

const filter = rollup.filters.VirtualERC20Created();
filter.fromBlock = 1;
const logs = await rollup.provider.getLogs(filter);
console.log(logs);

// some functions are 'view' only but not declared as such. Explicitly use `eth_call`
const currentEpoch = await rollup.callStatic.getCurrentEpoch();
console.log({ currentEpoch });

// send tx
/*
TransferToken: [
{ name: 'nonce', 'type': 'uint256' },
{ name: 'token', type: 'address' },
{ name: 'to', type: 'address' },
{ name: 'value', type: 'uint256' },
],
*/
const primaryType = 'TransferToken';
const message = { token: ethers.constants.AddressZero, to: ethers.constants.AddressZero, value: '0xff' };
const receipt = await sendTransaction({ primaryType, message, rollup, signer });
```
