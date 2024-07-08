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
  const deletedProduct = await prisma.product.delete({
    where: {
      id: parsedProductId,
    },
  });

  return deletedProduct;
};

export const getProductSalesDataService = async () => {
  const products = await prisma.product.findMany({
    include: {
      sales: true,
    },
  });

  const productSalesData = products.map((product) => ({
    title: product.title,
    sold: product.sales.length,
  }));

  return productSalesData;
};
