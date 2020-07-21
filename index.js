async function compress(payload, type = "gzip") {
  const payloadStream = new Blob([payload]).stream();
  const compressedStream = payloadStream.pipeThrough(
    new CompressionStream(type)
  );
  return await read(compressedStream);
}

async function decompress(blob, type = "gzip") {
  const decompressedStream = blob
    .stream()
    .pipeThrough(new DecompressionStream(type));

  return await read(decompressedStream);
}

async function read(stream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return new Blob(chunks);
}

async function view(blob) {
  return await blob.text();
}

export { compress, decompress, read, view };
