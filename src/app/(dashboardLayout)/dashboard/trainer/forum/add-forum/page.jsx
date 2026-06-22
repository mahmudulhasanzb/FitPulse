import AddNewForumPost from '@/components/AddNewForumPost';

const AddForumPostPage = () => {
  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-8 md:px-12 md:py-12 text-white overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="space-y-2 pb-6 border-b border-[#1C210E]">
          <h1 className="text-3xl font-black uppercase tracking-tight text-white font-mono">
            New Dispatch
          </h1>
          <p className="text-xs text-[#A4A896]/60 font-medium">
            Share training protocols, nutrition science, or squad updates.
          </p>
        </div>

        {/* Form Container */}
        <AddNewForumPost />
      </div>
    </div>
  );
};

export default AddForumPostPage;
