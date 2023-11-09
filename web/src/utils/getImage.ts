import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export const getImage = async (src: string) => {
  const buffer = await fs.readFile(src);

  const plaiceholder = await getPlaiceholder(buffer);

  return { ...plaiceholder, img: { src } };
};
