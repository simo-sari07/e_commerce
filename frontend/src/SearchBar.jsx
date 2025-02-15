"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Link } from "react-router-dom"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/products`)
        const data = await response.json()

        // Filter products based on search query
        const filtered = data.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )

        setSearchResults(filtered.slice(0, 5)) // Show only first 5 results
        setShowResults(true)
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  return (
    <div className="relative flex-1 max-w-xl" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8b6240]"
        />
        {searchQuery ? (
          <button
            onClick={() => {
              setSearchQuery("")
              setSearchResults([])
              setShowResults(false)
            }}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        ) : null}
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
          <div className="p-2">
            {searchResults.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                onClick={() => {
                  setShowResults(false)
                  setSearchQuery("")
                }}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <img
                  src={product.image_principale || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-sm font-medium text-[#8b6240]">{product.new_price} €</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showResults && searchQuery.length >= 2 && searchResults.length === 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 text-center text-gray-500">Aucun produit trouvé pour "{searchQuery}"</div>
        </div>
      )}
    </div>
  )
}

export default SearchBar

