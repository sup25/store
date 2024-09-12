import prisma from "@/_lib/prisma";
import { comparePassword } from "@/app/api/utils/comparePassword";
import appConfig from "@/config";
import nodemailer from "nodemailer";
import { generateComplaintEmailContent } from "./emailtamplate";

export const createUserService = async (body) => {
  try {
    const user = await prisma.User.create({
      data: body,
    });
    return user;
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      throw new Error("Email already in use");
    } else {
      throw new Error("Could not create user");
    }
  }
};

export const loginUserService = async (email, password) => {
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
    include: {
      addresses: true,
    },
  });

  if (!user) {
    throw new Error("Email or password is incorrect");
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email or password is incorrect");
  }
  delete user.Password;
  return { user, role: user.role };
};

export const invalidateUserTokens = async (token) => {
  const result = await prisma.token.updateMany({
    where: {
      token,
      black_list: false,
    },
    data: {
      black_list: true,
    },
  });

  return result;
};

export const addAddressService = async (userId, addressData) => {
  const userIdNumber = parseInt(userId, 10);

  if (isNaN(userIdNumber)) {
    throw new Error("Invalid userId");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userIdNumber,
    },
    include: {
      addresses: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const address = await prisma.address.create({
    data: {
      ...addressData,
      userId: userIdNumber,
    },
  });

  return address;
};

export async function sendVerificationEmailService(user, token) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : appConfig.baseUrl;

  console.log("Base URL:", baseUrl);
  console.log(user.email);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Verify your email",
    text: `Please verify your email by clicking the following link: 
    ${baseUrl}/user/verify-email?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendComplaintEmailService(data) {
  const {
    body: { userEmail, complaintMessage },
  } = data;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });
  const emailcontent = generateComplaintEmailContent(
    userEmail,
    complaintMessage
  );

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    subject: "New Complaint",
    html: emailcontent,
  };

  await transporter.sendMail(mailOptions);
}
