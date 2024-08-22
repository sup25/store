import {
  createProductService,
  getAllProductsService,
  deleteProductService,
  getProductsService,
  updateProductService,
  getProductSalesDataService,
  createReviewService,
  getReviewsByProductIdService,
  editReviewService,
  deleteReviewService,
  getPublicProductsService,
} from "../service";

export async function createProductController(body) {
  const createdProduct = await createProductService(body);
  return createdProduct;
}

export async function getAllProductsController() {
  const products = await getAllProductsService();
  return products;
}

export async function getProductsController(adminId) {
  const productList = await getProductsService(adminId);
  return productList;
}
export async function getPublicProductsController(productHandle) {
  const productList = await getPublicProductsService(productHandle);
  return productList;
}

export async function updateProductController(productId, updatedFields) {
  const updateProduct = updateProductService(productId, updatedFields);
  return updateProduct;
}

export async function deleteProductController(productId) {
  const deleteProduct = await deleteProductService(productId);
  return deleteProduct;
}
export async function getProductSalesDataController(adminId) {
  const getProduct = await getProductSalesDataService(adminId);
  return getProduct;
}

export async function createReviewController(body) {
  const createReview = await createReviewService(body);
  return createReview;
}

export async function getReviewsByProductIdController(adminId) {
  const getReview = await getReviewsByProductIdService(adminId);
  return getReview;
}

export async function editReviewController(body) {
  const editReview = await editReviewService(body);
  return editReview;
}
export async function deleteReviewController(body) {
  const deleteReview = await deleteReviewService(body);
  return deleteReview;
}
