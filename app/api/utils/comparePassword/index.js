import bcrypt from "bcrypt";
/**
 * Compare a plaintext password with a hashed password.
 * @param {string} plainPassword - The plaintext password.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};
