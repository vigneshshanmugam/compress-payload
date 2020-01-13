# compress-payload

Utiliy for compressing and decompressing RUM payload data using Compression and Decompression streams.
This module is based on [Compression Streams specification](https://wicg.github.io/compression/).

## API

```js
import { compress, decomptress, view } from "compress-payload";

const payload = "payload-for-rum-endpoint";
const compresedStream = compress(payload, "gzip");
const decompressedStream = await decompress(compresedStream, "gzip");

// View the size of contents of streams
const { size, contents } = await view(decompressedStream);
```

##### compress(payload, type)

---

Compress the payload using the `CompressionStream`. `type` denotes either `gzip` or `deflate`. (default - gzip)

##### decompress(cstream, type)

---

Decompresssion the payload from the compression stream by reading its contents.

##### view(stream)

---

Reads all the contents from given stream and outputs them as string.
