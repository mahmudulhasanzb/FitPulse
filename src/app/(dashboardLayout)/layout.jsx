import DashboardSideBar from '@/components/DashboardSideBar';
import Footer from '@/components/layout/Footer';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen flex">
        <DashboardSideBar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
