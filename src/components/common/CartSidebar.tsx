import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { t } = useTranslation();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-card border-l border-border">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-border">
            <SheetTitle className="text-xl font-bold text-card-foreground">
              {t('cartSidebar.title', { count: cart.itemCount })}
            </SheetTitle>
          </SheetHeader>

          {cart.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground mb-4">{t('cartSidebar.empty.text')}</p>
                <Link to="/products" onClick={onClose}>
                  <Button>
                    {t('cartSidebar.empty.button')}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence>
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-4 p-4 bg-background rounded-lg mb-4 border border-border hover:shadow-sm transition-shadow"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md border border-border"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-card-foreground text-sm mb-1">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-7 w-7 rounded-full hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                           <span className="text-sm font-bold text-primary">
                            {formatPrice(item.product.price)}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-7 w-7 rounded-full"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-6 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 rounded-full"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{t('cartSidebar.summary.subtotal')}</span>
                    <span className="font-medium text-card-foreground">{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{t('cartSidebar.summary.shipping')}</span>
                    <span className="font-medium text-card-foreground">{t('cartSidebar.summary.shippingFree')}</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold text-card-foreground pt-3 border-t border-border">
                  <span>{t('cartSidebar.summary.total')}</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <div className="space-y-3 mt-4">
                  <Link to="/cart" onClick={onClose}>
                    <Button className="w-full">
                      {t('cartSidebar.summary.button')}
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar; 