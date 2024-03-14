const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get one product by ID
export const getProduct = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    throw new Error(`Error retrieving product with ID ${id}: ${error.message}`);
  }
};

// Get all products
export const getAll = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error(`Error retrieving products: ${error.message}`);
  }
};

// Create a new product
const createProduct = async (data) => {
  try {
    const product = await prisma.product.create({
      data,
    });
    return product;
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

// Update one product by ID
const updateProductById = async (id, data) => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    return product;
  } catch (error) {
    throw new Error(`Error updating product with ID ${id}: ${error.message}`);
  }
};

// Update many products
const updateManyProducts = async (where, data) => {
  try {
    const products = await prisma.product.updateMany({
      where,
      data,
    });
    return products;
  } catch (error) {
    throw new Error(`Error updating products: ${error.message}`);
  }
};
