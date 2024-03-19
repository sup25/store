import { internalRes } from "@/app/api/utils/globalResponse";
const passwordRegex =
  /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createUserValidation = (body) => {
  const { first_name, last_name, email, password } = body;
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

  if (first_name < 3) {
    errors.push({
      field: "firstName",
      message: " Name must be at least 3 characters long",
    });
  }

  if (!first_name || !last_name || !email || !password) {
    errors.push({
      field: "all",
      message: "All fields are required",
    });
  }

  return errors;
};

export const loginUserValidation = (body) => {
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
