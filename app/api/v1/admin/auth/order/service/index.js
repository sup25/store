import prisma from "@/_lib/prisma";
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
    throw new Error("Missing required order details");
  }

  const order = await prisma.order.create({
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
