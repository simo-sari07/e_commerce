const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-lpbr.onrender.com"

export const API_ENDPOINTS = {
  products: `${API_URL}/api/products`,
  cart: `${API_URL}/api/cart`,
  wishlist: `${API_URL}/api/wishlist`,
  auth: `${API_URL}/api/auth`
}

export default API_URL