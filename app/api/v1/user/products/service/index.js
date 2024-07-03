import prisma from "@/_lib/prisma";

export const createCartService = async (userId, productId, quantity) => {
  const existingCartEntry = await prisma.Cart.findUnique({
    where: {
      userId_productId: {
        userId: Number(userId),
        productId: Number(productId),
      },
    },
  });

  let cartEntry;
  if (existingCartEntry) {
    cartEntry = await prisma.Cart.update({
      where: {
        userId_productId: {
          userId: Number(userId),
          productId: Number(productId),
        },
      },
      data: {
        quantity: existingCartEntry.quantity + Number(quantity),
      },
    });
  } else {
    cartEntry = await prisma.Cart.create({
      data: {
        userId: Number(userId),
        productId: Number(productId),
        quantity: Number(quantity),
      },
    });
  }
  return cartEntry;
};

export const getCartService = async (userId) => {
  const getCartItem = await prisma.Cart.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: {
        include: {
          images: true,
        },
      },
    },
  });

  return getCartItem;
};

export const deleteCartService = async (productId) => {
  const deleteCart = await prisma.Cart.delete({
    where: {
      id: productId,
    },
  });

  return deleteCart;
};
