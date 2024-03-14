const { getProduct } = require("../service");

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProduct(id);

    res.status(200).send(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
