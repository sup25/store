import {
  createCartService,
  deleteCartService,
  getCartService,
  getPurchasedProductsService,
  showProductAccordingToPriceService,
  showProductAccordingToTagService,
} from "../service";

export const createCartController = async (userId, productId, quantity) => {
  const createCart = await createCartService(userId, productId, quantity);
  return createCart;
};
export const getCartController = async (userId) => {
  const getCart = await getCartService(userId);
  return getCart;
};
export const deleteCartController = async (itemIds) => {
  const deleteCart = await deleteCartService(itemIds);
  return deleteCart;
};

export async function showProductAccordingToTagController(tags) {
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new Error("Tags should be a non-empty array");
  }
  const getProductWithTag = await showProductAccordingToTagService(tags);
  return getProductWithTag;
}

export async function showProductAccordingToPriceController(
  minPrice,
  maxPrice
) {
  const getProductWithPriceFilter = showProductAccordingToPriceService(
    minPrice,
    maxPrice
  );
  return getProductWithPriceFilter;
}

export async function getPurchasedProductsController(userId) {
  const getpurchasedProduct = await getPurchasedProductsService(userId);
  return getpurchasedProduct;
}
