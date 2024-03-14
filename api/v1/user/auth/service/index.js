/**
 *
 * @param {String} email
 * @param {String} password hashed password only.
 * @returns user object if found, else null
 * @example loginService('test@test.com', 'hashedpassword')
 */
const findUserByEmail = async (Email) => {
  const user = await prisma.user_information.findFirst({
    where: { Email },
  });

  if (!user) {
    return null;
  }

  delete user.password;

  return user;
};
