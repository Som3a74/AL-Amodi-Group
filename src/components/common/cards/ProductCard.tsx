import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/types";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { t } = useTranslation(['products', 'translation']);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px 0px -50px 0px"
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Added ${product.name} to cart!`);
  };

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
          alt={t(`product_${product.id}_name`)}
          className="w-full h-full object-cover cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => navigate(`/products/${product.id}`)}
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
            onClick={() => navigate(`/products/${product.id}`)}
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
            onClick={handleAddToCart}
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
          className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {t(`product_${product.id}_name`)}
        </motion.h3>

        <motion.p
          className="text-muted-foreground text-sm mb-3 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {t(`product_${product.id}_description`)}
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
                  className={`h-4 w-4 ${i < Math.floor(product.rating)
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

export default ProductCard;