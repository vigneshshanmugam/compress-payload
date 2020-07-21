# compress-payload

Utiliy for compressing and decompressing RUM payload data using Compression and Decompression streams.
This module is based on [Compression Streams specification](https://wicg.github.io/compression/).

## API

```js
import { compress, decompress, view } from "compress-payload";

const payloadObject = {
  /*Huge JSON RUM data*/
};
const payload = JSON.stringify(payloadObject);
const compressedBlob = await compress(payload, "gzip");
const decompressedBlob = await decompress(compressedBlob, "gzip");

// View the original payload content
const originalPayload = await view(decompressedBlob);
```

##### compress(payload, type)

---

Compress the payload using the `CompressionStream`. `type` denotes either `gzip` or `deflate`. (default - gzip)

##### decompress(blob, type)

---

Decompress the compressed blob data extracted by calling `compress(payload, data)`

##### view(blob)

---

Read the entire contents of the blob interpreted as UTF-8 text.
