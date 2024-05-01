const passwordRegex =
  /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createAdminValidation = (body) => {
  const { name, email, password } = body;
  const errors = [];
  if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Invalid email format",
    });
  }

  if (!passwordRegex.test(password)) {
    errors.push({
      field: "password",
      message:
        "Password must be at least 6 characters long and contain at least one letter, one number, and one symbol",
    });
  }

  if (!name || !email || !password) {
    errors.push({
      field: "all",
      message: "All fields are required",
    });
  }

  return errors;
};

export const loginAdminValidation = (body) => {
  const { email, password } = body;
  const errors = [];

  if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Invalid email format",
    });
  }
  if (password === "") {
    errors.push({
      field: "password",
      message: "password is required",
    });
  }

  return errors;
};
