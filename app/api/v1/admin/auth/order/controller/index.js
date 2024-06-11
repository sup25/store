import { createOrderService, getOrderService } from "../service";

export const createOrderController = async (orderData) => {
  const order = await createOrderService(orderData);
  return order;
};

export const getOrderController = async (id) => {
  const order = await getOrderService(id);
  return order;
};
