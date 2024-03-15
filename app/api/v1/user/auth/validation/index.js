import { internalRes } from "@/app/api/utils/globalResponse";
const passwordRegex =
  /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createUserValidation = (body) => {
  const { fullName, email, password } = body;
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

  if (fullName.length < 3) {
    errors.push({
      field: "fullName",
      message: "Full name must be at least 3 characters long",
    });
  }

  if (!fullName || !email || !password) {
    errors.push({
      field: "all",
      message: "All fields are required",
    });
  }

  return errors;
};
