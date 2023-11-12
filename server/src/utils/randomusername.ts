import crypto from "crypto";

const getRandomInt = (min: number, max: number) => {
  const randomBuffer = (0, crypto.randomBytes)(4);
  const randomInt = randomBuffer.readUInt32BE(0);
  return min + (randomInt % (max - min + 1));
};

const randomNumber = (max_number: number) => {
  let random_number_string;
  switch (max_number) {
    case 1:
      random_number_string = Math.floor(getRandomInt(1, 9)).toString();
      break;
    case 2:
      random_number_string = Math.floor(getRandomInt(10, 90)).toString();
      break;
    case 3:
      random_number_string = Math.floor(getRandomInt(100, 900)).toString();
      break;
    case 4:
      random_number_string = Math.floor(getRandomInt(1000, 9000)).toString();
      break;
    case 5:
      random_number_string = Math.floor(getRandomInt(10000, 90000)).toString();
      break;
    case 6:
      random_number_string = Math.floor(
        getRandomInt(100000, 900000)
      ).toString();
      break;
    default:
      random_number_string = "";
      break;
  }
  return random_number_string;
};

export async function randomUsername(email: string) {
  const proto = email.split("@")[0];
  const cleaned = proto.replace(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g, "");
  const length = cleaned.length;
  if (length < 25) {
    return cleaned + randomNumber(4);
  }
  return cleaned.substring(0, 25);
}
