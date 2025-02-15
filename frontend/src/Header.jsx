"use client";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  ChevronDown,
  ShoppingCart,
  X,
  Heart,
  Menu,
  ShoppingBag,
  LogOut,
  Mail,
  Lock,
} from "lucide-react";
import { useCart } from "./CartContext";
import SearchBar from "./search";
import { toast } from "react-toastify";

const Header = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOilsMenuOpen, setIsOilsMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    wishlistItems,
    clearCartAndWishlist,
    refetchCart,
    refetchWishlist,
  } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number.parseFloat(item.new_price) * item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    clearCartAndWishlist();
    navigate("/login");
  };

  const handleWishlistClick = () => {
    if (!user) {
      setIsLoginPopupOpen(true);
    } else {
      localStorage.setItem("activeProfileTab", "wishlist");
      navigate("/profile");
    }
  };

  const handleAccountClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsLoginPopupOpen(true);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email: loginForm.email }));
      setUser({ email: loginForm.email });
      setIsLoginPopupOpen(false);
      setLoginForm({ email: "", password: "" });
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const oilsSubmenu = [
    { title: "Nos huiles", path: "/products" },
    { title: "Nos huiles essentielles", path: "/products" },
    { title: "Nos huiles bio", path: "/products" },
    { title: "Nos huiles complements alimentaires", path: "/products" },
  ];

  const mainNavItems = [
    { title: "Home", path: "/" },
    { title: "Nos coffrets", path: "/coffrets" },
    { title: "Nos fournisseurs", path: "/fournisseurs" },
    { title: "Qui sommes-nous ?", path: "/about" },
    { title: "Blog", path: "/blog" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (user) {
      refetchCart();
      refetchWishlist();
    }
  }, [user, refetchCart, refetchWishlist]);

  return (
    <>
      {/* Top banner */}
      <div className="bg-gradient-to-r from-[#8b6240] to-[#a67c52] text-white py-3 text-center text-sm font-medium">
        <p>Jusqu'à -50% sur une sélection produit</p>
      </div>

      <header className="bg-white shadow-md relative">
        {/* Mobile menu button */}
        <div className="lg:hidden absolute left-4 top-4 z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#8b6240] hover:text-[#a67c52]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Upper header with search, logo, and icons */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Updated Logo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Link to="/" className="flex items-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <circle cx="20" cy="20" r="20" fill="#8b6240" />
                  <path
                    d="M12 28V12C12 10.8954 12.8954 10 14 10H26C27.1046 10 28 10.8954 28 12V28"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M17 15C17 13.3431 18.3431 12 20 12C21.6569 12 23 13.3431 23 15V28H17V15Z"
                    fill="white"
                  />
                  <path
                    d="M14 28H26"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-2xl font-bold text-[#8b6240]">
                  EssenceElite
                </span>
              </Link>
            </div>

            {/* Search bar component */}
            <div className="hidden md:block relative flex-1 max-w-xl">
              <SearchBar />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Mobile search - now opens SearchBar component */}
              <div className="md:hidden">
                <SearchBar />
              </div>

              <button
                onClick={handleWishlistClick}
                className="text-[#8b6240] hover:text-[#a67c52] relative"
              >
                <Heart className="w-6 h-6" />
                {user && wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8b6240] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              <button
                className="text-[#8b6240] hover:text-[#a67c52] relative"
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
                <button
                  onClick={handleAccountClick}
                  className="text-[#8b6240] hover:text-[#a67c52] focus:outline-none"
                >
                  <User className="w-6 h-6" />
                </button>
                {user && isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                    <div className="px-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-[#f7e7d3] rounded-md group transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400 group-hover:text-[#8b6240]" />
                        <span className="text-sm">Mon compte</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-[#f7e7d3] rounded-md group transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-gray-400 group-hover:text-[#8b6240]" />
                        <span className="text-sm">Mes commandes</span>
                      </Link>
                      <div className="h-px bg-gray-100 my-2 mx-3" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md w-full group transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-600" />
                        <span className="text-sm">Déconnexion</span>
                      </button>
                    </div>
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
                <div
                  onMouseEnter={() => setIsOilsMenuOpen(true)}
                  onMouseLeave={() => setIsOilsMenuOpen(false)}
                >
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
                className="absolute right-4 top-4 text-[#8b6240] hover:text-[#a67c52]"
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
                      className={`w-4 h-4 transform transition-transform ${
                        isOilsMenuOpen ? "rotate-180" : ""
                      }`}
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

      {/* Login Popup with updated colors */}
      {isLoginPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#f7e7d3] rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#8b6240]">Connexion</h2>
              <button
                onClick={() => setIsLoginPopupOpen(false)}
                className="text-[#8b6240] hover:text-[#a67c52]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#8b6240] mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    className="w-full pl-3 pr-10 py-2 border border-[#a67c52] rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent bg-white text-[#594026]"
                    required
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-[#a67c52]" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#8b6240] mb-1"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="w-full pl-3 pr-10 py-2 border border-[#a67c52] rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent bg-white text-[#594026]"
                    required
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-[#a67c52]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-[#a67c52] text-[#8b6240] focus:ring-[#8b6240]"
                  />
                  <span className="ml-2 text-sm text-[#594026]">
                    Se souvenir de moi
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-[#8b6240] hover:text-[#a67c52]"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#8b6240] text-white rounded-lg hover:bg-[#a67c52] transition-colors"
              >
                Se connecter
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-[#594026]">
                Pas encore de compte ?{" "}
                <Link
                  to="/signup"
                  onClick={() => setIsLoginPopupOpen(false)}
                  className="text-[#8b6240] hover:text-[#a67c52]"
                >
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#8b6240]">
                  Votre panier
                </h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div
              className="p-4 space-y-4 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">
                  Votre panier est vide
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
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
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 py-1 border rounded hover:bg-[#f7e7d3]"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="px-2 py-1 border rounded hover:bg-[#f7e7d3]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
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
                  <span className="font-semibold">
                    {totalPrice.toFixed(2)} €
                  </span>
                </div>
                <button className="w-full bg-[#8b6240] text-white py-2 rounded-lg hover:bg-[#a67c52] transition-colors">
                  Passer la commande
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
