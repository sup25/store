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

export const getProductService = async (adminId) => {
  const parsedAdminId = parseInt(adminId);
  const products = await prisma.product.findMany({
    where: {
      adminId: parsedAdminId,
    },
  });

  return products;
};

export const updateProductService = async (productId) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
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
