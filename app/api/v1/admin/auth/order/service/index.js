import prisma from "@/_lib/prisma";

export const createOrderService = async (orderData) => {
  const dataWithAddress = {
    ...orderData,
    address: orderData.address || "Dummy Address",
  };

  const order = await prisma.order.create({
    data: {
      address: dataWithAddress.address,
      total_price: orderData.price || 0,
      net_price: orderData.price || 0,
      name: orderData.name,
      sale: {
        create: {
          products: {
            connect: [{ id: orderData.product }],
          },
        },
      },
      products: {
        connect: { id: orderData.product },
      },

      user: {
        connect: { id: orderData.user },
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
