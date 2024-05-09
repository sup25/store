import { createProductService, getProductService } from "../service";

export async function createProductController(body) {
  const createdProduct = await createProductService(body);
  return createdProduct;
}

export async function getProductsController(adminId) {
  const productList = await getProductService(adminId);
  return productList;
}
