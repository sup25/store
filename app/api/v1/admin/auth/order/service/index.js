import prisma from "@/_lib/prisma";

export const updateProductQuantitiesService = async (products, userId) => {
  for (const product of products) {
    const dbProduct = await prisma.product.findUnique({
      where: { id: product.productId },
    });

    if (!dbProduct) {
      console.log(
        `User ${userId} attempted to purchase non-existent product ID ${product.productId}.`
      );
      throw new Error(`Product with ID ${product.productId} not found`);
    }

    if (dbProduct.quantity < product.quantity) {
      console.log(
        `User ${userId} attempted to purchase more than available quantity for product ID ${product.productId}.`
      );
      throw new Error(
        `Insufficient quantity for product ID ${product.productId}`
      );
    }

    // Atomically update the product quantity and version
    const result = await prisma.product.updateMany({
      where: {
        id: product.productId,
        version: dbProduct.version,
        quantity: { gte: product.quantity },
      },
      data: {
        quantity: dbProduct.quantity - product.quantity,
        version: { increment: 1 }, // Increment version for optimistic locking
      },
    });

    if (result.count === 0) {
      console.log(
        `User ${userId} failed to update product ID ${product.productId}. Possible concurrent modification.`
      );
      throw new Error(
        `Failed to update product ID ${product.productId}. Another transaction may have modified the product.`
      );
    } else {
      console.log(
        `User ${userId} successfully updated product ID ${product.productId} quantity.`
      );
    }
  }
};

export const createOrderService = async (orderData) => {
  const addressArray = JSON.parse(orderData.address);
  const address = addressArray[0];

  const dataWithDefaults = {
    address,
    price: parseInt(orderData.price, 10) || 0,
    name: orderData.name,
    products: orderData.products.map((product) => ({
      productId: parseInt(product.productId || product, 10),
      quantity: parseInt(product.quantity || 1, 10),
    })),
    user: parseInt(orderData.user, 10),
    admin: orderData.admin.split(",").map((adminId) => parseInt(adminId, 10)),
  };

  if (
    !dataWithDefaults.name ||
    !dataWithDefaults.products.length ||
    !dataWithDefaults.user
  ) {
    console.log(
      `User ${dataWithDefaults.user} failed to create order due to missing details.`
    );
    throw new Error("Missing required order details");
  }

  try {
    await updateProductQuantitiesService(
      dataWithDefaults.products,
      dataWithDefaults.user
    );

    const order = await prisma.$transaction(async (prisma) => {
      const createdOrder = await prisma.order.create({
        data: {
          address: {
            connectOrCreate: {
              where: {
                id: address.id,
              },
              create: {
                street: address.street,
                city: address.city,
                state: address.state,
                country: address.country,
                zipcode: address.zipcode,
                apt: address.apt,
                user: {
                  connect: { id: dataWithDefaults.user },
                },
              },
            },
          },
          total_price: dataWithDefaults.price,
          net_price: dataWithDefaults.price,
          name: dataWithDefaults.name,
          sale: {
            create: {
              products: {
                connect: dataWithDefaults.products.map((product) => ({
                  id: product.productId,
                })),
              },
            },
          },
          user: {
            connect: { id: dataWithDefaults.user },
          },
          statuses: {
            create: { type: "completed" },
          },
        },
      });

      console.log(
        `User ${dataWithDefaults.user} successfully created order with ID ${createdOrder.id}.`
      );
      return createdOrder;
    });

    return order;
  } catch (error) {
    console.error(
      `Transaction error for user ${dataWithDefaults.user}: ${error.message}`
    );
    throw new Error("Transaction failed. Please try again.");
  }
};

export const getCompletedOrderService = async (adminId) => {
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        {
          statuses: {
            some: {
              type: "completed",
            },
          },
        },
      ],
      sale: {
        products: {
          some: {
            adminId: adminId,
          },
        },
      },
    },
    include: {
      statuses: true,
      address: true,
      user: true,
      sale: {
        include: {
          products: true,
        },
      },
    },
  });
  return orders;
};
