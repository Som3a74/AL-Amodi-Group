import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Star, ShoppingCart, Heart, Eye } from "lucide-react";
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

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px 0px -50px 0px" 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.6,
          delay: (index % 6) * 0.1, // Stagger effect for each row
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      } : {}}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-64">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.button 
            className="bg-white/95 hover:bg-white text-black p-3 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Eye className="h-5 w-5" />
          </motion.button>
          <motion.button 
            className="bg-white/95 hover:bg-white text-black p-3 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Heart className="h-5 w-5" />
          </motion.button>
          <motion.button 
            className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <motion.span 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
              initial={{ scale: 0, rotate: -10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              New
            </motion.span>
          )}
          {product.isOnSale && (
            <motion.span 
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
              initial={{ scale: 0, rotate: 10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              -{product.discount}%
            </motion.span>
          )}
          {!product.inStock && (
            <motion.span 
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >
              Out of Stock
            </motion.span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <motion.div 
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div 
          className="mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </motion.div>
        
        <motion.h3 
          className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {product.name}
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground text-sm mb-3 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {product.description}
        </motion.p>

        {/* Rating */}
        <motion.div 
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + (i * 0.05), type: "spring", stiffness: 300 }}
              >
                <Star
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </motion.div>

        {/* Price */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              QAR {product.price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            {product.material}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Product = () => {
  const products = productsData.products;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const [minRating, setMinRating] = useState(0);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  // Filter products based on all criteria
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
      const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(product.style);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesSale = !showOnSale || product.isOnSale;
      const matchesNew = !showNew || product.isNew;
      const matchesStock = !showInStock || product.inStock;

      return matchesSearch && matchesCategory && matchesMaterial && matchesStyle && 
             matchesPrice && matchesRating && matchesSale && matchesNew && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return b.discount - a.discount;
        case "newest":
          return b.isNew ? 1 : -1;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategories, selectedMaterials, selectedStyles, 
      priceRange, minRating, showOnSale, showNew, showInStock, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleStyleChange = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedStyles([]);
    setPriceRange([0, 4000]);
    setMinRating(0);
    setShowOnSale(false);
    setShowNew(false);
    setShowInStock(false);
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-20">
      {/* Header */}
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Products</span>
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover our premium collection of building materials and luxury finishes
          </motion.p>
        </div>

        {/* Search and Sort */}
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-border rounded-xl bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
            <option value="newest">Newest First</option>
          </select>

          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-300"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className={`lg:w-80 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="sticky top-24 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  Search Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  Clear All
                </button>
              </div>

              {/* Results Count */}
              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-primary font-medium">
                  {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Quick Filters</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnSale}
                      onChange={(e) => setShowOnSale(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm">On Sale</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showNew}
                      onChange={(e) => setShowNew(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm">New Products</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showInStock}
                      onChange={(e) => setShowInStock(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm">In Stock</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="4000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>QAR {priceRange[0]}</span>
                    <span>QAR {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Minimum Rating</h4>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                      className={`p-1 rounded transition-colors duration-300 ${
                        rating <= minRating 
                          ? 'text-yellow-400' 
                          : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Categories</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {productsData.categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded border-border text-primary focus:ring-primary/20"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Materials</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {productsData.materials.slice(0, 10).map((material) => (
                    <label key={material} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material)}
                        onChange={() => handleMaterialChange(material)}
                        className="rounded border-border text-primary focus:ring-primary/20"
                      />
                      <span className="text-sm">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Styles */}
              <div>
                <h4 className="font-semibold mb-3">Styles</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {productsData.styles.slice(0, 10).map((style) => (
                    <label key={style} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStyles.includes(style)}
                        onChange={() => handleStyleChange(style)}
                        className="rounded border-border text-primary focus:ring-primary/20"
                      />
                      <span className="text-sm">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1" ref={gridRef}>
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    🔍
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={isGridInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;