"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Loader2, Star, Filter, Eye, Heart, Grid, List } from "lucide-react"
import * as Slider from "@radix-ui/react-slider"
import { Link } from "react-router-dom" 
import { useCart } from "./CartContext";

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors"
  const variants = {
    default: "bg-[#9e121b] text-white hover:bg-[#8a1017]",
    outline: "border border-gray-300 hover:bg-gray-50",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Select = ({ value, onChange, placeholder, children }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9e121b]"
    >
      <option value="">{placeholder}</option>
      {children}
    </select>
  )
}

const ProductCard = ({ product, addToCart, addToWishlist, removeFromWishlist, isInWishlist, viewMode }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden group relative transition-all duration-300 hover:shadow-lg ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3" : ""}`}>
        <a href={`/product/${product.id}`}>
          <img
            src={product.image_principale || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-contain transform group-hover:scale-105 transition-transform duration-500"
          />
        </a>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={(e) => {
                e.preventDefault()
                addToCart(product)
              }}
              className="p-3 bg-white rounded-full hover:bg-[#9e121b] hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              title="Add to Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="p-3 bg-white rounded-full hover:bg-[#9e121b] hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              title="View Details"
            >
              <Eye className="h-5 w-5" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product)
              }}
              className="p-3 bg-white rounded-full hover:bg-[#9e121b] hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {product.promo && (
          <div className="absolute top-4 left-4 bg-[#9e121b] text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {product.promo}
          </div>
        )}
      </div>

      <div className={`p-4 ${viewMode === "list" ? "w-2/3" : ""}`}>
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 5) ? "text-[#9e121b] fill-[#9e121b]" : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews || 0})</span>
        </div>

        <a href={`/product/${product.id}`}>
          <h2 className="text-lg font-semibold text-gray-900 hover:text-[#9e121b] transition-colors duration-300">
            {product.name}
          </h2>
        </a>

        <p className="text-sm text-gray-500 mt-1">{product.category}</p>

        <div className="flex items-baseline gap-2 mt-4">
          <p className="text-xl font-bold text-gray-900">{product.new_price} €</p>
          {product.old_price && product.old_price > 0 && (
            <p className="text-sm text-gray-500 line-through">{product.old_price} €</p>
          )}
        </div>
      </div>
    </div>
  )
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        ←
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-[#9e121b] text-white" : "hover:bg-gray-100"}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        →
      </button>
    </div>
  )
}

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setProducts(data)
        setCategories([...new Set(data.map((product) => product.category))])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("Failed to load products")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory
    const priceMatch = Number(product.new_price) >= priceRange[0] && Number(product.new_price) <= priceRange[1]
    return categoryMatch && priceMatch
  })

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-[#9e121b]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-xl font-semibold text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-100" : ""}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-gray-100" : ""}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <Button onClick={() => setShowFilters(!showFilters)} className="md:hidden" variant="outline">
              <Filter className="h-5 w-5 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className={`md:w-1/4 ${showFilters ? "block" : "hidden md:block"}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Filters</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <Select value={selectedCategory} onChange={setSelectedCategory} placeholder="All Categories">
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Price Range: {priceRange[0]} - {priceRange[1]} €
                  </label>
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={1}
                  >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                      <Slider.Range className="absolute bg-[#9e121b] rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9e121b]"
                      aria-label="Price minimum"
                    />
                    <Slider.Thumb
                      className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9e121b]"
                      aria-label="Price maximum"
                    />
                  </Slider.Root>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"
              }
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
                  isInWishlist={wishlistItems.some((item) => item._id === product._id)}
                  viewMode={viewMode}
                />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage

