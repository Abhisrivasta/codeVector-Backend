import { getProductsService } from "../services/product.service.js";

export const getProducts = async (req, res) => {
  try {
    const result = await getProductsService(req.query);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};