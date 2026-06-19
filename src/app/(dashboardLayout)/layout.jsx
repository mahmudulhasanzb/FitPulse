import Footer from "@/components/layout/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <>
        <div className="min-h-screen flex">
      <aside className="w-64 border-r border-[#1C210E]">
        <h1 className="text-white font-extrabold text-xl tracking-wider select-none font-sans border-b border-[#1C210E] p-4">
          FITPULSE
        </h1>
      </aside>
      {children}
      </div>
      <Footer/>
    </>

  );
}

export default DashboardLayout
