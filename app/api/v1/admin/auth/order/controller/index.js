import { createOrderService, getCompletedOrderService } from "../service";

export const createOrderController = async (orderData) => {
  const order = await createOrderService(orderData);
  return order;
};

export const getCompletedOrderController = async (adminId) => {
  const order = await getCompletedOrderService(adminId);
  return order;
};
