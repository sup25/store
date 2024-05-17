import prisma from "@/_lib/prisma";

export const createCartService = async (userId, productId, quantity) => {
  const cartEntry = await prisma.Cart.create({
    data: {
      userId: Number(userId),
      productId: Number(productId),
      quantity: Number(quantity),
    },
  });

  return cartEntry;
};

export const getCartService = async (cartId) => {
  const getCartItem = await prisma.Cart.findUnique({
    where: {
      id: cartId,
    },
  });

  return getCartItem;
};

export const deleteCartService = async (userId) => {
  const deleteCart = await prisma.Cart.delete({
    where: {
      id: userId,
    },
  });

  return deleteCart;
};
