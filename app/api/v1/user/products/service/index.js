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

export const showProductAccordingToTagService = async (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

  const products = await prisma.product.findMany({
    where: {
      tags: {
        hasSome: lowerCaseTags,
      },
    },
    include: {
      images: true,
    },
  });

  return products;
};

export const showProductAccordingToPriceService = async (
  minPrice,
  maxPrice
) => {
  let productsQuery = {};
  if (minPrice && maxPrice) {
    productsQuery = {
      where: {
        price: {
          gte: minPrice, // Greater than or equal to minPrice
          lte: maxPrice, // Less than or equal to maxPrice
        },
      },
      include: {
        images: true,
      },
    };
  } else if (minPrice) {
    productsQuery = {
      where: {
        price: {
          gte: minPrice,
        },
      },
      include: {
        images: true,
      },
    };
  } else if (maxPrice) {
    productsQuery = {
      where: {
        price: {
          lte: maxPrice,
        },
      },
      include: {
        images: true,
      },
    };
  }

  const products = await prisma.product.findMany(productsQuery);
  return products;
};

export const getPurchasedProductsService = async (userId) => {
  const orders = await prisma.Order.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      products: {
        include: {
          images: true,
        },
      },
    },
  });

  const products = orders.flatMap((order) => order.products);

  return products;
};
