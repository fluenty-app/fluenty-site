import { randomBytes } from "crypto";

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomString = (length = 16) => {
  let string = '';

  while (string.length < length) {
    string += randomBytes(length)
      .toString('base64')
      .replace(/[\/+=]/g, '');
  }

  return string.substring(0, length);
}
