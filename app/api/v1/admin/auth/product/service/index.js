import prisma from "@/_lib/prisma";

export const createProductService = async (body) => {
  const {
    title,
    handle,
    desc,
    short_desc,
    price,
    quantity,
    sku,
    tags,
    type,
    images,
    adminId,
  } = body;

  const parsedPrice = parseFloat(price);
  const parsedQuantity = parseInt(quantity, 10);

  const existingProduct = await prisma.product.findUnique({
    where: {
      handle,
    },
  });

  if (existingProduct) {
    throw new Error(
      "The product handle is already in use. Please choose a different handle."
    );
  }

  const product = await prisma.product.create({
    data: {
      title,
      handle,
      desc,
      short_desc,
      price: parsedPrice,
      quantity: parsedQuantity,
      sku,
      tags: { set: tags || [] },
      type,
      Admin: { connect: { id: adminId } },
      images: {
        create: images.map((image, index) => ({
          original_url: image.original_url,
          thumbnail: image.thumbnail,
          index: index + 1,
        })),
      },
    },
  });

  return product;
};

export const getProductsService = async (adminId) => {
  const parsedAdminId = parseInt(adminId);
  const products = await prisma.product.findMany({
    where: {
      adminId: parsedAdminId,
    },
    include: {
      images: true,
    },
  });

  return products;
};

export const getPublicProductsService = async (handle) => {
  const products = await prisma.product.findMany({
    where: {
      handle: handle,
    },
    include: {
      images: true,
    },
  });

  return products;
};

export const getAllProductsService = async () => {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });
  return products;
};

export const updateProductService = async (productId, updatedFields) => {
  const parsedProductId = parseInt(productId, 10);
  const { images, handle: newHandle, price, quantity, ...rest } = updatedFields;
  const parsedPrice = price !== undefined ? parseFloat(price) : undefined;
  const parsedQuantity =
    quantity !== undefined ? parseInt(quantity, 10) : undefined;

  if (newHandle) {
    const existingProduct = await prisma.product.findUnique({
      where: {
        handle: newHandle,
      },
    });

    if (existingProduct && existingProduct.id !== parsedProductId) {
      throw new Error(
        "The product handle is already in use by another product. Please choose a different handle."
      );
    }
  }

  const product = await prisma.product.update({
    where: {
      id: parsedProductId,
    },
    data: {
      ...rest,
      handle: newHandle,
      price: parsedPrice,
      quantity: parsedQuantity,
    },
  });

  if (images && images.length > 0) {
    await prisma.productImage.deleteMany({
      where: {
        productId: parsedProductId,
      },
    });

    for (const image of images) {
      if (image.index === undefined || isNaN(parseInt(image.index, 10))) {
        throw new Error(`Invalid index for image: ${JSON.stringify(image)}`);
      }

      await prisma.productImage.create({
        data: {
          original_url: image.original_url,
          thumbnail: image.thumbnail,
          index: parseInt(image.index, 10),
          product: { connect: { id: parsedProductId } },
        },
      });
    }
  }

  return product;
};

export const deleteProductService = async (productId) => {
  const parsedProductId = parseInt(productId, 10);
  const salesWithProduct = await prisma.sale.findMany({
    where: {
      products: {
        some: {
          id: parsedProductId,
        },
      },
    },
    select: {
      id: true,
    },
  });
  await Promise.all(
    salesWithProduct.map((sale) =>
      prisma.sale.update({
        where: {
          id: sale.id,
        },
        data: {
          products: {
            disconnect: {
              id: parsedProductId,
            },
          },
        },
      })
    )
  );

  const deletedProduct = await prisma.product.delete({
    where: {
      id: parsedProductId,
    },
  });

  return deletedProduct;
};

export const getProductSalesDataService = async (adminId) => {
  const parsedAdminId = parseInt(adminId);

  const products = await prisma.product.findMany({
    where: {
      adminId: parsedAdminId,
    },
    include: {
      sales: {
        include: {
          orders: true,
        },
      },
      images: {
        select: {
          original_url: true,
          thumbnail: true,
        },
      },
    },
  });

  const productSalesData = products.map((product) => {
    const totalSold = product.sales.reduce(
      (acc, sale) => acc + sale.orders.length,
      0
    );

    const totalPrice = product.sales.reduce(
      (acc, sale) =>
        acc + sale.orders.reduce((sum, order) => sum + order.total_price, 0),
      0
    );

    return {
      title: product.title,
      sku: product.sku,
      handle: product.handle,
      sold: totalSold,
      image: product.images.length > 0 ? product.images[0].original_url : null,
      total_price: totalPrice,
      price: product.price,
    };
  });

  productSalesData.sort((a, b) => b.sold - a.sold);
  return productSalesData;
};

export const createReviewService = async (body) => {
  const { productId, userId, score, message } = body;

  if (!productId || !userId) {
    throw new Error("Product ID and User ID are required.");
  }

  const hasPurchased = await prisma.order.findMany({
    where: {
      userId: Number(userId),
      sale: {
        products: {
          some: {
            id: Number(productId),
          },
        },
      },
    },
  });

  if (hasPurchased.length === 0) {
    throw new Error("User must purchase the product before leaving a review.");
  }

  const review = await prisma.review.create({
    data: {
      score,
      message,
      product: {
        connect: { id: productId },
      },
      user: {
        connect: { id: userId },
      },
    },
  });

  return review;
};

export const getReviewsByProductIdService = async (productId) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId: Number(productId),
    },
    include: {
      product: {
        select: {
          title: true,
        },
      },
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      },
    },
  });

  if (!reviews || reviews.length === 0) {
    throw new Error("No reviews found for this product.");
  }

  return reviews;
};

export const editReviewService = async (body) => {
  const { reviewId, updatedFields, userId } = body;
  const review = await prisma.review.findUnique({
    where: {
      id: Number(reviewId),
    },
  });

  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.userId !== userId) {
    throw new Error("You are not authorized to edit this review.");
  }

  const updatedReview = await prisma.review.update({
    where: {
      id: Number(reviewId),
    },
    data: updatedFields,
  });

  return updatedReview;
};

export const deleteReviewService = async (body) => {
  const { reviewId, userId } = body;

  const review = await prisma.review.findUnique({
    where: {
      id: Number(reviewId),
    },
  });

  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.userId !== userId) {
    throw new Error("You are not authorized to delete this review.");
  }

  const deletedReview = await prisma.review.delete({
    where: {
      id: Number(reviewId),
    },
  });

  return deletedReview;
};
