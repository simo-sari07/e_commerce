"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Eye,
  Heart,
} from "lucide-react";
import { useCart } from "./CartContext";

const ProductCard = ({
  product,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group relative transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id || product._id}`}>
          <img
            src={product.image_principale || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Overlay with buttons */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="p-3 bg-white rounded-full hover:bg-[#9e121b] hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Add to Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <Link
              to={`/product/${product.id || product._id}`}
              className="p-3 bg-white rounded-full hover:bg-[#9e121b] hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              title="View Details"
            >
              <Eye className="h-5 w-5" />
            </Link>
            <button
              onClick={() =>
                isInWishlist
                  ? removeFromWishlist(product._id)
                  : addToWishlist(product)
              }
              className={`p-3 bg-white rounded-full hover:bg-[#9e121b] hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl ${
                isInWishlist ? "text-[#b91c1c]" : ""
              }`}
              title="Add to Wishlist"
            >
              <Heart
                className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Promo badge */}
        {product.promo && (
          <div className="absolute top-4 left-4 bg-[#9e121b] text-white px-3 py-1.5 rounded-full text-sm font-medium transform -rotate-2">
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
                  i < Math.floor(product.rating || 5)
                    ? "text-[#9e121b] fill-[#9e121b]"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviews || 140})
          </span>
        </div>

        <Link to={`/product/${product.id || product._id}`}>
          <h2 className="text-lg font-semibold text-gray-900 hover:text-[#9e121b] transition-colors duration-300">
            {product.name}
          </h2>
        </Link>

        <p className="text-sm text-gray-500 mt-1">{product.category}</p>

        <div className="flex items-baseline gap-2 mt-4">
          <p className="text-xl font-bold text-gray-900">
            {product.new_price} Dhss
          </p>
          {product.old_price > 0 ? (
            <p className="text-sm text-gray-500 line-through">
              {product.old_price} Dhse
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const isInWishlist = wishlistItems.some((item) => item._id === product?._id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Product not found"
              : "Failed to fetch product"
          );
        }
        const data = await response.json();
        setProduct(data);
        // Fetch related products
        const relatedResponse = await fetch(
          `http://localhost:5000/api/products?category=${data.category}&limit=5`
        );
        const relatedData = await relatedResponse.json();
        setRelatedProducts(
          relatedData.filter((p) => p._id !== data._id).slice(0, 4)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message || "Failed to load product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b91c1c]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center text-[#b91c1c] hover:text-[#7f2b2b]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = [
    product.image_principale,
    product.detail1,
    product.detail2,
    product.detail3,
    product.image_second,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <div
                className="relative aspect-square overflow-hidden rounded-lg"
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                onMouseMove={handleMouseMove}
                ref={imageRef}
              >
                <img
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    zoom ? "scale-150" : "scale-100"
                  }`}
                  style={
                    zoom
                      ? {
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        }
                      : undefined
                  }
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev - 1 + images.length) % images.length
                        )
                      }
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev + 1) % images.length
                        )
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 
                      ${
                        currentImageIndex === index
                          ? "border-[#b91c1c]"
                          : "border-transparent"
                      }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 5)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews || 140})
                  </span>
                </div>
                {product.promo && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {product.promo}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  {product.new_price} Dhs
                </span>
                {product.old_price > 0 ? (
                  <span className="text-xl text-gray-500 line-through">
                    {product.old_price} Dhs
                  </span>
                ) : (
                  ""
                )}{" "}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Description</h3>
                <p className="text-gray-600">
                  {product.description ||
                    "Un meilleur complément alimentaire 100% pur les experts la Santé jour de Top Santé. Des peptides de Collagène marin hydrolysé de qualité Premium, à bas poids..."}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-[#b91c1c] text-white py-3 px-4 rounded-lg hover:bg-[#771f1f] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>

                <button
                  onClick={() =>
                    isInWishlist
                      ? removeFromWishlist(product._id)
                      : addToWishlist(product)
                  }
                  className={`px-4 py-3 rounded-lg border-2 transition-colors flex items-center justify-center
                    ${
                      isInWishlist
                        ? "border-[#b91c1c] text-[#b91c1c] hover:bg-red-50"
                        : "border-gray-300 hover:border-[#b91c1c] hover:text-[#b91c1c]"
                    }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
                  isInWishlist={wishlistItems.some(
                    (item) => item._id === relatedProduct._id
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
