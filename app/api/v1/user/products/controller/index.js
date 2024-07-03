import {
  createCartService,
  deleteCartService,
  getCartService,
} from "../service";

export const createCartController = async (userId, productId, quantity) => {
  const createCart = await createCartService(userId, productId, quantity);
  return createCart;
};
export const getCartController = async (userId) => {
  const getCart = await getCartService(userId);
  return getCart;
};
export const deleteCartController = async (productId) => {
  const deleteCart = await deleteCartService(productId);
  return deleteCart;
};
