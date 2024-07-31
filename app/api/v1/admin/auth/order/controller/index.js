import {
  createOrderService,
  getOrderService,
  updateOrderStatusService,
} from "../service";

export const createOrderController = async (orderData) => {
  const order = await createOrderService(orderData);
  return order;
};

export const updateOrderStatusController = async (orderDetails) => {
  const order = await updateOrderStatusService(orderDetails);
  return order;
};

export const getOrderController = async (adminId) => {
  const order = await getOrderService(adminId);
  return order;
};
