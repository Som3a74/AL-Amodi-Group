import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/common/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

const Main: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </CartProvider>
  );
};

export default Main; 