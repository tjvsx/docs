# Metadata

Some Habitat transaction types include a `bytes metadata` argument, this is usually a [**raw - without header** deflated](https://en.wikipedia.org/wiki/Deflate) json string.
It is advised to follow this convention where possible.

Please take look for a straight example:
 - [nodejs](https://github.com/0xHabitat/habitat/blob/ca68c05614a7b74c48bfd5b5d2d7c11f7d21bf16/receipts/utils.js#L123)
 - [web](https://github.com/0xHabitat/habitat/blob/ca68c05614a7b74c48bfd5b5d2d7c11f7d21bf16/web/lib/rollup.js#L316)
