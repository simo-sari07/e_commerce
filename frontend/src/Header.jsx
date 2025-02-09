"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { User, ChevronDown, ShoppingCart, X, Heart, Package, Menu } from "lucide-react"
import { useCart } from "./CartContext"
import SearchBar from "./search"
import logo from "../public/docs/img/logo.png"

const Header = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOilsMenuOpen, setIsOilsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    wishlistItems,
    clearCartAndWishlist,
    refetchCart,
    refetchWishlist,
  } = useCart()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + Number.parseFloat(item.new_price) * item.quantity, 0)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    clearCartAndWishlist()
    navigate("/login")
  }

  const handleWishlistClick = () => {
    if (!user) {
      navigate("/login")
    } else {
      localStorage.setItem("activeProfileTab", "wishlist")
      navigate("/profile")
    }
  }

  const handleAccountClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen)
    } else {
      navigate("/login")
    }
  }

  const oilsSubmenu = [
    { title: "Nos huiles", path: "/products" },
    { title: "Nos huiles essentielles", path: "/products" },
    { title: "Nos huiles bio", path: "/products" },
    { title: "Nos huiles complements alimentaires", path: "/products" },
  ]

  const mainNavItems = [
    { title: "Home", path: "/" },
    { title: "Nos coffrets", path: "/coffrets" },
    { title: "Nos fournisseurs", path: "/fournisseurs" },
    { title: "Qui sommes-nous ?", path: "/about" },
    { title: "Blog", path: "/blog" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".profile-dropdown")) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isDropdownOpen])

  // Refetch cart and wishlist when user changes
  useEffect(() => {
    if (user) {
      refetchCart()
      refetchWishlist()
    }
  }, [user, refetchCart, refetchWishlist])

  return (
    <>
      {/* Top banner */}
      <div className="bg-[#8b6240] text-white py-2 text-center text-sm">
        <p>Jusqu'à -50% sur une sélection produit</p>
      </div>

      <header className="bg-white shadow-sm relative">
        {/* Mobile menu button */}
        <div className="lg:hidden absolute left-4 top-4 z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-500 hover:text-[#8b6240]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Upper header with search, logo, and icons */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search bar component */}
            <div className="hidden md:block relative flex-1 max-w-md">
              <SearchBar />
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Link to="/">
                <img src={logo} alt="Logo" className="h-20 w-20" />
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Mobile search - now opens SearchBar component */}
              <div className="md:hidden">
                <SearchBar />
              </div>

              <button className="hidden md:block text-gray-700 hover:text-[#8b6240]">
                <Package className="w-6 h-6" />
              </button>

              <button onClick={handleWishlistClick} className="text-gray-700 hover:text-[#8b6240] relative">
                <Heart className="w-6 h-6" />
                {user && wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8b6240] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              <button
                className="text-gray-700 hover:text-[#8b6240] relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8b6240] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <div className="profile-dropdown relative">
                <button onClick={handleAccountClick} className="text-gray-700 hover:text-[#8b6240] focus:outline-none">
                  <User className="w-6 h-6" />
                </button>
                {user && isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f7e7d3] hover:text-[#8b6240]"
                    >
                      Mon compte
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f7e7d3] hover:text-[#8b6240]"
                    >
                      Mes commandes
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation menu - Desktop */}
        <nav className="hidden lg:block border-t border-gray-200 bg-[#f7e7d3]">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center justify-center space-x-8">
              {mainNavItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="py-4 px-2 text-[#8b6240] hover:text-[#594026] relative group inline-block"
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-full h-[0.5px] bg-[#8b6240] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                  </Link>
                </li>
              ))}
              <li className="relative">
                <div onMouseEnter={() => setIsOilsMenuOpen(true)} onMouseLeave={() => setIsOilsMenuOpen(false)}>
                  <button className="py-4 px-2 text-[#8b6240] hover:text-[#594026] flex items-center gap-1 relative group">
                    Nos huiles
                    <ChevronDown className="w-4 h-4" />
                    <span className="absolute bottom-0 left-0 w-full h-[0.5px] bg-[#8b6240] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                  </button>
                  {isOilsMenuOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                      {oilsSubmenu.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#f7e7d3] hover:text-[#8b6240]"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-white">
            <div className="p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-[#8b6240]"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mt-8 space-y-4">
                {mainNavItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-[#8b6240] hover:text-[#594026]"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="py-2">
                  <button
                    onClick={() => setIsOilsMenuOpen(!isOilsMenuOpen)}
                    className="flex items-center justify-between w-full text-[#8b6240]"
                  >
                    Nos huiles
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform ${isOilsMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOilsMenuOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {oilsSubmenu.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1 text-gray-600 hover:text-[#8b6240]"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#8b6240]">Votre panier</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Votre panier est vide</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                    <img
                      src={item.image_principale || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-[#8b6240]">{item.new_price} €</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 border rounded hover:bg-[#f7e7d3]"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2 py-1 border rounded hover:bg-[#f7e7d3]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} €</span>
                </div>
                <button className="w-full bg-[#8b6240] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                  Passer la commande
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Header

