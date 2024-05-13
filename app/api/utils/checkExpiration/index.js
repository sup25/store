export default function Expiration(expirationInput) {
  if (typeof expirationInput === "number") {
    return new Date(Date.now() + expirationInput * 1000).toISOString();
  } else if (typeof expirationInput === "string") {
    const match = expirationInput.match(/^(\d+)([smhd])$/);
    if (!match) throw new Error("Invalid expiration format");
    const multiplier = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    return new Date(
      Date.now() + parseInt(match[1]) * multiplier[match[2]]
    ).toISOString();
  } else {
    throw new Error("Invalid expiration format");
  }
}
