import {
  createProductService,
  getProductService,
  updateProductService,
} from "../service";

export async function createProductController(body) {
  const createdProduct = await createProductService(body);
  return createdProduct;
}

export async function getProductsController(adminId) {
  const productList = await getProductService(adminId);
  return productList;
}

export async function updateProductController(productId) {
  const updateProduct = updateProductService(productId);
  return updateProduct;
}
