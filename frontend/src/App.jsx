"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./Header"
import Login from "./Login"
import SignUp from "./SignUp"
import ProductsComponent from "./ProductsComponent"
import Profile from "./Profile"
import ChangePassword from "./ChangePassword"
import { CartProvider } from "./CartContext"
import ProductDetails from "./ProductDetails"
import ProductsPage from "./ProductsPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Header user={user} setUser={setUser} />
          <Routes>
            <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/change-password" element={user ? <ChangePassword /> : <Navigate to="/login" />} />
            <Route path="/" element={<ProductsComponent />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App

