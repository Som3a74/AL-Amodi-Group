import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/common/Footer';
import { Outlet } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';

const Main: React.FC = () => {
  return (
    <CartProvider>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster position="top-center" richColors />
    </CartProvider>
  );
};

export default Main; 