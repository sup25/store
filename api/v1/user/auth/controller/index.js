export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const response = {
      message: "Login successful",
      data: { token: generateToken({ userId: user.id }), user },
    };

    // Send token in response
    return res.status(200).send(response);
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
