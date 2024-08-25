import prisma from "@/_lib/prisma";

export const createOrderService = async (orderData) => {
  const addressData = JSON.parse(orderData.address)[0];

  const dataWithDefaults = {
    address: addressData,
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
    throw new Error("Missing required order details");
  }

  let existingAddress = await prisma.address.findFirst({
    where: {
      street: dataWithDefaults.address.street,
      city: dataWithDefaults.address.city,
      state: dataWithDefaults.address.state,
      country: dataWithDefaults.address.country,
      zipcode: dataWithDefaults.address.zipcode,
      userId: dataWithDefaults.user,
    },
  });

  if (!existingAddress) {
    existingAddress = await prisma.address.create({
      data: {
        street: dataWithDefaults.address.street,
        city: dataWithDefaults.address.city,
        state: dataWithDefaults.address.state,
        country: dataWithDefaults.address.country,
        zipcode: dataWithDefaults.address.zipcode,
        apt: dataWithDefaults.address.apt,
        user: {
          connect: { id: dataWithDefaults.user },
        },
      },
    });
  }

  const order = await prisma.order.create({
    data: {
      address: {
        connect: { id: existingAddress.id },
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
      OrderProduct: {
        create: dataWithDefaults.products.map((product) => ({
          product: {
            connect: { id: product.productId },
          },
          quantity: product.quantity,
        })),
      },
    },
  });

  await Promise.all(
    dataWithDefaults.products.map(async (product) => {
      const { productId, quantity } = product;
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (existingProduct) {
        if (existingProduct.quantity < quantity) {
          throw new Error(
            `Insufficient stock for product with ID ${productId}`
          );
        }

        await prisma.product.update({
          where: { id: productId },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });

        if (existingProduct.adminId) {
          await prisma.status.create({
            data: {
              type: "completed",
              date: new Date(),
              order: {
                connect: { id: order.id },
              },
              Admin: {
                connect: { id: existingProduct.adminId },
              },
            },
          });
        } else {
          console.error(
            `Admin ID is undefined for product with ID: ${productId}`
          );
        }
      } else {
        console.error(`Product with ID ${productId} not found`);
      }
    })
  );

  return order;
};

export const updateOrderStatusService = async (orderDetails) => {
  const { sessionId, status } = orderDetails;
  await prisma.order.updateMany({
    where: {
      sessionId: sessionId,
    },
    data: {
      statuses: {
        create: {
          type: status,
          date: new Date(),
        },
      },
    },
  });
};

export const getCompletedOrderService = async (adminId) => {
  const orders = await prisma.order.findMany({
    where: {
      OrderProduct: {
        some: {
          product: {
            adminId: adminId,
          },
        },
      },
      statuses: {
        some: {
          type: {
            in: ["completed", "canceled"],
          },
        },
      },
    },
    include: {
      OrderProduct: {
        include: {
          product: true,
        },
      },
      statuses: true,
      user: true,
      address: true,
    },
  });
  return orders;
};
