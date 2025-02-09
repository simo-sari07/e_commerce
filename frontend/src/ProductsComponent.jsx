"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, Loader2, Star, Eye, Heart } from "lucide-react"
import { useCart } from "./CartContext"
import { Link } from "react-router-dom"
import HeroSlider from "./hero-slider"
import ServiceBenefits from "./footer/ServiceBenefits"
import Footer from "./footer/Footer"

const tabs = [
  { id: "favoris", label: "Favoris" },
  { id: "stock", label: "Retour en stock" },
  { id: "nouveautes", label: "Nouveautés" },
  { id: "promotions", label: "Promotions" },
]

const ProductCard = ({ product, addToCart, addToWishlist, removeFromWishlist, isInWishlist }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group relative transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id || product._id}`}>
          <img
            src={product.image_principale || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-contain transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={(e) => {
                e.preventDefault()
                addToCart(product)
              }}
              className="p-3 bg-white rounded-full hover:bg-[#B17A50] hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Add to Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <Link
              to={`/product/${product.id || product._id}`}
              className="p-3 bg-white rounded-full hover:bg-[#B17A50] hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              title="View Details"
            >
              <Eye className="h-5 w-5" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product)
              }}
              className="p-3 bg-white rounded-full hover:bg-[#B17A50] hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? "fill-[#B17A50]" : ""}`} />
            </button>
          </div>
        </div>

        {product.promo && (
          <div className="absolute top-4 left-4 bg-[#F5E6D3] text-[#B17A50] px-4 py-2 rounded-full text-sm font-medium">
            {product.promo}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 5) ? "text-[#B17A50] fill-[#B17A50]" : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews || 140})</span>
        </div>

        <Link to={`/product/${product.id || product._id}`}>
          <h2 className="text-lg font-medium text-gray-900 hover:text-[#B17A50] transition-colors duration-300">
            {product.name}
          </h2>
        </Link>

        <p className="text-sm text-gray-500 mt-1">{product.category}</p>

        <div className="flex items-baseline justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-gray-900">{product.new_price} DH</p>
            {product.old_price && product.old_price > 0 && (
              <p className="text-sm text-gray-500 line-through">{product.old_price} DH</p>
            )}
          </div>
          <Link
            to={`/product/${product.id || product._id}`}
            className="text-[#B17A50] hover:text-[#8B6240] text-sm font-medium transition-colors duration-300"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  )
}

const ProductsComponent = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("favoris")
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/products?limit=12")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setProducts(data.slice(0, 12))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("Failed to load products")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [activeTab])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF5F0]">
        <Loader2 className="h-12 w-12 animate-spin text-[#B17A50]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF5F0]">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-xl font-semibold text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#B17A50] text-white rounded-md hover:bg-[#8B6240] transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeroSlider />
      <div className="min-h-screen bg-[#FAF5F0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">Nos sélections de la semaine</h2>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-base transition-colors duration-300 
                  ${activeTab === tab.id ? "bg-[#B17A50] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                isInWishlist={wishlistItems.some((item) => item._id === product._id)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-block bg-[#B17A50] text-white py-3 px-6 rounded-lg hover:bg-[#8B6240] transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
      <ServiceBenefits />
      <Footer />
    </>
  )
}

export default ProductsComponent

