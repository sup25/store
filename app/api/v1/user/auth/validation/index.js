export const createUserValidation = (body) => {
  const { fullName, email, password } = body;
  // we can validate password strenght here
  // we can also validate email here
  // we can also validate full name length here
  // we can create an array of errors and return them all at once. [{field: 'email', message: 'Invalid email'}] - for example
  if (!fullName || !email || !password) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
};
