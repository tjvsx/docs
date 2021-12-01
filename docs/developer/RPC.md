# RPC

Habitat is compatible with the Ethereum JSON-RPC interface with some exceptions and extensions clarified here.

## Resources

The official RPC endpoint that can be used is `https://mainnet-habitat-l2.fly.dev/`.
**Note**: The method `eth_sendRawTransaction` is not allowed on this endpoint because of the gas tank functionality for the operator, thus for sending transactions you have to submit the transaction via `https://habitat-evolution.fly.dev/submitTransaction/` via a `POST` and the `{ primaryType, message, r, s, v }` payload-body.

For reference, [take a look at the habitat webapp](https://github.com/0xHabitat/habitat/blob/ca68c05614a7b74c48bfd5b5d2d7c11f7d21bf16/web/lib/rollup.js#L98).

## Methods

## eth_sendRawTransaction

Transaction are signed via the [EIP-712](https://eips.ethereum.org/EIPS/eip-712) standard and are structured like:
```
  "primaryType": "CreateProposal",
  "message": {
    "nonce": "0x83",
    "startDate": "0x61024496",
    "vault": "0xd689084f07291eedc307eeea550a15f0dc5c50ce",
    "internalActions": "0x",
    "externalActions": "0x",
    "metadata": "0xad..."
  },
  "r": "0xa366f5773040af132ea3a1b76b275b0692d7d9dbf00ab651690a9749d046c4a4",
  "s": "0x4f86cf54057949b6614502e6c7d32e85d95a38bd8044cf402261b5c2a5b040f2",
  "v": 27
```

The `eth_sendRawTransaction` endpoint accepts the `{ primaryType, message }` objects as well as raw [encoded transactions](https://github.com/NutBerry/NutBerry/blob/a1347a71b5071c39d5161b0b23f1a7e6d4f954c1/src/v1/lib/TransactionBuilder.js#L187) (not documented yet).

The typed data definitions can be viewed [here](https://github.com/0xHabitat/habitat/blob/ca68c05614a7b74c48bfd5b5d2d7c11f7d21bf16/src/rollup/habitatV1.js#L2).

**Note** that methods like `eth_getTransactionByHash` are also returning `primaryType, message` instead of a `data: 0x...` property.


## eth_call

Shares the same semantics regarding the transaction structure.
That is:
```
{
  from,
  primaryType,
  message,
}
```

instead of `{ data: 0x... }`.


## eth_getLogs

### topics `OR` rules

If we query the
`TokenTransfer(address indexed token, address indexed from, address indexed to, uint256 value, uint256 epoch)`
 event with `[null, [null, account], [null, account]` as additional `topics` then this filters for either `from == account` **or** `to == account`.

A handy extension when filtering events.

### includeTx | `bool`

When the filter object includes the property `includeTx: true` then this will append each corresponding transaction [primaryType, message, from, to] to the log events object as `transaction`.

Example:
```
{
  id: 1,
  jsonrpc: '2.0',
  result: [
    {
      transactionLogIndex: '0x0',
      transactionIndex: '0x0',
      blockNumber: '0xcc',
      transactionHash: '0xbf568e16b3c8e01241f6f92103b1eb06627a20026551bd6229c35a86785d115f',
      address: '0x96e471b5945373de238963b4e032d3574be4d195',
      topics: [
        '0x550c90ec55dd8121264f0781c9b401535f4c1d78c0cf8adfe80bd201b916fefa',
        '0x0000000000000000000000000ace32f6e87ac1457a5385f8eb0208f37263b415',
        '0x000000000000000000000000bdcee5e6df63283fbf380c3193cd1e78a511d682',
        '0x000000000000000000000000000000000000000000000000000000000000000b'
      ],
      data: '0x000000000000000000000000000000000000000000000000000000001dcd6500000000000000000000000000000000000000000000000000000000000000000b',
      logIndex: '0x0',
      blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      transaction: {
        primaryType: 'TributeForOperator',
        message: {
          nonce: '0xc',
          operator: '0x2951da2ba72dfe30da94988b4b3835a62f438c78',
          token: '0x0ace32f6e87ac1457a5385f8eb0208f37263b415',
          amount: '0xba43b7400'
        },
        from: '0xbdcee5e6df63283fbf380c3193cd1e78a511d682',
        to: '0x96e471b5945373de238963b4e032d3574be4d195'
      }
    },
...
```


### maxResults | `Number`

Limits the amount of results that are returned.


### reverse query

If `toBlock < fromBlock` then the request queries in `reverse`.


## rollup_estimateFinality

`params` is expected to be a list of block tags like:
`["latest", 4, "0xf"]`.

The response is a identity-mapped list of `QUANTITY` seconds until the corresponding block is expected to be finalized.
`{"id":1,"jsonrpc":"2.0","result":["0x93b0c","0x0","0x0"]}`


## web3_clientVersion

Returns the Ethereum address of the Rollup Bridge.

Example Response:
`{"id":1,"jsonrpc":"2.0","result":"0x96e471b5945373de238963b4e032d3574be4d195"}`


## eth_getTransactionDetails

Returns execution details for that transaction.
Example:
```
> {"id":1, "jsonrpc":"2.0","method":"eth_getTransactionDetails", "params":["0x7f0059ac55c81210f787d6be311318ea06cab1bb1b4836c6ab0b727cd6af7b4d"]}

< {"id":1,"jsonrpc":"2.0","result":{"errno":"0x0","returnData":"0x"}}
```


## Filtering by transaction type

Another extension to `eth_getLogs` is to filter by transaction type instead of log topics.

Example:
```
rollup.send('eth_getLogs', [{ primaryTypes: 'TributeForOperator' }]);
```
```
{
  id: 1,
  jsonrpc: '2.0',
  result: [
    {
      transactionIndex: '0x0',
      blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0xcc',
      primaryType: 'TributeForOperator',
      message: {
        nonce: '0xc',
        operator: '0x2951da2ba72dfe30da94988b4b3835a62f438c78',
        token: '0x0ace32f6e87ac1457a5385f8eb0208f37263b415',
        amount: '0xba43b7400'
      },
      from: '0xbdcee5e6df63283fbf380c3193cd1e78a511d682',
      to: '0x96e471b5945373de238963b4e032d3574be4d195',
      r: '0xa366f5773040af132ea3a1b76b275b0692d7d9dbf00ab651690a9749d046c4a4',
      s: '0x4f86cf54057949b6614502e6c7d32e85d95a38bd8044cf402261b5c2a5b040f2',
      v: 27,
      nonce: '0xc',
      hash: '0xbf568e16b3c8e01241f6f92103b1eb06627a20026551bd6229c35a86785d115f',
      gasPrice: '0x0',
      gas: '0x0',
      value: '0x0'
    },
...
```


## Miscellaneous

- A blockHash of `0x0000000000000000000000000000000000000000000000000000000000000000` indicates that this block is not yet submitted/bundled on Ethereum.
