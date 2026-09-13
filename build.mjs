import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const assetsDir = path.join(dist, "assets");

async function readBase64(parts) {
  const chunks = await Promise.all(
    parts.map((part) => readFile(path.join(root, part), "utf8")),
  );
  return chunks.join("").replace(/\s+/g, "");
}

function decodeWebp(base64, label) {
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
    throw new Error(`Base64 inválido em ${label}`);
  }

  const buffer = Buffer.from(base64, "base64");
  const riff = buffer.subarray(0, 4).toString("ascii");
  const webp = buffer.subarray(8, 12).toString("ascii");

  if (riff !== "RIFF" || webp !== "WEBP") {
    throw new Error(`${label} não gerou um WebP válido`);
  }

  return buffer;
}

async function webpFromParts(parts, outputName) {
  const base64 = await readBase64(parts);
  const buffer = decodeWebp(base64, outputName);
  await writeFile(path.join(assetsDir, outputName), buffer);
  return buffer;
}

await rm(dist, { recursive: true, force: true });
await mkdir(assetsDir, { recursive: true });

const hero = await webpFromParts(
  [
    "source-assets/hero.part00.b64",
    "source-assets/hero.part01.b64",
    "source-assets/hero.part02.b64",
  ],
  "hero-latam-720.webp",
);

// O HTML usa srcset 720/1200. Por enquanto os dois nomes apontam para o mesmo
// WebP otimizado, evitando uma segunda imagem pesada no primeiro carregamento.
await writeFile(path.join(assetsDir, "hero-latam-1200.webp"), hero);

await webpFromParts(
  ["source-assets/depoimento-1.b64"],
  "depoimento-1.webp",
);

await webpFromParts(
  ["source-assets/depoimento-2.b64"],
  "depoimento-2.webp",
);

await webpFromParts(
  [
    "source-assets/d3_00.b64",
    "source-assets/d3_01.b64",
    "source-assets/d3_02.b64",
    "source-assets/d3_03.b64",
    "source-assets/d3_04.b64",
    "source-assets/d3_05.b64",
    "source-assets/d3_06.b64",
    "source-assets/d3_07.b64",
    "source-assets/d3_08.b64",
    "source-assets/d3_09.b64",
  ],
  "depoimento-3.webp",
);

await copyFile(path.join(root, "index.html"), path.join(dist, "index.html"));
await copyFile(path.join(root, "_headers"), path.join(dist, "_headers"));

console.log("PROTESE LATAM construída em dist/");
