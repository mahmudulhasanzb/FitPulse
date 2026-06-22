import AddNewClass from "@/components/AddNewClass";
import { Plus } from "lucide-react";

const AddNewClassesPage = () => {

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-8 md:px-12 md:py-12 text-white overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-white">
                Add New Class
              </h1>
              <p className="text-[10px] font-bold text-[#D4FF00] tracking-widest uppercase mt-0.5">
                Instructor Portal
              </p>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#13160B] border border-[#1C210E] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#A4A896] hover:border-[#D4FF00]/50 transition-colors duration-200">
            <Plus className="h-3 w-3 text-[#D4FF00]" />
            <span>Draft Mode</span>
          </button>
        </div>
        <AddNewClass />
      </div>
    </div>
  );
};

export default AddNewClassesPage;
