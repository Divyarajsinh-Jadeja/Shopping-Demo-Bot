const { products } = require("./productController");

// Controller for POST /order
// Accepts productId and returns a mock order response
const createOrder = (req, res) => {
  const { productId } = req.body;

  // Basic validation: productId should be an integer number
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid productId. Please send a positive integer."
    });
  }

  // Check whether the requested product exists in memory
  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found."
    });
  }

  // Return required successful order response
  return res.status(200).json({
    success: true,
    message: "Order created successfully",
    // For demo purposes, use the product checkout URL as payment_url
    payment_url: selectedProduct.url
  });
};

module.exports = {
  createOrder
};
