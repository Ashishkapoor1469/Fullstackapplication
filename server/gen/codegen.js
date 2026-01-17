import crypto from "crypto";

export function codegen(length = 6) {
  return crypto.randomInt(
    10 ** (length - 1),
    10 ** length
  ).toString();
}
