// In-memory product list (temporary data, no database)
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with smooth tracking and long battery life.",
    price: 29.99,
    // Public product image URL from a real website
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/wireless-mouse"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description:
      "Tactile mechanical keyboard with durable switches and customizable RGB lighting.",
    price: 79.99,
    // Public product image URL from a real website
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/mechanical-keyboard"
  },
  {
    id: 3,
    name: "USB-C Hub",
    description:
      "Compact USB-C hub with multiple ports for charging, data transfer, and displays.",
    price: 39.99,
    // Public product image URL from a real website
    image:
      "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?auto=format&fit=crop&w=1200&q=80",
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
