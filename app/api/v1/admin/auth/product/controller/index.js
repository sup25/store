import {
  createProductService,
  getAllProductsService,
  deleteProductService,
  getProductsService,
  updateProductService,
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

export async function updateProductController(productId, updatedFields) {
  const updateProduct = updateProductService(productId, updatedFields);
  return updateProduct;
}

export async function deleteProductController(prductId) {
  const deleteProduct = await deleteProductService(prductId);
  return deleteProduct;
}
