import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  RefreshCw,
  Award,
  Minus,
  Plus,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  Eye,
  Camera
} from "lucide-react";
import productsData from "@/data/products.json";

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  thumbnail: string;
  description: string;
  material: string;
  style: string;
  rating: number;
  reviews: number;
  isOnSale: boolean;
  isNew: boolean;
  inStock: boolean;
  features: string[];
  specifications: {
    dimensions: string;
    weight: string;
    warranty: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("description");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = productsData.products.find((p) => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🔍
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Products
          </button>
        </motion.div>
      </div>
    );
  }

  // Create multiple images for gallery (using the main image for now)
  const images = [
    product.image,
    product.thumbnail,
    product.image,
    product.thumbnail,
    product.image
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setZoomLevel(isZoomed ? 1 : 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="h-5 w-5" />
          العودة إلى المنتجات
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <motion.div
              className="relative bg-white rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-square">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className={`w-full h-full object-cover cursor-pointer transition-transform duration-300 ${
                      isZoomed ? 'scale-200' : 'scale-100'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: isZoomed ? 2 : 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    onClick={toggleZoom}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Zoom Button */}
                <button
                  onClick={toggleZoom}
                  className="absolute bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                >
                  {isZoomed ? <Eye className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <motion.span
                      className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      جديد
                    </motion.span>
                  )}
                  {product.isOnSale && (
                    <motion.span
                      className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                      initial={{ scale: 0, rotate: 10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      خصم -{product.discount}%
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Gallery */}
            <motion.div
              className="grid grid-cols-5 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'border-primary shadow-lg'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Product Info */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.brand}
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl lg:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {product.name}
              </motion.h1>

              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {product.description}
              </motion.p>

              {/* Rating */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} مراجعة)
                </span>
              </motion.div>

              {/* Price */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-3xl font-bold text-primary">
                  QAR {product.price.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <span className="text-xl text-muted-foreground line-through">
                    QAR {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-green-600 font-semibold">
                    وفر QAR {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </motion.div>

              {/* Stock Status */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {product.inStock ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-600 font-medium">متوفر في المخزون</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-600 font-medium">غير متوفر</span>
                  </>
                )}
              </motion.div>
            </div>

            {/* Quantity and Actions */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium">الكمية:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-border min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!product.inStock}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  إضافة إلى السلة
                </motion.button>

                <motion.button
                  onClick={toggleWishlist}
                  className={`px-4 py-3 rounded-lg border transition-colors flex items-center justify-center ${
                    isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'border-border hover:bg-muted'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  className="px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                ضمان {product.specifications.warranty}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                توصيل مجاني
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 text-primary" />
                إمكانية الإرجاع
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                منتج معتمد
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              {[
                { id: 'description', label: 'الوصف', icon: Info },
                { id: 'specifications', label: 'المواصفات', icon: Package },
                { id: 'features', label: 'المميزات', icon: Zap },
                { id: 'reviews', label: 'المراجعات', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex-1 p-4 text-center transition-colors flex items-center justify-center gap-2 ${
                    selectedTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {selectedTab === 'description' && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">وصف المنتج</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-semibold">المادة</p>
                        <p className="text-sm text-muted-foreground">{product.material}</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-semibold">الطراز</p>
                        <p className="text-sm text-muted-foreground">{product.style}</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-semibold">الضمان</p>
                        <p className="text-sm text-muted-foreground">{product.specifications.warranty}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedTab === 'specifications' && (
                  <motion.div
                    key="specifications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">المواصفات التقنية</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">الأبعاد</h4>
                          <p className="text-muted-foreground">{product.specifications.dimensions}</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">الوزن</h4>
                          <p className="text-muted-foreground">{product.specifications.weight}</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">المادة</h4>
                          <p className="text-muted-foreground">{product.material}</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">الضمان</h4>
                          <p className="text-muted-foreground">{product.specifications.warranty}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">المميزات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {selectedTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">المراجعات</h3>
                    <div className="text-center py-8">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="h-8 w-8 text-yellow-400 fill-current" />
                        <span className="text-3xl font-bold">{product.rating}</span>
                      </div>
                      <p className="text-muted-foreground">
                        بناءً على {product.reviews} مراجعة
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;