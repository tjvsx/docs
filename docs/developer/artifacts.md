# Artifacts

Table of Contents
=================

* [HabitatV1](#habitatv1)
  * [INSPECTION_PERIOD()](#inspection_period-returns-uint16)
  * [MAX_BLOCK_SIZE()](#max_block_size-returns-uint24)
  * [blockMeta(uint256)](#blockmetauint256-height-returns-uint256-ret)
  * [canFinalizeBlock(uint256)](#canfinalizeblockuint256-blocknumber-returns-bool)
  * [challenge()](#challenge-returns-)
  * [deposit(address,uint256,address)](#depositaddress-token-uint256-amountorid-address-receiver-returns-)
  * [dispute(uint256,uint256)](#disputeuint256-blocknumber-uint256-bitmask-returns-)
  * [finalizeSolution()](#finalizesolution-returns-)
  * [finalizedHeight()](#finalizedheight-returns-uint256-ret)
  * [onChallenge()](#onchallenge-returns-uint256)
  * [onClaimUsername(address,uint256,bytes32)](#onclaimusernameaddress-msgsender-uint256-nonce-bytes32-shortstring-returns-)
  * [onCreateCommunity(address,uint256,address,bytes)](#oncreatecommunityaddress-msgsender-uint256-nonce-address-governancetoken-bytes-metadata-returns-)
  * [onCreateProposal(address,uint256,uint256,address,bytes,bytes,bytes)](#oncreateproposaladdress-msgsender-uint256-nonce-uint256-startdate-address-vault-bytes-internalactions-bytes-externalactions-bytes-metadata-returns-)
  * [onCreateVault(address,uint256,bytes32,address,bytes)](#oncreatevaultaddress-msgsender-uint256-nonce-bytes32-communityid-address-condition-bytes-metadata-returns-)
  * [onCreateVirtualERC20(address,uint256,address,bytes)](#oncreatevirtualerc20address-msgsender-uint256-nonce-address-factoryaddress-bytes-args-returns-)
  * [onDelegateAmount(address,uint256,address,address,uint256)](#ondelegateamountaddress-msgsender-uint256-nonce-address-delegatee-address-token-uint256-newallowance-returns-)
  * [onDeposit(address,address,uint256,uint256)](#ondepositaddress-owner-address-token-uint256-value-uint256-tokentype-returns-)
  * [onFinalizeSolution(uint256,bytes32)](#onfinalizesolutionuint256-bytes32-hash-returns-)
  * [onProcessProposal(address,uint256,bytes32,bytes,bytes)](#onprocessproposaladdress-msgsender-uint256-nonce-bytes32-proposalid-bytes-internalactions-bytes-externalactions-returns-uint256-votingstatus-uint256-secondstillclose-uint256-quorumpercent)
  * [onTransferToken(address,uint256,address,address,uint256)](#ontransfertokenaddress-msgsender-uint256-nonce-address-token-address-to-uint256-value-returns-)
  * [onVoteOnProposal(address,uint256,bytes32,uint256,address,uint8)](#onvoteonproposaladdress-msgsender-uint256-nonce-bytes32-proposalid-uint256-shares-address-delegatee-uint8-signalstrength-returns-)
  * [pendingHeight()](#pendingheight-returns-uint256-ret)
  * [registerModule(uint256,address,bytes32,bytes)](#registermoduleuint256-_type-address-contractaddress-bytes32-codehash-bytes-returns-)
  * [submitBlock()](#submitblock-returns-)
  * [submitSolution()](#submitsolution-returns-)
  * [withdraw(address,address,uint256)](#withdrawaddress-owner-address-token-uint256-tokenid-returns-)
  * [INSPECTION_PERIOD_MULTIPLIER()](#inspection_period_multiplier-returns-uint256)
  * [ROLLUP_MANAGER()](#rollup_manager-returns-address)
  * [STAKING_POOL_FEE_DIVISOR()](#staking_pool_fee_divisor-returns-uint256)
  * [communityOfVault(address)](#communityofvaultaddress-vault-returns-bytes32)
  * [executionPermit(address,bytes32)](#executionpermitaddress-vault-bytes32-proposalid-returns-bytes32-ret)
  * [getBalance(address,address)](#getbalanceaddress-tkn-address-account-returns-uint256)
  * [getCurrentEpoch()](#getcurrentepoch-returns-uint256)
  * [getErc721Owner(address,uint256)](#geterc721owneraddress-tkn-uint256-b-returns-address)
  * [getProposalStatus(bytes32)](#getproposalstatusbytes32-a-returns-uint256)
  * [getTotalMemberCount(bytes32)](#gettotalmembercountbytes32-communityid-returns-uint256)
  * [getTotalVotingShares(bytes32)](#gettotalvotingsharesbytes32-proposalid-returns-uint256)
  * [getUnlockedBalance(address,address)](#getunlockedbalanceaddress-token-address-account-returns-uint256-ret)
  * [onClaimStakingReward(address,uint256,address,uint256)](#onclaimstakingrewardaddress-msgsender-uint256-nonce-address-token-uint256-sinceepoch-returns-)
  * [onCustomBlockBeacon(bytes)](#oncustomblockbeaconbytes-data-returns-)
  * [onModifyRollupStorage(address,uint256,bytes)](#onmodifyrollupstorageaddress-msgsender-uint256-nonce-bytes-data-returns-)
  * [onTributeForOperator(address,uint256,address,address,uint256)](#ontributeforoperatoraddress-msgsender-uint256-nonce-address-operator-address-token-uint256-amount-returns-)
  * [tokenOfCommunity(bytes32)](#tokenofcommunitybytes32-a-returns-address)
  * [txNonces(address)](#txnoncesaddress-a-returns-uint256)
  * [upgradeRollup(address)](#upgraderollupaddress-newimplementation-returns-)


# HabitatV1

Composition of the full Habitat Rollup contracts (v1)

## INSPECTION_PERIOD() returns (uint16)
(0xe70f0e35)

Constant, the inspection period defines how long it takes (in L1 blocks) until a submitted solution can be finalized. Default: 60 blocks ~ 14 minutes.


## MAX_BLOCK_SIZE() returns (uint24)
(0x6ce02363)

Constant, the maximum size a single block can be. Default: 31744 bytes


## blockMeta(uint256 height) returns (uint256 ret)
(0x3749779c)

Holds metadata for blocks. | finalization target (blockNumber) | least significant bit is a dispute flag |


## canFinalizeBlock(uint256 blockNumber) returns (bool)
(0x5b11ae01)

Returns true if `blockNumber` can be finalized, else false. Helper function for chain clients.

- blockNumber The number of the block in question.

## challenge() returns ()
(0xd2ef7398)

Challenge the solution or just verify the next pending block directly. Expects the block data right after the function signature to be included in the call. calldata layout: | 4 bytes function sig | | 32 bytes size of block | | 32 bytes number of challenge rounds | | arbitrary witness data | | data of block |


## deposit(address token, uint256 amountOrId, address receiver) returns ()
(0xf45346dc)

Deposit `token` and value (`amountOrId`) into bridge.

- amountOrId Amount or the token id.
- receiver The account who receives the token(s).
- token The ERC-20/ERC-721 token address.

## dispute(uint256 blockNumber, uint256 bitmask) returns ()
(0x1f2f7fc3)

Flags up to 256 solutions. This will increase the inspection period for the block(s).

- bitmask Up to 256 solutions can be flagged. Thus, a solution will be flagged if the corresponding bit is `1`. LSB first.
- blockNumber the starting point.

## finalizeSolution() returns ()
(0x9af5db2e)

Finalize solution and move to the next block. This must happen in block order. Nothing can be finalized if a challenge is still active. and cannot happen if there is an active challenge. calldata layout: | 4 byte function sig | | 32 byte block number | --- | 32 byte length of solution | | solution... | --- | repeat above (---) |


## finalizedHeight() returns (uint256 ret)
(0xb2223bd6)

Returns the highest finalized block.


## onChallenge() returns (uint256)
(0xc47c519d)

Challenge the solution or just verify the next pending block directly. calldata layout: | 4 bytes function sig | | 32 bytes challenge offset | | 32 bytes address of challenge handler - contract (self) | | 32 bytes size of block | | 32 bytes number of challenge rounds | | arbitrary witness data | | data of block |


## onClaimUsername(address msgSender, uint256 nonce, bytes32 shortString) returns ()
(0x0827bab8)

State transition when a user claims a (short) username. Only one username can be claimed for `msgSender`. If `msgSender` already claimed a name, then it should be freed.


## onCreateCommunity(address msgSender, uint256 nonce, address governanceToken, bytes metadata) returns ()
(0x5b292e29)

Creates a Habitat Community.


## onCreateProposal(address msgSender, uint256 nonce, uint256 startDate, address vault, bytes internalActions, bytes externalActions, bytes metadata) returns ()
(0x9cc39bbe)

Creates a proposal belonging to `vault`.

- externalActions includes L1 specific actions if this proposal passes. (execution permit)
- internalActions includes L2 specific actions if this proposal passes.
- startDate Should be within a reasonable range. See `_PROPOSAL_DELAY`

## onCreateVault(address msgSender, uint256 nonce, bytes32 communityId, address condition, bytes metadata) returns ()
(0x9617e0c5)

Creates a Habitat Vault for a Community.


## onCreateVirtualERC20(address msgSender, uint256 nonce, address factoryAddress, bytes args) returns ()
(0xe9d3d7fb)

User invokable state transition.


## onDelegateAmount(address msgSender, uint256 nonce, address delegatee, address token, uint256 newAllowance) returns ()
(0x1b5e17db)

State transition when a user sets a delegate.


## onDeposit(address owner, address token, uint256 value, uint256 tokenType) returns ()
(0x62731ff1)

State transition when a user deposits a token.


## onFinalizeSolution(uint256, bytes32 hash) returns ()
(0xc8470b09)

Finalize solution for `blockNumber` and move to the next block. Calldata(data appended at the end) contains a blob of key:value pairs that go into storage. If this functions reverts, then the block can only be finalised by a call to `challenge`. - Should only be callable from self. - Supports relative value(delta) and absolute storage updates calldata layout: | 4 byte function sig | | 32 byte blockNumber | | 32 byte submitted solution hash | | witness data |


## onProcessProposal(address msgSender, uint256 nonce, bytes32 proposalId, bytes internalActions, bytes externalActions) returns (uint256 votingStatus, uint256 secondsTillClose, uint256 quorumPercent)
(0x36b54032)

Updates the state of a proposal.

Only emits a event if the status changes to CLOSED or PASSED


## onTransferToken(address msgSender, uint256 nonce, address token, address to, uint256 value) returns ()
(0x11d4aec1)

State transition when a user transfers a token.


## onVoteOnProposal(address msgSender, uint256 nonce, bytes32 proposalId, uint256 shares, address delegatee, uint8 signalStrength) returns ()
(0xd87eafef)

State transition routine for `VoteOnProposal`. Note: Votes can be changed/removed anytime.


## pendingHeight() returns (uint256 ret)
(0xaa86c1ca)

Highest not finalized block


## registerModule(uint256 _type, address contractAddress, bytes32 codeHash, bytes) returns ()
(0xdd2d2d1c)

Register a module to be used for Habitat Vaults (Treasuries). The bytecode at `contractAddress` must apply to some conventions, see `_verifyModule`.

- _type Must be `1`.
- codeHash of the bytecode @ `contractAddress`
- contractAddress of the module.

## submitBlock() returns ()
(0x25ceb4b2)

Submit a transaction blob (a block). The block data is expected right after the 4-byte function signature. Only regular accounts are allowed to submit blocks.


## submitSolution() returns ()
(0x84634f44)

Register solution for given `blockNumber`. Up to 256 solutions can be registered ahead in time. calldata layout: |4 byte function sig| |32 bytes number of first block| |32 bytes for each solution for blocks starting at first block (increments by one)| Note: You can put `holes` in the layout by inserting a 32 byte zero value. Only regular accounts are allowed to submit solutions.


## withdraw(address owner, address token, uint256 tokenId) returns ()
(0xd9caed12)

Withdraw `token` and `tokenId` from bridge. `tokenId` is ignored if `token` is not a ERC-721.

- owner address of the account to withdraw from and to.
- token address of the token.
- tokenId ERC-721 token id.

## INSPECTION_PERIOD_MULTIPLIER() returns (uint256)
(0xfe4314fe)

Add multiplicator parameter that says: if any N blocks get flagged, then increase the INSPECTION_PERIOD times INSPECTION_PERIOD_MULTIPLIER that puts the possible inspection period for these blocks higher up so that operators and chain users can cooperate on any situation within a bigger timeframe. That means if someone wrongfully flags valid solutions for blocks, then this just increases the INSPECTION_PERIOD and operators are not forced into challenges. If no one challenges any blocks within the increased timeframe, then the block(s) can be finalized as usual after the elevated INSPECTION_PERIOD.


## ROLLUP_MANAGER() returns (address)
(0xabe31cfd)

Returns the address who is in charge of changing the rollup implementation. This contract should be managed by a `ExecutionProxy` that in turn verifies governance decisions from the rollup. The rollup will be managed by a multisig in the beginning until moving to community governance. It should be noted that there should be a emergency contract on L1 that can be used to recover from bad upgrades in case the rollup is malfunctioning itself.


## STAKING_POOL_FEE_DIVISOR() returns (uint256)
(0xbbe17afa)

The divisor for every tribute. A fraction of the operator tribute always goes into the staking pool.


## communityOfVault(address vault) returns (bytes32)
(0x7cf767bc)

Returns the `communityId` of `vault`.


## executionPermit(address vault, bytes32 proposalId) returns (bytes32 ret)
(0x7bef2863)

Execution permit for |vault, proposalId| = keccak256(actions).


## getBalance(address tkn, address account) returns (uint256)
(0xd4fac45d)

The token balance of `tkn` for `account. This works for ERC-20 and ERC-721.


## getCurrentEpoch() returns (uint256)
(0xb97dd9e2)

Epoch should be greater than 0.


## getErc721Owner(address tkn, uint256 b) returns (address)
(0x2ce9a9eb)

Returns the owner of a ERC-721 token.


## getProposalStatus(bytes32 a) returns (uint256)
(0x93dfd045)

Returns the voting status of proposal id `a`.


## getTotalMemberCount(bytes32 communityId) returns (uint256)
(0xe702e6c7)

Returns the member count for `communityId`. An account automatically becomes a member if it interacts with community vaults & proposals.


## getTotalVotingShares(bytes32 proposalId) returns (uint256)
(0xe9daea7c)

Returns the cumulative voted shares on `proposalId`.


## getUnlockedBalance(address token, address account) returns (uint256 ret)
(0x19e3b508)

Returns the (free) balance (amount of `token`) for `account`. Free = balance of `token` for `account` - activeVotingStake & delegated stake for `account`. Supports ERC-20 and ERC-721 and takes staked balances into account.


## onClaimStakingReward(address msgSender, uint256 nonce, address token, uint256 sinceEpoch) returns ()
(0x8e7700c0)

Claims staking rewards for `epoch`.


## onCustomBlockBeacon(bytes data) returns ()
(0xa891fba3)

Layer 2 callback for blocks created with `_createBlockMessage`. Used for module registration (type = 1).


## onModifyRollupStorage(address msgSender, uint256 nonce, bytes data) returns ()
(0x10ea8892)

Used for fixing rollup storage due to logic bugs.


## onTributeForOperator(address msgSender, uint256 nonce, address operator, address token, uint256 amount) returns ()
(0x24fa29ea)

Transfers funds to a (trusted) operator. A fraction `STAKING_POOL_FEE_DIVISOR` of the funds goes to the staking pool.


## tokenOfCommunity(bytes32 a) returns (address)
(0xa73e572b)

Governance Token of community.


## txNonces(address a) returns (uint256)
(0xd73a7152)

The nonce of account `a`.


## upgradeRollup(address newImplementation) returns ()
(0x659675d7)

Upgrades the implementation.


