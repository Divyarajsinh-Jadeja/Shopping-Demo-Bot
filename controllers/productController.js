// Fallback image if external image provider fails
const FALLBACK_IMAGE_URL = "https://placehold.co/600x400";

// Generate a dynamic image URL from product title
function getImageUrl(title) {
  return `https://source.unsplash.com/600x400/?${encodeURIComponent(title)}`;
}

// Quickly check whether the generated image URL is reachable
async function isImageReachable(imageUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    // HEAD is lightweight and enough to validate URL availability
    const response = await fetch(imageUrl, {
      method: "HEAD",
      signal: controller.signal
    });
    return response.ok;
  } catch (error) {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

// In-memory product list (temporary data, no database)
// image_url is assigned dynamically in GET /products
const products = [
  {
    id: 1,
    title: "Wireless Mouse",
    price: 29.99,
    rating: 8.7,
    description: "Ergonomic wireless mouse with precise tracking and long battery life.",
    image_url:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/wireless-mouse"
  },
  {
    id: 2,
    title: "Mechanical Keyboard",
    price: 89.99,
    rating: 9.1,
    description:
      "Tactile mechanical keyboard with durable switches and customizable RGB lighting.",
    image_url:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/mechanical-keyboard"
  },
  {
    id: 3,
    title: "USB-C Hub",
    price: 39.99,
    rating: 8.2,
    description:
      "Compact USB-C hub with HDMI, USB-A, and PD charging support for daily use.",
    image_url:
      "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/usb-c-hub"
  },
  {
    id: 4,
    title: "Bluetooth Headphones",
    price: 119.99,
    rating: 8.9,
    description:
      "Over-ear Bluetooth headphones with active noise cancellation and deep bass.",
    image_url:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/bluetooth-headphones"
  },
  {
    id: 5,
    title: "Smart Watch",
    price: 149.99,
    rating: 8.4,
    description:
      "Fitness-focused smartwatch with heart-rate tracking, sleep insights, and GPS.",
    image_url:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/smart-watch"
  },
  {
    id: 6,
    title: "Portable SSD",
    price: 99.99,
    rating: 9.3,
    description:
      "High-speed portable SSD with USB 3.2 support for fast backup and file transfer.",
    image_url:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/portable-ssd"
  },
  {
    id: 7,
    title: "4K Webcam",
    price: 79.99,
    rating: 8.6,
    description:
      "Ultra-clear 4K webcam with auto-focus and dual microphones for video meetings.",
    image_url:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/4k-webcam"
  },
  {
    id: 8,
    title: "Wireless Charger",
    price: 24.99,
    rating: 8.0,
    description:
      "Fast wireless charging pad compatible with popular Android and iOS devices.",
    image_url:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
    url: "https://example.com/checkout/wireless-charger"
  }
];

// Controller for GET /products
// Returns products with dynamic image URLs and fallback safety
const getAllProducts = async (req, res) => {
  const productsWithDynamicImages = await Promise.all(
    products.map(async (product) => {
      // Prefer curated real image URL; generate one dynamically if missing
      const preferredImageUrl = product.image_url || getImageUrl(product.title);
      const imageIsReachable = await isImageReachable(preferredImageUrl);

      return {
        ...product,
        image_url: imageIsReachable ? preferredImageUrl : FALLBACK_IMAGE_URL
      };
    })
  );

  res.status(200).json(productsWithDynamicImages);
};

module.exports = {
  products,
  getImageUrl,
  getAllProducts
};
