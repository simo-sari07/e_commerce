import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Package,
  Heart,
  ChevronRight,
  LogOut,
  Save,
  Settings,
  ShoppingBag,
  Receipt,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "./CartContext";

const Profile = () => {
  // Get the active tab from localStorage or default to 'profile'
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeProfileTab");
    localStorage.removeItem("activeProfileTab");
    return savedTab || "profile";
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const navigate = useNavigate();
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    refetchCart,
    refetchWishlist,
    clearCartAndWishlist,
  } = useCart();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          address: data.user.address || "",
          newsletter: data.user.newsletter || false,
        });
      } catch (error) {
        console.error("Error:", error);
        setMessage({ type: "error", content: error.message });
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Failed to update profile");

      setMessage({ type: "success", content: "Profile updated successfully" });
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", content: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    { icon: Package, label: "Mon compte", value: "profile" },
    { icon: ShoppingBag, label: "Mes commandes", value: "orders" },
    { icon: Heart, label: "Mes favoris", value: "wishlist" },
    { icon: Receipt, label: "Mes factures", value: "invoices" },
    { icon: CreditCard, label: "Moyens de paiement", value: "payment" },
    { icon: Settings, label: "Paramètres", value: "settings" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5F0]">
      {/* Top banner */}
      <div className="bg-[#8b6240] text-white py-2 text-center text-sm">
        <p>Jusqu'à -50% sur une sélection produit</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-[#8b6240] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">
                    {formData.name?.[0]?.toUpperCase() ||
                      formData.email?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {formData.name || "Utilisateur"}
                  </h2>
                  <p className="text-sm text-gray-500">{formData.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setActiveTab(item.value);
                      localStorage.setItem("activeProfileTab", item.value);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeTab === item.value
                        ? "bg-[#F7E7D3] text-[#8b6240]"
                        : "hover:bg-[#F7E7D3] text-gray-700 hover:text-[#8b6240]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                    refetchCart();
                    refetchWishlist();
                    clearCartAndWishlist();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === "profile" && (
                <>
                  <h3 className="text-xl font-semibold mb-6">
                    Informations personnelles
                  </h3>

                  {message.content && (
                    <div
                      className={`mb-4 p-3 rounded-lg ${
                        message.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adresse
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#8b6240] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              newsletter: e.target.checked,
                            })
                          }
                          className="rounded border-gray-300 text-[#8b6240] focus:ring-[#8b6240]"
                        />
                        <span className="text-sm text-gray-600">
                          Je souhaite recevoir la newsletter
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-[#8b6240] text-white rounded-lg hover:bg-[#725032] transition-colors disabled:opacity-50"
                      >
                        {isLoading ? (
                          "Sauvegarde..."
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Sauvegarder
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {activeTab === "wishlist" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Mes favoris</h3>
                    <span className="text-sm text-gray-500">
                      {wishlistItems.length} favoris
                    </span>
                  </div>

                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-6">
                        Votre liste de favoris est vide
                      </p>
                      <Link
                        to="/products"
                        className="inline-block px-6 py-3 bg-[#8b6240] text-white rounded-lg hover:bg-[#725032] transition-colors"
                      >
                        Découvrir nos produits
                      </Link>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <div
                          key={item._id}
                          className="bg-[#FAF5F0] rounded-lg overflow-hidden group"
                        >
                          <div className="relative">
                            <Link to={`/product/${item._id}`}>
                              <img
                                src={
                                  item.image_principale || "/placeholder.svg"
                                }
                                alt={item.name}
                                className="w-full h-48 object-contain p-4"
                              />
                            </Link>
                            <button
                              onClick={() => removeFromWishlist(item._id)}
                              className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-600 hover:bg-red-50"
                            >
                              <Heart className="w-5 h-5 fill-current" />
                            </button>
                          </div>

                          <div className="p-4">
                            <div className="mb-2">
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-[#8b6240] text-white rounded">
                                ROUTINE
                              </span>
                            </div>

                            <Link
                              to={`/product/${item._id}`}
                              className="block font-medium text-gray-900 hover:text-[#8b6240] mb-2"
                            >
                              {item.name}
                            </Link>

                            <div className="flex items-baseline gap-2 mb-4">
                              <span className="text-lg font-bold text-gray-900">
                                {item.new_price} €
                              </span>
                              {item.old_price && (
                                <span className="text-sm text-gray-500 line-through">
                                  {item.old_price} €
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() => addToCart(item)}
                              className="w-full flex items-center justify-center gap-2 py-2 bg-[#8b6240] text-white rounded hover:bg-[#725032] transition-colors"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Ajouter au panier</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Paramètres</h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => navigate("/change-password")}
                      className="w-full flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-[#8b6240]" />
                        <div className="text-left">
                          <p className="font-medium">Changer le mot de passe</p>
                          <p className="text-sm text-gray-500">
                            Mettez à jour votre mot de passe pour sécuriser
                            votre compte
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
