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

  const product = await prisma.product.create({
    data: {
      title,
      handle,
      desc,
      short_desc,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      sku,
      tags: { set: tags || [] },
      type,
      Admin: { connect: { id: adminId } },
      images: {
        createMany: {
          data: images.map((image, index) => ({
            original_url: image.original_url,
            thumbnail: image.thumbnail,
            index: index + 1,
          })),
        },
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
export const getAllProductsService = async () => {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });
  return products;
};

export const updateProductService = async (productId, updatedFields) => {
  const { images, ...rest } = updatedFields;

  const product = await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      ...rest,
    },
  });

  if (images && images.length > 0) {
    await prisma.productImage.deleteMany({
      where: {
        productId: Number(productId),
      },
    });

    for (const image of images) {
      await prisma.productImage.create({
        data: {
          original_url: image.original_url,
          thumbnail: image.thumbnail,
          index: parseInt(image.index),
          product: { connect: { id: Number(productId) } },
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
      sales: true,
      images: {
        select: {
          original_url: true,
          thumbnail: true,
        },
      },
      OrderProduct: {
        include: {
          order: {
            select: {
              total_price: true,
            },
          },
        },
      },
    },
  });

  const productSalesData = products.map((product) => {
    const totalSold = product.sales.length;
    const totalPrice = product.OrderProduct.reduce(
      (acc, orderProduct) => acc + (orderProduct.order.total_price || 0),
      0
    );

    return {
      title: product.title,
      sold: totalSold,
      image: product.images.map((image) => image.original_url),
      total_price: totalPrice,
    };
  });

  productSalesData.sort((a, b) => b.sold - a.sold);
  return productSalesData;
};

export const createReviewService = async (body) => {
  console.log("service", body);
  const { productId, userId, score, message } = body;

  if (!productId || !userId) {
    throw new Error("Product ID and User ID are required.");
  }

  const hasPurchased = await prisma.order.findMany({
    where: {
      userId: Number(userId),
      OrderProduct: {
        some: {
          productId: Number(productId),
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
