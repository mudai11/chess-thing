import { getPlaiceholder } from "plaiceholder";

export const getDynamicImage = async (src: string) => {
  if (src === null)
    return {
      img: { src: "" },
      base64: "",
    };

  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};
