import { createOrderService, getOrderService } from "../service";

export const createOrderController = async (orderData) => {
  const order = await createOrderService(orderData);
  return order;
};

export const getOrderController = async (adminId) => {
  const order = await getOrderService(adminId);
  return order;
};
