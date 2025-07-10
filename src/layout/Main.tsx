import Navbar from '@/components/navigation/Navbar';
import { Outlet } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Main; 