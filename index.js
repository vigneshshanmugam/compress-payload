const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function stringToBuffer(str) {
  return encoder.encode(str);
}

export function bufferToString(buffer) {
  return decoder.decode(buffer);
}

export function compress(payload, type = "gzip") {
  if (typeof payload !== "string") {
    throw new Error("Payload must be in string format");
  }

  const cs = new CompressionStream(type);
  const buffer = stringToBuffer(payload);
  const writer = cs.writable.getWriter();
  writer.write(buffer);
  writer.close();

  return cs;
}

export async function decompress(cs, type = "gzip") {
  const creader = cs.readable.getReader();
  const ds = new DecompressionStream(type);
  const dwriter = ds.writable.getWriter();
  while (true) {
    const { value, done } = await creader.read();
    if (done) break;
    dwriter.write(value);
  }
  dwriter.close();
  return ds;
}

export async function view(stream) {
  const reader = stream.readable.getReader();
  const chunks = [];
  let totalSize = 0;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
    totalSize += value.byteLength;
  }

  const concatenate = new Uint8Array(totalSize);
  let offset = 0;
  for (const chunk of chunks) {
    concatenate.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return {
    size: totalSize,
    contents: bufferToString(concatenate)
  };
}
