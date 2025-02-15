"use client"

import { createContext, useContext, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS } from "./config/api"

const CartContext = createContext()

export function CartProvider({ children }) {
  const queryClient = useQueryClient()

  // Fetch cart items
  const { data: cartItems = [], refetch: refetchCart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = localStorage.getItem("token")
      if (!token) return []

      const response = await fetch(API_ENDPOINTS.cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      return data.items.map((item) => ({
        ...item.productId,
        quantity: item.quantity,
      }))
    },
  })

  // Fetch wishlist items
  const { data: wishlistItems = [], refetch: refetchWishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const token = localStorage.getItem("token")
      if (!token) return []

      const response = await fetch(API_ENDPOINTS.wishlist, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      return data.products
    },
  })

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (product) => {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("Please login to add items to cart")
        return
      }

      const existingItem = cartItems.find((item) => item._id === product._id)
      const quantity = existingItem ? existingItem.quantity + 1 : 1

      const response = await fetch(`${API_ENDPOINTS.cart}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      })

      if (!response.ok) throw new Error("Failed to add to cart")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"])
    },
  })

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (productId) => {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await fetch(`${API_ENDPOINTS.cart}/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to remove from cart")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"])
    },
  })

  // Update cart quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await fetch(`${API_ENDPOINTS.cart}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      })

      if (!response.ok) throw new Error("Failed to update quantity")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"])
    },
  })

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: async (product) => {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("Please login to add items to wishlist")
        return
      }

      const response = await fetch(`${API_ENDPOINTS.wishlist}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      })

      if (!response.ok) throw new Error("Failed to add to wishlist")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"])
    },
  })

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId) => {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await fetch(`${API_ENDPOINTS.wishlist}/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to remove from wishlist")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"])
    },
  })

  // Clear cart and wishlist
  const clearCartAndWishlist = () => {
    queryClient.setQueryData(["cart"], [])
    queryClient.setQueryData(["wishlist"], [])
  }

  // Effect to clear cart and wishlist when token is removed
  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        clearCartAndWishlist()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, []) // Removed clearCartAndWishlist from dependencies

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: (product) => addToCartMutation.mutate(product),
        removeFromCart: (productId) => removeFromCartMutation.mutate(productId),
        updateQuantity: (productId, quantity) => updateQuantityMutation.mutate({ productId, quantity }),
        wishlistItems,
        addToWishlist: (product) => addToWishlistMutation.mutate(product),
        removeFromWishlist: (productId) => removeFromWishlistMutation.mutate(productId),
        clearCartAndWishlist,
        refetchCart,
        refetchWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
