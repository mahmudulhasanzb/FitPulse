import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen flex">
        <aside className="w-64 border-r border-[#1C210E]">
          <Link
            href="/"
            className="text-white font-extrabold text-xl tracking-wider select-none font-sans border-b border-[#1C210E] p-4 block"
          >
            FITPULSE
          </Link>
        </aside>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
