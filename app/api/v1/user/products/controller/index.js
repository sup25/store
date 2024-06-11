import {
  createCartService,
  deleteCartService,
  getCartService,
} from "../service";

export const createCartController = async (userId, productId, quantity) => {
  const createCart = await createCartService(userId, productId, quantity);
  return createCart;
};
export const getCartController = async (cartId) => {
  const getCart = await getCartService(cartId);
  return getCart;
};
export const deleteCartController = async (cartId) => {
  const deleteCart = await deleteCartService(cartId);
  return deleteCart;
};
