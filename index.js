const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function stringToBuffer(str) {
  return encoder.encode(str);
}

export function bufferToString(buffer) {
  return decoder.decode(buffer);
}

export async function compress(payload, type = "gzip") {
  if (typeof payload !== "string") {
    throw new Error("Payload must be in string format");
  }

  const cs = new CompressionStream(type);
  const buffer = stringToBuffer(payload);
  const writer = cs.writable.getWriter();
  writer.write(buffer);
  writer.close();

  return await read(cs);
}

export async function decompress(blob, type = "gzip") {
  const ds = new DecompressionStream(type);
  const decompressedStream = blob.stream().pipeThrough(ds);

  return await read({ readable: decompressedStream });
}

export async function read(stream) {
  const reader = stream.readable.getReader();
  const chunks = [];

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return new Blob(chunks);
}

export async function view(blob) {
  return await new Response(blob).text();
}
