import prisma from "@/_lib/prisma";

export const createOrderService = async (orderData) => {
  const dataWithDefaults = {
    address: orderData.address || "Dummy Address",
    price: parseInt(orderData.price, 10) || 0,
    name: orderData.name,
    product: parseInt(orderData.product, 10),
    user: parseInt(orderData.user, 10),
  };

  if (
    !dataWithDefaults.name ||
    !dataWithDefaults.product ||
    !dataWithDefaults.user
  ) {
    throw new Error("Missing required order details");
  }

  const order = await prisma.order.create({
    data: {
      address: dataWithDefaults.address,
      total_price: dataWithDefaults.price,
      net_price: dataWithDefaults.price,
      name: dataWithDefaults.name,
      sale: {
        create: {
          products: {
            connect: [{ id: dataWithDefaults.product }],
          },
        },
      },
      products: {
        connect: { id: dataWithDefaults.product },
      },
      user: {
        connect: { id: dataWithDefaults.user },
      },
    },
  });
  return order;
};

export const getOrderService = async (id) => {
  const orders = await prisma.order.findMany({
    where: {
      product: {
        adminId: id,
      },
      status: "completed",
    },
    include: {
      product: true,
    },
  });
  return orders;
};
