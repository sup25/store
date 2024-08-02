import prisma from "@/_lib/prisma";

export const createOrderService = async (orderData) => {
  const addressData = JSON.parse(orderData.address)[0];
  console.log("addressdata", addressData);

  const dataWithDefaults = {
    address: addressData,
    price: parseInt(orderData.price, 10) || 0,
    name: orderData.name,
    product: parseInt(orderData.product, 10),
    user: parseInt(orderData.user, 10),
    admin: parseInt(orderData.admin, 10),
  };

  if (
    !dataWithDefaults.name ||
    !dataWithDefaults.product ||
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
      statuses: {
        create: {
          type: "completed",
          date: new Date(),
          admin: {
            connect: { id: dataWithDefaults.admin },
          },
        },
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

export const getOrderService = async (adminId) => {
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
        {
          statuses: {
            some: {
              type: "canceled",
            },
          },
        },
      ],
      products: {
        some: {
          adminId: adminId,
        },
      },
    },
    include: {
      statuses: true,
      products: true,
      user: true,
    },
  });
  return orders;
};
