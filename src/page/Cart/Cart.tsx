import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { t } = useTranslation();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: { duration: 0.3 },
    },
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="bg-card rounded-3xl shadow-xl p-12 border border-border">
              <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">{t('cart.empty.title')}</h2>
              <p className="text-muted-foreground mb-8">{t('cart.empty.description')}</p>
              <Link to="/products">
                <Button>
                  {t('cart.empty.button')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-2xl shadow-lg p-8 mb-8 border border-border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/products">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-muted"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-card-foreground">{t('cart.title')}</h1>
                  <p className="text-muted-foreground mt-1">
                    {t('cart.itemsCount', { count: cart.itemCount })}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('cart.clearCart')}
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={itemVariants}
                className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
              >
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-card-foreground mb-6">{t('cart.items')}</h2>
                  <AnimatePresence mode="wait">
                    <div className="space-y-6">
                      {cart.items.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className="flex items-center gap-6 p-4 bg-background rounded-xl border border-border hover:shadow-md transition-all duration-300"
                        >
                          <div className="relative">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-lg border-2 border-border"
                            />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                              {item.quantity}
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-card-foreground mb-1">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.product.brand}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(item.product.price)}
                              </span>
                              {item.product.originalPrice > item.product.price && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(item.product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-full"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-full"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                variants={itemVariants}
                className="bg-card rounded-2xl shadow-lg p-8 border border-border sticky top-24"
              >
                <h2 className="text-xl font-semibold text-card-foreground mb-6">{t('cart.summary.title')}</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('cart.summary.subtotal')}:</span>
                    <span className="text-card-foreground font-medium">{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('cart.summary.shipping')}:</span>
                    <span className="text-green-600 font-medium">{t('cart.summary.shippingFree')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('cart.summary.tax')}:</span>
                    <span className="text-card-foreground font-medium">{formatPrice(cart.total * 0.1)}</span>
                  </div>
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold text-card-foreground">
                      <span>{t('cart.summary.total')}:</span>
                      <span>{formatPrice(cart.total * 1.1)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full">
                    {t('cart.checkout')}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {t('cart.saveForLater')}
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary font-medium text-center">
                    {t('cart.freeShipping')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;