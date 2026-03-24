// In-memory product list (temporary data, no database)
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 29.99,
    image: "https://example.com/images/wireless-mouse.jpg",
    url: "https://example.com/checkout/wireless-mouse"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 79.99,
    image: "https://example.com/images/mechanical-keyboard.jpg",
    url: "https://example.com/checkout/mechanical-keyboard"
  },
  {
    id: 3,
    name: "USB-C Hub",
    price: 39.99,
    image: "https://example.com/images/usb-c-hub.jpg",
    url: "https://example.com/checkout/usb-c-hub"
  }
];

// Controller for GET /products
// Returns all products as a JSON array
const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

module.exports = {
  products,
  getAllProducts
};
